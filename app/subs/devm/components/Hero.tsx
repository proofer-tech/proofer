"use client";
import {
  Container,
  Group,
  Image,
  rem,
  Space,
  Stack,
  Text,
} from "@mantine/core";
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
      pt={"10vh"}
      pb={"5vh"}
    >
      <Stack gap={"xs"}>
        <Text size={"md"} ta={"center"} c={"var(--mantine-color-gray-8)"}>
          대표님 회사의 개발자들은 지금 어떻게 일하고 있나요?
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
          우리 회사만을 위한
          <br />
          개발자 성과추적 대시보드
        </Text>
        <Space h={"1em"} />
        <Text size={"md"} ta={"center"} c={"var(--mantine-color-gray-6)"}>
          현실적으로 모든 회사가 자력으로 개발자를 평가할 수 있는 큰 규모의
          개발팀을 꾸리기란 불가능한 일입니다. 프루퍼 데브엠과 함께라면 CTO 나
          시니어 개발자들이 없어도 최소한의 비용으로 회사에 지속적인 개발자 성과
          추적 시스템을 구축할 수 있습니다.
        </Text>
        <Group justify={"center"} mt={"xl"}>
          <InquireForm btnText={"무료상담 신청"} withEmail={true} />
        </Group>
      </Stack>
    </Container>
  );
}
