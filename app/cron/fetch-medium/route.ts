import Parser from "rss-parser";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "@/src/utils/dayjs";
import { dz } from "@/database/engine";
import { desc, eq } from "drizzle-orm";
import { Article, ArticleToTag, Tag } from "@/database/schemas/blog";
import { flatten, keyBy } from "lodash";
import { Dictionary } from "ts-essentials";
import { conflictUpdateSetAllColumns } from "@/src/utils/drizzle";
import { notFound } from "next/navigation";
import { withBearer } from "@/src/decorators/api";
import { getTextOf, truncateDescription } from "@/src/manifest";

const parser = new Parser();

interface Item {
  title: string;
  link: string;
  guid: string;
  categories: string[];
  "dc:creator": string;
  pubDate: string;
  "atom:updated": string;
  "content:encoded": string;
  "content:encodedSnippet": string;
}

interface Feed {
  title: string;
  description: string;
  link: string;
  image: { url: string; title: string; link: string };
  generator: string;
  lastBuildDate: string;
  webMaster: string;
  items: Item[];
}

function getSlug(link: string) {
  return link.split("?")[0].split("/").pop();
}

async function insertArticles(items: Item[]) {
  return dz.transaction(async (db) => {
    await db
      .insert(Tag)
      .values(
        flatten(items.map((item) => item.categories))
          .filter((i) => i !== undefined)
          .map((name) => ({
            name: name,
          })),
      )
      .onConflictDoNothing();
    const articles = await db
      .insert(Article)
      .values(
        items.map((item) => ({
          slug: getSlug(item.link)!,
          origin: item.guid,
          title: item.title,
          contents: item["content:encoded"],
          description: truncateDescription(item["content:encodedSnippet"], {
            length: 77,
          }),
          author: item["dc:creator"],
          created_at: dayjs(item.pubDate).toDate(),
          updated_at: dayjs(item["atom:updated"]).toDate(),
        })),
      )
      .onConflictDoUpdate({
        target: [Article.slug],
        set: conflictUpdateSetAllColumns(Article),
      })
      .returning();

    const articleSlugMap: Dictionary<any> = keyBy(articles, (article) =>
      getSlug(article.slug),
    );
    for (const item of items) {
      const articleId = articleSlugMap[getSlug(item.link)!].id;
      await db
        .delete(ArticleToTag)
        .where(eq(ArticleToTag.article_id, articleId));
      if (item.categories) {
        await db
          .insert(ArticleToTag)
          .values(
            item.categories.map((categoryName: string) => ({
              article_id: articleId,
              tag_name: categoryName,
            })),
          )
          .onConflictDoNothing();
      }
    }
  });
}

export const GET = withBearer(
  process.env.CRON_SECRET,
  async function (_: NextRequest) {
    const response = await fetch("https://medium.com/feed/proofer-blog", {
      cache: "no-store",
    });
    const responseText = await response.text();
    const feed = (await parser.parseString(responseText)) as unknown as Feed;
    if (feed.items.length === 0) return notFound();

    const lastArticle = (
      await dz.select().from(Article).orderBy(desc(Article.updated_at)).limit(1)
    )[0];
    if (
      !lastArticle ||
      dayjs(feed.lastBuildDate).isAfter(lastArticle.updated_at)
    ) {
      try {
        await insertArticles(feed.items.filter((i) => i !== undefined));
      } catch (e) {
        console.error(e);
      }
    }
    return NextResponse.json({});
  },
);
