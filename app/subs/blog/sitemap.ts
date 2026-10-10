import { MetadataRoute } from "next";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import { listSitemapSources } from "@/lib/blog/queries";

// ponytail: sitemap 은 DB 를 읽으므로 1시간 캐시한다. 글 수가 수만 건이 되면 sitemap index 로 쪼갠다.
export const revalidate = 3600;

const url = (path: string) => generateUrl(path, SUB_DOMAIN.blog);

// canonical_url 이 있고 blog 자신이 아니면(Medium 등) 원문이 다른 곳이므로 색인 후보에서 뺀다.
export function isSelfCanonical(canonical: string | null, loc: string) {
  if (!canonical) return true;
  try {
    return new URL(canonical).host === new URL(loc).host;
  } catch {
    return false;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { articles, tags, authors } = await listSitemapSources();
  return [
    { url: url("/") },
    ...articles
      .filter((a) => isSelfCanonical(a.canonical_url, url("/")))
      .map((a) => ({ url: url(`/${a.slug}`), lastModified: a.updated_at })),
    ...tags.map((t) => ({ url: url(`/tag/${t.slug}`) })),
    ...authors.map((a) => ({ url: url(`/author/${a.slug}`) })),
  ];
}
