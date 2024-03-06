"use client";
import React, { useEffect, useState } from "react";
import { Viewport } from "next";
import {
  Accordion,
  Anchor,
  AppShell,
  Avatar,
  Badge,
  Button,
  Center,
  Divider,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  Transition,
} from "@mantine/core";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import {
  useIsDesktopMedia,
  useIsMobileMedia,
  useIsTabletMedia,
} from "@/hooks/mediaQuery";
import { PageContext } from "@/app/hooks";
import "@mantine/charts/styles.css";
import {
  IconArrowMerge,
  IconHeadset,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
} from "@tabler/icons-react";
import { pathTree } from "@/app/app/tree";
import { ReactChannelIO, useChannelIOApi } from "react-channel-plugin";
import { usePathname } from "next/navigation";
import SettingsModal from "@/app/app/settings/modal";
import { settingsPathTree } from "@/app/app/settings/tree";
import { Path } from "@/app/app/components/types";

export const viewport: Viewport = {
  themeColor: "#0052cc",
  initialScale: 1,
  minimumScale: 1,
  width: "device-width",
  userScalable: false,
};

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

export default function AppLayout({ children }: { children: any }) {
  const pathBlocks = usePathname().split("/").slice(2);
  const isDesktopMedia = useIsDesktopMedia(true);
  const isTabletMedia = useIsTabletMedia(false);
  const isMobileMedia = useIsMobileMedia(false);

  const [isMounted, setIsMounted] = useState<boolean | undefined>(undefined);
  useEffect(() => setIsMounted(true), []);

  const collapseDisclosure = useDisclosure(false);
  const settingsDisclosure = useDisclosure(false);
  const [settingsModalPath, setSettingsModalPath] = useState<Path>();
  const openSettingModal = (path: Path) => {
    setSettingsModalPath(path);
    settingsDisclosure[1].open();
  };

  const workspace = {
    name: "팀 프루퍼",
    slug: "proofer",
  };

  const isNavLinkActive = (pathName: string, subPathName: string) =>
    pathBlocks.length === 2 &&
    pathBlocks.join("") === [pathName, subPathName].join("");

  return (
    <ReactChannelIO
      pluginKey={process.env.NEXT_PUBLIC_CHANNEL_ID_PLUGIN_KEY!}
      language="ko"
      autoBoot
    >
      <PageContext.Provider
        value={{
          userAgent: {
            isDesktop: isDesktopMedia ?? true,
            isMobile: isTabletMedia ?? false,
            isTablet: isMobileMedia ?? false,
          },
        }}
      >
        <AppShell
          navbar={{
            width: isMobileMedia ? "100%" : "100%",
            breakpoint: 0,
            collapsed: {
              mobile:
                collapseDisclosure[0] === null ? true : collapseDisclosure[0],
              desktop: collapseDisclosure[0],
            },
          }}
          style={{ display: "flex", justifyContent: "flex-start", gap: 0 }}
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
                  <Anchor href={"/"} underline="never" fz={0}>
                    <Image
                      src="/images/branding.svg"
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
                {isMounted ?? (
                  <Stack align={"center"}>
                    <Avatar />
                    <IconArrowMerge size={"1em"} />
                    <Avatar.Group
                      style={{
                        alignItems: "center",
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar />
                      <Avatar />
                      <Avatar />
                      <Avatar>+@</Avatar>
                    </Avatar.Group>
                  </Stack>
                )}
                <Transition
                  mounted={!!isMounted}
                  transition="fade"
                  duration={400}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <Stack style={styles} align={"center"}>
                      <Avatar
                        src={`https://randomuser.me/api/portraits/men/${Math.round(Math.random() * 50 + 1)}.jpg`}
                        style={{
                          border: "3px solid var(--color-primary)",
                        }}
                      />
                      <IconArrowMerge size={"1em"} />
                      <Avatar.Group
                        style={{
                          alignItems: "center",
                          width: "100%",
                          flexDirection: "column",
                        }}
                      >
                        <Avatar
                          src={`https://randomuser.me/api/portraits/men/${Math.round(Math.random() * 50 + 1)}.jpg`}
                        />
                        <Avatar
                          src={`https://randomuser.me/api/portraits/men/${Math.round(Math.random() * 50 + 1)}.jpg`}
                        />
                        <Avatar
                          src={`https://randomuser.me/api/portraits/men/${Math.round(Math.random() * 50 + 1)}.jpg`}
                        />
                        <Avatar>+5</Avatar>
                      </Avatar.Group>
                    </Stack>
                  )}
                </Transition>
                <Menu withArrow>
                  <Menu.Target>
                    <Avatar
                      src={
                        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                      }
                      style={{
                        border: "2px solid var(--color-secondary)",
                      }}
                    />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>계정</Menu.Label>
                    <Menu.Item>
                      <Group gap={16}>
                        <Avatar
                          src={
                            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                          }
                        />
                        <Stack gap={0}>
                          <Text size={"sm"}>임한솔</Text>
                          <Text size={"xs"} c={"dimmed"}>
                            hsol@campersground.kr
                          </Text>
                        </Stack>
                      </Group>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Label>업그레이드</Menu.Label>
                    <Menu.Item>
                      <Group justify={"space-between"}>
                        <Text size={"sm"}>
                          Professional 플랜을 사용해 보세요
                        </Text>
                        <Badge size={"xs"}>무료 14일 평가판</Badge>
                      </Group>
                    </Menu.Item>
                    <Menu.Divider />
                    {Object.entries(settingsPathTree).map(
                      ([pathName, path]) => (
                        <Menu.Item
                          key={pathName}
                          component="button"
                          onClick={() => openSettingModal(path)}
                        >
                          <Group>
                            {path.tablerIcon && (
                              <path.tablerIcon size={"1em"} />
                            )}
                            <Text size={"sm"}>{path.title}</Text>
                          </Group>
                        </Menu.Item>
                      ),
                    )}
                    <Menu.Divider />
                    <Menu.Item c={"red"}>로그아웃</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
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
                  <Text fw={700}>{workspace.name}</Text>
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
                        .filter(
                          ([k, v]) => v.isImplemented || k === pathBlocks[0],
                        )
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
                                    href={`/${workspace.slug}/${pathName}/${subPathName}`}
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
          fullScreen={!isDesktopMedia}
          path={settingsModalPath}
          opened={settingsDisclosure[0]}
          onClose={() => settingsDisclosure[1].close()}
        />
      </PageContext.Provider>
    </ReactChannelIO>
  );
}
