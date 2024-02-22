"use client";
import {
  BackgroundImage,
  Button,
  Container,
  ContainerProps,
  Flex,
  FocusTrap,
  Input,
  Popover,
  Stack,
  Text,
} from "@mantine/core";
import React, { useContext, useState } from "react";
import { ElementProps } from "@mantine/core/lib/core";
import { LandingPageContext } from "@/app/hooks";

interface InquireProps extends ContainerProps, ElementProps<"div"> {
  isActive: boolean;
  inquireEmail: string;
  onInquireEmailChange: (text: string) => void;
  onInquireClick: () => void;
}

export default function Inquire({
  isActive = false,
  inquireEmail,
  onInquireEmailChange,
  onInquireClick,
  children,
  ...props
}: InquireProps) {
  const lpCtx = useContext(LandingPageContext);
  const [isPopoverOpened, setPopoverOpened] = useState<boolean>(false);

  return (
    <FocusTrap active={isActive}>
      <Container {...props}>
        {children}
        <BackgroundImage src="/images/background-inquire.png" radius={"3em"}>
          <Flex
            p={"3em 5em"}
            direction={lpCtx.userAgent.isDesktop ? "row" : "column"}
            justify={lpCtx.userAgent.isDesktop ? "space-between" : "center"}
            align={lpCtx.userAgent.isDesktop ? "center" : "normal"}
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
              direction={lpCtx.userAgent.isDesktop ? "row" : "column"}
              justify={lpCtx.userAgent.isDesktop ? "center" : "normal"}
              align={lpCtx.userAgent.isDesktop ? "start" : "normal"}
              gap={8}
            >
              <Popover
                opened={isPopoverOpened}
                width={200}
                position="bottom"
                withArrow
                shadow="md"
              >
                <Popover.Target>
                  <Input
                    placeholder="이메일 입력 ..."
                    type={"email"}
                    size={"md"}
                    value={inquireEmail}
                    onChange={(e) => onInquireEmailChange(e.target.value)}
                    onFocus={() => setPopoverOpened(true)}
                    onBlur={() => setPopoverOpened(false)}
                  />
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="xs">
                    이메일을 입력하고, 무료상담 신청 버튼을 눌러주세요.
                  </Text>
                </Popover.Dropdown>
              </Popover>
              <Button
                color={"var(--color-secondary)"}
                size={"md"}
                onClick={onInquireClick}
              >
                무료상담 신청
              </Button>
            </Flex>
          </Flex>
        </BackgroundImage>
      </Container>
    </FocusTrap>
  );
}
