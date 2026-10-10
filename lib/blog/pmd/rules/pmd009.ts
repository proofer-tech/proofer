import { lineOf, nodes } from "../walk";
import type { Rule } from "../types";

export const isBr = (html: string) => /^<br\s*\/?>$/i.test(html.trim());

export const pmd009: Rule = {
  id: "PMD009",
  severity: "error",
  check: (doc) =>
    nodes(doc.tree).flatMap(({ n }) => {
      const bad =
        (n.type === "break" &&
          doc.source[n.position!.start.offset!] !== "\\") ||
        (n.type === "html" && isBr(n.value));
      return bad
        ? [
            {
              line: lineOf(n),
              message: "역슬래시가 아닌 줄바꿈이다(끝 공백 두 칸 또는 br)",
              fix: "줄 끝의 공백이나 <br> 를 지우고 역슬래시 \\ 를 붙인다. 문단을 나눌 거면 빈 줄을 둔다",
            },
          ]
        : [];
    }),
};
