/** @jest-environment node */
import {
  publish,
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

function fake(existing?: ArticleRow) {
  const calls: string[] = [];
  const db: BlogDb = {
    transaction: (fn) =>
      fn({
        findArticle: async () => existing,
        findAuthor: async () => ({ id: 7, display_name: "프루퍼" }),
        insertArticle: async (v: ArticleValues) => (
          calls.push(`insert:${v.medium_post_id}:${v.source}:${v.author_id}`),
          1
        ),
        updateArticle: async (id) => void calls.push(`update:${id}`),
        insertRevision: async (id, body, hash) =>
          void calls.push(`revision:${id}:${body}:${hash}`),
        setTags: async (id, t) => void calls.push(`tags:${id}:${t}`),
      }),
  };
  return { db, calls };
}

test("신규 삽입: article 과 태그를 쓴다", async () => {
  const { db, calls } = fake();
  const plan = await publish(db, GOOD, { write: true });
  expect(plan).toEqual({
    action: "insert",
    slug: "good-post",
    revision: false,
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
  const plan = await publish(db, GOOD, { write: true });
  expect(plan.action).toBe("update");
  expect(calls).toEqual([
    "revision:3:옛 본문:old",
    "update:3",
    "tags:3:with-cto",
  ]);
});

test("같은 해시면 아무것도 쓰지 않는다", async () => {
  const first = fake();
  await publish(first.db, GOOD, { write: true });
  const hash = (await import("./publish")).hashOf(GOOD);
  const { db, calls } = fake({ id: 3, body_md: "x", content_hash: hash });
  expect((await publish(db, GOOD, { write: true })).action).toBe("unchanged");
  expect(calls).toEqual([]);
});

test("검증 오류가 있으면 DB 를 열지 않는다", async () => {
  let opened = false;
  const db: BlogDb = {
    transaction: async () => ((opened = true), undefined as never),
  };
  const plan = await publish(db, GOOD.replace('"with-cto"', '"없는태그"'), {
    write: true,
  });
  expect(plan.action).toBe("invalid");
  expect(opened).toBe(false);
});

test("dry-run 은 계획만 돌려주고 쓰지 않는다", async () => {
  const { db, calls } = fake({ id: 3, body_md: "옛", content_hash: "old" });
  expect(await publish(db, GOOD, { write: false })).toEqual({
    action: "update",
    slug: "good-post",
    revision: true,
  });
  expect(calls).toEqual([]);
});
