import { Stack, Text, Title } from "@mantine/core";
import React from "react";

interface CountCardProps {
  title: string;
  count: number;
  color: string;
}
export default function CountCard({ title, count, color }: CountCardProps) {
  return (
    <Stack justify={"start"} w={"100%"} gap={"0.5em"} pl={"1em"}>
      <Text size={"sm"}>{title}</Text>
      <Title order={2} c={color}>
        {count}
      </Title>
    </Stack>
  );
}
