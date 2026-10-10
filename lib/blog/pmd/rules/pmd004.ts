import { lineOf, nodes } from "../walk";
import type { Rule } from "../types";

export const pmd004: Rule = {
  id: "PMD004",
  severity: "error",
  check: (doc) =>
    nodes(doc.tree).flatMap(({ n }) =>
      n.type === "image" && !n.alt?.trim()
        ? [
            {
              line: lineOf(n),
              message: `이미지 alt 가 없다: ${n.url}`,
              fix: "![그림을 설명하는 글](url) 처럼 대괄호 안에 alt 를 쓴다",
            },
          ]
        : [],
    ),
};
