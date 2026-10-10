/** @jest-environment node */
import type { PublishDeps } from "./assets";
import {
  publish,
  type AssetInsert,
  type AssetRow,
  type ArticleRow,
  type ArticleValues,
  type BlogDb,
} from "./publish";

const GOOD = `---
title: "제목"
subtitle: "부제는 마흔 자 이상이어야 하므로 이렇게 충분히 길게 적어 둔다. 검색어 프루퍼 포함."
slug: "good-post"
author: proofer
tags: ["with-cto"]
keywords: ["프루퍼"]
medium_post_id: "abc123"
medium_url: "https://medium.com/x/abc123"
canonical_url: "https://medium.com/x/abc123"
---

프루퍼 도입 문단이다.

## 소제목

본문이다.
`;

// 1x1 PNG
const PNG = Uint8Array.from(
  Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "base64",
  ),
);
function deps(over: Partial<PublishDeps> = {}) {
  const log: string[] = [];
  const d: PublishDeps = {
    readImage: async (u) => (
      log.push(`read:${u}`),
      { bytes: PNG, contentType: "image/png" }
    ),
    putBlob: async (n) => (
      log.push(`put:${n}`),
      `https://x.public.blob.vercel-storage.com/${n}`
    ),
    fetchHtml: async (u) => (
      log.push(`fetch:${u}`),
      '<title>t</title><meta property="og:title" content="카드 제목"><meta property="og:description" content="설명"><meta property="og:image" content="/i.png">'
    ),
    ...over,
  };
  return Object.assign(d, { log });
}

function fake(existing?: ArticleRow, assets: Record<string, AssetRow> = {}) {
  const calls: string[] = [];
  const inserted: ArticleValues[] = [];
  const db: BlogDb = {
    transaction: (fn) =>
      fn({
        findArticle: async () => existing,
        findAuthor: async () => ({ id: 7, display_name: "프루퍼" }),
        findAsset: async (u) => assets[u],
        insertAsset: async (a: AssetInsert) =>
          void calls.push(
            `asset:${a.original_url}:${a.url}:${a.width}x${a.height}:${a.alt}:${a.caption}`,
          ),
        insertArticle: async (v: ArticleValues) => (
          inserted.push(v),
          calls.push(`insert:${v.medium_post_id}:${v.source}:${v.author_id}`),
          1
        ),
        updateArticle: async (id) => void calls.push(`update:${id}`),
        insertRevision: async (id, body, hash) =>
          void calls.push(`revision:${id}:${body}:${hash}`),
        setTags: async (id, t) => void calls.push(`tags:${id}:${t}`),
      }),
  };
  return { db, calls, inserted };
}

test("신규 삽입: article 과 태그를 쓴다", async () => {
  const { db, calls } = fake();
  const plan = await publish(db, GOOD, { write: true }, deps());
  expect(plan).toEqual({
    action: "insert",
    slug: "good-post",
    revision: false,
    uploads: 0,
    cards: 0,
  });
  expect(calls).toEqual([
    "insert:abc123:medium_publication:7",
    "tags:1:with-cto",
  ]);
});

test("덮어쓰기: 직전 본문을 revision 으로 남기고 갱신한다", async () => {
  const { db, calls } = fake({
    id: 3,
    body_md: "옛 본문",
    content_hash: "old",
  });
  const plan = await publish(db, GOOD, { write: true }, deps());
  expect(plan.action).toBe("update");
  expect(calls).toEqual([
    "revision:3:옛 본문:old",
    "update:3",
    "tags:3:with-cto",
  ]);
});

test("같은 해시면 아무것도 쓰지 않는다", async () => {
  const first = fake();
  await publish(first.db, GOOD, { write: true }, deps());
  const hash = (await import("./publish")).hashOf(GOOD);
  const { db, calls } = fake({ id: 3, body_md: "x", content_hash: hash });
  expect((await publish(db, GOOD, { write: true }, deps())).action).toBe(
    "unchanged",
  );
  expect(calls).toEqual([]);
});

test("검증 오류가 있으면 DB 를 열지 않는다", async () => {
  let opened = false;
  const db: BlogDb = {
    transaction: async () => ((opened = true), undefined as never),
  };
  const plan = await publish(
    db,
    GOOD.replace('"with-cto"', '"없는태그"'),
    { write: true },
    deps(),
  );
  expect(plan.action).toBe("invalid");
  expect(opened).toBe(false);
});

test("dry-run 은 계획만 돌려주고 쓰지 않는다", async () => {
  const { db, calls } = fake({ id: 3, body_md: "옛", content_hash: "old" });
  expect(await publish(db, GOOD, { write: false }, deps())).toEqual({
    action: "update",
    slug: "good-post",
    revision: true,
    uploads: 0,
    cards: 0,
  });
  expect(calls).toEqual([]);
});

const WITH_MEDIA = GOOD.replace(
  "본문이다.",
  '![그림](https://ex.com/a.png "캡션")\n\nhttps://ex.com/page\n\n본문이다.',
);

test("이미지를 올려 주소를 바꾸고 asset 에 크기와 alt 를 남긴다", async () => {
  const { db, calls, inserted } = fake();
  const d = deps();
  await publish(db, WITH_MEDIA, { write: true }, d);
  const blob = "https://x.public.blob.vercel-storage.com/blog/good-post/a.png";
  expect(inserted[0].body_md).toContain(`![그림](${blob} "캡션")`);
  expect(calls).toContain(`asset:https://ex.com/a.png:${blob}:1x1:그림:캡션`);
});

test("original_url 로 이미 올린 이미지는 다시 올리지 않는다", async () => {
  const known = {
    url: "https://x.public.blob.vercel-storage.com/old.png",
    width: 1,
    height: 1,
  };
  const { db, calls, inserted } = fake(undefined, {
    "https://ex.com/a.png": known,
  });
  const d = deps();
  await publish(db, WITH_MEDIA, { write: true }, d);
  expect(d.log.some((l) => l.startsWith("put:"))).toBe(false);
  expect(inserted[0].body_md).toContain(known.url);
  expect(calls.some((c) => c.startsWith("asset:"))).toBe(false);
});

test("링크 카드 정보를 받아 저장한다", async () => {
  const { db, inserted } = fake();
  await publish(db, WITH_MEDIA, { write: true }, deps());
  expect(inserted[0].link_cards).toEqual({
    "https://ex.com/page": {
      title: "카드 제목",
      description: "설명",
      image: "https://ex.com/i.png",
    },
  });
});

test("링크 카드 받기가 실패하면 PMD012 로 막고 아무것도 쓰지 않는다", async () => {
  const { db, calls } = fake();
  const d = deps({
    fetchHtml: async () => {
      throw new Error("404");
    },
  });
  const plan = await publish(db, WITH_MEDIA, { write: true }, d);
  expect(plan.action).toBe("invalid");
  expect(plan.action === "invalid" && plan.errors[0].ruleId).toBe("PMD012");
  expect(calls).toEqual([]);
  expect(d.log.some((l) => l.startsWith("put:"))).toBe(false);
});

test("dry-run 은 업로드도 받기도 하지 않고 할 일만 센다", async () => {
  const { db, calls } = fake();
  const d = deps();
  const plan = await publish(db, WITH_MEDIA, { write: false }, d);
  expect(plan).toEqual({
    action: "insert",
    slug: "good-post",
    revision: false,
    uploads: 1,
    cards: 1,
  });
  expect(d.log).toEqual([]);
  expect(calls).toEqual([]);
});
