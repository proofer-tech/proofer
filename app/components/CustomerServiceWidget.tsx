"use client";

import { Affix, Group, Paper, Stack, Transition } from "@mantine/core";
import { useMounted } from "@mantine/hooks";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";
import Image from "next/image";
import { ReactNode } from "react";

interface CustomerServiceWidgetProps {
  buttons: ReactNode[];
  guidelines: ReactNode[];
}
export default function CustomerServiceWidget({
  buttons,
  guidelines,
}: CustomerServiceWidgetProps) {
  const isMobileMedia = useIsMobileMedia();
  const isMounted = useMounted();

  return (
    <Affix
      position={{
        bottom: isMobileMedia ? 12 : 60,
        right: isMobileMedia ? 25 : 98,
      }}
    >
      <Transition transition="slide-up" mounted={isMounted}>
        {(styles) => (
          <Paper
            p={isMobileMedia ? 0 : "lg"}
            bg={isMobileMedia ? "transparent" : "#F5F5FD"}
            radius={isMobileMedia ? 0 : 100}
            style={styles}
          >
            <Group>
              <Group gap={0} visibleFrom={"xs"}>
                <Group>{...buttons}</Group>
                <Stack gap={0} c={"var(--color-primary)"} py={"md"} px={"lg"}>
                  {...guidelines}
                </Stack>
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
            </Group>
          </Paper>
        )}
      </Transition>
    </Affix>
  );
}
