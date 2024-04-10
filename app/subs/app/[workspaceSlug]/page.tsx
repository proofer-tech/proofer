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
              {workspace?.instance.logo_url && (
                <Image
                  src={workspace?.instance.logo_url}
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
            alt={"integrations"}
            w={"10em"}
          />
          <Title order={1} ta={"center"}>
            Are your developers doing their jobs well?
          </Title>
          <Group>
            <IconSquareArrowLeft size={"1em"} />
            <Text>
              Click the menu on the left to check out various insights!
            </Text>
          </Group>
        </Stack>
      </Center>
    </Stack>
  );
}
