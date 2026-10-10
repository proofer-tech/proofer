import Link from "next/link";
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
  return (
    <>
      <ul className="divide-y divide-gray-100">
        {items.map((a) => (
          <li key={a.id}>
            <Link href={`/${a.slug}`} className="block py-6">
              <h2 className="break-keep text-xl font-bold leading-snug">
                {a.title}
              </h2>
              {a.subtitle && (
                <p className="mt-2 line-clamp-2 break-keep text-gray-600">
                  {a.subtitle}
                </p>
              )}
              <p className="mt-3 text-sm text-gray-400">
                {a.author_name ? `${a.author_name} · ` : ""}
                {fmt(new Date(a.published_at))}
                {a.reading_minutes > 0 ? ` · ${a.reading_minutes}분` : ""}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      {pages > 1 && (
        <nav
          aria-label="페이지"
          className="mt-10 flex justify-center gap-4 text-sm"
        >
          {page > 1 && <Link href={href(page - 1)}>이전</Link>}
          <span className="text-gray-400">
            {page} / {pages}
          </span>
          {page < pages && <Link href={href(page + 1)}>다음</Link>}
        </nav>
      )}
    </>
  );
}
