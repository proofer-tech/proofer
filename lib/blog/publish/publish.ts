// PMD 한 편을 DB 에 쓴다. DB 는 BlogDb 로 주입받아 jest 가 가짜로 갈아 끼운다.
// 천장: 이미지 Blob 업로드와 링크 카드 받기는 여기 없다(본문 주소는 이미 https 여야 한다). 그 단계가 생기면 hashing 전에 끼운다.
import { createHash } from "node:crypto";
import { lint, parse } from "../pmd";
import type { LintResult } from "../pmd";

export type ArticleRow = {
  id: number;
  body_md: string;
  content_hash: string;
};

export type ArticleValues = {
  slug: string;
  title: string;
  subtitle: string;
  body_md: string;
  content_hash: string;
  author: string;
  author_id: number;
  status: "published";
  published_at: Date;
  updated_at: Date;
  canonical_url: string | null;
  source: "native" | "medium_publication" | "medium_personal";
  medium_post_id: string | null;
  medium_url: string | null;
  reading_minutes: number;
  word_count: number;
  keywords: string[];
  image: string | null;
};

/** 트랜잭션 하나 안에서 쓰는 DB 연산. 구현이 하나(drizzle)와 가짜(jest)뿐이라 이 정도로 줄였다. */
export interface BlogTx {
  findArticle(
    slug: string,
    mediumPostId: string | null,
  ): Promise<ArticleRow | undefined>;
  findAuthor(
    slug: string,
  ): Promise<{ id: number; display_name: string } | undefined>;
  insertArticle(v: ArticleValues): Promise<number>;
  updateArticle(id: number, v: ArticleValues): Promise<void>;
  insertRevision(
    articleId: number,
    bodyMd: string,
    contentHash: string,
  ): Promise<void>;
  setTags(articleId: number, tags: string[]): Promise<void>;
}
export interface BlogDb {
  transaction<T>(fn: (tx: BlogTx) => Promise<T>): Promise<T>;
}

export type PublishPlan =
  | { action: "invalid"; errors: LintResult[] }
  | {
      action: "insert" | "update" | "unchanged";
      slug: string;
      revision: boolean;
    };

type Fm = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" && v ? v : null);

/** frontmatter 뒤의 본문. */
function bodyOf(source: string): string {
  const m = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/.exec(source);
  return (m ? source.slice(m[0].length) : source).replace(/^\s+/, "");
}

export const hashOf = (source: string) =>
  createHash("sha256")
    .update(source.replace(/\r\n/g, "\n").trimEnd())
    .digest("hex");

export function toValues(
  source: string,
  authorId: number,
  authorName: string,
): ArticleValues {
  const fm = parse(source).frontmatter as Fm;
  const body = bodyOf(source);
  const words = typeof fm.word_count === "number" ? fm.word_count : body.length;
  const mediumId = str(fm.medium_post_id);
  const src = str(fm.source);
  return {
    slug: String(fm.slug ?? ""),
    title: String(fm.title),
    subtitle: String(fm.subtitle),
    body_md: body,
    content_hash: hashOf(source),
    author: authorName,
    author_id: authorId,
    status: "published",
    published_at: fm.published_at
      ? new Date(String(fm.published_at))
      : new Date(),
    updated_at: fm.updated_at ? new Date(String(fm.updated_at)) : new Date(),
    canonical_url: str(fm.canonical_url),
    source:
      src === "medium_publication" || src === "medium_personal"
        ? src
        : mediumId
          ? "medium_publication"
          : "native",
    medium_post_id: mediumId,
    medium_url: str(fm.medium_url),
    reading_minutes:
      typeof fm.reading_time_min === "number"
        ? fm.reading_time_min
        : Math.max(1, Math.ceil(words / 500)),
    word_count: words,
    keywords: Array.isArray(fm.keywords) ? fm.keywords.map(String) : [],
    image: (fm.cover as { src?: string } | null | undefined)?.src ?? null,
  };
}

/**
 * write=false 면 DB 를 읽기만 하고 계획을 돌려준다(트랜잭션은 열지만 쓰지 않는다).
 * 검증 오류가 하나라도 있으면 어느 쪽이든 DB 를 열지 않는다.
 */
export async function publish(
  db: BlogDb,
  source: string,
  opts: { write: boolean },
): Promise<PublishPlan> {
  const errors = lint(source).filter((r) => r.severity === "error");
  if (errors.length) return { action: "invalid", errors };

  const fm = parse(source).frontmatter as Fm;
  const slug = String(fm.slug ?? "");
  if (!slug) throw new Error("slug 가 없다: frontmatter 에 slug 를 적는다");
  const tags = (fm.tags as string[]) ?? [];

  return db.transaction(async (tx) => {
    const author = await tx.findAuthor(String(fm.author ?? "proofer"));
    if (!author)
      throw new Error(`author 행이 없다: ${String(fm.author ?? "proofer")}`);
    const v = toValues(source, author.id, author.display_name);
    const old = await tx.findArticle(slug, v.medium_post_id);

    if (old && old.content_hash === v.content_hash)
      return { action: "unchanged", slug, revision: false };
    const revision = !!old;
    const plan: PublishPlan = {
      action: old ? "update" : "insert",
      slug,
      revision,
    };
    if (!opts.write) return plan;

    if (old) {
      await tx.insertRevision(old.id, old.body_md, old.content_hash);
      await tx.updateArticle(old.id, v);
      await tx.setTags(old.id, tags);
    } else {
      await tx.setTags(await tx.insertArticle(v), tags);
    }
    return plan;
  });
}
