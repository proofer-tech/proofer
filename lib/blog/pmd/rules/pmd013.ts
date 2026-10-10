import { fmString, keyLine } from "../frontmatter";
import type { Rule } from "../types";

export const pmd013: Rule = {
  id: "PMD013",
  severity: "warning",
  check: (doc) => {
    const title = fmString(doc.frontmatter, "title");
    if (!title || [...title].length <= 60) return [];
    return [
      {
        line: keyLine(doc.source, doc.frontmatterLine, "title"),
        message: `제목이 ${[...title].length}자다(60자 초과). 검색 결과에서 잘린다`,
        fix: "title 을 60자 이내로 줄인다",
      },
    ];
  },
};
