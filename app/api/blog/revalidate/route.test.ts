/** @jest-environment node */
import { revalidateTag } from "next/cache";
import { POST } from "./route";

jest.mock("next/cache", () => ({ revalidateTag: jest.fn() }));
jest.mock("@/lib/blog/queries", () => ({
  BLOG_TAG: "blog",
  articleTag: (s: string) => `blog:article:${s}`,
}));

const call = (auth?: string, body: object = { slug: "a" }) =>
  POST(
    new Request("http://x/api/blog/revalidate", {
      method: "POST",
      headers: auth ? { authorization: auth } : {},
      body: JSON.stringify(body),
    }) as never,
  );

beforeEach(() => {
  process.env.BLOG_REVALIDATE_SECRET = "s3cret";
  jest.mocked(revalidateTag).mockClear();
});

test.each([[undefined], ["Bearer wrong"], ["Bearer s3cret1"]])(
  "비밀값이 틀리면 401 이고 revalidate 하지 않는다 (%s)",
  async (auth) => {
    expect((await call(auth)).status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  },
);

test("서버에 비밀값이 없으면 빈 Bearer 도 401 이다", async () => {
  delete process.env.BLOG_REVALIDATE_SECRET;
  expect((await call("Bearer ")).status).toBe(401);
});

test("맞으면 글 태그와 목록 태그를 revalidate 한다", async () => {
  expect((await call("Bearer s3cret")).status).toBe(200);
  expect(jest.mocked(revalidateTag).mock.calls.map((c) => c[0])).toEqual([
    "blog:article:a",
    "blog",
  ]);
});
