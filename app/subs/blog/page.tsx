import Link from "next/link";
import { listArticles, listTags } from "@/lib/blog/queries";

type Props = { searchParams: Promise<{ page?: string }> };

const fmt = (d: Date) =>
  new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "long",
    timeZone: "Asia/Seoul",
  }).format(d);

export default async function BlogHome({ searchParams }: Props) {
  const n = Number((await searchParams).page);
  const page = Number.isInteger(n) && n > 0 ? n : 1;
  const [{ items, pages }, tags] = await Promise.all([
    listArticles(page),
    listTags(),
  ]);

  if (items.length === 0) {
    return (
      <p className="py-20 text-center text-gray-500">
        아직 올라온 글이 없습니다.
      </p>
    );
  }

  return (
    <>
      {tags.length > 0 && (
        <nav aria-label="태그" className="mb-10 flex flex-wrap gap-2">
          {tags.map((t) => (
            <Link
              key={t.slug}
              href={`/tag/${t.slug}`}
              className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
            >
              {t.name}
            </Link>
          ))}
        </nav>
      )}
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
                {fmt(a.published_at)}
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
          {page > 1 && <Link href={`/?page=${page - 1}`}>이전</Link>}
          <span className="text-gray-400">
            {page} / {pages}
          </span>
          {page < pages && <Link href={`/?page=${page + 1}`}>다음</Link>}
        </nav>
      )}
    </>
  );
}
