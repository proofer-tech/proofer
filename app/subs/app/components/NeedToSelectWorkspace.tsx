import { Center, Space, Stack, Text, Title } from "@mantine/core";
import { IconFolderX } from "@tabler/icons-react";
import React from "react";

interface NeedToSelectWorkspaceProps {
  serviceName?: string;
  children?: React.ReactNode;
}
export default function NeedToSelectWorkspace(
  props: NeedToSelectWorkspaceProps,
) {
  return (
    <Center>
      <Stack align={"center"} c={"var(--mantine-color-gray-6"}>
        <Space h={"10vh"} />
        <IconFolderX size={"5em"} />
        <Stack w={"100%"} align={"center"}>
          <Title order={1} ta={"center"}>
            Please create a workspace first.
          </Title>
          <Text ta={"center"}>
            Cannot use {props.serviceName ? `${props.serviceName} ` : ""}. To
            check the contents: First, you must create a workspace and then link
            the apps used for work. do.
          </Text>
          <>{props.children}</>
        </Stack>
      </Stack>
    </Center>
  );
}
