import { lineOf, nodes } from "../walk";
import type { Rule } from "../types";

export const pmd006: Rule = {
  id: "PMD006",
  severity: "error",
  check: (doc) =>
    nodes(doc.tree).flatMap(({ n }) =>
      n.type === "code" && !n.lang
        ? [
            {
              line: lineOf(n),
              message: "코드 펜스에 언어가 없다",
              fix: "여는 펜스 뒤에 언어를 적는다(예: ```ts, ```bash, 일반 글이면 ```text)",
            },
          ]
        : [],
    ),
};
