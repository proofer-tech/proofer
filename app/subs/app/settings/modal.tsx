"use client";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Input,
  Modal,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import React, { createContext, useContext, useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { SettingPath, settingTree } from "@/app/subs/app/settings/tree";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";

export type Triggers = "" | "cancel" | "save" | "submit";
interface SettingsModalProps {
  path?: SettingPath;
  setPath?: (setting: SettingPath) => void;

  opened: boolean;
  fullScreen: boolean;

  withSubmit: boolean;
  setWithSubmit: (withSubmit: boolean) => void;

  open: () => void;
  close: () => void;
  toggle: () => void;

  triggered: Triggers;
  trigger: (triggerString: Triggers) => void;
}
export const SettingsModalContext = createContext<SettingsModalProps>({
  opened: false,
  fullScreen: false,
  withSubmit: false,
  setWithSubmit: () => {},

  open: () => {},
  close: () => {},
  toggle: () => {},

  triggered: "",
  trigger: (triggerString) => {},
});

export function useSettingsModal() {
  const [settingsModalOpened, settingsModalDisclosure] = useDisclosure(false);
  const [settingPath, setSettingPath] = useState<SettingPath>();
  const [withSubmit, setWithSubmit] = useState<boolean>(false);

  return {
    opened: settingsModalOpened,
    disclosure: settingsModalDisclosure,
    path: settingPath,
    setPath: setSettingPath,
    withSubmit: withSubmit,
    setWithSubmit: setWithSubmit,
  };
}
export function SettingsModal() {
  const router = useRouter();
  const pathname = usePathname();
  const settingsModalContext = useContext(SettingsModalContext);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setSearchText("");
  }, []);

  return (
    <Modal.Root
      size={"xl"}
      centered={true}
      closeOnClickOutside={false}
      opened={settingsModalContext.opened}
      onClose={settingsModalContext.close}
      fullScreen={settingsModalContext.fullScreen}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title
            pl={settingsModalContext.fullScreen ? "5em" : 0}
            w={"100%"}
            ta={"center"}
          >
            <Text size={"1em"} fw={700}>
              {settingsModalContext.path
                ? settingsModalContext.path.title
                : "환경설정"}
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body pl={settingsModalContext.fullScreen ? "5em" : 0} h={"100%"}>
          <Flex
            direction={settingsModalContext.fullScreen ? "column" : "row"}
            gap={0}
            align={"start"}
            justify={"start"}
          >
            <Stack
              px={"1em"}
              w={settingsModalContext.fullScreen ? "100%" : "auto"}
              mah={settingsModalContext.fullScreen ? "30vh" : "none"}
              style={{ flexShrink: 0 }}
            >
              <Input
                fz={"0.8em"}
                placeholder="설정이름 검색"
                leftSection={<IconSearch size={"1em"} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <ScrollArea.Autosize>
                {Object.entries(settingTree)
                  .filter(
                    ([_, v]) =>
                      searchText.length < 1 || v.title.includes(searchText),
                  )
                  .map(([slug, setting]) => {
                    return (
                      <NavLink
                        key={slug}
                        component={"div"}
                        active={
                          settingsModalContext.path?.title === setting.title
                        }
                        label={setting.title}
                        leftSection={
                          setting.tablerIcon && (
                            <setting.tablerIcon size={"1em"} />
                          )
                        }
                        onClick={() => {
                          if (pathname.split("/").reverse()[1] === "settings")
                            router.push(slug);
                          settingsModalContext.setPath?.(setting);
                          settingsModalContext.setWithSubmit(setting.canSubmit);
                        }}
                      />
                    );
                  })}
              </ScrollArea.Autosize>
            </Stack>
            <Box
              w={settingsModalContext.fullScreen ? "100%" : "auto"}
              py={settingsModalContext.fullScreen ? "1em" : 0}
            >
              <Divider
                w={settingsModalContext.fullScreen ? "100%" : "1px"}
                orientation={
                  settingsModalContext.fullScreen ? "horizontal" : "vertical"
                }
              />
            </Box>
            <Stack px={"1em"} w={"100%"} mih={"30vh"}>
              {settingsModalContext.path?.component && (
                <Stack
                  w={"100%"}
                  h={"100%"}
                  justify={"space-between"}
                  style={{ position: "relative", flexGrow: 1 }}
                >
                  <settingsModalContext.path.component />
                  {settingsModalContext.withSubmit ? (
                    <Group justify={"end"} gap={"0.5em"}>
                      <Button
                        size={"xs"}
                        color={"red"}
                        variant={"subtle"}
                        onClick={() => settingsModalContext.trigger("cancel")}
                      >
                        취소
                      </Button>
                      <Button
                        type={"submit"}
                        size={"xs"}
                        color={"gray"}
                        variant={"subtle"}
                        onClick={() => settingsModalContext.trigger("save")}
                      >
                        저장
                      </Button>
                      <Button
                        type={"submit"}
                        size={"xs"}
                        variant={"outline"}
                        onClick={() => settingsModalContext.trigger("submit")}
                      >
                        확인
                      </Button>
                    </Group>
                  ) : (
                    ""
                  )}
                </Stack>
              )}
            </Stack>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
