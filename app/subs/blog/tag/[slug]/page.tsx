import { notFound } from "next/navigation";
import { getTag, listByTag } from "@/lib/blog/queries";
import { generateMetadataFromTitle } from "@/src/manifest";
import { ArticleList, EmptyState, EYEBROW, parsePage } from "../../ArticleList";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

const ORIGIN = "https://blog.proofer.tech";

export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params;
  const tag = await getTag(slug);
  if (!tag) return {};
  const page = parsePage((await searchParams).page);
  const path = `${ORIGIN}/tag/${slug}`;
  return generateMetadataFromTitle(
    {
      title: `${tag.name} - 프루퍼 블로그`,
      description:
        tag.description || `${tag.name} 태그가 붙은 프루퍼 블로그 글`,
    },
    {
      metadataBase: new URL(ORIGIN),
      alternates: { canonical: page > 1 ? `${path}?page=${page}` : path },
    },
  );
}

export default async function TagPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const tag = await getTag(slug);
  if (!tag) notFound();
  const page = parsePage((await searchParams).page);
  const { items, pages } = await listByTag(slug, page);
  if (items.length === 0 && page > 1) notFound();

  return (
    <>
      <header className="mx-auto mb-10 max-w-[760px]">
        <p className={EYEBROW}>TAG</p>
        <h1 className="mt-2 break-keep text-[25px] font-bold leading-[1.14] tracking-[-0.02em] md:text-[38px]">
          {tag.name}
        </h1>
        {tag.description && (
          <p className="mt-3 break-keep text-base leading-[1.62] text-proofer-gray">
            {tag.description}
          </p>
        )}
      </header>
      {items.length === 0 ? (
        <EmptyState>이 태그가 붙은 글이 아직 없습니다.</EmptyState>
      ) : (
        <ArticleList
          items={items}
          page={page}
          pages={pages}
          base={`/tag/${slug}`}
        />
      )}
    </>
  );
}
