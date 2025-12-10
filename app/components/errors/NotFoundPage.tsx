"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Button,
  Center,
  Code,
  Container,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";

const magnifierComponents = [
  <Image
    key={1}
    src={"/assets/images/magnifier-1.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
  <Image
    key={2}
    src={"/assets/images/magnifier-2.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
  <Image
    key={3}
    src={"/assets/images/magnifier-3.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
  <Image
    key={4}
    src={"/assets/images/magnifier-4.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
];
interface NotFoundPageProps {
  error: Error | string;
  reset?: () => void;
}
export default function NotFoundPage({ error, reset }: NotFoundPageProps) {
  const [magnifierComponent, setMagnifierComponent] = useState<React.ReactNode>(
    magnifierComponents[0],
  );

  useEffect(() => {
    // Removed initial synchronous setState in effect to avoid cascading renders (see react.dev/learn/you-might-not-need-an-effect)
    const interval = setInterval(
      () =>
        setMagnifierComponent(
          magnifierComponents[Math.floor(Math.random() * 4)],
        ),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Stack align={"center"}>
        <Space h={"3em"} />
        <Center>{magnifierComponent}</Center>
        <Title order={1} c={"var(--mantine-color-gray-8)"}>
          페이지를 찾을 수 없습니다.
        </Title>
        <Text c={"var(--mantine-color-gray-6)"} ta={"center"}>
          혹시 찾고 계시는 페이지의 URL이 잘못 입력된건 아닌지 한번 더
          확인해보세요
        </Text>
        <Stack>
          <Code p={"1em 2em"}>
            {error instanceof Error ? error.message : error}
          </Code>
          {reset !== undefined ? (
            <Button onClick={() => reset()} variant={"outline"} size={"xs"}>
              새로고침하여 다시 시도해보기
            </Button>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
