import { Group, Progress, Stack, Text } from "@mantine/core";
import React from "react";
import { IconAntennaBars5 } from "@tabler/icons-react";

interface StrengthCardProps {
  title: string;
  description: string;
  value: number;
  maxValue: number;
  unit: string;
  color: string;
}
export default function StrengthCard(props: StrengthCardProps) {
  return (
    <Stack w={"100%"}>
      <Text>{props.title}</Text>
      <Text fw={700}>
        {props.value}
        {props.unit}
      </Text>
      <Group wrap={"nowrap"}>
        <IconAntennaBars5 size={"1em"} />
        <Progress
          w={"100%"}
          color={props.color}
          value={(props.value / props.maxValue) * 100}
        />
      </Group>
      <Text size={"xs"} c={"var(--mantine-color-gray-6)"}>
        {props.description}
      </Text>
    </Stack>
  );
}
