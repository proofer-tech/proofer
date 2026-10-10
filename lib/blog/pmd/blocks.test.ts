/** @jest-environment node */
import { lint } from "./index";

const FM = `---
title: Claude를 팀의 OS로 쓰고 있습니다
subtitle: AI 를 묻고 답하는 도구에서 팀의 지식과 운영을 받치는 중추로 옮긴 기록
tags: [ai-native]
keywords: [Claude, 팀 지식관리]
---
`;
const INTRO = "Claude 를 쓰는 이야기다.\n\n";
const run = (body: string, id: string, intro = INTRO) =>
  lint(`${FM}\n${intro}${body}\n`).filter((r) => r.ruleId === id);
const bad = (body: string, id: string) => {
  const r = run(body, id);
  expect(r.length).toBeGreaterThan(0);
  expect(r[0].fix).toBeTruthy();
  return r;
};
const ok = (body: string, id: string) => expect(run(body, id)).toEqual([]);

test("기준 문서는 결과가 없다", () =>
  expect(lint(`${FM}\n${INTRO}## 소제목\n\n본문 Claude.\n`)).toEqual([]));

test("PMD001 raw HTML", () => {
  bad("<div>x</div>", "PMD001");
  bad("<!-- 메모 -->", "PMD001");
  ok("## 가\n\n문단", "PMD001");
});

test("PMD002 제목 단계", () => {
  bad("# 큰 제목", "PMD002");
  bad("## 가\n\n### 나\n\n#### 다", "PMD002");
  ok("## 가\n\n### 나", "PMD002");
});

test("PMD003 단계 건너뛰기", () => {
  bad("### 나", "PMD003");
  ok("## 가\n\n### 나\n\n## 다", "PMD003");
});

test("PMD004 alt 없음", () => {
  bad("![](https://a.com/a.png)", "PMD004");
  ok("![설명](https://a.com/a.png)", "PMD004");
});

test("PMD005 이미지 섞임", () => {
  bad("글 ![a](https://a.com/a.png) 글", "PMD005");
  bad(
    "![a](https://a.com/1.png) ![b](https://a.com/2.png) ![c](https://a.com/3.png) ![d](https://a.com/4.png)",
    "PMD005",
  );
  ok("![a](https://a.com/1.png)", "PMD005");
  ok("![a](https://a.com/1.png) ![b](https://a.com/2.png)", "PMD005");
  ok('![a](https://a.com/1.png "캡션")', "PMD005");
});

test("PMD006 코드 펜스 언어", () => {
  bad("```\nx\n```", "PMD006");
  ok("```ts\nx\n```", "PMD006");
});

test("PMD007 중첩", () => {
  bad("- a\n  - b", "PMD007");
  bad("> a\n>\n> > b", "PMD007");
  bad("> ## 제목", "PMD007");
  bad("> - 항목", "PMD007");
  bad("> ![a](https://a.com/a.png)", "PMD007");
  ok("- a\n- b\n\n> 인용", "PMD007");
});

test("PMD008 링크와 이미지 프로토콜", () => {
  bad("[a](http://a.com)", "PMD008");
  bad("[a](/path)", "PMD008");
  bad("![a](blob/abc)", "PMD008");
  bad("![a](http://a.com/a.png)", "PMD008");
  ok("[a](https://a.com) [b](mailto:a@b.com)", "PMD008");
});

test("PMD009 줄바꿈", () => {
  bad("가  \n나", "PMD009");
  bad("가<br>나", "PMD009");
  expect(run("가<br>나", "PMD001")).toEqual([]);
  ok("가\\\n나", "PMD009");
});

test("금지 블록: 각주, 체크리스트, 취소선", () => {
  bad("가[^1]\n\n[^1]: 각주", "PMD000");
  bad("- [ ] 할 일", "PMD000");
  bad("~~지움~~", "PMD000");
  ok("- 항목\n\n**굵게**", "PMD000");
});

test("PMD012 링크 카드 모양", () => {
  bad("보세요 https://a.com/x", "PMD012");
  ok("https://a.com/x", "PMD012");
  ok("https://www.youtube.com/watch?v=abc", "PMD012");
  ok("글 [링크](https://a.com/x) 글", "PMD012");
});

test("PMD014 도입 문단 (경고)", () => {
  const r = lint(`${FM}\n## 가\n\n본문 Claude\n`).filter(
    (x) => x.ruleId === "PMD014",
  );
  expect(r).toHaveLength(1);
  expect(r[0].severity).toBe("warning");
  expect(run("## 가", "PMD014")).toEqual([]);
});

test("PMD016 표", () => {
  bad("| | |\n|---|---|\n| a | b |", "PMD016");
  bad(
    "| 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|\n| a | b | c | d | e | f |",
    "PMD016",
  );
  bad("| 가 | 나 |\n|---|---|\n| ![a](https://a.com/a.png) | b |", "PMD016");
  ok("| 가 | 나 |\n|---|---|\n| **a** | `b` |", "PMD016");
});

test("PMD019 주 검색어 (경고)", () => {
  const r = lint(`${FM}\n첫 문단이다.\n\n## 소제목\n`).filter(
    (x) => x.ruleId === "PMD019",
  );
  expect(r).toHaveLength(1);
  expect(r[0].severity).toBe("warning");
  ok("## 소제목", "PMD019");
  expect(
    lint(`${FM}\n첫 문단이다.\n\n## 클로드 Claude\n`).filter(
      (x) => x.ruleId === "PMD019",
    ),
  ).toEqual([]);
});

test("PMD019: 이미지만 있는 문단은 첫 문단으로 세지 않는다", () => {
  const md = `${FM}\n![a](https://a.com/a.png)\n\nClaude 이야기다.\n`;
  expect(lint(md).filter((x) => x.ruleId === "PMD019")).toEqual([]);
});
