import { lineOf, nodes, textOf } from "../walk";
import type { Rule } from "../types";

export const pmd016: Rule = {
  id: "PMD016",
  severity: "error",
  check: (doc) =>
    nodes(doc.tree).flatMap(({ n }) => {
      if (n.type !== "table") return [];
      const head = n.children[0]?.children ?? [];
      const out: ReturnType<Rule["check"]> = [];
      if (!head.some((c) => textOf(c).trim()))
        out.push({
          line: lineOf(n),
          message: "표에 머리 행이 없다(첫 행이 비어 있다)",
          fix: "첫 행에 열 이름을 쓴다",
        });
      if (head.length > 5)
        out.push({
          line: lineOf(n),
          message: `표의 열이 ${head.length}개다(최대 5개)`,
          fix: "열을 5개 이하로 줄이거나 표를 나눈다",
        });
      for (const { n: c } of nodes(n))
        if (c.type === "image" || c.type === "break")
          out.push({
            line: lineOf(c),
            message: "표 셀 안에 블록이 있다(이미지, 줄바꿈)",
            fix: "셀에는 글, 굵게, 기울임, 코드, 링크만 쓴다. 이미지는 표 밖으로 뺀다",
          });
      return out;
    }),
};
