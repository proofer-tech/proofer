import { MetadataRoute } from "next";
import { getArticlesWithTags } from "@/src/data/blog";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticlesWithTags();
  return articles.map((article) => ({
    url: generateUrl(`/${article.slug}`, SUB_DOMAIN.blog),
    lastModified: article.updated_at,
    changeFrequency: "monthly",
    priority: 0.5,
  }));
}
