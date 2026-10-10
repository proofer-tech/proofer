import { lineOf, nodes, walk } from "../walk";
import type { Rule } from "../types";

const fix = "중첩을 풀어 한 단계로 쓴다";

export const pmd007: Rule = {
  id: "PMD007",
  severity: "error",
  check: (doc) => {
    const out: ReturnType<Rule["check"]> = [];
    for (const { n, anc } of nodes(doc.tree)) {
      if (n.type === "list" && anc.some((a) => a.type === "list"))
        out.push({ line: lineOf(n), message: "목록이 중첩되어 있다", fix });
      if (n.type !== "blockquote") continue;
      if (anc.some((a) => a.type === "blockquote"))
        out.push({ line: lineOf(n), message: "인용이 중첩되어 있다", fix });
      walk(n, (c) => {
        const kind =
          c.type === "heading"
            ? "제목"
            : c.type === "list"
              ? "목록"
              : c.type === "image"
                ? "이미지"
                : "";
        if (kind)
          out.push({
            line: lineOf(c),
            message: `인용 안에 ${kind}이 있다`,
            fix: `인용 밖으로 ${kind}을 꺼내거나 인용 안에는 문단만 둔다`,
          });
      });
    }
    return out;
  },
};
