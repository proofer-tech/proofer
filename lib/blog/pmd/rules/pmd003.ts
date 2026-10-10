import { lineOf } from "../walk";
import type { Rule } from "../types";

export const pmd003: Rule = {
  id: "PMD003",
  severity: "error",
  check: (doc) => {
    let last = 1; // 제목 단계. ## 은 바로 올 수 있고 ### 은 ## 뒤에만 온다
    const out: ReturnType<Rule["check"]> = [];
    for (const n of doc.tree.children) {
      if (n.type !== "heading" || n.depth < 2 || n.depth > 3) continue;
      if (n.depth > last + 1)
        out.push({
          line: lineOf(n),
          message: "제목 단계를 건너뛰었다: ## 없이 ### 이 나왔다",
          fix: "### 을 ## 으로 바꾸거나 앞에 ## 제목을 둔다",
        });
      last = n.depth;
    }
    return out;
  },
};
