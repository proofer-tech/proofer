import { ALLOWED_LINK_PROTOCOLS } from "../blocks";
import { lineOf, nodes } from "../walk";
import type { Rule } from "../types";

const protocol = (url: string) =>
  /^([a-z][a-z0-9+.-]*:)/i.exec(url)?.[1]?.toLowerCase();

export const pmd008: Rule = {
  id: "PMD008",
  severity: "error",
  check: (doc) =>
    nodes(doc.tree).flatMap(({ n }) => {
      if (n.type === "link") {
        const p = protocol(n.url);
        if (
          (ALLOWED_LINK_PROTOCOLS as readonly (string | undefined)[]).includes(
            p,
          )
        )
          return [];
        return [
          {
            line: lineOf(n),
            message: `https, mailto 가 아닌 링크다: ${n.url}`,
            fix: "https:// 로 시작하는 주소로 바꾸고, 상대경로나 앵커 링크는 풀어 쓴다",
          },
        ];
      }
      if (n.type === "image" && protocol(n.url) !== "https:")
        return [
          {
            line: lineOf(n),
            message: `https 가 아닌 이미지다: ${n.url}`,
            fix: "이미지를 https:// 주소로 올려 그 주소를 쓴다",
          },
        ];
      return [];
    }),
};
