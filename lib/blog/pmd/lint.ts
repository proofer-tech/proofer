import { parse } from "./parse";
import { RULES } from "./rules";
import type { LintResult } from "./types";

export function lint(source: string): LintResult[] {
  const doc = parse(source);
  return RULES.flatMap((r) =>
    r.check(doc).map((x) => ({ ...x, ruleId: r.id, severity: r.severity })),
  ).sort((a, b) => a.line - b.line || a.ruleId.localeCompare(b.ruleId));
}
