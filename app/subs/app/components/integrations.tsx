import { Avatar, Badge, Card, Group, Text } from "@mantine/core";
import React from "react";
import { IntegrationDto } from "@/src/data/integration";

interface IntegrationHorizontalCardProps {
  integration: IntegrationDto;
}
export function IntegrationHorizontalCard({
  integration,
}: IntegrationHorizontalCardProps) {
  return (
    <Card
      withBorder
      shadow={integration.is_implemented ? "xs" : undefined}
      radius="md"
      w={"100%"}
      style={{ opacity: integration.is_implemented ? 1 : 0.4 }}
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between" wrap={"nowrap"}>
          <Group justify="space-between" w={"100%"} wrap={"nowrap"}>
            <Group>
              <Avatar src={integration.icon_url} alt="it's me" />
              <Text fw={700}>{integration.name}</Text>
            </Group>
            <Group justify={"end"} gap={"1ex"}>
              {integration.tags.map((t) => (
                <Badge key={t.id} variant="light" color={t.color || undefined}>
                  {t.name}
                </Badge>
              ))}
            </Group>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
