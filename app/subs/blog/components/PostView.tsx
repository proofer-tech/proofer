import Image from "next/image";
import Link from "next/link";
import { PmdBody } from "@/lib/blog/render";
import { CARD, FOCUS_RING } from "../ui";
import ShareBar from "./ShareBar";

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
    canonical_url?: string | null;
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
  /** 없으면 공유 줄을 그리지 않는다(미리보기). */
  shareUrl?: string;
};

const fmt = (d: Date | string) =>
  new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "long",
    timeZone: "Asia/Seoul",
  }).format(new Date(d));

const CHIP =
  "inline-block max-w-[220px] truncate align-middle rounded-full border border-proofer-line bg-white px-3 py-1.5 text-[13px] font-bold text-proofer-menu-ink transition duration-200 ease-proofer hover:border-proofer-border-hover hover:bg-proofer-blue-soft hover:text-proofer-blue-deep " +
  FOCUS_RING;
const EYEBROW =
  "text-[13px] font-bold uppercase tracking-[0.1em] text-proofer-blue";
const BODY_LINK =
  "text-proofer-blue underline underline-offset-4 hover:text-proofer-blue-deep rounded-proofer-xs " +
  FOCUS_RING;

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
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full bg-proofer-blue-soft font-bold text-proofer-blue"
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.42),
      }}
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
  shareUrl,
}: PostViewProps) {
  // 원문이 Medium 에 남은 글에만 링크한다. canonical 이 블로그 자신인 회사 글은 숨긴다.
  const fromMedium =
    f.source?.startsWith("medium_") &&
    f.medium_url &&
    /^https?:\/\/([^/]+\.)?medium\.com\//.test(f.canonical_url ?? "");
  const firstTag = tags[0];
  // 대표 이미지가 본문에도 있으면 맨 위 커버는 그리지 않는다. 목록 썸네일과 OG 에만 쓴다.
  const cover =
    f.cover && !body_md.includes(`](${f.cover.src}`) ? f.cover : null;
  return (
    <article className="mx-auto max-w-[680px]">
      {firstTag && (
        <Link
          href={`/tag/${firstTag.slug ?? firstTag.name}`}
          className={`inline-block rounded-proofer-xs ${EYEBROW} ${FOCUS_RING}`}
        >
          {firstTag.name}
        </Link>
      )}
      <h1
        className={`break-keep break-words text-[25px] font-bold leading-[1.14] tracking-[-0.02em] text-proofer-ink md:text-[38px] ${firstTag ? "mt-3" : ""}`}
      >
        {f.title}
      </h1>
      {f.subtitle && (
        <p className="mt-4 break-keep text-[18px] leading-[1.72] text-proofer-gray">
          {f.subtitle}
        </p>
      )}

      {author && (
        <div
          className={`mt-7 flex items-center gap-3 ${cover ? "" : "border-b border-proofer-line pb-7"}`}
        >
          <Avatar
            url={author.avatar_url}
            name={author.display_name}
            size={40}
          />
          <div>
            <Link
              href={`/author/${author.slug}`}
              className={`rounded-proofer-xs text-[15.5px] font-bold text-proofer-ink hover:text-proofer-blue ${FOCUS_RING}`}
            >
              {author.display_name}
            </Link>
            <p className="text-[14.5px] leading-[1.55] text-proofer-gray">
              {fmt(f.published_at)}
              {f.reading_minutes ? ` · ${f.reading_minutes}분` : ""}
            </p>
          </div>
        </div>
      )}

      {cover && (
        <div className="mt-9 overflow-hidden rounded-proofer bg-proofer-bg-alt md:-mx-10">
          <Image
            src={cover.src}
            alt={cover.alt}
            width={1200}
            height={630}
            priority
            className="h-auto w-full"
          />
        </div>
      )}

      <div className="mt-10">
        <PmdBody source={body_md} />
      </div>

      {tags.length > 0 && (
        <ul className="mt-12 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t.name}>
              <Link
                href={`/tag/${t.slug ?? t.name}`}
                title={t.name}
                className={CHIP}
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {shareUrl && (
        <ShareBar
          url={shareUrl}
          title={f.title}
          className={tags.length > 0 ? "mt-8" : "mt-12"}
        />
      )}

      {author && (
        <aside className="mt-10 flex gap-4 rounded-proofer border border-proofer-line bg-white p-6 shadow-proofer-soft">
          <Avatar
            url={author.avatar_url}
            name={author.display_name}
            size={56}
          />
          <div className="min-w-0">
            <Link
              href={`/author/${author.slug}`}
              className={`rounded-proofer-xs text-[18px] font-bold text-proofer-ink hover:text-proofer-blue ${FOCUS_RING}`}
            >
              {author.display_name}
            </Link>
            {author.bio && (
              <p className="mt-1.5 break-keep text-base leading-[1.62] text-proofer-gray">
                {author.bio}
              </p>
            )}
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[14.5px]">
              {author.medium_url && (
                <a
                  href={author.medium_url}
                  rel="noopener noreferrer"
                  className={BODY_LINK}
                >
                  Medium
                </a>
              )}
              {author.website_url && (
                <a
                  href={author.website_url}
                  rel="noopener noreferrer"
                  className={BODY_LINK}
                >
                  웹사이트
                </a>
              )}
              {fromMedium && (
                <a
                  href={f.medium_url!}
                  rel="noopener noreferrer"
                  className={BODY_LINK}
                >
                  Medium 에서 처음 발행
                </a>
              )}
            </p>
          </div>
        </aside>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <p className={EYEBROW}>MORE</p>
          <h2 className="mt-2 text-[23px] font-bold tracking-[-0.02em] text-proofer-ink">
            같은 태그의 글
          </h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug} className="min-w-0">
                <Link
                  href={`/${r.slug}`}
                  className={`${CARD} ${FOCUS_RING} block h-full p-5`}
                >
                  <p className="line-clamp-2 break-keep break-words font-bold text-proofer-ink">
                    {r.title}
                  </p>
                  {r.subtitle && (
                    <p className="mt-1.5 line-clamp-1 break-words text-[14.5px] text-proofer-gray">
                      {r.subtitle}
                    </p>
                  )}
                  <p className="mt-3 text-[13px] text-proofer-gray">
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
