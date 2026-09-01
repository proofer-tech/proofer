import { MetadataRoute } from "next";
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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: generateUrl("/sitemap.xml", SUB_DOMAIN.ax),
  };
}
