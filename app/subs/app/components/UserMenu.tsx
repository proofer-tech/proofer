import {
  Anchor,
  Avatar,
  Badge,
  Group,
  Menu,
  MenuProps,
  Stack,
  Text,
} from "@mantine/core";
import { SettingPath, settingTree } from "@/app/subs/app/settings/tree";
import React, { useContext } from "react";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import { canManageWorkspace } from "@/src/services/role";
import { generateAppPath } from "@/src/path";

interface UserMenuProps extends MenuProps {
  onSettingClick: (path: SettingPath) => void;
}
export default function UserMenu({ onSettingClick }: UserMenuProps) {
  const { user, workspace } = useContext(ProoferInsightContext);
  return (
    <Menu withArrow>
      {user === undefined ? (
        <>
          <Menu.Target>
            <Anchor
              href={"/auth/login"}
              underline={"never"}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={""}
                style={{
                  border: "2px solid var(--color-secondary)",
                }}
              />
            </Anchor>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Redirecting to login page.</Menu.Label>
          </Menu.Dropdown>
        </>
      ) : (
        <>
          <Menu.Target>
            <Avatar
              src={user.picture}
              style={{
                border: "2px solid var(--color-secondary)",
                cursor: "pointer",
              }}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item>
              <Group gap={16}>
                <Avatar src={user.picture} />
                <Stack gap={0}>
                  <Text size={"sm"}>{user.nickname}</Text>
                  <Text size={"xs"} c={"dimmed"}>
                    {user.email}
                  </Text>
                </Stack>
              </Group>
            </Menu.Item>
            {canManageWorkspace(workspace?.member?.role) ? (
              <>
                <Menu.Divider />
                <Menu.Label>Upgrade</Menu.Label>
                <Menu.Item component={"a"} href={"https://proofer.tech#price"}>
                  <Group justify={"space-between"}>
                    <Text size={"sm"}>Try the Professional plan</Text>
                    <Badge size={"xs"}>Free 14-day trial</Badge>
                  </Group>
                </Menu.Item>
                <Menu.Divider />
                {Object.entries(settingTree).map(([pathName, path]) => (
                  <Menu.Item
                    key={pathName}
                    component="button"
                    onClick={() => onSettingClick(path)}
                  >
                    <Group>
                      {path.tablerIcon && <path.tablerIcon size={"1em"} />}
                      <Text size={"sm"}>{path.title}</Text>
                    </Group>
                  </Menu.Item>
                ))}
              </>
            ) : (
              ""
            )}
            <Menu.Divider />
            <Menu.Item component={"a"} href={generateAppPath(`/`)}>
              Switch workspace
            </Menu.Item>
            <Menu.Item component={"a"} href={`/api/auth/logout`} c={"red"}>
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </>
      )}
    </Menu>
  );
}
