import { Container } from "@mantine/core";
import ArticlePage from "@/app/subs/blog/[...articlePath]/ArticlePage";
import {
  generateMetadataFromTitle,
  getTextOf,
  truncateDescription,
} from "@/src/manifest";
import { Metadata, ResolvingMetadata } from "next";
import { getArticlesWithTags } from "@/src/data/blog";
import * as cheerio from "cheerio";
import { generateUrl, getURLFromHeaderList } from "@/src/path";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextHandlerContext, PageProps } from "@/src/types/general";
import { SUB_DOMAIN } from "@/src/constants";
import React from "react";
import Head from "next/head";

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
    const root = cheerio.load(article.contents);
    return generateMetadataFromTitle(
      {
        title: "프루퍼",
        shortTitle: article.title,
        fullTitle: article.title,
        description: truncateDescription(article.contents),
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
    );
  }

  return parentMetadata;
}

export default async function Page({ params }: PageProps) {
  const { articlePath } = params;
  const [slug, ...path] = articlePath;
  if (path.length > 0) {
    const headerList = headers();
    const url = getURLFromHeaderList(headerList);

    // sld.tld 로 치환
    url.hostname = url.hostname.split(".").slice(-2).join(".");
    const newURL = new URL("/" + path.join("/"), url.toString()).toString();

    return redirect(newURL);
  }
  const articles = await getArticlesWithTags({ slug });
  const article = articles[0];

  return (
    <>
      <script
        id={"test"}
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
            name: `${article.title} - 프루퍼 블로그`,
            description: truncateDescription(article.contents),
            identifier: article.slug,
            author: {
              "@type": "Person",
              name: `${article.author} (proofer)`,
              url: "https://medium.com/proofer-blog",
            },
            creator: [`${article.author} (proofer)`],
            publisher: {
              "@type": "Organization",
              name: "프루퍼 블로그",
              url: generateUrl("/", SUB_DOMAIN.blog),
              logo: {
                "@type": "ImageObject",
                width: 308,
                height: 60,
                url: generateUrl("/assets/images/ic_launcher.png"),
              },
            },
            mainEntityOfPage: generateUrl(`/${article.slug}`, SUB_DOMAIN.blog),
            wordCount: getTextOf(article.contents).length,
          }),
        }}
      />
      <Container key={article.id}>
        <ArticlePage article={article} />
      </Container>
    </>
  );
}
