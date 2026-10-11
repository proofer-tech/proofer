import Link from "next/link";
import { ArticleList, EmptyState, EYEBROW, parsePage } from "./ArticleList";
import { FOCUS_RING } from "./ui";
import { listArticles, listTags } from "@/lib/blog/queries";

type Props = { searchParams: Promise<{ page?: string }> };

export default async function BlogHome({ searchParams }: Props) {
  const page = parsePage((await searchParams).page);
  const [{ items, pages }, tags] = await Promise.all([
    listArticles(page),
    listTags(),
  ]);

  if (items.length === 0) {
    return <EmptyState>아직 올라온 글이 없습니다.</EmptyState>;
  }

  return (
    <>
      <header className="mx-auto mb-8 max-w-[760px]">
        <p className={EYEBROW}>PROOFER BLOG</p>
        <p className="mt-2 break-keep text-[18px] leading-[1.72] text-proofer-gray">
          프루퍼가 쓰는 AI 네이티브 개발과 커뮤니티 이야기
        </p>
      </header>
      {tags.length > 0 && (
        <nav
          aria-label="태그"
          className="mx-auto mb-10 flex max-w-[760px] flex-wrap gap-2"
        >
          {tags.map((t) => (
            <Link
              key={t.slug}
              href={`/tag/${t.slug}`}
              title={t.name}
              className={`inline-flex max-w-[220px] items-center truncate rounded-full border border-proofer-line bg-white px-3 py-1.5 text-[13px] font-bold text-proofer-menu-ink transition duration-200 ease-proofer hover:border-proofer-border-hover hover:bg-proofer-blue-soft hover:text-proofer-blue-deep ${FOCUS_RING}`}
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
