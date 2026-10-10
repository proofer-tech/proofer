/** @jest-environment node */
import PostView from "./PostView";

const { renderToStaticMarkup } = require("react-dom/server") as {
  renderToStaticMarkup: (e: unknown) => string;
};

test("글 화면 일곱 요소와 Medium 출처", () => {
  const out = renderToStaticMarkup(
    <PostView
      frontmatter={{
        title: "제목입니다",
        subtitle: "부제입니다",
        cover: { src: "https://miro.medium.com/a.png", alt: "표지" },
        published_at: "2026-10-11T00:00:00Z",
        reading_minutes: 3,
        source: "medium_publication",
        medium_url: "https://medium.com/p/1",
      }}
      body_md={"## 소제목\n\n본문 **굵게**"}
      author={{ slug: "proofer", display_name: "프루퍼", bio: "소개" }}
      tags={[{ slug: "with-cto", name: "with CTO" }]}
      related={[
        {
          slug: "x",
          title: "관련 글",
          subtitle: "",
          published_at: "2026-10-01",
        },
      ]}
    />,
  );
  for (const s of [
    "제목입니다",
    "부제입니다",
    "/author/proofer",
    "3분",
    "표지",
    "<h2",
    "<strong",
    "/tag/with-cto",
    "소개",
    "Medium 에서 처음 발행",
    "관련 글",
  ]) {
    expect(out).toContain(s);
  }
});
