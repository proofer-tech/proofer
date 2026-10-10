import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { findRedirect, getArticle, listRelated } from "@/lib/blog/queries";
import PostView from "../components/PostView";

type Props = { params: Promise<{ slug: string }> };

// 빌드 때 DB 를 읽지 않는다. 첫 요청에 만들고 revalidateTag("blog") 로 비운다.
export function generateStaticParams() {
  return [];
}

function decode(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

async function load(raw: string) {
  const slug = decode(raw);
  const found = await getArticle(slug);
  if (found) return found;
  // 옛 경로는 현재 slug 로 영구 이동한다.
  const to = await findRedirect([
    `/${slug}`,
    `/${encodeURIComponent(slug)}`,
    `/${raw}`,
  ]);
  if (to && to !== slug) permanentRedirect(`/${encodeURIComponent(to)}`);
  notFound();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { article } = await load((await params).slug);
  return {
    title: article.title,
    description: article.subtitle || undefined,
    alternates: {
      canonical:
        article.canonical_url ??
        `https://blog.proofer.tech/${encodeURIComponent(article.slug)}`,
    },
    // unlisted 는 주소를 아는 사람만 본다.
    robots: article.status === "unlisted" ? { index: false } : undefined,
  };
}

export default async function BlogPost({ params }: Props) {
  const { article, author, tags } = await load((await params).slug);
  const related = await listRelated(article.id);
  return (
    <PostView
      frontmatter={{
        title: article.title,
        subtitle: article.subtitle,
        cover: article.image
          ? { src: article.image, alt: article.title }
          : null,
        published_at: article.published_at,
        reading_minutes: article.reading_minutes,
        source: article.source,
        medium_url: article.medium_url,
      }}
      body_md={article.body_md}
      author={author}
      tags={tags}
      related={related}
    />
  );
}
