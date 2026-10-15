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
        canonical_url: "https://medium.com/p/1",
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

test("canonical 이 블로그 자신인 회사 글에는 Medium 링크가 없다", () => {
  const out = renderToStaticMarkup(
    <PostView
      frontmatter={{
        title: "제목입니다",
        published_at: "2026-10-11T00:00:00Z",
        source: "medium_publication",
        medium_url: "https://medium.com/p/1",
        canonical_url: "https://proofer.tech/blog/x",
      }}
      body_md="본문"
      tags={[]}
    />,
  );
  expect(out).not.toContain("Medium 에서 처음 발행");
});

test("shareUrl 이 있을 때만 공유 줄을 그린다(미리보기는 넘기지 않는다)", () => {
  const props = {
    frontmatter: { title: "t", published_at: "2026-10-01" },
    body_md: "본문",
    tags: [],
  };
  expect(renderToStaticMarkup(<PostView {...props} />)).not.toContain(
    "이 글 공유하기",
  );
  const out = renderToStaticMarkup(
    <PostView {...props} shareUrl="https://blog.proofer.tech/x" />,
  );
  expect(out).toContain("이 글 공유하기");
  expect(out).not.toContain("공유하기</");
});
