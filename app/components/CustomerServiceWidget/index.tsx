"use client";

import { Affix, Flex, Group, Paper, Stack, Transition } from "@mantine/core";
import { useMounted } from "@mantine/hooks";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";
import Image from "next/image";
import { ReactNode } from "react";
import stylesModule from "./styles.module.scss";

interface CustomerServiceWidgetProps {
  buttons: ReactNode[];
  guidelines: ReactNode[];
  position: {
    top?: string | number;
    left?: string | number;
    bottom?: string | number;
    right?: string | number;
  };
  onMobileClick?: () => void;
}
export default function CustomerServiceWidget({
  position,
  buttons,
  guidelines,
  onMobileClick,
}: CustomerServiceWidgetProps) {
  const isMobileMedia = useIsMobileMedia();
  const isMounted = useMounted();

  return (
    <Affix position={position}>
      <Transition transition="slide-up" mounted={isMounted}>
        {(styles) => (
          <Paper
            p={isMobileMedia ? 0 : "lg"}
            bg={isMobileMedia ? "transparent" : "#F5F5FD"}
            radius={isMobileMedia ? 0 : 100}
            style={styles}
            onClick={isMobileMedia && onMobileClick ? onMobileClick : () => {}}
            className={
              isMobileMedia && onMobileClick
                ? stylesModule.mobileChatWidget
                : ""
            }
          >
            <Flex
              align={isMobileMedia ? "end" : "center"}
              direction={isMobileMedia ? "column" : "row"}
              wrap={"nowrap"}
            >
              <Group gap={0}>
                <Group visibleFrom={"sm"}>{...buttons}</Group>
                <Paper
                  bg={isMobileMedia ? "#F5F5FD" : "transparent"}
                  py={isMobileMedia ? "xs" : "md"}
                  px={"lg"}
                  radius={isMobileMedia ? 8 : 0}
                  className={isMobileMedia ? stylesModule.speechBubble : ""}
                >
                  <Stack gap={0} c={"var(--color-primary)"}>
                    {...guidelines}
                  </Stack>
                </Paper>
              </Group>
              <Image
                src={"/assets/images/chat.webp"}
                width={200}
                height={200}
                alt={"CS 위젯 캐릭터"}
                style={{
                  width: isMobileMedia ? "80px" : "120px",
                  height: "auto",
                  position: "relative",
                  top: isMobileMedia
                    ? 0
                    : "calc(-1 * var(--mantine-spacing-lg) - 16px)",
                  marginBottom: isMobileMedia
                    ? 0
                    : "calc(-1 * var(--mantine-spacing-lg) - 16px)",
                }}
              />
            </Flex>
          </Paper>
        )}
      </Transition>
    </Affix>
  );
}
