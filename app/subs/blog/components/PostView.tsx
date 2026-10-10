import Image from "next/image";
import Link from "next/link";
import { PmdBody } from "@/lib/blog/render";

/** 글 화면 본문. DB 행이 아니라 이 모양의 데이터만 받아서 미리보기가 그대로 쓴다. */
export type PostViewProps = {
  frontmatter: {
    title: string;
    subtitle?: string;
    cover?: { src: string; alt: string } | null;
    published_at: Date | string;
    reading_minutes?: number;
    source?: "native" | "medium_publication" | "medium_personal";
    medium_url?: string | null;
  };
  body_md: string;
  author?: {
    slug: string;
    display_name: string;
    bio?: string | null;
    avatar_url?: string | null;
    medium_url?: string | null;
    website_url?: string | null;
  } | null;
  tags: { slug: string | null; name: string }[];
  related?: {
    slug: string;
    title: string;
    subtitle: string;
    published_at: Date | string;
  }[];
};

const fmt = (d: Date | string) =>
  new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "long",
    timeZone: "Asia/Seoul",
  }).format(new Date(d));

function Avatar({
  url,
  name,
  size,
}: {
  url?: string | null;
  name: string;
  size: number;
}) {
  return url ? (
    <Image
      src={url}
      alt=""
      width={size}
      height={size}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      className="flex items-center justify-center rounded-full bg-gray-100 font-bold text-gray-500"
      style={{ width: size, height: size }}
    >
      {name.slice(0, 1)}
    </span>
  );
}

export default function PostView({
  frontmatter: f,
  body_md,
  author,
  tags,
  related = [],
}: PostViewProps) {
  const fromMedium = f.source?.startsWith("medium_") && f.medium_url;
  return (
    <article>
      <h1 className="break-keep text-3xl font-bold leading-tight md:text-4xl">
        {f.title}
      </h1>
      {f.subtitle && (
        <p className="mt-3 break-keep text-lg text-gray-500">{f.subtitle}</p>
      )}

      {author && (
        <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
          <Avatar
            url={author.avatar_url}
            name={author.display_name}
            size={40}
          />
          <div>
            <Link
              href={`/author/${author.slug}`}
              className="font-bold text-gray-900"
            >
              {author.display_name}
            </Link>
            <p>
              {fmt(f.published_at)}
              {f.reading_minutes ? ` · ${f.reading_minutes}분` : ""}
            </p>
          </div>
        </div>
      )}

      {f.cover && (
        <Image
          src={f.cover.src}
          alt={f.cover.alt}
          width={1200}
          height={630}
          priority
          className="mt-8 h-auto w-full rounded-lg"
        />
      )}

      <div className="mt-8">
        <PmdBody source={body_md} />
      </div>

      {tags.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t.name}>
              <Link
                href={`/tag/${t.slug ?? t.name}`}
                className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {author && (
        <aside className="mt-12 flex gap-4 rounded-lg border border-gray-100 p-5">
          <Avatar
            url={author.avatar_url}
            name={author.display_name}
            size={56}
          />
          <div className="min-w-0 text-sm">
            <Link
              href={`/author/${author.slug}`}
              className="text-base font-bold"
            >
              {author.display_name}
            </Link>
            {author.bio && (
              <p className="mt-1 break-keep text-gray-600">{author.bio}</p>
            )}
            <p className="mt-2 flex flex-wrap gap-x-4 text-gray-500">
              {author.medium_url && (
                <a
                  href={author.medium_url}
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Medium
                </a>
              )}
              {author.website_url && (
                <a
                  href={author.website_url}
                  rel="noopener noreferrer"
                  className="underline"
                >
                  웹사이트
                </a>
              )}
              {fromMedium && (
                <a
                  href={f.medium_url!}
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Medium 에서 처음 발행
                </a>
              )}
            </p>
          </div>
        </aside>
      )}

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-2 text-xl font-bold">같은 태그의 글</h2>
          <ul className="divide-y divide-gray-100">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/${r.slug}`} className="block py-4">
                  <p className="break-keep font-bold">{r.title}</p>
                  {r.subtitle && (
                    <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                      {r.subtitle}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-400">
                    {fmt(r.published_at)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
