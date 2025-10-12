import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://with-cto.proofer.tech",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://with-cto.proofer.tech/1st",
      lastModified: new Date("2024-06-08"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://with-cto.proofer.tech/2nd",
      lastModified: new Date("2024-07-12"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://with-cto.proofer.tech/3rd",
      lastModified: new Date("2024-08-09"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://with-cto.proofer.tech/4th",
      lastModified: new Date("2024-12-13"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://with-cto.proofer.tech/5th",
      lastModified: new Date("2025-03-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://with-cto.proofer.tech/6th",
      lastModified: new Date("2025-07-18"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://with-cto.proofer.tech/join",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
