import { MetadataRoute } from "next";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: generateUrl("/", SUB_DOMAIN.team),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
