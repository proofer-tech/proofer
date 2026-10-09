import React from "react";
import { Anchor, Container, Stack, Text, Title } from "@mantine/core";
import { generateMetadataFromTitle } from "@/src/manifest";

interface EndedService {
  name: string;
  subDomain: string;
  intro: string;
}

export function generateEndedMetadata({
  name,
  subDomain,
  intro,
}: EndedService) {
  return generateMetadataFromTitle(
    {
      title: `${name} 서비스 종료 안내`,
      fullTitle: `${name} 서비스 종료 안내`,
      description: `${name}는 2025년 4월에 종료된 서비스입니다. ${intro}`,
    },
    {
      alternates: { canonical: `https://${subDomain}.proofer.tech` },
      metadataBase: new URL(`https://${subDomain}.proofer.tech`),
      openGraph: {
        locale: "ko",
        type: "website",
        url: `https://${subDomain}.proofer.tech`,
        images: [`/assets/images/${subDomain}/og-image.webp`],
      },
    },
  );
}

export default function ServiceEnded({ name, intro }: EndedService) {
  return (
    <Container h={"100vh"} display={"flex"} style={{ alignItems: "center" }}>
      <Stack gap={"md"} align={"center"} w={"100%"}>
        <Text c={"var(--mantine-color-gray-7)"}>종료된 서비스</Text>
        <Title order={1} ta={"center"}>
          {name}
        </Title>
        <Text ta={"center"} maw={"36em"}>
          {intro}
        </Text>
        <Text ta={"center"} c={"var(--mantine-color-gray-7)"}>
          이 서비스는 2025년 4월에 종료되었습니다.
        </Text>
        <Anchor href={"https://proofer.tech"}>proofer.tech 로 이동하기</Anchor>
      </Stack>
    </Container>
  );
}
