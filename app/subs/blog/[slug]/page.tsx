import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { findRedirect, getArticle, listRelated } from "@/lib/blog/queries";
import { articleMetadata, jsonLdString } from "@/lib/blog/seo";
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

function toSeo({ article, author, tags }: Awaited<ReturnType<typeof load>>) {
  return { ...article, author, tags };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return articleMetadata(toSeo(await load((await params).slug)));
}

export default async function BlogPost({ params }: Props) {
  const loaded = await load((await params).slug);
  const { article, author, tags } = loaded;
  const related = await listRelated(article.id);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(toSeo(loaded)) }}
      />
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
    </>
  );
}
