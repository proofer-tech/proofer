import { NextResponse } from "next/server";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

// docs/ax-landing-spec.md 6.5절 GEO 방침의 접근 대상 크롤러 목록
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Yeti",
];

// ponytail: Next.js 메타데이터 컨벤션의 robots.ts는 app 루트에만 .txt 확장자를 붙인다
// (next/dist/lib/metadata/get-metadata-route.js의 `page === '/robots'` 정확 일치 검사).
// sitemap.ts와 달리 하위 경로는 라우팅되지 않아 Route Handler로 직접 만든다.
function buildRobotsTxt(): string {
  const rules = ["*", ...AI_CRAWLERS]
    .map((userAgent) => `User-agent: ${userAgent}\nAllow: /`)
    .join("\n\n");
  const sitemap = generateUrl("/sitemap.xml", SUB_DOMAIN.ax);

  return `${rules}\n\nSitemap: ${sitemap}\n`;
}

export function GET() {
  return new NextResponse(buildRobotsTxt(), {
    headers: { "Content-Type": "text/plain" },
  });
}
