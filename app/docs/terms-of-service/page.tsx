import {
  Container,
  Stack,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import React from "react";
import { getCachedTermsOfServicePage } from "@/src/notionPage";
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
