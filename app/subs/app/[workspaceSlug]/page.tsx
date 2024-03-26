"use client";
import React, { useContext } from "react";
import { Box, Group, Image, Stack, Text } from "@mantine/core";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";

export default function Page() {
  const { workspace } = useContext(ProoferInsightContext);

  return (
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
  );
}
