import { and, desc, eq, ne, sql } from "drizzle-orm";
import { dz } from "@/database/engine";
import { Article, ArticleToTag, Author, Tag } from "@/database/schemas/blog";

export const PAGE_SIZE = 12;

// 목록에는 published 만 낸다. unlisted 는 주소를 아는 사람만 글 화면에서 본다.
const listed = eq(Article.status, "published");

const card = {
  id: Article.id,
  slug: Article.slug,
  title: Article.title,
  subtitle: Article.subtitle,
  image: Article.image,
  published_at: Article.published_at,
  reading_minutes: Article.reading_minutes,
  author_slug: Author.slug,
  author_name: Author.display_name,
};

const base = () =>
  dz
    .select(card)
    .from(Article)
    .leftJoin(Author, eq(Article.author_id, Author.id));

const newest = [desc(Article.published_at), desc(Article.id)] as const;

/** page 는 1부터. total 은 같은 조건의 전체 건수다. */
export async function listArticles(page = 1) {
  const offset = (Math.max(1, page) - 1) * PAGE_SIZE;
  const [items, [{ total }]] = await Promise.all([
    base()
      .where(listed)
      .orderBy(...newest)
      .limit(PAGE_SIZE)
      .offset(offset),
    dz
      .select({ total: sql<number>`count(*)::int` })
      .from(Article)
      .where(listed),
  ]);
  return { items, total, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

/** published 와 unlisted 모두 slug 로 열린다. draft 는 열리지 않는다. */
export async function getArticle(slug: string) {
  const [row] = await dz
    .select({
      article: Article,
      author: Author,
    })
    .from(Article)
    .leftJoin(Author, eq(Article.author_id, Author.id))
    .where(and(eq(Article.slug, slug), ne(Article.status, "draft")))
    .limit(1);
  if (!row) return null;
  const tags = await dz
    .select({ slug: Tag.slug, name: Tag.name })
    .from(ArticleToTag)
    .innerJoin(Tag, eq(Tag.name, ArticleToTag.tag_name))
    .where(eq(ArticleToTag.article_id, row.article.id));
  return { ...row, tags };
}

export async function listByTag(tagSlug: string, page = 1) {
  const offset = (Math.max(1, page) - 1) * PAGE_SIZE;
  const inTag = and(listed, eq(Tag.slug, tagSlug));
  const items = await base()
    .innerJoin(ArticleToTag, eq(ArticleToTag.article_id, Article.id))
    .innerJoin(Tag, eq(Tag.name, ArticleToTag.tag_name))
    .where(inTag)
    .orderBy(...newest)
    .limit(PAGE_SIZE)
    .offset(offset);
  const [{ total }] = await dz
    .select({ total: sql<number>`count(*)::int` })
    .from(Article)
    .innerJoin(ArticleToTag, eq(ArticleToTag.article_id, Article.id))
    .innerJoin(Tag, eq(Tag.name, ArticleToTag.tag_name))
    .where(inTag);
  return { items, total, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export async function listByAuthor(authorSlug: string, page = 1) {
  const offset = (Math.max(1, page) - 1) * PAGE_SIZE;
  const inAuthor = and(listed, eq(Author.slug, authorSlug));
  const items = await base()
    .where(inAuthor)
    .orderBy(...newest)
    .limit(PAGE_SIZE)
    .offset(offset);
  const [{ total }] = await dz
    .select({ total: sql<number>`count(*)::int` })
    .from(Article)
    .innerJoin(Author, eq(Article.author_id, Author.id))
    .where(inAuthor);
  return { items, total, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

/** 같은 태그를 하나라도 공유하는 최신 글 3건(자기 자신 제외). */
export async function listRelated(articleId: number) {
  const mine = dz
    .select({ t: ArticleToTag.tag_name })
    .from(ArticleToTag)
    .where(eq(ArticleToTag.article_id, articleId));
  return base()
    .where(
      and(
        listed,
        ne(Article.id, articleId),
        sql`${Article.id} in (select ${ArticleToTag.article_id} from ${ArticleToTag} where ${ArticleToTag.tag_name} in (${mine}))`,
      ),
    )
    .orderBy(...newest)
    .limit(3);
}

/** 홈의 태그 바로가기. published 글이 있는 태그만, 글 많은 순. */
export async function listTags() {
  return dz
    .select({
      slug: Tag.slug,
      name: Tag.name,
      count: sql<number>`count(*)::int`,
    })
    .from(Tag)
    .innerJoin(ArticleToTag, eq(ArticleToTag.tag_name, Tag.name))
    .innerJoin(Article, eq(Article.id, ArticleToTag.article_id))
    .where(listed)
    .groupBy(Tag.slug, Tag.name)
    .orderBy(desc(sql`count(*)`));
}

export async function getTag(slug: string) {
  const [row] = await dz.select().from(Tag).where(eq(Tag.slug, slug)).limit(1);
  return row ?? null;
}

export async function getAuthor(slug: string) {
  const [row] = await dz
    .select()
    .from(Author)
    .where(eq(Author.slug, slug))
    .limit(1);
  return row ?? null;
}

/** sitemap 용. published 글 전체(canonical_url 판정은 호출자가 한다), 태그, 저자. */
export async function listSitemapSources() {
  const [articles, tags, authors] = await Promise.all([
    dz
      .select({
        slug: Article.slug,
        updated_at: Article.updated_at,
        canonical_url: Article.canonical_url,
      })
      .from(Article)
      .where(listed),
    listTags(),
    dz
      .selectDistinct({ slug: Author.slug })
      .from(Author)
      .innerJoin(Article, eq(Article.author_id, Author.id))
      .where(listed),
  ]);
  return { articles, tags, authors };
}

/** RSS 용 최신 글. */
export async function listFeedArticles(limit = 30) {
  return dz
    .select({
      slug: Article.slug,
      title: Article.title,
      description: Article.description,
      subtitle: Article.subtitle,
      published_at: Article.published_at,
      author_name: Author.display_name,
    })
    .from(Article)
    .leftJoin(Author, eq(Article.author_id, Author.id))
    .where(listed)
    .orderBy(...newest)
    .limit(limit);
}
