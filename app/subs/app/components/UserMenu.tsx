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
import { settingsPathTree } from "@/app/subs/app/settings/tree";
import React from "react";
import { UserContext } from "@auth0/nextjs-auth0/client";
import { Path } from "./types";

interface UserMenuProps extends MenuProps {
  userContext: UserContext;
  onSettingClick: (path: Path) => void;
}
export default function UserMenu({
  userContext,
  onSettingClick,
}: UserMenuProps) {
  return (
    <Menu withArrow>
      <Menu.Target>
        <Anchor
          href={
            !userContext.isLoading &&
            !userContext.error &&
            userContext.user === undefined
              ? "/api/auth/login"
              : "#"
          }
          underline={"never"}
        >
          <Avatar
            src={userContext.user?.picture}
            style={{
              border: "2px solid var(--color-secondary)",
            }}
          />
        </Anchor>
      </Menu.Target>
      {userContext.isLoading ? (
        <></>
      ) : userContext.error ? (
        <></>
      ) : userContext.user === undefined ? (
        <Menu.Dropdown>
          <Menu.Label>로그인 페이지로 이동중입니다.</Menu.Label>
        </Menu.Dropdown>
      ) : (
        <Menu.Dropdown>
          <Menu.Label>계정</Menu.Label>
          <Menu.Item>
            <Group gap={16}>
              <Avatar src={userContext.user.picture} />
              <Stack gap={0}>
                <Text size={"sm"}>{userContext.user.name}</Text>
                <Text size={"xs"} c={"dimmed"}>
                  {userContext.user.email}
                </Text>
              </Stack>
            </Group>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>업그레이드</Menu.Label>
          <Menu.Item component={"a"} href={"https://proofer.tech#price"}>
            <Group justify={"space-between"}>
              <Text size={"sm"}>Professional 플랜을 사용해 보세요</Text>
              <Badge size={"xs"}>무료 14일 평가판</Badge>
            </Group>
          </Menu.Item>
          <Menu.Divider />
          {Object.entries(settingsPathTree).map(([pathName, path]) => (
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
          <Menu.Divider />
          <Menu.Item>
            <Anchor c={"red"} href={"/api/auth/logout"}>
              로그아웃
            </Anchor>
          </Menu.Item>
        </Menu.Dropdown>
      )}
    </Menu>
  );
}
