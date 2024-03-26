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
            워크스페이스를 먼저 생성해주세요.
          </Title>
          <Text ta={"center"}>
            {props.serviceName ? `${props.serviceName} ` : ""}내용을 확인하려면,
            먼저 워크스페이스를 생성해주신 후 업무에 사용되는 앱을 연동해야
            합니다.
          </Text>
          <>{props.children}</>
        </Stack>
      </Stack>
    </Center>
  );
}
