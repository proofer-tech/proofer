import { Anchor, Button, Card, Container, Group, Space } from "@mantine/core";
import ArticlePage from "@/app/subs/blog/[...articlePath]/ArticlePage";
import { generateMetadataFromTitle, getTextOf } from "@/src/manifest";
import { Metadata, ResolvingMetadata } from "next";
import { getArticlesWithTags } from "@/src/data/blog";
import {
  generateSubdomainPath,
  generateUrl,
  getURLFromHeaderList,
} from "@/src/path";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextHandlerContext, PageProps } from "@/src/types/general";
import { SUB_DOMAIN, SUB_DOMAIN_NAMES } from "@/src/constants";
import React from "react";
import organizationSchema from "@/app/subs/blog/schema-organization";
import { NotFound, Unauthorized } from "http-errors";
import { merge } from "lodash";
import { IconChevronLeft } from "@tabler/icons-react";
import ShareIcons from "@/app/subs/blog/[...articlePath]/ShareIcons";
import { findUserFromSession } from "@/src/data/user";
import { dz } from "@/database/engine";
import { eq } from "drizzle-orm";
import { Article } from "@/database/schemas/blog";
import { clearCache } from "@/src/redis";

async function publishArticle(formData: FormData) {
  "use server";
  const slug = formData.get("slug") as string;
  await dz.transaction(async (db) => {
    const articles = await db
      .select({ id: Article.id })
      .from(Article)
      .where(eq(Article.slug, slug));
    if (articles.length === 0) throw NotFound();

    await db
      .update(Article)
      .set({ is_published: true })
      .where(eq(Article.slug, slug));
  });

  clearCache("getArticlesWithTags", { slug });
  redirect(generateSubdomainPath(`/${slug}`, SUB_DOMAIN.blog));
}
async function unPublishArticle(formData: FormData) {
  "use server";
  const slug = formData.get("slug") as string;
  await dz.transaction(async (db) => {
    const articles = await db
      .select({ id: Article.id })
      .from(Article)
      .where(eq(Article.slug, slug));
    if (articles.length === 0) throw NotFound();

    await db
      .update(Article)
      .set({ is_published: false })
      .where(eq(Article.slug, slug));
  });

  clearCache("getArticlesWithTags", { slug });
  redirect(generateSubdomainPath(`/${slug}`, SUB_DOMAIN.blog));
}

export async function generateMetadata(
  { params }: NextHandlerContext,
  parent: ResolvingMetadata,
): Promise<Metadata | ResolvingMetadata> {
  const { articlePath } = params;
  const [slug] = articlePath;
  const articles = await getArticlesWithTags({ slug });
  const article = articles[0];
  const parentMetadata = await parent;

  if (article) {
    return merge(
      {
        alternates: {
          canonical: `https://blog.proofer.tech/${article.slug}`,
        },
      },
      generateMetadataFromTitle(
        {
          title: article.title,
          applicationName: SUB_DOMAIN_NAMES[SUB_DOMAIN.blog],
          description: article.description || "",
        },
        {
          keywords: ["프루퍼", ...article.tags.map((tag) => tag.name)],
          openGraph: {
            type: "article",
            // @ts-ignore
            publishedTime: article.created_at,
            authors: [article.author, "프루퍼 (proofer)"],
            url: `https://blog.proofer.tech/${article.slug}`,
            tags: article.tags.map((tag) => tag.name),
          },
        },
      ),
    );
  }

  return parentMetadata;
}

export default async function Page({ params }: PageProps) {
  const { articlePath } = params;
  const [slug, ...path] = articlePath;

  const headerList = headers();
  const url = getURLFromHeaderList(headerList);

  if (path.length > 0) {
    // sld.tld 로 치환
    url.hostname = url.hostname.split(".").slice(-2).join(".");
    const newURL = new URL("/" + path.join("/"), url.toString()).toString();

    return redirect(newURL);
  }
  const articles = await getArticlesWithTags({ slug });
  const article = articles[0];

  if (!article) throw NotFound("블로그 아티클을 찾을 수 없습니다.");

  const user = await findUserFromSession();
  if (!article.is_published) {
    if (user === undefined)
      throw new Unauthorized("로그인이 필요한 페이지입니다.");
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            image: generateUrl("/assets/images/og-image.png"),
            url: generateUrl(`/${article.slug}`, SUB_DOMAIN.blog),
            dateCreated: article.created_at,
            datePublished: article.created_at,
            dateModified: article.updated_at,
            headline: article.title,
            name: `${article.title} - 프루퍼 ${SUB_DOMAIN_NAMES[SUB_DOMAIN.blog]}`,
            description: article.description || "",
            identifier: article.slug,
            author: {
              "@type": "Person",
              name: `${article.author} (proofer)`,
              url: "https://medium.com/proofer-blog",
            },
            creator: [`${article.author} (proofer)`],
            publisher: organizationSchema,
            mainEntityOfPage: generateUrl(`/${article.slug}`, SUB_DOMAIN.blog),
            wordCount: Math.max(getTextOf(article.contents || "").length, 100),
          }),
        }}
      />
      <Container>
        <Space h={"xl"} />
        <ArticlePage article={article} />
        <Card p={"md"} mt={"lg"} withBorder>
          <Group justify={"space-between"}>
            <Group>
              <Anchor href={generateSubdomainPath("/", SUB_DOMAIN.blog)}>
                <Button
                  leftSection={<IconChevronLeft size={"1em"} />}
                  variant="default"
                >
                  아티클 목록
                </Button>
              </Anchor>
              {user ? (
                <form
                  action={
                    article.is_published ? unPublishArticle : publishArticle
                  }
                >
                  <input type={"hidden"} name={"slug"} value={article.slug} />
                  <Button
                    type={"submit"}
                    variant={article.is_published ? "default" : "filled"}
                  >
                    {article.is_published ? "발행 취소하기" : "발행하기"}
                  </Button>
                </form>
              ) : (
                <></>
              )}
            </Group>
            <ShareIcons url={url.toString()} />
          </Group>
        </Card>
      </Container>
    </>
  );
}
