import { lineOf, nodes, textOf } from "../walk";
import type { Rule } from "../types";

// 모양만 본다. 카드 정보 받기 실패는 publish 단계(7e1f4401)가 같은 id 로 낸다.
// 맨 URL(자동 링크)이 글과 한 문단에 섞여 있으면 링크 카드 줄이 아니다.
export const pmd012: Rule = {
  id: "PMD012",
  severity: "error",
  check: (doc) =>
    nodes(doc.tree).flatMap(({ n }) => {
      if (n.type !== "paragraph") return [];
      const bare = n.children.filter(
        (c) =>
          c.type === "link" &&
          textOf(c) === c.url &&
          doc.source[c.position!.start.offset!] !== "[",
      );
      const other = n.children.some(
        (c) => !bare.includes(c) && !(c.type === "text" && !c.value.trim()),
      );
      return bare.length && other
        ? [
            {
              line: lineOf(n),
              message: "링크 카드 줄에 URL 외 글자가 있다",
              fix: "URL 만 한 줄에 혼자 두거나, 글 속 링크라면 [글](https://...) 로 쓴다",
            },
          ]
        : [];
    }),
};
