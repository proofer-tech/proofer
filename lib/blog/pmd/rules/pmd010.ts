import { frontmatterSchema, keyLine } from "../frontmatter";
import type { Rule } from "../types";

export const pmd010: Rule = {
  id: "PMD010",
  severity: "error",
  check: (doc) => {
    const at = doc.frontmatterLine;
    if (doc.frontmatterError) {
      return [
        {
          line: at,
          message: `frontmatter yaml 을 읽지 못했다: ${doc.frontmatterError}`,
          fix: "yaml 문법을 고친다",
        },
      ];
    }
    if (doc.frontmatter === undefined) {
      return [
        {
          line: 1,
          message: "frontmatter 가 없다",
          fix: "문서 맨 위에 --- 로 감싼 frontmatter 를 둔다",
        },
      ];
    }
    const r = frontmatterSchema.safeParse(doc.frontmatter);
    if (r.success) return [];
    return r.error.issues.map((i) => {
      const key = String(i.path[0] ?? "");
      return {
        line: key ? keyLine(doc.source, at, key) : at,
        message: `frontmatter ${i.path.join(".") || "(최상위)"}: ${i.message}`,
        fix: `${i.path.join(".") || "frontmatter"} 값을 스키마에 맞게 고친다`,
      };
    });
  },
};
