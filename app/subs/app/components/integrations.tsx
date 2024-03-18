import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import { IconDots, IconPlugConnectedX } from "@tabler/icons-react";
import React from "react";
interface IntegrationHorizontalCardProps {
  branding: string;
  disabled?: boolean;
}
export function IntegrationHorizontalCard({
  branding,
  disabled,
}: IntegrationHorizontalCardProps) {
  return (
    <Card
      withBorder
      shadow={disabled ? undefined : "xs"}
      radius="md"
      w={"100%"}
      style={{ opacity: disabled ? ".4" : 1 }}
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between" wrap={"nowrap"}>
          <Group justify="space-between" w={"100%"} wrap={"nowrap"}>
            <Group>
              <Avatar src={branding} alt="it's me" />
              <Text fw={700}>GitHub</Text>
            </Group>
            <Group justify={"end"} gap={"1ex"}>
              <Badge variant="light" color="gray">
                VCS
              </Badge>
              <Badge variant="light" color="gray">
                Activity
              </Badge>
            </Group>
          </Group>
          {!disabled ? (
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                  <IconDots size={"1em"} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  c={"red"}
                  leftSection={<IconPlugConnectedX size={"1em"} />}
                >
                  연동 해제하기
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            ""
          )}
        </Group>
      </Card.Section>
    </Card>
  );
}
