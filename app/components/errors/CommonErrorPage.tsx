import { Title, Button, Stack, Container, Code, Center } from "@mantine/core";
import React from "react";

interface CommonErrorPageProps {
  error: Error;
  reset: () => void;
  title?: string;
  message?: string;
}
export default function CommonErrorPage({
  error,
  reset,
  title,
  message,
}: CommonErrorPageProps) {
  return (
    <Container>
      <Center py={"xl"} h={"calc(90vh - var(--app-shell-header-height))"}>
        <Stack align={"center"}>
          <Title>{title || "오류가 발생했습니다."}</Title>
          <Code>{message || error.message}</Code>
          <Button onClick={() => reset()} variant={"outline"}>
            새로고침하여 다시 시도해보기
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}
