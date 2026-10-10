import { fmString, fmStrings, keyLine } from "../frontmatter";
import type { Rule } from "../types";

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");

export const pmd018: Rule = {
  id: "PMD018",
  severity: "warning",
  check: (doc) => {
    const main = fmStrings(doc.frontmatter, "keywords")?.[0];
    if (!main) return [];
    const hay = norm(
      `${fmString(doc.frontmatter, "title") ?? ""} ${fmString(doc.frontmatter, "subtitle") ?? ""}`,
    );
    if (hay.includes(norm(main))) return [];
    return [
      {
        line: keyLine(doc.source, doc.frontmatterLine, "keywords"),
        message: `주 검색어 "${main}" 가 제목과 부제에 없다`,
        fix: "제목이나 부제에 주 검색어를 넣거나 keywords 첫 항목을 바꾼다",
      },
    ];
  },
};
