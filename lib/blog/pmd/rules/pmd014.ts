import { lineOf } from "../walk";
import type { Rule } from "../types";

export const pmd014: Rule = {
  id: "PMD014",
  severity: "warning",
  check: (doc) => {
    const kids = doc.tree.children.filter((n) => n.type !== "yaml");
    const h = kids.findIndex((n) => n.type === "heading" && n.depth === 2);
    const intro = (h < 0 ? kids : kids.slice(0, h)).some(
      (n) =>
        n.type === "paragraph" && n.children.some((c) => c.type !== "image"),
    );
    if (intro || (h < 0 && !kids.length)) return [];
    return [
      {
        line: h < 0 ? 1 : lineOf(kids[h]),
        message: "첫 ## 제목 앞에 도입 문단이 없다",
        fix: "첫 ## 제목 앞에 글이 무엇을 다루는지 한두 문단으로 쓴다",
      },
    ];
  },
};
