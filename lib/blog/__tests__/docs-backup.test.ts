/** @jest-environment node */
import fs from "fs";
import path from "path";
import { docsToPmd } from "../convert/docsToPmd";
import { mediumImageResolver } from "../convert/mediumImages";
import { lint } from "../pmd";

const DOCS = path.join(__dirname, "../__fixtures__/docs-backup");
const files = fs.readdirSync(DOCS).filter((f) => f.endsWith(".md"));
const results = files.map((f) => {
  const id = f.replace(".md", "");
  const pmd = docsToPmd(
    fs.readFileSync(path.join(DOCS, f), "utf8"),
    mediumImageResolver(id),
  );
  return { id, found: lint(pmd) };
});

test("docs-백업 49건은 convert -> lint 에서 오류가 0건이다", () => {
  expect(files).toHaveLength(49);
  const errors = results.flatMap((r) =>
    r.found
      .filter((x) => x.severity === "error")
      .map((x) => `${r.id}:${x.line} ${x.ruleId} ${x.message}`),
  );
  expect(errors).toEqual([]);
});

// 경고 목록 갱신: WRITE_WARNINGS=1 npx jest lib/blog/__tests__
test("경고 목록 docs/blog/docs-backup-warnings.md 가 최신이다", () => {
  const rows = results.flatMap((r) =>
    r.found
      .filter((x) => x.severity === "warning")
      .map(
        (x) =>
          `| ${r.id} | ${x.line} | ${x.ruleId} | ${x.message.replace(/\|/g, "\\|")} |`,
      ),
  );
  const md = `# docs-백업 49건 검증 경고 목록

변환기와 검증기를 거친 뒤 남은 경고다(오류는 0건). 경고는 발행을 막지 않는다. 총 ${rows.length}건.

| 글 id | 줄 | 규칙 | 메시지 |
| --- | --- | --- | --- |
${rows.join("\n")}
`;
  const out = path.join(
    __dirname,
    "../../../docs/blog/docs-backup-warnings.md",
  );
  if (process.env.WRITE_WARNINGS) fs.writeFileSync(out, md);
  expect(fs.readFileSync(out, "utf8")).toBe(md);
});
