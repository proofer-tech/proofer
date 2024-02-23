"use client";
import {
  BackgroundImage,
  Box,
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
import React, { useContext, useEffect, useRef, useState } from "react";
import { ElementProps } from "@mantine/core/lib/core";
import { PageContext } from "@/app/hooks";
import { useWindowScroll } from "@mantine/hooks";

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
  const pageCtx = useContext(PageContext);
  const [isPopoverOpened, setPopoverOpened] = useState<boolean>(false);

  const [scroll, scrollTo] = useWindowScroll();
  const offsetPinRef = useRef<HTMLDivElement>(null);

  const [isWidget, setIsWidget] = useState<boolean>(false);

  useEffect(() => {
    if (offsetPinRef.current === null) return;
    const rect = offsetPinRef.current.getBoundingClientRect();
    setIsWidget(
      !(
        scroll.y >= offsetPinRef.current.offsetTop ||
        (rect.top >= 0 && rect.bottom <= window.innerHeight)
      ),
    );
  }, [offsetPinRef, scroll]);

  return (
    <FocusTrap active={isActive}>
      <div ref={offsetPinRef} />
      <Container {...props}>
        <Box
          w={"calc(100% - 1em)"}
          style={
            isWidget
              ? { position: "fixed", left: "0.5em", bottom: "0.5em" }
              : { transitionDuration: "0.3s" }
          }
        >
          {children}
          <BackgroundImage
            src="/images/background-inquire.png"
            radius={isWidget ? "8px" : "3em"}
          >
            <Flex
              p={isWidget ? "0.8em 1em" : "3em 5em"}
              direction={
                pageCtx.userAgent.isDesktop
                  ? "row"
                  : isWidget
                    ? "row"
                    : "column"
              }
              justify={
                isWidget || pageCtx.userAgent.isDesktop
                  ? "space-between"
                  : "center"
              }
              align={
                isWidget || pageCtx.userAgent.isDesktop ? "center" : "normal"
              }
              gap={"1.3em"}
            >
              <Stack gap={0}>
                <Text fz={isWidget ? "0.8em" : "1em"} c={"var(--color-white)"}>
                  서비스 도입 상담을 통한 온보딩으로
                </Text>
                <Text
                  fz={isWidget ? "1.2em" : "1.8em"}
                  fw={700}
                  c={"var(--color-white)"}
                >
                  14일간
                  {isWidget ? " " : <br />}
                  무료로 체험해보기
                </Text>
              </Stack>
              <Flex
                direction={pageCtx.userAgent.isDesktop ? "row" : "column"}
                justify={pageCtx.userAgent.isDesktop ? "center" : "normal"}
                align={pageCtx.userAgent.isDesktop ? "start" : "normal"}
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
        </Box>
      </Container>
    </FocusTrap>
  );
}
