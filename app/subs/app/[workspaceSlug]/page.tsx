"use client";
import React, { useContext } from "react";
import { Box, Center, Group, Image, Stack, Text, Title } from "@mantine/core";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import { IconSquareArrowLeft } from "@tabler/icons-react";

export default function Page() {
  const { workspace } = useContext(ProoferInsightContext);

  return (
    <Stack>
      <Group>
        <Stack w={"30%"}>
          <Group>
            <Box>
              {workspace?.instance.logoUrl && (
                <Image
                  src={workspace?.instance.logoUrl}
                  alt={workspace?.instance.name}
                  height={"32px"}
                />
              )}
            </Box>
            <Text fw={700}>{workspace?.instance.name}</Text>
          </Group>
        </Stack>
        <Stack></Stack>
      </Group>
      <Center h={"80vh"}>
        <Stack align={"center"}>
          <Image
            src={"/assets/images/integrations.png"}
            alt={"연동"}
            w={"10em"}
          />
          <Title order={1} ta={"center"}>
            우리 개발자가 어떻게 일하고 있는지 궁금하다면?
          </Title>
          <Group>
            <IconSquareArrowLeft size={"1em"} />
            <Text>좌측 메뉴를 클릭하여 다양한 인사이트들을 확인해보세요!</Text>
          </Group>
        </Stack>
      </Center>
    </Stack>
  );
}
