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

  return merge(parentMetadata, {
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
