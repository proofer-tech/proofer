"use client";
import { useEffect } from "react";
import { Box, Center, Loader, Stack, Text } from "@mantine/core";

export default function Page() {
  useEffect(() => {
    // 즉시 리다이렉트
    window.location.href = "https://event-us.kr/withcto/event";
  }, []);

  return (
    <Center h="100vh">
      <Stack align="center" gap="md">
        <Loader size="xl" />
        <Text>리다이렉트 중...</Text>
      </Stack>
    </Center>
  );
}
