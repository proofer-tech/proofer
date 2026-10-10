import { ALLOWED_HEADING_DEPTHS } from "../blocks";
import { lineOf } from "../walk";
import type { Rule } from "../types";

export const pmd002: Rule = {
  id: "PMD002",
  severity: "error",
  check: (doc) =>
    doc.tree.children.flatMap((n) =>
      n.type === "heading" &&
      !(ALLOWED_HEADING_DEPTHS as readonly number[]).includes(n.depth)
        ? [
            {
              line: lineOf(n),
              message: `허용하지 않는 제목 단계다: ${"#".repeat(n.depth)}`,
              fix:
                n.depth === 1
                  ? "본문의 # 제목을 지운다. 글 제목은 title 칸이다. 소제목이면 ## 으로 바꾼다"
                  : "#### 이하는 쓰지 않는다. ### 으로 올리거나 굵은 문단으로 바꾼다",
            },
          ]
        : [],
    ),
};
