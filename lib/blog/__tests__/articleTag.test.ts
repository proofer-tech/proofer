/** @jest-environment node */
import fs from "fs";
import path from "path";

jest.mock("@/database/engine", () => ({ dz: {} }), { virtual: true });
import { articleTag } from "../queries";

const DOCS = path.join(__dirname, "../__fixtures__/docs-backup");
const slugs = fs
  .readdirSync(DOCS)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const m = fs
      .readFileSync(path.join(DOCS, f), "utf8")
      .match(/^slug: "(.+)"$/m);
    if (!m) throw new Error(`slug 없음: ${f}`);
    return m[1];
  });

test("이전 글 slug 전부가 ASCII 이고 256자 이하인 태그를 낸다", () => {
  expect(slugs.length).toBeGreaterThanOrEqual(49);
  for (const s of slugs) {
    const t = articleTag(s);
    expect(t).toMatch(/^[\x20-\x7e]+$/);
    expect(t.length).toBeLessThanOrEqual(256);
  }
});

test("같은 slug 는 같은 태그, 다른 slug 는 다른 태그다", () => {
  expect(articleTag(slugs[0])).toBe(articleTag(slugs[0]));
  expect(new Set(slugs.map(articleTag)).size).toBe(slugs.length);
});

test("페이지가 디코딩한 slug 로 부르므로 퍼센트 인코딩 주소도 같은 태그다", () => {
  const s = slugs[0];
  expect(articleTag(decodeURIComponent(encodeURIComponent(s)))).toBe(
    articleTag(s),
  );
});
