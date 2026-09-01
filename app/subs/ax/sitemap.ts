import { MetadataRoute } from "next";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

// ponytail: 요청마다 안 바뀌는 고정 값. 페이지 내용을 바꿀 때 이 값도 같이 올린다.
const LAST_MODIFIED = new Date("2026-09-02");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: generateUrl("/", SUB_DOMAIN.ax),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
