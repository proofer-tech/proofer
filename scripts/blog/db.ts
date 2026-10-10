// drizzle 로 BlogDb 를 구현한다. POSTGRES_URL 이 있는 PC 에서만 쓴다.
import { eq, or } from "drizzle-orm";
import type { BlogDb } from "../../lib/blog/publish/publish";

export async function drizzleBlogDb(): Promise<BlogDb> {
  const { dz } = await import("../../database/engine");
  const { Article, ArticleRevision, ArticleToTag, Author, Tag } =
    await import("../../database/schemas/blog");
  return {
    transaction: (fn) =>
      dz.transaction((t) =>
        fn({
          async findArticle(slug, mediumPostId) {
            const cond = mediumPostId
              ? or(
                  eq(Article.slug, slug),
                  eq(Article.medium_post_id, mediumPostId),
                )
              : eq(Article.slug, slug);
            const [row] = await t
              .select({
                id: Article.id,
                body_md: Article.body_md,
                content_hash: Article.content_hash,
              })
              .from(Article)
              .where(cond)
              .limit(1);
            return row;
          },
          async findAuthor(slug) {
            const [row] = await t
              .select({ id: Author.id, display_name: Author.display_name })
              .from(Author)
              .where(eq(Author.slug, slug));
            return row;
          },
          async insertArticle(v) {
            const [row] = await t
              .insert(Article)
              .values(v)
              .returning({ id: Article.id });
            return row.id;
          },
          async updateArticle(id, v) {
            await t.update(Article).set(v).where(eq(Article.id, id));
          },
          async insertRevision(articleId, bodyMd, contentHash) {
            await t.insert(ArticleRevision).values({
              article_id: articleId,
              body_md: bodyMd,
              content_hash: contentHash,
            });
          },
          async setTags(articleId, tags) {
            await t
              .delete(ArticleToTag)
              .where(eq(ArticleToTag.article_id, articleId));
            if (!tags.length) return;
            await t
              .insert(Tag)
              .values(tags.map((name) => ({ name, slug: name })))
              .onConflictDoNothing();
            await t
              .insert(ArticleToTag)
              .values(
                tags.map((tag_name) => ({ article_id: articleId, tag_name })),
              );
          },
        }),
      ),
  };
}
