"use client";
import {
  Divider,
  Flex,
  Input,
  Modal,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Path } from "@/app/subs/app/components/types";
import { IconSearch } from "@tabler/icons-react";
import { settingsPathTree } from "@/app/subs/app/settings/tree";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";

interface SettingsModalProps {
  path?: Path;
  setPath?: (path: Path) => void;

  opened: boolean;
  fullScreen: boolean;

  open: () => void;
  close: () => void;
  toggle: () => void;
}
export const SettingsModalContext = createContext<SettingsModalProps>({
  opened: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
  fullScreen: false,
});

export function useSettingsModal() {
  const [settingsModalOpened, settingsModalDisclosure] = useDisclosure(false);
  const [settingPath, setSettingPath] = useState<Path>();

  return {
    opened: settingsModalOpened,
    disclosure: settingsModalDisclosure,
    path: settingPath,
    setPath: setSettingPath,
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
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title
            pl={settingsModalContext.fullScreen ? "4em" : 0}
            w={"100%"}
            ta={"center"}
          >
            <Text size={"1em"} fw={700}>
              환경설정
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body pl={settingsModalContext.fullScreen ? "4em" : 0}>
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
                {Object.entries(settingsPathTree)
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
                        }}
                      />
                    );
                  })}
              </ScrollArea.Autosize>
            </Stack>
            <Divider
              w={settingsModalContext.fullScreen ? "100%" : "1px"}
              orientation={
                settingsModalContext.fullScreen ? "horizontal" : "vertical"
              }
            />
            <Stack px={"1em"} w={"100%"}>
              {settingsModalContext.path?.component}
            </Stack>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
