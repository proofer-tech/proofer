"use client";
import React, { useEffect, useState } from "react";
import type { Viewport } from "next";
import {
  Accordion,
  Anchor,
  AppShell,
  Avatar,
  Button,
  Center,
  Divider,
  Group,
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
import { pathTree, renderPathIcon } from "@/app/app/tree";
import { ReactChannelIO, useChannelIOApi } from "react-channel-plugin";
import { usePathname } from "next/navigation";

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
  const pathBlocks = usePathname().split("/").slice(1);
  const isDesktopMedia = useIsDesktopMedia(true);
  const isTabletMedia = useIsTabletMedia(false);
  const isMobileMedia = useIsMobileMedia(false);

  const [isMounted, setIsMounted] = useState<boolean | undefined>(undefined);
  useEffect(() => setIsMounted(true), []);

  const collapseDisclosure = useDisclosure();

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
            width: "15em",
            breakpoint: 0,
            collapsed: {
              mobile:
                collapseDisclosure[0] === null ? true : collapseDisclosure[0],
              desktop: collapseDisclosure[0],
            },
          }}
          style={{ display: "flex", justifyContent: "flex-start", gap: 0 }}
        >
          <AppShell.Navbar w={"auto"} style={{ position: "relative" }}>
            <AppShell.Section>
              <Group gap={0} align={"start"} h={"100dvh"} wrap={"nowrap"}>
                <Stack
                  gap={0}
                  w={"4em"}
                  h={"100%"}
                  align={"center"}
                  style={{
                    borderRight: "1px solid var(--mantine-color-gray-3)",
                    ...(collapseDisclosure[0] ? { display: "none" } : {}),
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
                    <Anchor href={"/app"} underline="never" fz={0}>
                      <Image
                        src="/images/branding.svg"
                        alt="프루퍼 로고"
                        width={24}
                        height={24}
                      />
                    </Anchor>
                  </Center>
                  <Stack w={"100%"} h={"100%"} py={"1em"}>
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
                  </Stack>
                </Stack>
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
                    <Text fw={700}>프루퍼 인사이트</Text>
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
                          .filter(([_, v]) => v.isImplemented)
                          .map(([k]) => k)}
                      >
                        {Object.entries(pathTree).map(([pathName, path]) => (
                          <Accordion.Item key={pathName} value={pathName}>
                            <Accordion.Control>
                              <Group>
                                <Center
                                  bg={"var(--mantine-color-gray-0)"}
                                  p={"0.5em"}
                                  style={{ borderRadius: "8px" }}
                                >
                                  {renderPathIcon(path, {
                                    size: "1em",
                                    color: path.isImplemented
                                      ? "var(--mantine-color-gray-8)"
                                      : "var(--mantine-color-gray-6)",
                                  })}
                                </Center>
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
                              </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                              {path.subTree &&
                                Object.entries(path.subTree).map(
                                  ([subPathName, subPath]) => (
                                    <NavLink
                                      key={`${pathName}/${subPathName}`}
                                      href={`/${pathName}/${subPathName}`}
                                      leftSection={renderPathIcon(subPath, {
                                        size: "1em",
                                        color: subPath.isImplemented
                                          ? "var(--mantine-color-gray-6)"
                                          : "var(--mantine-color-gray-4)",
                                      })}
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
              </Group>
            </AppShell.Section>
          </AppShell.Navbar>
          <AppShell.Main
            pl={0}
            w={"100%"}
            style={{ transform: "var(--app-shell-navbar-transform)" }}
          >
            {children}
          </AppShell.Main>
        </AppShell>
      </PageContext.Provider>
    </ReactChannelIO>
  );
}
