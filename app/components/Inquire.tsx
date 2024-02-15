import {
  BackgroundImage,
  Button,
  Container,
  ContainerProps,
  Flex,
  Input,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";
import { ElementProps } from "@mantine/core/lib/core";

interface InquireProps extends ContainerProps, ElementProps<"div"> {
  isMobile: boolean;
  isTablet: boolean;
}

export default function Inquire({
  isMobile,
  isTablet,
  ...props
}: InquireProps) {
  return (
    <Container {...props}>
      <BackgroundImage src="/images/background-inquire.png" radius={"3em"}>
        <Flex
          p={"3em 5em"}
          direction={isMobile || isTablet ? "column" : "row"}
          justify={isMobile || isTablet ? "center" : "space-between"}
          align={isMobile || isTablet ? "normal" : "center"}
          gap={"1.3em"}
        >
          <Stack gap={0}>
            <Text fz={"1em"} c={"var(--color-white)"}>
              서비스 도입 상담을 통한 온보딩으로
            </Text>
            <Text fz={"1.8em"} fw={700} c={"var(--color-white)"}>
              14일간
              <br />
              무료로 체험해보기
            </Text>
          </Stack>
          <Flex
            direction={isMobile || isTablet ? "column" : "row"}
            justify={isMobile || isTablet ? "normal" : "center"}
            align={isMobile || isTablet ? "normal" : "start"}
            gap={8}
          >
            <Input placeholder="이메일 입력 ..." type={"email"} size={"md"} />
            <Button color={"var(--color-secondary)"} size={"md"}>
              무료상담 신청
            </Button>
          </Flex>
        </Flex>
      </BackgroundImage>
    </Container>
  );
}
