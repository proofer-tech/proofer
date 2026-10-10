import { lineOf, nodes } from "../walk";
import type { Rule } from "../types";
import { isBr } from "./pmd009";

export const pmd001: Rule = {
  id: "PMD001",
  severity: "error",
  check: (doc) =>
    nodes(doc.tree).flatMap(({ n }) =>
      n.type === "html" && !isBr(n.value)
        ? [
            {
              line: lineOf(n),
              message: `raw HTML 이다: ${n.value.slice(0, 30).replace(/\s+/g, " ")}`,
              fix: "HTML 태그와 주석을 지우고 마크다운 문법으로 다시 쓴다",
            },
          ]
        : [],
    ),
};
