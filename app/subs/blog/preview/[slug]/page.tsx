import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleMetadata, jsonLdString, type SeoArticle } from "@/lib/blog/seo";
import PostView from "../../components/PostView";

// `pnpm blog preview` 가 쓴 .blog-preview/<slug>.json 을 읽는다. 개발 모드에서만 열린다.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

async function load(raw: string) {
  if (process.env.NODE_ENV === "production") notFound();
  const slug = decodeURIComponent(raw);
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
  const author = {
    slug: String(fm.author ?? "proofer"),
    display_name: String(fm.author ?? "proofer"),
  };
  const tags = ((fm.tags as string[]) ?? []).map((name) => ({
    slug: name,
    name,
  }));
  const seo: SeoArticle = {
    slug,
    title: String(fm.title ?? slug),
    subtitle: fm.subtitle ? String(fm.subtitle) : undefined,
    image: cover?.src,
    published_at: String(fm.published_at ?? new Date().toISOString()),
    reading_minutes: Math.max(1, Math.ceil(data.body_md.length / 500)),
    word_count: data.body_md.length,
    keywords: (fm.keywords as string[]) ?? [],
    canonical_url: fm.canonical_url ? String(fm.canonical_url) : undefined,
    author,
    tags,
  };
  return { data, seo, cover, author, tags };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seo } = await load((await params).slug);
  // 미리보기는 색인하지 않는다. 나머지 head 는 글 화면과 같다.
  return { ...articleMetadata(seo), robots: { index: false } };
}

export default async function Preview({ params }: Props) {
  const { data, seo, cover, author, tags } = await load((await params).slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(seo) }}
      />
      {data.errors > 0 && (
        <p className="mb-6 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          검증 오류 {data.errors}건이 있다. 이 글은 발행되지 않는다.
        </p>
      )}
      <PostView
        frontmatter={{
          title: seo.title,
          subtitle: seo.subtitle ?? undefined,
          cover: cover ?? null,
          published_at: seo.published_at,
          reading_minutes: seo.reading_minutes ?? 1,
        }}
        body_md={data.body_md}
        author={author}
        tags={tags}
      />
    </>
  );
}
