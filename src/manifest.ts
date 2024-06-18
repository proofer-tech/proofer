import { Metadata } from "next";
import { merge, truncate } from "lodash";
import * as cheerio from "cheerio";

interface MetadataGenerationProps {
  title?: string;
  applicationName?: string;
  fullTitle?: string;
  description: string;
}
export function generateMetadataFromTitle(
  {
    title = "",
    applicationName = "",
    fullTitle,
    description,
  }: MetadataGenerationProps,
  parentMetadata?: Metadata,
) {
  fullTitle =
    fullTitle ||
    [title, ["프루퍼", applicationName].filter((v) => v).join(" ")]
      .filter((v) => v)
      .join(" | ");

  return merge(parentMetadata, {
    applicationName: applicationName,
    title: fullTitle,
    description: description,
    openGraph: {
      siteName: applicationName,
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
    description,
    merge({ length: 125, separator: "..." }, options),
  );
}
