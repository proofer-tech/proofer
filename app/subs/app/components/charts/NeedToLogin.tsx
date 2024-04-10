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
            Please Sign-in first.
          </Title>
          <Text ta={"center"}>
            To check the contents, you must Sign-in first.
          </Text>
          <>{props.children}</>
        </Stack>
      </Stack>
    </Center>
  );
}
