import {
  Container,
  Stack,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import React from "react";
import "notion-page-to-html";
import NotionPageToHtml from "notion-page-to-html";
import { cached } from "@/src/redis";

const getCachedTermsOfServicePage = cached(
  async function getTermsOfServicePage() {
    const { title, html } = await NotionPageToHtml.convert(
      "https://www.notion.so/d9127501250a4a3bb1002f6792593d3e",
      { bodyContentOnly: true },
    );
    return {
      title,
      html,
    };
  },
  { ex: 60 * 60 * 24 },
);
export default async function TermsOfServicePage() {
  const { title, html } = await getCachedTermsOfServicePage();
  return (
    <Container>
      <Stack py={"xl"}>
        <Title order={1}>{title}</Title>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </TypographyStylesProvider>
      </Stack>
    </Container>
  );
}
