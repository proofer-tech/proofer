"use client";
import React, { useState } from "react";
import {
  Accordion,
  Anchor,
  AppShell,
  AppShellProps,
  Button,
  Center,
  Divider,
  Group,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/charts/styles.css";
import {
  IconHeadset,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
} from "@tabler/icons-react";
import { pathTree } from "@/app/subs/app/tree";
import { ReactChannelIO, useChannelIOApi } from "react-channel-plugin";
import SettingsModal from "@/app/subs/app/settings/modal";
import { Path } from "@/app/subs/app/components/types";
import UserMenu from "@/app/subs/app/components/UserMenu";
import { getAppPathBlocks, generateAppPath } from "@/src/path";
import TargetAvatarGroup from "@/app/subs/app/components/TargetAvatarGroup";
import { usePathname } from "next/navigation";
import { Workspace, WorkspaceMember } from "@/database/workspace/schema";
import { InferSelectModel } from "drizzle-orm";
import { UserDto } from "@/app/subs/app/dto/user";

function NeedHelpNavLink() {
  const { showMessenger } = useChannelIOApi();
  return (
    <NavLink
      href="#"
      label="도움이 필요하신가요?"
      leftSection={<IconHeadset size={"1em"} />}
      onClick={() => showMessenger()}
    />
  );
}

interface WorkspaceAppShellProps extends AppShellProps {
  user?: UserDto;
  workspace?: InferSelectModel<typeof Workspace>;
  member?: InferSelectModel<typeof WorkspaceMember>;
}

export default function WorkspaceAppShell({
  user,
  workspace,
  member,
  children,
  ...props
}: WorkspaceAppShellProps) {
  const pathname = usePathname();
  const [_, pathBlock, subPathBlock] = getAppPathBlocks(pathname);

  const collapseDisclosure = useDisclosure(false);
  const settingsDisclosure = useDisclosure(false);
  const [settingsModalPath, setSettingsModalPath] = useState<Path>();
  const openSettingModal = (path: Path) => {
    setSettingsModalPath(path);
    settingsDisclosure[1].open();
  };

  const isNavLinkActive = (pathName: string, subPathName: string) =>
    pathName === pathBlock && subPathName === subPathBlock;

  return (
    <ReactChannelIO
      pluginKey={process.env.NEXT_PUBLIC_CHANNEL_ID_PLUGIN_KEY!}
      language="ko"
      autoBoot
    >
      <AppShell
        navbar={{
          width: "100%",
          breakpoint: 0,
          collapsed: {
            mobile:
              collapseDisclosure[0] === null ? true : collapseDisclosure[0],
            desktop: collapseDisclosure[0],
          },
        }}
        style={{ display: "flex", justifyContent: "flex-start", gap: 0 }}
        {...props}
      >
        <Group
          gap={0}
          align={"start"}
          w={"auto"}
          h={"100dvh"}
          wrap={"nowrap"}
          style={{ flexShrink: 0 }}
        >
          <Stack
            gap={0}
            w={"4em"}
            h={"100%"}
            align={"center"}
            bg={"var(--mantine-color-white)"}
            style={{
              borderRight: "1px solid var(--mantine-color-gray-3)",
              position: "relative",
              zIndex: 300,
              flexShrink: 0,
            }}
          >
            <Center
              w={"100%"}
              h={"3.5em"}
              style={{
                borderBottom: "1px solid var(--mantine-color-gray-3)",
                flexShrink: 0,
              }}
            >
              {collapseDisclosure[0] ? (
                <Button
                  variant={"subtle"}
                  onClick={() => collapseDisclosure[1].toggle()}
                >
                  <IconLayoutSidebarRightCollapse
                    color={"var(--mantine-color-gray-6)"}
                  />
                </Button>
              ) : (
                <Anchor href={generateAppPath("/")} underline="never" fz={0}>
                  <Image
                    src="/assets/images/branding.svg"
                    alt="프루퍼 로고"
                    width={24}
                    height={24}
                  />
                </Anchor>
              )}
            </Center>
            <Stack
              w={"100%"}
              h={"100%"}
              py={"1em"}
              justify={"space-between"}
              align={"center"}
            >
              <TargetAvatarGroup />
              <UserMenu
                user={user}
                member={member}
                onSettingClick={openSettingModal}
              />
            </Stack>
          </Stack>
          <AppShell.Navbar
            style={{
              position: collapseDisclosure[0] ? "fixed" : "relative",
              width: collapseDisclosure[0] ? "auto" : "100%",
            }}
          >
            <Stack gap={0} miw={"20em"} h={"100%"} align={"center"}>
              <Group
                pl={"1em"}
                pr={"0.5em"}
                w={"100%"}
                h={"3.5em"}
                justify={"space-between"}
                align={"center"}
                style={{
                  borderBottom: "1px solid var(--mantine-color-gray-3)",
                  flexShrink: 0,
                }}
              >
                <Text fw={700}>
                  {workspace ? workspace.title : "워크스페이스를 선택해주세요"}
                </Text>
                <Button
                  variant={"subtle"}
                  onClick={() => collapseDisclosure[1].toggle()}
                >
                  {collapseDisclosure[0] ? (
                    <IconLayoutSidebarRightCollapse
                      color={"var(--mantine-color-gray-6)"}
                    />
                  ) : (
                    <IconLayoutSidebarLeftCollapse
                      color={"var(--mantine-color-gray-6)"}
                    />
                  )}
                </Button>
              </Group>
              <Stack
                w={"100%"}
                h={"100%"}
                justify={"space-between"}
                style={{
                  ...(collapseDisclosure[0] ? { display: "none" } : {}),
                }}
              >
                <ScrollArea>
                  <Accordion
                    multiple
                    defaultValue={Object.entries(pathTree)
                      .filter(([k, v]) => v.isImplemented || k === pathBlock)
                      .map(([k]) => k)}
                  >
                    {Object.entries(pathTree).map(([pathName, path], idx) => (
                      <Accordion.Item
                        key={pathName}
                        value={pathName}
                        style={
                          idx + 1 === Object.keys(pathTree).length
                            ? { borderBottom: "none" }
                            : {}
                        }
                      >
                        <Accordion.Control
                          icon={
                            path.tablerIcon && (
                              <Center
                                p={"0.3em"}
                                bg={"var(--mantine-color-gray-2)"}
                                style={{ borderRadius: "4px" }}
                              >
                                <path.tablerIcon
                                  size={"1em"}
                                  color={
                                    path.isImplemented
                                      ? "var(--mantine-color-gray-8)"
                                      : "var(--mantine-color-gray-6)"
                                  }
                                />
                              </Center>
                            )
                          }
                        >
                          <Text
                            fw={700}
                            c={
                              path.isImplemented
                                ? "var(--mantine-color-gray-8)"
                                : "var(--mantine-color-gray-6)"
                            }
                          >
                            {path.title}
                          </Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                          {path.subTree &&
                            Object.entries(path.subTree).map(
                              ([subPathName, subPath]) => (
                                <NavLink
                                  key={`${pathName}/${subPathName}`}
                                  href={
                                    workspace
                                      ? generateAppPath(
                                          `/${pathName}/${subPathName}`,
                                          workspace,
                                        )
                                      : "#"
                                  }
                                  leftSection={
                                    subPath.tablerIcon && (
                                      <subPath.tablerIcon
                                        size={"1em"}
                                        color={
                                          subPath.isImplemented
                                            ? "var(--mantine-color-gray-6)"
                                            : "var(--mantine-color-gray-4)"
                                        }
                                      />
                                    )
                                  }
                                  style={{
                                    paddingLeft: "1em",
                                    marginLeft: "1em",
                                    borderLeft:
                                      "1px solid var(--mantine-color-gray-3)",
                                  }}
                                  label={subPath.title}
                                  c={
                                    subPath.isImplemented
                                      ? "var(--mantine-color-gray-8)"
                                      : "var(--mantine-color-gray-4)"
                                  }
                                  active={isNavLinkActive(
                                    pathName,
                                    subPathName,
                                  )}
                                />
                              ),
                            )}
                        </Accordion.Panel>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </ScrollArea>
                <Stack gap={0}>
                  <Divider />
                  <NeedHelpNavLink />
                </Stack>
              </Stack>
            </Stack>
          </AppShell.Navbar>
        </Group>
        <AppShell.Main
          w={"100%"}
          pl={0}
          h={"100dvh"}
          bg={"var(--mantine-color-gray-0)"}
        >
          <ScrollArea px={"2em"} py={"3em"} h={"100%"}>
            {children}
          </ScrollArea>
        </AppShell.Main>
      </AppShell>
      <SettingsModal
        path={settingsModalPath}
        opened={settingsDisclosure[0]}
        onClose={() => settingsDisclosure[1].close()}
      />
    </ReactChannelIO>
  );
}
