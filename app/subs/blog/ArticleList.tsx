import Link from "next/link";
import { CARD, FOCUS_RING } from "./ui";
import type { listArticles } from "@/lib/blog/queries";

type Items = Awaited<ReturnType<typeof listArticles>>["items"];

const fmt = (d: Date) =>
  new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "long",
    timeZone: "Asia/Seoul",
  }).format(d);

export function parsePage(raw: string | undefined) {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : 1;
}

/** 목록과 `?page=n` 일반 링크 나눔. base 는 페이지 매개변수를 붙이기 전 경로다. */
export function ArticleList({
  items,
  page,
  pages,
  base,
}: {
  items: Items;
  page: number;
  pages: number;
  base: string;
}) {
  const href = (p: number) => (p === 1 ? base : `${base}?page=${p}`);
  const pageLink = `inline-flex h-10 items-center rounded-proofer-xs border border-proofer-line px-4 text-[14.5px] font-bold text-proofer-menu-ink hover:border-proofer-border-hover hover:text-proofer-blue ${FOCUS_RING}`;
  return (
    <div className="mx-auto max-w-[760px]">
      <ul className="flex flex-col gap-4">
        {items.map((a) => (
          <li key={a.id}>
            <Link
              href={`/${a.slug}`}
              className={`flex flex-col gap-5 p-[22px] min-[560px]:flex-row md:p-[26px] ${CARD} ${FOCUS_RING}`}
            >
              {a.image && (
                <div className="order-first aspect-[1200/630] w-full shrink-0 overflow-hidden rounded-proofer-sm bg-proofer-bg-alt min-[560px]:w-[120px] md:min-[560px]:w-[168px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="line-clamp-2 break-keep text-[18px] font-bold leading-[1.2] tracking-[-0.02em] text-proofer-ink md:text-[23px]">
                  {a.title}
                </h2>
                {a.subtitle && (
                  <p className="mt-2 line-clamp-2 break-keep text-base leading-[1.62] text-proofer-gray">
                    {a.subtitle}
                  </p>
                )}
                <p className="mt-3 text-[14.5px] leading-[1.55] text-proofer-gray">
                  {a.author_name ? `${a.author_name} · ` : ""}
                  {fmt(new Date(a.published_at))}
                  {a.reading_minutes > 0 ? ` · ${a.reading_minutes}분` : ""}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {pages > 1 && (
        <nav
          aria-label="페이지"
          className="mt-12 flex items-center justify-center gap-3"
        >
          {page > 1 && (
            <Link href={href(page - 1)} className={pageLink}>
              이전
            </Link>
          )}
          <span className="px-2 text-[14.5px] tabular-nums text-proofer-gray">
            <b className="font-bold text-proofer-ink">{page}</b> / {pages}
          </span>
          {page < pages && (
            <Link href={href(page + 1)} className={pageLink}>
              다음
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto max-w-[760px] rounded-proofer border border-dashed border-proofer-line bg-proofer-bg-alt px-6 py-16 text-center text-proofer-gray">
      {children}
    </p>
  );
}

export const EYEBROW =
  "text-[13px] font-bold uppercase tracking-[0.1em] text-proofer-blue";
