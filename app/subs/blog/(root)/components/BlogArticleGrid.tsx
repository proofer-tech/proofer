"use client";
import { Anchor, Grid, GridCol } from "@mantine/core";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import React from "react";
import { InferSelectModel } from "drizzle-orm";
import { Article } from "@/database/schemas/blog";
import { useIsMobileMedia, useIsTabletMedia } from "@/src/hooks/mediaQuery";
import BlogCard from "@/app/subs/blog/components/BlogCard";

interface BlogArticleGridProps {
  articles: InferSelectModel<typeof Article>[];
}
export default function BlogArticleGrid({ articles }: BlogArticleGridProps) {
  const [isMobile, isTablet] = [useIsMobileMedia(), useIsTabletMedia()];
  return (
    <Grid>
      {articles.map((article) => (
        <GridCol span={isMobile ? 12 : isTablet ? 6 : 4} key={article.id}>
          <Anchor
            w={"calc(50% - 0.5em)"}
            href={generateSubdomainPath(article.slug, SUB_DOMAIN.blog)}
            underline={"never"}
            c={"var(--mantine-color-gray-8)"}
          >
            <BlogCard
              thumbnail={
                article.image || "/assets/images/og-image-article.webp"
              }
              title={article.title}
              description={article.description || ""}
            />
          </Anchor>
        </GridCol>
      ))}
    </Grid>
  );
}
