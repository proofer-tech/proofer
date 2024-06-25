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
import TallyContext from "@/src/contexts/TallyContext";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";
import { useIsChannelIOLoaded } from "@/src/hooks/channel";

interface InquireFormProps {
  btnText: string;
  withEmail?: boolean;
  btnProps?: ButtonProps;
}
export function InquireForm({
  withEmail = false,
  btnProps = {},
  btnText,
}: InquireFormProps) {
  const isMobileMedia = useIsMobileMedia();
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
              value={inquireEmail}
              onChange={(e) => setInquireEmail(e.target.value)}
              onFocus={() => setPopoverOpened(true)}
              onBlur={() => setPopoverOpened(false)}
              radius={"md"}
              size={"md"}
              w={isMobileMedia ? "100%" : "auto"}
            />
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="xs">
              이메일을 입력하고, {btnText} 버튼을 눌러주세요.
            </Text>
          </Popover.Dropdown>
        </Popover>
      ) : (
        <></>
      )}
      <Button
        size={"md"}
        w={isMobileMedia ? "100%" : "auto"}
        onClick={() => openTallyPopup()}
        {...{ color: "var(--color-primary)", ...btnProps }}
      >
        {btnText}
      </Button>
    </>
  );
}

export function InquireWidget({
  btnText,
  children,
}: {
  btnText: string;
  children: React.ReactNode;
}) {
  const isMobileMedia = useIsMobileMedia();

  const [scroll] = useWindowScroll();
  const offsetPinRef = useRef<HTMLDivElement>(null);

  const [isWidget, setIsWidget] = useState<boolean>(false);

  const isChannelIOLoaded = useIsChannelIOLoaded();

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
                direction={isMobileMedia ? "column" : "row"}
                justify={
                  isWidget
                    ? isMobileMedia
                      ? "center"
                      : "space-between"
                    : "space-between"
                }
                align={isWidget ? "center" : "space-between"}
                gap={"1.3em"}
              >
                <Stack gap={0} w={isMobileMedia ? "100%" : "auto"}>
                  {children}
                </Stack>
                <Flex
                  w={isMobileMedia ? "100%" : "auto"}
                  direction={isMobileMedia ? "column" : "row"}
                  justify={isMobileMedia ? "normal" : "center"}
                  align={isMobileMedia ? "normal" : "start"}
                  gap={8}
                >
                  <InquireForm
                    btnText={btnText}
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
