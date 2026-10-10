import { fmStrings, keyLine } from "../frontmatter";
import { TAG_DICTIONARY } from "../tags";
import type { Rule } from "../types";

export const pmd011: Rule = {
  id: "PMD011",
  severity: "error",
  check: (doc) => {
    const bad = (fmStrings(doc.frontmatter, "tags") ?? []).filter(
      (t) => !(TAG_DICTIONARY as readonly string[]).includes(t),
    );
    return bad.map((t) => ({
      line: keyLine(doc.source, doc.frontmatterLine, "tags"),
      message: `태그 사전에 없는 태그: ${t}`,
      fix: `tags 에서 ${t} 를 빼고 사전의 태그(${TAG_DICTIONARY.join(", ")}) 중에서 고른다`,
    }));
  },
};
