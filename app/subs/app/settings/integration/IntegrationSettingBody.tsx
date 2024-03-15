import React, { useContext } from "react";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import {
  ActionIcon,
  Avatar,
  Card,
  Center,
  Group,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

export default function IntegrationSettingsBody() {
  const { workspace } = useContext(ProoferInsightContext);
  if (workspace === undefined) {
    return <NeedToSelectWorkspace serviceName={"워크스페이스 설정"} />;
  }

  return (
    <Center w={"100%"}>
      <Stack align={"center"} c={"var(--mantine-color-gray-6"} w={"100%"}>
        <Card withBorder shadow="sm" radius="md" w={"100%"}>
          <Card.Section withBorder inheritPadding py="xs">
            <Group justify="space-between">
              <Avatar src="avatar.png" alt="it's me" />
              <Text fw={500}>GitHub</Text>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots size={"1em"} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown></Menu.Dropdown>
              </Menu>
            </Group>
          </Card.Section>
        </Card>
      </Stack>
    </Center>
  );
}
