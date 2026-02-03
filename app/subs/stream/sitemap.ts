import { MetadataRoute } from "next";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: generateUrl("/", SUB_DOMAIN.stream),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: generateUrl("introduction", SUB_DOMAIN.stream),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
