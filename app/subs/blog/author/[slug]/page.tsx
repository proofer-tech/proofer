import { notFound } from "next/navigation";
import { getAuthor, listByAuthor } from "@/lib/blog/queries";
import { generateMetadataFromTitle } from "@/src/manifest";
import { FOCUS_RING } from "../../ui";
import {
  ArticleList,
  decodeSlug,
  EmptyState,
  EYEBROW,
  parsePage,
} from "../../ArticleList";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

const ORIGIN = "https://blog.proofer.tech";

export async function generateMetadata({ params, searchParams }: Props) {
  const slug = decodeSlug((await params).slug);
  const author = await getAuthor(slug);
  if (!author) return {};
  const page = parsePage((await searchParams).page);
  const path = `${ORIGIN}/author/${slug}`;
  return generateMetadataFromTitle(
    {
      title: `${author.display_name} - 프루퍼 블로그`,
      description:
        author.bio || `${author.display_name} 이 쓴 프루퍼 블로그 글`,
    },
    {
      metadataBase: new URL(ORIGIN),
      alternates: { canonical: page > 1 ? `${path}?page=${page}` : path },
    },
  );
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const slug = decodeSlug((await params).slug);
  const author = await getAuthor(slug);
  if (!author) notFound();
  const page = parsePage((await searchParams).page);
  const { items, pages } = await listByAuthor(slug, page);
  if (items.length === 0 && page > 1) notFound();

  const links = [
    author.medium_url && { href: author.medium_url, label: "Medium" },
    author.website_url && { href: author.website_url, label: "웹사이트" },
  ].filter((l): l is { href: string; label: string } => !!l);

  return (
    <>
      <header className="mx-auto mb-10 max-w-[760px]">
        <p className={EYEBROW}>AUTHOR</p>
        <div className="mt-2 flex items-start gap-5">
          {author.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={author.avatar_url}
              alt={author.display_name}
              width={80}
              height={80}
              className="size-20 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="flex size-20 shrink-0 items-center justify-center rounded-full bg-proofer-blue-soft text-[34px] font-bold text-proofer-blue"
            >
              {author.display_name.slice(0, 1)}
            </span>
          )}
          <div>
            <h1 className="break-keep text-[25px] font-bold leading-[1.14] tracking-[-0.02em] md:text-[38px]">
              {author.display_name}
            </h1>
            {author.bio && (
              <p className="mt-3 break-keep text-base leading-[1.62] text-proofer-gray">
                {author.bio}
              </p>
            )}
            {links.length > 0 && (
              <p className="mt-3 flex gap-4 text-[14.5px]">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    rel="me noopener"
                    className={`rounded-proofer-xs text-proofer-blue underline underline-offset-4 hover:text-proofer-blue-deep ${FOCUS_RING}`}
                  >
                    {l.label}
                  </a>
                ))}
              </p>
            )}
          </div>
        </div>
      </header>
      {items.length === 0 ? (
        <EmptyState>아직 올라온 글이 없습니다.</EmptyState>
      ) : (
        <ArticleList
          items={items}
          page={page}
          pages={pages}
          base={`/author/${slug}`}
        />
      )}
    </>
  );
}
