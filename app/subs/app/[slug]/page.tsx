"use client";
import React from "react";
import { Button, Center, Image, Stack, Title } from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";

export default function Page() {
  return (
    <Center h={"80vh"}>
      <Stack align={"center"}>
        <Image
          src={"/assets/images/integrations.png"}
          alt={"연동"}
          w={"10em"}
        />
        <Title order={1} ta={"center"}>
          우리 개발자{process.env.NODE_ENV}의 생산성이 궁금하다면?
        </Title>
        <Stack w={"100%"}>
          <Button variant="light">데모버전 구경하기</Button>
          <Button
            color={"var(--color-secondary)"}
            leftSection={<IconSquareRoundedPlus size={"1.3em"} />}
          >
            내 워크스페이스 만들기
          </Button>
        </Stack>
      </Stack>
    </Center>
  );
}
