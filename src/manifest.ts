import { Metadata } from "next";
import { merge, truncate } from "lodash";
import * as cheerio from "cheerio";

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

export function getTextOf(html: string) {
  const root = cheerio.load(html);
  return Array.from(
    root("p").map((_, el) => {
      return root(el).text().toString();
    }),
  ).join(" ");
}

export function truncateDescription(description: string, options: {} = {}) {
  return truncate(
    getTextOf(description),
    merge({ length: 125, separator: "..." }, options),
  );
}
