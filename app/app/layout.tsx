"use client";
import React, { useEffect, useState } from "react";
import type { Viewport } from "next";
import {
  Accordion,
  Anchor,
  AppShell,
  Avatar,
  Center,
  Divider,
  Group,
  Loader,
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
import { IconArrowMerge, IconHeadset } from "@tabler/icons-react";
import { pathTree, renderPathIcon } from "@/app/app/tree";
import { ReactChannelIO, useChannelIOApi } from "react-channel-plugin";

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
      onClick={() => {
        console.log("??");
        showMessenger();
      }}
    />
  );
}

export default function AppLayout({ children }: { children: any }) {
  const isDesktopMedia = useIsDesktopMedia(true);
  const isTabletMedia = useIsTabletMedia(false);
  const isMobileMedia = useIsMobileMedia(false);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => setIsMounted(true), []);

  const collapseDisclosure = useDisclosure(true);

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
            width: { sm: 200, lg: 300 },
            breakpoint: "sm",
            collapsed: { mobile: collapseDisclosure[0], desktop: false },
          }}
        >
          <AppShell.Navbar w={"auto"}>
            <Group gap={0} align={"start"} h={"100dvh"} wrap={"nowrap"}>
              <Stack
                gap={0}
                w={"4em"}
                h={"100%"}
                align={"center"}
                style={{
                  borderRight: "1px solid var(--mantine-color-gray-3)",
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
                {!isMounted ? <Loader color="blue" /> : ""}
                <Transition
                  mounted={isMounted}
                  transition="fade"
                  duration={400}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <Stack
                      style={styles}
                      w={"100%"}
                      h={"100%"}
                      align={"center"}
                      py={"1em"}
                    >
                      <Avatar
                        src={`https://randomuser.me/api/portraits/men/${Math.round(Math.random() * 50 + 1)}.jpg`}
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
              <Stack gap={0} miw={"20em"} h={"100%"} align={"center"}>
                <Group
                  px={"1em"}
                  w={"100%"}
                  h={"3.5em"}
                  align={"center"}
                  style={{
                    borderBottom: "1px solid var(--mantine-color-gray-3)",
                    flexShrink: 0,
                  }}
                >
                  <Text fw={700}>프루퍼 인사이트</Text>
                </Group>
                <Stack
                  w={"100%"}
                  h={"100%"}
                  p={"1em"}
                  justify={"space-between"}
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
                                    leftSection={renderPathIcon(subPath, {
                                      size: "1em",
                                      color: subPath.isImplemented
                                        ? "var(--mantine-color-gray-6)"
                                        : "var(--mantine-color-gray-4)",
                                    })}
                                    style={{
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
                                  />
                                ),
                              )}
                          </Accordion.Panel>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </ScrollArea>
                  <Stack>
                    <Divider />
                    <NeedHelpNavLink />
                  </Stack>
                </Stack>
              </Stack>
            </Group>
          </AppShell.Navbar>
          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </PageContext.Provider>
    </ReactChannelIO>
  );
}
