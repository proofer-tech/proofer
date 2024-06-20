import { MetadataRoute } from "next";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import { dz } from "@/database/engine";
import { Article } from "@/database/schemas/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await dz
    .select({
      slug: Article.slug,
      updated_at: Article.updated_at,
    })
    .from(Article);
  return [
    {
      url: generateUrl("/", SUB_DOMAIN.blog),
      lastModified: articles[0].updated_at,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...articles.map((article) => ({
      url: generateUrl(`/${article.slug}`, SUB_DOMAIN.blog),
      lastModified: article.updated_at,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ] as MetadataRoute.Sitemap;
}
