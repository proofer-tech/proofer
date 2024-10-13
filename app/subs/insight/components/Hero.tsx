"use client";
import { Container, Group, rem, Space, Stack, Text } from "@mantine/core";
import { InquireForm } from "@/app/components/Inquire";
import React from "react";
import { useIsDesktopMedia, useIsTabletMedia } from "@/src/hooks/mediaQuery";

export default function Hero() {
  const [isDesktopMedia, isTabletMedia] = [
    useIsDesktopMedia(),
    useIsTabletMedia(),
  ];
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      h={"60vh"}
    >
      <Stack gap={"xs"}>
        <Text size={"md"} ta={"center"} c={"var(--mantine-color-gray-8)"}>
          프루퍼 인사이트, 쉽고 빠른 노코드 대시보드 빌더
        </Text>
        <Text
          component={"h1"}
          fw={700}
          size={isDesktopMedia ? rem(54) : isTabletMedia ? rem(48) : rem(32)}
          ta="center"
          lh={1.3}
          variant="gradient"
          gradient={{
            from: "var(--color-primary)",
            to: "var(--color-secondary)",
            deg: 80,
          }}
        >
          개발자 없이도 운영할 수 있는
          <br />
          노코드 업무 데이터 대시보드 빌더
        </Text>
        <Space h={"1em"} />
        <Text size={"md"} ta={"center"} c={"var(--mantine-color-gray-6)"}>
          수동으로 수집한 데이터에는 사람의 손을 거치며 발생하는 노이즈와
          주관적인 입장이 섞여있기 쉽상입니다. 이제는 프루퍼 인사이트와 함께
          신뢰성 높은 &quot;진짜&quot; 업무 데이터를 확인해보세요!
        </Text>
        <Group justify={"center"} mt={"xl"}>
          <InquireForm btnText={"무료상담 신청"} withEmail={true} />
        </Group>
      </Stack>
    </Container>
  );
}
