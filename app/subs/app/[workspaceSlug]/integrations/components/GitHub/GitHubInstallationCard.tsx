import { Avatar, Card, Group, Text } from "@mantine/core";
import React from "react";
import { InferSelectModel } from "drizzle-orm";
import { GitHubInstallation } from "@/database/schemas/github";

interface GitHubInstallationProps {
  installation: InferSelectModel<typeof GitHubInstallation>;
}
export default function GitHubInstallationCard({
  installation,
}: GitHubInstallationProps) {
  return (
    <Card withBorder radius="md" w={"100%"}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group>
          <Avatar src={installation.avatar_url} alt={installation.name} />
          <Text fw={700}>{installation.name}</Text>
        </Group>
      </Card.Section>
    </Card>
  );
}
