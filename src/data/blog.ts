import { db } from "@/database/engine";
import { Article, ArticleToTag, Tag } from "@/database/schemas/blog";
import { eq, InferSelectModel } from "drizzle-orm";

export async function getArticlesWithTags(slug: string) {
  const querySet = await db
    .select()
    .from(Article)
    .where(eq(Article.slug, slug))
    .innerJoin(ArticleToTag, eq(Article.id, ArticleToTag.articleId))
    .innerJoin(Tag, eq(ArticleToTag.tagName, Tag.name));

  return Object.values(
    querySet.reduce<
      Record<
        number,
        InferSelectModel<typeof Article> & {
          tags: InferSelectModel<typeof Tag>[];
        }
      >
    >((acc, row) => {
      const { article, tag } = row;
      const originArticle = acc[article.id] || {};

      acc[article.id] = Object.assign(originArticle, {
        ...article,
        tags: [tag, ...(originArticle.tags || [])],
      });
      return acc;
    }, {}),
  );
}
