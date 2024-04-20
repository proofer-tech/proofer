import { MetadataRoute } from "next";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: generateUrl(`/`, SUB_DOMAIN.app),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
