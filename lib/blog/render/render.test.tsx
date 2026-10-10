/** @jest-environment node */
import { PmdBody } from "./index";

// @types/react-dom 이 최상위에 없어 타입 없이 불러온다.
 
const { renderToStaticMarkup } = require("react-dom/server") as {
  renderToStaticMarkup: (e: unknown) => string;
};

const html = (s: string, meta?: Parameters<typeof PmdBody>[0]["meta"]) =>
  renderToStaticMarkup(<PmdBody source={s} meta={meta} />);

test("허용 블록을 모두 그린다", () => {
  const out = html(
    [
      "## 큰",
      "",
      "### 작은",
      "",
      "한 줄\\",
      "다음 줄 *기울임* `코드` [링크](https://a.com)",
      "",
      "> 인용",
      "",
      "- 가",
      "- 나",
      "",
      "1. 하나",
      "2. 둘",
      "",
      "```ts",
      "const a = 1;",
      "```",
      "",
      '![그림](https://a.com/a.png "캡션")',
      "",
      "![a](https://a.com/1.png) ![b](https://a.com/2.png)",
      "",
      "---",
      "",
      "| a | b |",
      "| - | - |",
      "| 1 | 2 |",
      "",
      "https://example.com/post",
      "",
      "https://youtu.be/dQw4w9WgXcQ",
      "",
    ].join("\n"),
  );
  for (const s of [
    "<h2",
    "<h3",
    "<br/>",
    "<em",
    "<code",
    'href="https://a.com"',
    "<blockquote",
    "<ul",
    "<ol",
    "<pre",
    "<figure",
    "<figcaption",
    "grid-cols-2",
    'role="separator"',
    "<table",
    "https://example.com/post",
    "youtube-nocookie.com/embed/dQw4w9WgXcQ",
    "break-keep",
    "LINESeedKR",
  ]) {
    expect(out).toContain(s);
  }
});

test("remark-cjk-friendly: 굵게 뒤 문장부호", () => {
  expect(html("**굵게**문장입니다.")).toContain("<strong");
  expect(html("이것은**“굵은 말”**입니다.")).toContain("<strong");
});

test("허용 목록 밖 노드는 예외", () => {
  expect(() => html("<div>x</div>")).toThrow(/html/);
  expect(() => html("글[^1]\n\n[^1]: 각주")).toThrow();
  expect(() => html("~~삭제~~")).toThrow(/delete/);
  expect(() => html("# 제목")).toThrow(/heading/);
  expect(() => html("[x](javascript:alert(1))")).toThrow(/URL/);
});

test("이미지 크기와 링크 카드 정보", () => {
  const img = "![a](https://a.com/a.png)";
  expect(
    html(img, {
      imageSizes: { "https://a.com/a.png": { width: 640, height: 480 } },
    }),
  ).toContain('width="640"');
  const url = "https://example.com/p";
  expect(html(url)).not.toContain("font-bold");
  const out = html(url, {
    linkCards: {
      [url]: {
        title: "제목",
        description: "설명",
        image: "https://a.com/i.png",
      },
    },
  });
  expect(out).toContain("제목");
  expect(out).toContain("설명");
  expect(out).toContain("<img");
});
