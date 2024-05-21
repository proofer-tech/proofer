"use client";
import {
  BackgroundImage,
  Box,
  Button,
  ButtonProps,
  Flex,
  Input,
  Popover,
  Skeleton,
  Stack,
  Text,
  Transition,
} from "@mantine/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useWindowScroll } from "@mantine/hooks";
import { useChannelIOEvent } from "react-channel-plugin";
import TallyContext from "@/src/contexts/TallyContext";
import { useMediaQuery } from "@mantine/hooks";

interface InquireFormProps {
  withEmail?: boolean;
  btnProps?: ButtonProps;
}
export function InquireForm({
  withEmail = false,
  btnProps = {},
}: InquireFormProps) {
  const [isPopoverOpened, setPopoverOpened] = useState<boolean>(false);
  const [inquireEmail, setInquireEmail] = useState<string>("");

  const { tallyOptions, setTallyOptions, openTallyPopup } =
    useContext(TallyContext);
  useEffect(() => {
    const newOptions = Object.assign(tallyOptions, {
      hiddenFields: { email: inquireEmail },
    });
    setTallyOptions(newOptions);
  }, [tallyOptions, setTallyOptions, inquireEmail]);

  return (
    <>
      {withEmail ? (
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
              onChange={(e) => setInquireEmail(e.target.value)}
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
      ) : (
        <></>
      )}
      <Button size={"md"} onClick={() => openTallyPopup()} {...btnProps}>
        무료상담 신청
      </Button>
    </>
  );
}

export function InquireWidget() {
  const isMobile = useMediaQuery("(max-width: 48em)");

  const [scroll] = useWindowScroll();
  const offsetPinRef = useRef<HTMLDivElement>(null);

  const [isWidget, setIsWidget] = useState<boolean>(false);

  const [isChannelIOLoaded, setIsChannelIOLoaded] = useState<boolean>(false);
  useChannelIOEvent("onBoot", () => setIsChannelIOLoaded(true));

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
    <>
      <div ref={offsetPinRef} />
      {!isChannelIOLoaded ? <Skeleton height={"9em"} radius="md" /> : <></>}
      <Transition mounted={isChannelIOLoaded}>
        {(styles) => (
          <Box
            w={isWidget ? "calc(100% - 1em - 72px)" : "100%"}
            style={
              isWidget
                ? {
                    position: "fixed",
                    left: "0.5em",
                    bottom: "0.5em",
                    ...styles,
                  }
                : styles
            }
          >
            <BackgroundImage
              src="/assets/images/background-inquire.png"
              radius={"md"}
            >
              <Flex
                p={isWidget ? "0.8em 1.6em" : "3em 5em"}
                direction={isMobile ? "column" : "row"}
                justify={
                  isWidget
                    ? isMobile
                      ? "center"
                      : "space-between"
                    : "space-between"
                }
                align={isWidget ? "center" : "space-between"}
                gap={"1.3em"}
              >
                <Stack gap={0} w={isMobile ? "100%" : "auto"}>
                  <Text size={"sm"} c={"var(--color-white)"}>
                    상담을 통한 온보딩과 함께
                  </Text>
                  <Text size={"lg"} fw={700} c={"var(--color-white)"}>
                    무료로 체험해보기
                  </Text>
                </Stack>
                <Flex
                  w={isMobile ? "100%" : "auto"}
                  direction={isMobile ? "column" : "row"}
                  justify={isMobile ? "normal" : "center"}
                  align={isMobile ? "normal" : "start"}
                  gap={8}
                >
                  <InquireForm
                    withEmail={true}
                    btnProps={{ color: "var(--color-secondary)" }}
                  />
                </Flex>
              </Flex>
            </BackgroundImage>
          </Box>
        )}
      </Transition>
    </>
  );
}
