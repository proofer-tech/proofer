import { NextResponse } from "next/server";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import { listFeedArticles } from "@/lib/blog/queries";

export const revalidate = 3600;

const url = (path: string) => generateUrl(path, SUB_DOMAIN.blog);
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function GET() {
  const items = (await listFeedArticles())
    .map(
      (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${esc(url(`/${a.slug}`))}</link>
      <guid>${esc(url(`/${a.slug}`))}</guid>
      <pubDate>${a.published_at.toUTCString()}</pubDate>
      <description>${esc(a.description || a.subtitle || "")}</description>${
        a.author_name ? `\n      <author>${esc(a.author_name)}</author>` : ""
      }
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>프루퍼 블로그</title>
    <link>${esc(url("/"))}</link>
    <description>프루퍼가 쓰는 AI 네이티브 개발과 커뮤니티 이야기</description>
    <language>ko</language>
${items}
  </channel>
</rss>
`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
