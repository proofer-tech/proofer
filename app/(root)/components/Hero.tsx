"use client";
import { Container, Group, rem, Space, Stack, Text } from "@mantine/core";
import { InquireForm } from "@/app/components/Inquire";
import React from "react";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";
export default function Hero() {
  const isMobile = useIsMobileMedia();
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: isMobile ? "start" : "center",
      }}
      h={"calc(100vh - 8em)"}
    >
      <Stack gap={"xs"}>
        <Space h={"xl"} />
        <Text size={"md"} ta={"center"} c={"var(--mantine-color-gray-8)"}>
          프루퍼, S.M.A.R.T 한 데이터 기반 성과관리
        </Text>
        <Text
          component={"h1"}
          fw={700}
          size={rem(54)}
          ta="center"
          lh={1.3}
          variant="gradient"
          gradient={{
            from: "var(--color-primary)",
            to: "var(--color-secondary)",
            deg: 80,
          }}
        >
          진짜 업무 데이터를 활용하는
          <br />
          성과 측정/평가/관리 통합 솔루션
        </Text>
        <Space h={"1em"} />
        <Text size={"md"} ta={"center"} c={"var(--mantine-color-gray-6)"}>
          1on1, 설문조사, 다면평가와 같은 기존의 정성적인 방법으로만 측정한
          성과만으로는
          <br />
          평가자마다 제각각인 기준으로 주관적이고 편견이 들어있을 수 있어
          업무성과를 정확히 추적하기에는 부족합니다.
          <br />
          이제는 프루퍼와 함께 실제 업무에 대한 풍부하고 다양한 신뢰성 높은 업무
          데이터를 더하여 &quot;진짜&quot; 성과를 알아보세요!
        </Text>
        <Group justify={"center"} mt={"xl"}>
          <InquireForm btnText={"무료상담 신청"} withEmail={true} />
        </Group>
      </Stack>
    </Container>
  );
}
