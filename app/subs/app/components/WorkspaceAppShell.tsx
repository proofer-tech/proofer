"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Accordion,
  Anchor,
  AppShell,
  AppShellProps,
  Box,
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
import UserMenu from "@/app/subs/app/components/UserMenu";
import { generateAppPath, getPathBlocks } from "@/src/path";
import SearchByMemberGroup, {
  useSearchByMemberSWR,
} from "@/app/subs/app/components/SearchByMemberGroup";
import { usePathname } from "next/navigation";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import { InferSelectModel } from "drizzle-orm";
import { UserDto } from "@/app/subs/app/dto/user";
import { Workspace, WorkspaceMember } from "@/database/schemas/workspace";
import {
  SettingsModal,
  SettingsModalContext,
  Triggers,
  useSettingsModal,
} from "@/app/subs/app/settings/modal";
import { useIsDesktopMedia } from "@/src/hooks/mediaQuery";
import {
  GlobalAlertConfig,
  GlobalAlertContext,
  GlobalAlertMold,
} from "@/app/components/GlobalAlert";
import { SUB_DOMAIN } from "@/src/constants";
import SearchByMemberContext from "@/src/modules/SearchBarControl/context";
import { SettingPath } from "@/app/subs/app/settings/tree";

function NeedHelpNavLink() {
  const { showMessenger } = useChannelIOApi();
  return (
    <NavLink
      href="#"
      label="Need for help?"
      leftSection={<IconHeadset size={"1em"} />}
      onClick={() => showMessenger()}
    />
  );
}

interface WorkspaceAppShellContextProps {
  isCollapsed: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
export const WorkspaceAppShellContext =
  createContext<WorkspaceAppShellContextProps>({
    isCollapsed: false,
    open: () => {},
    close: () => {},
    toggle: () => {},
  });

interface WorkspaceAppShellProps extends AppShellProps {
  user?: UserDto;
  workspace?: InferSelectModel<typeof Workspace>;
  member?: InferSelectModel<typeof WorkspaceMember>;
}

export function WorkspaceAppShellDisclosureProvider({ children }: any) {
  const collapseDisclosure = useDisclosure(true);
  const [isGlobalAlertMounted, setIsGlobalAlertMounted] =
    useState<boolean>(false);
  const [globalOption, setGlobalOption] = useState<GlobalAlertConfig>({
    variant: "white",
  });

  return (
    <WorkspaceAppShellContext.Provider
      value={{
        isCollapsed: collapseDisclosure[0],
        open: collapseDisclosure[1].open,
        close: collapseDisclosure[1].close,
        toggle: collapseDisclosure[1].toggle,
      }}
    >
      <GlobalAlertContext.Provider
        value={{
          options: globalOption,
          open: (config) => {
            setGlobalOption(Object.assign(globalOption, config));
            setIsGlobalAlertMounted(true);
          },
          close: () => setIsGlobalAlertMounted(false),
        }}
      >
        {children}
        <GlobalAlertMold mounted={isGlobalAlertMounted} />
      </GlobalAlertContext.Provider>
    </WorkspaceAppShellContext.Provider>
  );
}

export default function WorkspaceAppShell({
  user,
  workspace,
  member,
  children,
  ...props
}: WorkspaceAppShellProps) {
  const pathname = usePathname();
  const [_, pathBlock, subPathBlock] = getPathBlocks(pathname, SUB_DOMAIN.app);
  const settingsModal = useSettingsModal();
  const isDesktopMedia = !!useIsDesktopMedia(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [triggerToken, setTriggerToken] = useState<Triggers>("");

  const appShellContext = useContext(WorkspaceAppShellContext);

  const openSettingModal = (path: SettingPath) => {
    settingsModal.setWithSubmit(path.canSubmit);
    settingsModal.setPath(path);
    settingsModal.disclosure.open();
  };

  const isNavLinkActive = (pathName: string, subPathName: string) =>
    pathName === pathBlock && subPathName === subPathBlock;
  const { target, relations, setTarget, setRelations, isLoading } =
    useSearchByMemberSWR(workspace);

  useEffect(() => setIsMounted(true), []);

  return (
    <ReactChannelIO
      pluginKey={process.env.NEXT_PUBLIC_CHANNEL_ID_PLUGIN_KEY!}
      language="ko"
      autoBoot
    >
      <ProoferInsightContext.Provider
        value={{
          isMounted: isMounted,
          user: user,
          workspace: workspace && { instance: workspace, member: member },
        }}
      >
        <SettingsModalContext.Provider
          value={{
            path: settingsModal.path,
            setPath: settingsModal.setPath,

            opened: settingsModal.opened,
            withSubmit: settingsModal.withSubmit,
            setWithSubmit: settingsModal.setWithSubmit,

            open: settingsModal.disclosure.open,
            close: settingsModal.disclosure.close,
            toggle: settingsModal.disclosure.toggle,

            fullScreen: !isDesktopMedia,

            triggered: triggerToken,
            trigger: setTriggerToken,
          }}
        >
          <SearchByMemberContext.Provider
            value={{
              target,
              setTarget,
              relations,
              setRelations,
              isLoading: isLoading,
            }}
          >
            <AppShell
              navbar={{
                width: "100%",
                breakpoint: 0,
                collapsed: {
                  mobile: !appShellContext.isCollapsed,
                  desktop: !appShellContext.isCollapsed,
                },
              }}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 0,
              }}
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
                  justify={"start"}
                  align={"center"}
                  bg={"var(--mantine-color-white)"}
                  style={{
                    borderRight: "1px solid var(--mantine-color-gray-3)",
                    position: "relative",
                    zIndex: 201,
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
                    {appShellContext.isCollapsed ? (
                      <Anchor
                        href={generateAppPath("/", workspace?.slug)}
                        underline="never"
                        fz={0}
                      >
                        <Image
                          src="/assets/images/branding.svg"
                          alt="logo"
                          width={24}
                          height={24}
                        />
                      </Anchor>
                    ) : (
                      <Button
                        variant={"subtle"}
                        onClick={() => appShellContext.toggle()}
                      >
                        <IconLayoutSidebarRightCollapse
                          color={"var(--mantine-color-gray-6)"}
                        />
                      </Button>
                    )}
                  </Center>
                  <Stack
                    w={"100%"}
                    h={"100%"}
                    py={"1em"}
                    justify={"space-between"}
                    align={"center"}
                  >
                    <SearchByMemberGroup vertical={true} />
                    <UserMenu onSettingClick={openSettingModal} />
                  </Stack>
                </Stack>
                <AppShell.Navbar
                  w={"20em"}
                  style={{
                    position: appShellContext.isCollapsed
                      ? "relative"
                      : "fixed",
                    width: appShellContext.isCollapsed ? "100%" : "auto",
                  }}
                >
                  <Stack gap={0} h={"100%"} align={"center"}>
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
                        {workspace
                          ? workspace.name
                          : "Choose workspace to get insight"}
                      </Text>
                      <Button
                        variant={"subtle"}
                        onClick={() => appShellContext.toggle()}
                      >
                        {appShellContext.isCollapsed ? (
                          <IconLayoutSidebarLeftCollapse
                            color={"var(--mantine-color-gray-6)"}
                          />
                        ) : (
                          <IconLayoutSidebarRightCollapse
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
                        ...(appShellContext.isCollapsed
                          ? {}
                          : { display: "none" }),
                      }}
                    >
                      <ScrollArea>
                        <Accordion
                          multiple
                          defaultValue={Object.entries(pathTree)
                            .filter(
                              ([k, v]) => v.isImplemented || k === pathBlock,
                            )
                            .map(([k]) => k)}
                        >
                          {Object.entries(pathTree).map(
                            ([pathName, path], idx) => (
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
                                                  workspace.slug,
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
                            ),
                          )}
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
                w={appShellContext.isCollapsed ? "calc(100% - 24em)" : "100%"}
                pl={0}
                h={"100dvh"}
                bg={"var(--mantine-color-gray-0)"}
              >
                {/*ScrollArea 를 사용할 경우 inner 로 table 이 들어가는 문제가 있습니다.*/}
                <Box
                  p={"2em"}
                  w={"100%"}
                  h={"100%"}
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    position: "relative",
                  }}
                >
                  {children}
                </Box>
              </AppShell.Main>
            </AppShell>
          </SearchByMemberContext.Provider>
          <SettingsModal />
        </SettingsModalContext.Provider>
      </ProoferInsightContext.Provider>
    </ReactChannelIO>
  );
}
