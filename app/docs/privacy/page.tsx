import {
  Container,
  Stack,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import React from "react";
import { getCachedPrivacyPage } from "@/src/notionPage";

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
