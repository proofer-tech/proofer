import { fmStrings } from "../frontmatter";
import { textOf } from "../walk";
import type { Rule } from "../types";

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");

export const pmd019: Rule = {
  id: "PMD019",
  severity: "warning",
  check: (doc) => {
    const main = fmStrings(doc.frontmatter, "keywords")?.[0];
    if (!main) return [];
    const first = doc.tree.children.find((n) => n.type === "paragraph");
    const hay = [
      first,
      ...doc.tree.children.filter((n) => n.type === "heading" && n.depth === 2),
    ]
      .map((n) => (n ? textOf(n) : ""))
      .join(" ");
    if (norm(hay).includes(norm(main))) return [];
    return [
      {
        line: first?.position?.start.line ?? 1,
        message: `주 검색어 "${main}" 가 첫 문단과 ## 제목 어디에도 없다`,
        fix: "첫 문단이나 ## 제목에 주 검색어를 넣거나 keywords 첫 항목을 바꾼다",
      },
    ];
  },
};
