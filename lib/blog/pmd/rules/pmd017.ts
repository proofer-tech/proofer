import { fmStrings, keyLine } from "../frontmatter";
import type { Rule } from "../types";

export const pmd017: Rule = {
  id: "PMD017",
  severity: "error",
  check: (doc) => {
    const n = fmStrings(doc.frontmatter, "keywords")?.length ?? 0;
    if (n >= 1 && n <= 6) return [];
    return [
      {
        line: keyLine(doc.source, doc.frontmatterLine, "keywords"),
        message: `keywords 가 ${n}개다(1 ~ 6개여야 한다)`,
        fix: "keywords 를 1 ~ 6개로 맞추고 첫 항목에 주 검색어를 둔다",
      },
    ];
  },
};
