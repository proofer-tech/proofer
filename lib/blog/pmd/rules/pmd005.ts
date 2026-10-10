import { lineOf, nodes } from "../walk";
import type { Rule } from "../types";

export const pmd005: Rule = {
  id: "PMD005",
  severity: "error",
  check: (doc) =>
    nodes(doc.tree).flatMap(({ n }) => {
      if (n.type !== "paragraph") return [];
      const imgs = n.children.filter((c) => c.type === "image").length;
      if (!imgs) return [];
      const rest = n.children.some(
        (c) =>
          c.type !== "image" &&
          c.type !== "break" &&
          !(c.type === "text" && !c.value.trim()),
      );
      if (!rest && imgs <= 3) return [];
      return [
        {
          line: lineOf(n),
          message: rest
            ? "이미지가 글과 한 문단에 섞여 있다"
            : `이미지 묶음에 이미지가 ${imgs}장이다(최대 3장)`,
          fix: rest
            ? "이미지를 글에서 떼어 빈 줄로 구분한 혼자 문단으로 둔다"
            : "이미지를 3장씩 문단으로 나눈다",
        },
      ];
    }),
};
