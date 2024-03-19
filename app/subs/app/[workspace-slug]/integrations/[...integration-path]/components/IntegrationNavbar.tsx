"use client";
import { Avatar, Badge, Card, Group, Stack, Text } from "@mantine/core";
import React from "react";
import { InferSelectModel } from "drizzle-orm";
import { Integration, IntegrationTag } from "@/database/schemas/integration";

interface IntegrationNavbarProps {
  integration: InferSelectModel<typeof Integration>;
  integrationTags: InferSelectModel<typeof IntegrationTag>[];
  button?: React.ReactNode;
}
export default function IntegrationNavbar({
  integration,
  integrationTags,
  button,
}: IntegrationNavbarProps) {
  return (
    <Card withBorder radius="md" w={"20em"}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group bg={"white"}>
          <Avatar src={integration.iconUrl} />
          <Text fw={700}>{integration.name}</Text>
        </Group>
      </Card.Section>
      <Card.Section withBorder inheritPadding py="lg" h={"100%"}>
        <Stack gap={"2em"}>
          <Stack gap={"1ex"}>
            <Text fw={700} size={"xs"}>
              태그:
            </Text>
            <Group gap={"1ex"}>
              {integrationTags.map((t) => (
                <Badge
                  key={t.id}
                  variant="light"
                  color={t.color || undefined}
                  size={"sm"}
                >
                  {t.name}
                </Badge>
              ))}
            </Group>
          </Stack>
          <Stack gap={"1ex"}>
            <Text fw={700} size={"xs"}>
              카테고리:
            </Text>
            <Text size={"sm"}>{integration.categoryStr}</Text>
          </Stack>
          <Stack gap={"1ex"}>
            <Text fw={700} size={"xs"}>
              한줄소개:
            </Text>
            <Text size={"sm"} c={"var(--mantine-color-gray-8)"}>
              {integration.description}
            </Text>
          </Stack>
        </Stack>
      </Card.Section>
      {button && (
        <Card.Section inheritPadding py="xs">
          {button}
        </Card.Section>
      )}
    </Card>
  );
}
