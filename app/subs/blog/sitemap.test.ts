/** @jest-environment node */
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
// withSubs 는 src/path.ts 를 불러올 때 한 번 정해지므로 sitemap 은 값을 고정한 뒤에 불러온다.
const keys = ["NEXT_PUBLIC_BASE_URL", "NEXT_PUBLIC_WITH_SUBS"] as const;
const original = Object.fromEntries(keys.map((k) => [k, process.env[k]]));
let sitemap: typeof import("./sitemap").default;
beforeAll(async () => {
  process.env.NEXT_PUBLIC_BASE_URL = "https://proofer.tech";
  process.env.NEXT_PUBLIC_WITH_SUBS = "0";
  sitemap = (await import("./sitemap")).default;
});
afterAll(() => {
  for (const k of keys) {
    if (original[k] === undefined) delete process.env[k];
    else process.env[k] = original[k];
  }
});

test("Medium canonical 글은 빼고 태그와 저자는 넣는다", async () => {
  const urls = (await sitemap()).map((e) => e.url);
  expect(urls.some((u) => u.endsWith("/medium"))).toBe(false);
  expect(urls.some((u) => u.endsWith("/mine"))).toBe(true);
  expect(urls.some((u) => u.endsWith("/own"))).toBe(true);
  expect(urls.some((u) => u.endsWith("/tag/ai"))).toBe(true);
  expect(urls.some((u) => u.endsWith("/author/proofer"))).toBe(true);
});
