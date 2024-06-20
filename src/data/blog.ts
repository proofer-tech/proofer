import { dz } from "@/database/engine";
import { Article, ArticleToTag, Tag } from "@/database/schemas/blog";
import { and, count, desc, eq, InferSelectModel, like } from "drizzle-orm";
import { cached } from "@/src/redis";

async function _getArticlesWithTags({ slug }: { slug?: string } = {}) {
  let querySet = dz
    .select()
    .from(Article)
    .leftJoin(ArticleToTag, eq(Article.id, ArticleToTag.article_id))
    .leftJoin(Tag, eq(ArticleToTag.tag_name, Tag.name));

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
        tags: [tag, ...(originArticle.tags || [])].filter((i) => i),
      });
      return acc;
    }, {}),
  ).sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
}
export async function getPublishedArticles(
  page: number,
  perPage: number,
  query: string,
) {
  let queryset: any = dz
    .select({
      id: Article.id,
      slug: Article.slug,
      title: Article.title,
      description: Article.description,
      image: Article.image,
    })
    .from(Article);
  let rows: any = dz
    .select({
      count: count(),
    })
    .from(Article);

  queryset = queryset
    .orderBy(desc(Article.created_at))
    .limit(perPage)
    .offset((page - 1) * perPage);

  const andConditions = [eq(Article.is_published, true)];
  if (query) {
    andConditions.push(like(Article.title, `%${query}%`));
  }

  const articles = await queryset.where(and(...andConditions));
  const totalRows = await rows.where(and(...andConditions));

  return {
    total: Math.floor((totalRows[0]?.count || 0) / perPage),
    articles: articles as InferSelectModel<typeof Article>[],
  };
}

export const getArticlesWithTags = cached(
  "getArticlesWithTags",
  _getArticlesWithTags,
);
