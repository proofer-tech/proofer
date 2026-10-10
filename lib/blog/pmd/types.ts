import type { Root } from "mdast";

export type Severity = "error" | "warning";

/** 검증 결과 한 건. fix 는 LLM 이 그대로 따라 고칠 수 있는 한 줄이다. */
export type LintResult = {
  line: number;
  ruleId: string;
  severity: Severity;
  message: string;
  fix: string;
};

export type ParsedPmd = {
  /** frontmatter 를 yaml 로 읽은 원본 값. 없거나 읽지 못하면 undefined. */
  frontmatter: unknown;
  /** frontmatter yaml 이 시작되는 줄(펜스 다음 줄). 없으면 1. */
  frontmatterLine: number;
  /** frontmatter yaml 구문 오류 메시지. */
  frontmatterError?: string;
  tree: Root;
  source: string;
};

export type Rule = {
  id: string;
  severity: Severity;
  check: (doc: ParsedPmd) => Omit<LintResult, "ruleId" | "severity">[];
};
