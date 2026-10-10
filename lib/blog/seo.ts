import type { Metadata } from "next";

// 글 화면과 미리보기가 같이 쓰는 head 생성기. DB 행이 아니라 이 모양의 데이터만 받는다.
export const BLOG_ORIGIN = "https://blog.proofer.tech";
const LOGO = "https://proofer.tech/pwa-512x512.png";

export type SeoArticle = {
  slug: string;
  title: string;
  subtitle?: string | null;
  image?: string | null;
  published_at: Date | string;
  updated_at?: Date | string | null;
  reading_minutes?: number | null;
  word_count?: number | null;
  keywords?: string[] | null;
  canonical_url?: string | null;
  status?: string;
  author?: {
    slug: string;
    display_name: string;
    kind?: "org" | "person";
    same_as?: string[] | null;
    medium_url?: string | null;
    website_url?: string | null;
  } | null;
  tags: { slug: string | null; name: string }[];
};

const iso = (d: Date | string) => new Date(d).toISOString();
const selfUrl = (a: SeoArticle) =>
  `${BLOG_ORIGIN}/${encodeURIComponent(a.slug)}`;
const authorUrl = (slug: string) =>
  `${BLOG_ORIGIN}/author/${encodeURIComponent(slug)}`;

/** 대표 이미지가 없으면 /og 가 제목과 저자로 그린다. */
function ogImage(a: SeoArticle) {
  if (a.image) return a.image;
  const q = new URLSearchParams({ title: a.title });
  if (a.author) q.set("author", a.author.display_name);
  return `${BLOG_ORIGIN}/og?${q}`;
}

export function articleMetadata(a: SeoArticle): Metadata {
  const title = `${a.title} | 프루퍼 블로그`;
  const description = a.subtitle || undefined;
  const url = selfUrl(a);
  const image = ogImage(a);
  const unlisted = a.status === "unlisted";
  const authorLink = a.author ? authorUrl(a.author.slug) : undefined;
  return {
    title: { absolute: title },
    description,
    keywords: a.keywords?.length ? a.keywords : undefined,
    alternates: { canonical: a.canonical_url || url },
    robots: unlisted
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-image-preview": "large" },
    authors: a.author ? [{ name: a.author.display_name, url: authorLink }] : [],
    openGraph: {
      type: "article",
      title,
      description,
      images: [{ url: image, width: 1200, height: 630 }],
      url,
      siteName: "프루퍼 블로그",
      publishedTime: iso(a.published_at),
      modifiedTime: iso(a.updated_at ?? a.published_at),
      authors: authorLink ? [authorLink] : undefined,
      tags: a.tags.map((t) => t.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: a.reading_minutes
      ? {
          "twitter:label1": "읽는 시간",
          "twitter:data1": `${a.reading_minutes}분`,
        }
      : undefined,
  };
}

export function articleJsonLd(a: SeoArticle) {
  const url = selfUrl(a);
  const au = a.author;
  const sameAs = au
    ? [...(au.same_as ?? []), au.medium_url, au.website_url].filter(
        (v, i, all): v is string => !!v && all.indexOf(v) === i,
      )
    : [];
  const tag = a.tags[0];
  const crumbs = [
    { name: "블로그", url: BLOG_ORIGIN },
    ...(tag?.slug
      ? [
          {
            name: tag.name,
            url: `${BLOG_ORIGIN}/tag/${encodeURIComponent(tag.slug)}`,
          },
        ]
      : []),
    { name: a.title, url },
  ];
  return [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: a.title,
      description: a.subtitle || undefined,
      image: ogImage(a),
      datePublished: iso(a.published_at),
      dateModified: iso(a.updated_at ?? a.published_at),
      author: au && {
        "@type": au.kind === "org" ? "Organization" : "Person",
        "@id": authorUrl(au.slug),
        name: au.display_name,
        url: authorUrl(au.slug),
        sameAs,
      },
      publisher: {
        "@type": "Organization",
        name: "프루퍼",
        url: "https://proofer.tech",
        logo: { "@type": "ImageObject", url: LOGO },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": a.canonical_url || url },
      wordCount: a.word_count || undefined,
      isAccessibleForFree: true,
      keywords: a.keywords?.length ? a.keywords.join(", ") : undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.url,
      })),
    },
  ];
}

/** script 안에서 </script> 로 빠져나가지 못하게 < 를 이스케이프한다. */
export const jsonLdString = (a: SeoArticle) =>
  JSON.stringify(articleJsonLd(a)).replace(/</g, "\\u003c");
