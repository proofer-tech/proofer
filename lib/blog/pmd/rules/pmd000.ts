import { ALLOWED_BLOCKS } from "../blocks";
import { lineOf, nodes } from "../walk";
import type { Rule } from "../types";

const KIND: Record<string, string> = {
  footnoteReference: "각주",
  footnoteDefinition: "각주",
  delete: "취소선",
  definition: "참조 링크 정의",
  linkReference: "참조 링크",
  imageReference: "참조 이미지",
};
const OK = new Set<string>([...ALLOWED_BLOCKS, "html"]); // html 은 PMD001 이 맡는다

// 전용 id 가 없는 금지 블록(각주, 체크리스트, 취소선 등)을 한 규칙으로 막는다. PMD000 은 이 용도로 쓴다.
export const pmd000: Rule = {
  id: "PMD000",
  severity: "error",
  check: (doc) =>
    nodes(doc.tree).flatMap(({ n }) => {
      const checklist = n.type === "listItem" && typeof n.checked === "boolean";
      if (OK.has(n.type) && !checklist) return [];
      const kind = checklist ? "체크리스트" : (KIND[n.type] ?? n.type);
      return [
        {
          line: lineOf(n),
          message: `허용하지 않는 블록이다: ${kind}`,
          fix: `${kind} 표기를 지우고 일반 문단, 목록, [글](https://...) 링크로 바꿔 쓴다`,
        },
      ];
    }),
};
