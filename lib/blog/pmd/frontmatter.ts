import { z } from "zod";

export const AUTHORS = ["proofer", "with-cto", "hsol", "maehong"] as const;

// 날짜는 yaml 이 문자열로 읽는다(core 스키마). YYYY-MM-DD 또는 ISO 8601.
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}([T ].+)?$/, "날짜 형식은 YYYY-MM-DD");

const shape = {
  title: z.string().min(1),
  subtitle: z.string().min(40).max(160),
  slug: z.string().nullish(),
  author: z.enum(AUTHORS).default("proofer"),
  tags: z.array(z.string()).min(1).max(3),
  // 개수(1 ~ 6)는 PMD017 이 따로 본다
  keywords: z.array(z.string()).optional(),
  cover: z.object({ src: z.url(), alt: z.string().min(1) }).nullish(),
  published_at: date.nullish(),
  updated_at: date.nullish(),
  canonical_url: z.url().nullish(),
};

export const frontmatterSchema = z
  .object(shape)
  // medium_* 칸은 임포트 메타. 그 밖의 모르는 칸은 오류.
  .catchall(z.unknown())
  .superRefine((v, ctx) => {
    for (const k of Object.keys(v)) {
      if (!(k in shape) && !k.startsWith("medium_")) {
        ctx.addIssue({
          code: "custom",
          path: [k],
          message: `알 수 없는 칸 ${k}`,
        });
      }
    }
  });

/** 규칙들이 스키마 통과 여부와 무관하게 값을 안전하게 읽는 헬퍼. */
export function fmString(fm: unknown, key: string): string | undefined {
  const v = (fm as Record<string, unknown> | null | undefined)?.[key];
  return typeof v === "string" ? v : undefined;
}

export function fmStrings(fm: unknown, key: string): string[] | undefined {
  const v = (fm as Record<string, unknown> | null | undefined)?.[key];
  return Array.isArray(v) && v.every((x) => typeof x === "string")
    ? v
    : undefined;
}

/** frontmatter 안에서 key 가 적힌 줄. 못 찾으면 시작 줄. */
export function keyLine(
  source: string,
  startLine: number,
  key: string,
): number {
  const lines = source.split("\n");
  for (let i = startLine - 1; i < lines.length; i++) {
    if (/^---\s*$/.test(lines[i]) && i >= startLine) break;
    if (lines[i].startsWith(`${key}:`)) return i + 1;
  }
  return startLine;
}
