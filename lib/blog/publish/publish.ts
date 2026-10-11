// PMD 한 편을 DB 에 쓴다. DB 는 BlogDb 로 주입받아 jest 가 가짜로 갈아 끼운다.
// 천장: 이미지 Blob 업로드와 링크 카드 받기는 여기 없다(본문 주소는 이미 https 여야 한다). 그 단계가 생기면 hashing 전에 끼운다.
import { createHash } from "node:crypto";
import { lint, parse } from "../pmd";
import type { LintResult } from "../pmd";
import {
  collectCardUrls,
  collectImages,
  imageSize,
  isBlobUrl,
  parseCard,
  type LinkCardInfo,
  type ImageRef,
  type PublishDeps,
} from "./assets";

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
  link_cards: Record<string, LinkCardInfo>;
};

export type AssetRow = {
  url: string;
  width: number | null;
  height: number | null;
};
export type AssetInsert = AssetRow & {
  article_id: number;
  original_url: string;
  alt: string;
  caption: string | null;
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
  findAsset(originalUrl: string): Promise<AssetRow | undefined>;
  insertAsset(a: AssetInsert): Promise<void>;
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
      uploads: number;
      cards: number;
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
  const mediumId = str(fm.medium_id);
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
          ? str(fm.canonical_url)
            ? "medium_personal"
            : "medium_publication"
          : "native",
    medium_post_id: mediumId,
    medium_url: str(fm.medium_url),
    reading_minutes:
      typeof fm.reading_time_min === "number"
        ? Math.max(1, Math.ceil(fm.reading_time_min))
        : Math.max(1, Math.ceil(words / 500)),
    word_count: words,
    keywords: Array.isArray(fm.keywords) ? fm.keywords.map(String) : [],
    image: (fm.cover as { src?: string } | null | undefined)?.src ?? null,
    link_cards: {},
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
  deps: PublishDeps,
): Promise<PublishPlan> {
  const errors = lint(source).filter((r) => r.severity === "error");
  if (errors.length) return { action: "invalid", errors };

  const doc = parse(source);
  const fm = doc.frontmatter as Fm;
  const slug = String(fm.slug ?? "");
  if (!slug) throw new Error("slug 가 없다: frontmatter 에 slug 를 적는다");
  const tags = (fm.tags as string[]) ?? [];
  const cover = (fm.cover as { src?: string; alt?: string } | null | undefined)
    ?.src;
  const images = collectImages(doc.tree);
  if (cover && !images.some((i) => i.url === cover))
    images.push({
      url: cover,
      alt: String((fm.cover as { alt?: string }).alt ?? ""),
      caption: null,
    });
  const cardUrls = collectCardUrls(doc.tree);

  // 천장: 업로드와 카드 받기를 DB 트랜잭션 안에서 한다. 글 한 편 단위라 짧지만, 이미지가 많아지면 밖으로 뺀다.
  return db.transaction(async (tx) => {
    const author = await tx.findAuthor(String(fm.author ?? "proofer"));
    if (!author)
      throw new Error(`author 행이 없다: ${String(fm.author ?? "proofer")}`);
    const v = toValues(source, author.id, author.display_name);
    const old = await tx.findArticle(slug, v.medium_post_id);

    if (old && old.content_hash === v.content_hash)
      return {
        action: "unchanged",
        slug,
        revision: false,
        uploads: 0,
        cards: 0,
      };

    // 링크 카드: 받기 실패는 PMD012 로 발행을 막는다
    const cardErrors: LintResult[] = [];
    if (opts.write)
      for (const { url, line } of cardUrls) {
        try {
          v.link_cards[url] = parseCard(await deps.fetchHtml(url), url);
        } catch (e) {
          cardErrors.push({
            line,
            ruleId: "PMD012",
            severity: "error",
            message: `링크 카드 정보를 받지 못했다: ${url} (${e instanceof Error ? e.message : String(e)})`,
            fix: "주소가 열리는지 확인하거나, 카드가 필요 없으면 [글](https://...) 형태의 링크로 바꾼다",
          });
        }
      }
    if (cardErrors.length) return { action: "invalid", errors: cardErrors };

    // 이미지: original_url 로 이미 올린 것은 재사용하고 나머지는 올린다
    const todo: ImageRef[] = [];
    const resolved = new Map<string, string>();
    const fresh: Omit<AssetInsert, "article_id">[] = [];
    for (const img of images) {
      if (isBlobUrl(img.url)) continue;
      const hit = await tx.findAsset(img.url);
      if (hit) resolved.set(img.url, hit.url);
      else todo.push(img);
    }
    if (opts.write)
      for (const img of todo) {
        const { bytes, contentType } = await deps.readImage(img.url);
        const size = imageSize(bytes);
        const name = `blog/${slug}/${img.url.split("/").pop() ?? "image"}`;
        const url = await deps.putBlob(name, bytes, contentType);
        resolved.set(img.url, url);
        fresh.push({
          ...size,
          url,
          original_url: img.url,
          alt: img.alt,
          caption: img.caption,
        });
      }

    const revision = !!old;
    const plan: PublishPlan = {
      action: old ? "update" : "insert",
      slug,
      revision,
      uploads: todo.length,
      cards: cardUrls.length,
    };
    if (!opts.write) return plan;

    for (const [from, to] of resolved)
      v.body_md = v.body_md.split(`](${from}`).join(`](${to}`);
    if (cover && resolved.has(cover)) v.image = resolved.get(cover)!;

    let id: number;
    if (old) {
      id = old.id;
      await tx.insertRevision(old.id, old.body_md, old.content_hash);
      await tx.updateArticle(old.id, v);
    } else {
      id = await tx.insertArticle(v);
    }
    await tx.setTags(id, tags);
    for (const a of fresh) await tx.insertAsset({ ...a, article_id: id });
    return plan;
  });
}
