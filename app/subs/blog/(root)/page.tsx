import { Container, Group, Space, Stack } from "@mantine/core";
import { getPublishedArticles } from "@/src/data/blog";
import { SUB_DOMAIN, SUB_DOMAIN_NAMES } from "@/src/constants";
import organizationSchema from "@/app/subs/blog/schema-organization";
import { generateMetadataFromTitle } from "@/src/manifest";
import { merge } from "lodash";
import React from "react";
import BlogPagination from "@/app/subs/blog/(root)/components/BlogPagination";
import BlogSearchInput from "@/app/subs/blog/(root)/components/BlogSearchInput";
import NotFoundPage from "@/app/components/errors/NotFoundPage";
import BlogArticleGrid from "@/app/subs/blog/(root)/components/BlogArticleGrid";
import { PageProps } from "@/src/types/general";

export const metadata = merge(
  {
    alternates: {
      canonical: "https://blog.proofer.tech",
    },
  },
  generateMetadataFromTitle({
    applicationName: SUB_DOMAIN_NAMES[SUB_DOMAIN.blog],
    description:
      "진짜 업무 데이터를 활용하는 성과 측정/평가/관리 통합 솔루션 프루퍼의 블로그입니다.",
  }),
);

export default async function Page({ searchParams }: PageProps) {
  const { page, q } = searchParams;
  const currentPage = parseInt((page as string) || "1");
  const searchQuery = (q || "") as string;

  const { total, articles } = await getPublishedArticles(
    currentPage,
    8,
    searchQuery,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...organizationSchema,
          }),
        }}
      />
      <Container pb={"5em"}>
        <Space h={"xl"} />
        <Group justify={"end"} py={"xs"}>
          <BlogSearchInput query={searchQuery} queryKey={"q"} />
        </Group>
        <Stack align={"center"} gap={"xl"}>
          {articles.length === 0 ? (
            <NotFoundPage error={"아티클을 찾을 수 없습니다."} />
          ) : (
            <>
              <BlogArticleGrid articles={articles} />
              <BlogPagination page={currentPage} total={total} />
            </>
          )}
        </Stack>
      </Container>
    </>
  );
}
