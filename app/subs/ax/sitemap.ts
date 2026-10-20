import { MetadataRoute } from "next";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

// ponytail: 요청마다 안 바뀌는 고정 값. 페이지 내용을 바꿀 때 이 값도 같이 올린다.
const LAST_MODIFIED = new Date("2026-10-20");

export default function sitemap(): MetadataRoute.Sitemap {
  // /enterprise 는 canonical 이 `/` 라서 사이트맵에 넣지 않는다
  return [
    { path: "/", priority: 1.0 },
    { path: "/startup", priority: 0.9 },
    { path: "/growth", priority: 0.9 },
  ].map(({ path, priority }) => ({
    url: generateUrl(path, SUB_DOMAIN.ax),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
