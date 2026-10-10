import Link from "next/link";
import { ArticleList, parsePage } from "./ArticleList";
import { listArticles, listTags } from "@/lib/blog/queries";

type Props = { searchParams: Promise<{ page?: string }> };

export default async function BlogHome({ searchParams }: Props) {
  const page = parsePage((await searchParams).page);
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
      <ArticleList items={items} page={page} pages={pages} base="/" />
    </>
  );
}
