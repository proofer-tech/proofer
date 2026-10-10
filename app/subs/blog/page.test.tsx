/** @jest-environment node */
import BlogHome from "./page";

jest.mock("@/lib/blog/queries", () => ({
  listArticles: jest.fn(async () => ({ items: [], total: 0, pages: 1 })),
  listTags: jest.fn(async () => []),
}));
const { renderToStaticMarkup } = require("react-dom/server") as {
  renderToStaticMarkup: (e: unknown) => string;
};

test("글이 없으면 빈 상태 문구를 낸다", async () => {
  const el = await BlogHome({ searchParams: Promise.resolve({}) });
  expect(renderToStaticMarkup(el)).toContain("아직 올라온 글이 없습니다");
});
