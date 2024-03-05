"use client";
import { usePathname } from "next/navigation";
import { pathTree } from "@/app/app/tree";
import {
  Anchor,
  Box,
  Breadcrumbs,
  Center,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";

export default function MainLayout({ children }: { children: any }) {
  const pathname = usePathname();
  const pathBlocks = pathname.split("/").slice(2);
  const path = pathTree[pathBlocks[0]];
  const subPath = path.subTree![pathBlocks[1]];
  return (
    <Stack>
      <Stack>
        <Breadcrumbs separator={"-"}>
          <Group gap={"1ex"}>
            {path.tablerIcon && (
              <Center
                p={"0.3em"}
                bg={"var(--mantine-color-gray-2)"}
                style={{ borderRadius: "4px" }}
              >
                <path.tablerIcon
                  size={"1em"}
                  color={"var(--mantine-color-gray-8)"}
                />
              </Center>
            )}
            <Text>{path.title}</Text>
          </Group>
        </Breadcrumbs>
        <Title order={1}>{subPath.title}</Title>
      </Stack>
      <Divider w={"100%"} />
      <Box>{children}</Box>
    </Stack>
  );
}
