import { dz } from "@/database/engine";
import { Article, ArticleToTag, Tag } from "@/database/schemas/blog";
import { eq, InferSelectModel } from "drizzle-orm";
import { cached } from "@/src/redis";

export const getArticlesWithTags = cached(async function getArticlesWithTags({
  slug,
}: { slug?: string } = {}) {
  let querySet = dz
    .select()
    .from(Article)
    .innerJoin(ArticleToTag, eq(Article.id, ArticleToTag.article_id))
    .innerJoin(Tag, eq(ArticleToTag.tag_name, Tag.name));

  // @ts-ignore
  if (slug) querySet = querySet.where(eq(Article.slug, slug));

  return Object.values(
    (await querySet).reduce<
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
  ).sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
});
