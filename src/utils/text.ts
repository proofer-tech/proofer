import { merge, truncate } from "lodash";
import * as cheerio from "cheerio";

export function truncateHtml(contents: string, options?: {}) {
  const root = cheerio.load(contents);
  return truncate(
    Array.from(
      root("p").map((_, el) => {
        return root(el).text().toString();
      }),
    ).join(" "),
    merge({ length: 253, separator: "..." }, options),
  );
}

export function isValidHttpUrl(urlString: string) {
  let url;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
