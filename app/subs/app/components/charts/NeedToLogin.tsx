import { Center, Space, Stack, Text, Title } from "@mantine/core";
import { IconKey } from "@tabler/icons-react";
import React from "react";

interface NeedToLoginProps {
  children?: React.ReactNode;
}
export default function NeedToLogin(props: NeedToLoginProps) {
  return (
    <Center>
      <Stack align={"center"} c={"var(--mantine-color-gray-6"}>
        <Space h={"10vh"} />
        <IconKey size={"5em"} />
        <Stack w={"100%"} align={"center"}>
          <Title order={1} ta={"center"}>
            로그인해주세요.
          </Title>
          <Text ta={"center"}>
            내용을 확인하려면, 먼저 로그인이 필요합니다.
          </Text>
          <>{props.children}</>
        </Stack>
      </Stack>
    </Center>
  );
}
