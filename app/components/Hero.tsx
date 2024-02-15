import {
  Button,
  Flex,
  Input,
  Space,
  Stack,
  StackProps,
  Text,
} from "@mantine/core";
import React from "react";
import { ElementProps } from "@mantine/core/lib/core";

interface HeroProps extends StackProps, ElementProps<"div"> {
  isMobile: boolean;
  isTablet: boolean;
  inquireEmail: string;
  onInquireEmailChange: (text: string) => void;
  onInquireClick: () => void;
}

export default function Hero({
  isMobile,
  isTablet,
  inquireEmail,
  onInquireEmailChange,
  onInquireClick,
  ...props
}: HeroProps) {
  return (
    <Stack
      gap={"min(8vw, 1em)"}
      py={"min(5vw, 48px)"}
      px={"min(1vw, 16px)"}
      {...props}
    >
      <Text ta="center" size={"min(2.4vw, 1.3em)"} c={"var(--color-lightgray)"}>
        #DORA Metrics / #SPACE Framework / #DevEx Framework
      </Text>
      <Text
        size={"min(7vw, 4em)"}
        ta="center"
        lh={1.3}
        variant="gradient"
        fw={700}
        gradient={{
          from: "var(--color-primary)",
          to: "var(--color-secondary)",
          deg: 80,
        }}
      >
        정확한 개발자 성과측정 을 위한
        <br />
        엔지니어링 매니징 파트너
      </Text>
      <Stack gap={4} c={"var(--color-darkgray)"}>
        <Text ta={"center"} size={"min(2vw, 1.3em)"}>
          실리콘밸리에서 여러차례 검증된 방법으로 개발자들의 성과평가를 위한
          인사이트를 제공합니다.
        </Text>
        <Text ta={"center"} size={"min(2vw, 1.3em)"}>
          무료 상담을 통한 자세한 온보딩과 14일 무료 평가판으로 높은 성과를 향한
          여정을 시작해보세요.
        </Text>
      </Stack>
      <Space h={"md"} />
      <Flex
        direction={isMobile ? "column" : "row"}
        justify={"center"}
        align={isMobile ? "normal" : "start"}
        gap={8}
      >
        <Input.Wrapper
          description="14일간 무료로 제공됩니다"
          inputWrapperOrder={["input", "description"]}
        >
          <Input
            placeholder="이메일 입력 ..."
            type={"email"}
            size={isMobile ? "xs" : isTablet ? "sm" : "md"}
            value={inquireEmail}
            onChange={(e) => onInquireEmailChange(e.target.value)}
          />
        </Input.Wrapper>
        <Button size={isTablet ? "sm" : "md"} onClick={onInquireClick}>
          무료상담 신청
        </Button>
      </Flex>
    </Stack>
  );
}
