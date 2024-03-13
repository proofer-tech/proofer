"use client";
import React, { useContext } from "react";
import { Box, Group, Image, Stack, Title } from "@mantine/core";
import AppContext from "@/app/subs/app/contexts/AppContext";

export default function Page() {
  const context = useContext(AppContext);
  return (
    <Group>
      <Stack w={"30%"}>
        <Group justify={"space-between"}>
          <Box>
            {context.workspace?.instance.logoUrl ? (
              <Image
                src={context.workspace?.instance.logoUrl}
                alt={context.workspace?.instance.title}
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
        <Group>{context.workspace?.instance.title}</Group>
      </Stack>
      <Stack></Stack>
    </Group>
  );
}
