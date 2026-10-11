/** @jest-environment node */
import sitemap from "./sitemap";

jest.mock("@/lib/blog/queries", () => ({
  listSitemapSources: jest.fn(async () => ({
    articles: [
      { slug: "mine", updated_at: new Date("2026-01-02"), canonical_url: null },
      {
        slug: "own",
        updated_at: new Date("2026-01-03"),
        canonical_url: "https://blog.proofer.tech/own",
      },
      {
        slug: "medium",
        updated_at: new Date("2026-01-04"),
        canonical_url: "https://medium.com/@proofer/medium-abc",
      },
    ],
    tags: [{ slug: "ai" }],
    authors: [{ slug: "proofer" }],
  })),
}));

// .env.local 의 값과 무관하게 같은 결과를 내도록 고정하고 끝나면 되돌린다.
const originalBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
beforeAll(() => {
  process.env.NEXT_PUBLIC_BASE_URL = "https://proofer.tech";
});
afterAll(() => {
  if (originalBaseUrl === undefined) delete process.env.NEXT_PUBLIC_BASE_URL;
  else process.env.NEXT_PUBLIC_BASE_URL = originalBaseUrl;
});

test("Medium canonical 글은 빼고 태그와 저자는 넣는다", async () => {
  const urls = (await sitemap()).map((e) => e.url);
  expect(urls.some((u) => u.endsWith("/medium"))).toBe(false);
  expect(urls.some((u) => u.endsWith("/mine"))).toBe(true);
  expect(urls.some((u) => u.endsWith("/own"))).toBe(true);
  expect(urls.some((u) => u.endsWith("/tag/ai"))).toBe(true);
  expect(urls.some((u) => u.endsWith("/author/proofer"))).toBe(true);
});
