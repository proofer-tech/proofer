/** @jest-environment node */
import { articleMetadata, jsonLdString, type SeoArticle } from "./seo";

const base: SeoArticle = {
  slug: "hello",
  title: "안녕",
  subtitle: "부제",
  published_at: "2026-10-01T00:00:00Z",
  reading_minutes: 3,
  keywords: ["프루퍼"],
  author: { slug: "hsol", display_name: "hsol" },
  tags: [{ slug: "ai", name: "AI" }],
};

test("canonical 이 비면 자기 URL 이고 title 은 제목 | 프루퍼 블로그 다", () => {
  const m = articleMetadata(base);
  expect(m.alternates?.canonical).toBe("https://blog.proofer.tech/hello");
  expect(m.title).toEqual({ absolute: "안녕 | 프루퍼 블로그" });
  expect(m.robots).toMatchObject({
    index: true,
    follow: true,
    "max-image-preview": "large",
  });
  expect(JSON.stringify(m.openGraph?.images)).toContain("/og?title=");
});

test("Medium canonical 은 그대로 낸다", () => {
  const m = articleMetadata({
    ...base,
    canonical_url: "https://medium.com/@h/x",
  });
  expect(m.alternates?.canonical).toBe("https://medium.com/@h/x");
});

test("unlisted 는 noindex 다", () => {
  expect(articleMetadata({ ...base, status: "unlisted" }).robots).toMatchObject(
    { index: false },
  );
});

test("JSON-LD 는 BlogPosting 과 BreadcrumbList 를 내고 < 를 이스케이프한다", () => {
  const s = jsonLdString({ ...base, title: "</script>" });
  expect(s).not.toContain("</script>");
  const [post, crumbs] = JSON.parse(s);
  expect(post["@type"]).toBe("BlogPosting");
  expect(post.author["@id"]).toBe("https://blog.proofer.tech/author/hsol");
  expect(crumbs.itemListElement).toHaveLength(3);
});
