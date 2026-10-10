// 이미지 업로드와 링크 카드 받기. 바깥 세계(Blob, 네트워크, 파일)는 PublishDeps 로 주입받는다.
// 천장: 이미지 크기 읽기는 PNG, JPEG, GIF, WebP(VP8, VP8L, VP8X) 헤더만 본다. AVIF, SVG 가 필요해지면 image-size 로 갈아 끼운다.
import * as cheerio from "cheerio";
import type { Root } from "mdast";
import { nodes, textOf, lineOf } from "../pmd/walk";

export type ImageRef = { url: string; alt: string; caption: string | null };
export type LinkCardInfo = {
  title?: string;
  description?: string;
  image?: string;
};

export interface PublishDeps {
  /** 자리표시 주소(blob.invalid)가 가리키는 로컬 파일, 또는 외부 https 이미지를 바이트로 읽는다. */
  readImage(url: string): Promise<{ bytes: Uint8Array; contentType: string }>;
  /** Blob 에 올리고 공개 주소를 돌려준다. */
  putBlob(
    name: string,
    bytes: Uint8Array,
    contentType: string,
  ): Promise<string>;
  /** 링크 카드 대상 페이지의 HTML. 실패하면 던진다. */
  fetchHtml(url: string): Promise<string>;
}

export const PLACEHOLDER_HOST = "https://blob.invalid/";
const BLOB_HOST = /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//;
const YOUTUBE =
  /^https:\/\/(?:www\.|m\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)/;

/** Blob 에 이미 있는 주소는 올리지 않는다. */
export const isBlobUrl = (u: string) => BLOB_HOST.test(u);

export function collectImages(tree: Root): ImageRef[] {
  const seen = new Map<string, ImageRef>();
  for (const { n } of nodes(tree))
    if (n.type === "image" && !seen.has(n.url))
      seen.set(n.url, {
        url: n.url,
        alt: n.alt ?? "",
        caption: n.title ?? null,
      });
  return [...seen.values()];
}

/** URL 한 줄짜리 문단(YouTube 제외)이 링크 카드 줄이다. */
export function collectCardUrls(tree: Root): { url: string; line: number }[] {
  return nodes(tree).flatMap(({ n }) => {
    if (n.type !== "paragraph" || n.children.length !== 1) return [];
    const c = n.children[0];
    if (c.type !== "link" || textOf(c) !== c.url || YOUTUBE.test(c.url))
      return [];
    return [{ url: c.url, line: lineOf(n) }];
  });
}

export function imageSize(b: Uint8Array): { width: number; height: number } {
  const v = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const ascii = (o: number, n: number) =>
    String.fromCharCode(...b.subarray(o, o + n));
  if (ascii(1, 3) === "PNG")
    return { width: v.getUint32(16), height: v.getUint32(20) };
  if (ascii(0, 3) === "GIF")
    return { width: v.getUint16(6, true), height: v.getUint16(8, true) };
  if (b[0] === 0xff && b[1] === 0xd8) {
    for (let o = 2; o + 9 < b.length;) {
      if (b[o] !== 0xff) {
        o++;
        continue;
      }
      const m = b[o + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m))
        return { width: v.getUint16(o + 7), height: v.getUint16(o + 5) };
      o += 2 + v.getUint16(o + 2);
    }
  }
  if (ascii(0, 4) === "RIFF" && ascii(8, 4) === "WEBP") {
    const k = ascii(12, 4);
    if (k === "VP8X")
      return {
        width: 1 + (b[24] | (b[25] << 8) | (b[26] << 16)),
        height: 1 + (b[27] | (b[28] << 8) | (b[29] << 16)),
      };
    if (k === "VP8 ")
      return {
        width: v.getUint16(26, true) & 0x3fff,
        height: v.getUint16(28, true) & 0x3fff,
      };
    if (k === "VP8L") {
      const x = v.getUint32(21, true);
      return { width: 1 + (x & 0x3fff), height: 1 + ((x >> 14) & 0x3fff) };
    }
  }
  throw new Error(
    "이미지 크기를 읽지 못했다: PNG, JPEG, GIF, WebP 만 지원한다",
  );
}

/** 페이지 HTML 에서 og 태그 우선으로 카드 정보를 뽑는다. 제목이 없으면 받기 실패다. */
export function parseCard(html: string, pageUrl: string): LinkCardInfo {
  const $ = cheerio.load(html);
  const meta = (p: string) =>
    $(`meta[property="${p}"], meta[name="${p}"]`).attr("content")?.trim() ||
    undefined;
  const title =
    meta("og:title") ?? ($("title").first().text().trim() || undefined);
  if (!title) throw new Error("페이지 제목을 찾지 못했다");
  const img = meta("og:image");
  let image: string | undefined;
  try {
    if (img) {
      const u = new URL(img, pageUrl);
      if (u.protocol === "https:") image = u.href;
    }
  } catch {
    /* 잘못된 og:image 는 버린다 */
  }
  return {
    title,
    description: meta("og:description") ?? meta("description"),
    image,
  };
}
