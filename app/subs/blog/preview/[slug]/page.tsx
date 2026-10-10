import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostView from "../../components/PostView";

// `pnpm blog preview` 가 쓴 .blog-preview/<slug>.json 을 읽는다. 개발 모드에서만 열린다.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false } };

type Props = { params: Promise<{ slug: string }> };

export default async function Preview({ params }: Props) {
  if (process.env.NODE_ENV === "production") notFound();
  const slug = decodeURIComponent((await params).slug);
  // 신뢰 경계: 경로 조각이 디렉터리를 벗어나지 못하게 한다.
  if (!/^[\p{L}\p{N}_-]+$/u.test(slug)) notFound();
  let data: {
    frontmatter: Record<string, unknown>;
    body_md: string;
    errors: number;
  };
  try {
    data = JSON.parse(
      readFileSync(
        join(process.cwd(), ".blog-preview", `${slug}.json`),
        "utf8",
      ),
    );
  } catch {
    notFound();
  }
  const fm = data.frontmatter;
  const cover = fm.cover as { src: string; alt: string } | null | undefined;
  return (
    <>
      {data.errors > 0 && (
        <p className="mb-6 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          검증 오류 {data.errors}건이 있다. 이 글은 발행되지 않는다.
        </p>
      )}
      <PostView
        frontmatter={{
          title: String(fm.title ?? slug),
          subtitle: fm.subtitle ? String(fm.subtitle) : undefined,
          cover: cover ?? null,
          published_at: String(fm.published_at ?? new Date().toISOString()),
          reading_minutes: Math.max(1, Math.ceil(data.body_md.length / 500)),
        }}
        body_md={data.body_md}
        author={{
          slug: String(fm.author ?? "proofer"),
          display_name: String(fm.author ?? "proofer"),
        }}
        tags={((fm.tags as string[]) ?? []).map((name) => ({
          slug: name,
          name,
        }))}
      />
    </>
  );
}
