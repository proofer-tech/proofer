import { Metadata } from "next";
import { merge } from "lodash";

interface MetadataGenerationProps {
  title: string;
  shortTitle?: string;
  fullTitle?: string;
  description: string;
}
export function generateMetadataFromTitle(
  { title, shortTitle = "", fullTitle, description }: MetadataGenerationProps,
  parentMetadata?: Metadata,
) {
  fullTitle = fullTitle || [title, shortTitle].filter((v) => v).join(" | ");
  const baseMetadata = {
    metadataBase: new URL("https://proofer.tech"),
    keywords: [
      "프루퍼",
      "개발자 성과",
      "Developer Velocity",
      "DORA Metrics",
      "SPACE Framework",
      "DevEx",
      "proofer",
      "proofer tech",
    ],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://proofer.tech",
      images: ["/assets/images/og-image.png"],
    },
  };

  return merge(baseMetadata, parentMetadata, {
    applicationName: title,
    title: fullTitle,
    description: description,
    openGraph: {
      siteName: title,
      title: fullTitle,
      description: description,
    },
  });
}
