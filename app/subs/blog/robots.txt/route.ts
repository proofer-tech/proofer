import { NextResponse } from "next/server";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

// ponytail: app/subs/ax/robots.txt/route.ts 와 같은 이유로 Route Handler 로 만든다.
export function GET() {
  const sitemap = generateUrl("/sitemap.xml", SUB_DOMAIN.blog);
  return new NextResponse(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { "Content-Type": "text/plain" },
  });
}
