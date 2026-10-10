/** @jest-environment node */
import { lint, parse } from "./index";

const FM = {
  title: "Claude를 팀의 OS로 쓰고 있습니다",
  subtitle:
    "AI 를 묻고 답하는 도구에서 팀의 지식과 운영을 받치는 중추로 옮긴 기록",
  tags: "[ai-native, 엔지니어링-매니지먼트]",
  keywords: "[Claude, 팀 지식관리 AI]",
};
const doc = (o: Record<string, string | undefined> = {}) => {
  const f = { ...FM, ...o };
  const body = Object.entries(f)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `---\n${body}\n---\n\n본문입니다.\n`;
};
const ids = (md: string) => lint(md).map((r) => r.ruleId);

test("parse: frontmatter 와 tree", () => {
  const p = parse(doc());
  expect((p.frontmatter as { title: string }).title).toBe(FM.title);
  expect(p.tree.children.some((n) => n.type === "paragraph")).toBe(true);
});

test("통과 문서는 결과가 없다", () => expect(lint(doc())).toEqual([]));

test("PMD010: 부제 길이, 태그 수, frontmatter 없음, yaml 오류", () => {
  expect(ids(doc({ subtitle: "짧다" }))).toContain("PMD010");
  expect(ids(doc({ tags: "[]" }))).toContain("PMD010");
  expect(
    ids(doc({ tags: "[ai-native, 행사-후기, with-cto, 파트너십]" })),
  ).toContain("PMD010");
  expect(ids(doc({ author: "nobody" }))).toContain("PMD010");
  expect(ids(doc({ author: "hsol", medium_id: "ea75c90a29d1" }))).toEqual([]);
  expect(ids(doc({ weird: "1" }))).toContain("PMD010");
  expect(ids("본문만 있다\n")).toContain("PMD010");
  expect(ids("---\ntitle: [\n---\n")).toContain("PMD010");
});

test("PMD011: 사전 밖 태그", () => {
  const r = lint(doc({ tags: "[ai-native, 없는태그]" })).filter(
    (x) => x.ruleId === "PMD011",
  );
  expect(r).toHaveLength(1);
  expect(r[0]).toMatchObject({ severity: "error", line: 4 });
});

test("PMD013: 제목 60자 초과는 경고", () => {
  const r = lint(doc({ title: "가".repeat(61), keywords: "[가]" })).filter(
    (x) => x.ruleId === "PMD013",
  );
  expect(r).toHaveLength(1);
  expect(r[0].severity).toBe("warning");
  expect(ids(doc({ title: "가".repeat(60), keywords: "[가]" }))).not.toContain(
    "PMD013",
  );
});

test("PMD017: keywords 1 ~ 6개", () => {
  expect(ids(doc({ keywords: "[]" }))).toContain("PMD017");
  expect(ids(doc({ keywords: undefined }))).toContain("PMD017");
  expect(ids(doc({ keywords: "[a, b, c, d, e, f, g]" }))).toContain("PMD017");
  expect(ids(doc({ keywords: "[Claude, a, b, c, d, e]" }))).not.toContain(
    "PMD017",
  );
});

test("PMD018: 주 검색어가 제목, 부제에 없으면 경고", () => {
  const r = lint(doc({ keywords: "[전혀 다른 말]" })).filter(
    (x) => x.ruleId === "PMD018",
  );
  expect(r).toHaveLength(1);
  expect(r[0].severity).toBe("warning");
  expect(ids(doc({ keywords: "[팀의 os]" }))).not.toContain("PMD018");
});
