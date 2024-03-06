import {
  Box,
  Divider,
  Flex,
  Group,
  Input,
  Modal,
  ModalRootProps,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import { Path } from "@/app/app/components/types";
import { IconSearch } from "@tabler/icons-react";
import { settingsPathTree } from "@/app/app/settings/tree";

interface SettingsModalProps extends ModalRootProps {
  path?: Path;
}
export default function SettingsModal({ path, ...props }: SettingsModalProps) {
  const [settingsBody, setBody] = useState<React.ReactNode>(
    path?.component || <></>,
  );
  const [searchText, setSearchText] = useState<string>("");

  props.size = "xl";
  props.centered = true;
  props.closeOnClickOutside = false;

  return (
    <Modal.Root {...props}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title
            pl={props.fullScreen ? "4em" : 0}
            w={"100%"}
            ta={"center"}
          >
            <Text size={"1em"} fw={700}>
              환경설정
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body pl={props.fullScreen ? "4em" : 0}>
          <Flex
            direction={props.fullScreen ? "column" : "row"}
            gap={0}
            align={"start"}
            justify={"start"}
          >
            <Stack
              px={"1em"}
              w={props.fullScreen ? "100%" : "auto"}
              mah={props.fullScreen ? "30vh" : "none"}
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
                  .map(([pathName, path]) => (
                    <NavLink
                      key={pathName}
                      href={`#settings-${pathName}`}
                      label={path.title}
                      leftSection={
                        path.tablerIcon && <path.tablerIcon size={"1em"} />
                      }
                      onClick={() => setBody(path.component ?? <></>)}
                    />
                  ))}
              </ScrollArea.Autosize>
            </Stack>
            <Divider
              w={props.fullScreen ? "100%" : "1px"}
              orientation={props.fullScreen ? "horizontal" : "vertical"}
            />
            <Stack px={"1em"}>{settingsBody}</Stack>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
