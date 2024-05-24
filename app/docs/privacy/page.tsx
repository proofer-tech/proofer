import {
  Container,
  Stack,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import React from "react";
import NotionPageToHtml from "notion-page-to-html";
import { cached } from "@/src/redis";

const getCachedPrivacyPage = cached(
  async function getPrivacyPage() {
    const { title, html } = await NotionPageToHtml.convert(
      "https://www.notion.so/7f1752d2fb9c40f09c86ffc2cf1b74b3",
      { bodyContentOnly: true },
    );
    return {
      title,
      html,
    };
  },
  { ex: 60 * 60 * 24 },
);

export default async function PrivacyPage() {
  const { title, html } = await getCachedPrivacyPage();
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
