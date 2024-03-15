"use client";
import React, { useContext } from "react";
import { Box, Group, Image, Stack, Title } from "@mantine/core";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";

export default function Page() {
  const { workspace } = useContext(ProoferInsightContext);

  return (
    <Group>
      <Stack w={"30%"}>
        <Group justify={"space-between"}>
          <Box>
            {workspace?.instance.logoUrl ? (
              <Image
                src={workspace?.instance.logoUrl}
                alt={workspace?.instance.name}
                height={"32px"}
              />
            ) : (
              <Title order={3}>
                {"<"}회사로고{"/>"}
              </Title>
            )}
          </Box>
          <Box>버튼</Box>
        </Group>
        <Group>{workspace?.instance.name}</Group>
      </Stack>
      <Stack></Stack>
    </Group>
  );
}
