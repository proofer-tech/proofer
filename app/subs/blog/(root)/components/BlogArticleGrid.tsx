"use client";
import {
  Anchor,
  Card,
  CardSection,
  Grid,
  GridCol,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import React from "react";
import { InferSelectModel } from "drizzle-orm";
import { Article } from "@/database/schemas/blog";
import { useIsMobileMedia, useIsTabletMedia } from "@/src/hooks/mediaQuery";
import Image from "next/image";

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
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <CardSection>
                <Image
                  src={article.image || "/assets/images/og-image-article.webp"}
                  width={1200}
                  height={630}
                  alt={article.title}
                  style={{ width: "100%", height: "auto" }}
                />
              </CardSection>
              <Group py={"md"}>
                <Title order={5}>{article.title}</Title>
                <Text size={"sm"}>{article.description}</Text>
              </Group>
            </Card>
          </Anchor>
        </GridCol>
      ))}
    </Grid>
  );
}
