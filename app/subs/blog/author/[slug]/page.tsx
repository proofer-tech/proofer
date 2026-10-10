import { notFound } from "next/navigation";
import { getAuthor, listByAuthor } from "@/lib/blog/queries";
import { generateMetadataFromTitle } from "@/src/manifest";
import { ArticleList, parsePage } from "../../ArticleList";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

const ORIGIN = "https://blog.proofer.tech";

export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params;
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
  const { slug } = await params;
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
      <header className="mb-8 flex items-start gap-5">
        {author.avatar_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={author.avatar_url}
            alt={author.display_name}
            width={80}
            height={80}
            className="size-20 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="break-keep text-3xl font-bold">
            {author.display_name}
          </h1>
          {author.bio && (
            <p className="mt-3 break-keep text-gray-600">{author.bio}</p>
          )}
          {links.length > 0 && (
            <p className="mt-3 flex gap-4 text-sm">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  rel="me noopener"
                  className="text-gray-500 underline"
                >
                  {l.label}
                </a>
              ))}
            </p>
          )}
        </div>
      </header>
      {items.length === 0 ? (
        <p className="py-20 text-center text-gray-500">
          아직 올라온 글이 없습니다.
        </p>
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
