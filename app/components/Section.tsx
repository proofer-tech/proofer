"use client";

import { Box, Container, ContainerProps, Stack, Text } from "@mantine/core";
import React, { useContext } from "react";
import { ElementProps } from "@mantine/core/lib/core";
import { PageContext } from "@/app/hooks";

interface SectionProps extends ContainerProps, ElementProps<"div"> {
  question?: string;
  answer?: string;
  description?: string;
  title?: string;
  children: React.ReactNode;
}

export default function Section({
  question,
  answer,
  description,
  title,
  children,
  ...props
}: SectionProps) {
  const pageCtx = useContext(PageContext);
  return (
    <Container {...props}>
      <Stack
        align={"center"}
        gap={"min(1.3vw, 0.8em)"}
        py={"min(5vw, 48px)"}
        px={"min(1vw, 16px)"}
      >
        {question && (
          <Text
            ta="center"
            size={pageCtx.userAgent.isDesktop ? "1.3em" : "1.1em"}
            c={"var(--color-lightgray)"}
            lh={1}
          >
            {question}
          </Text>
        )}
        {(answer || title) && (
          <Text
            ta="center"
            size={pageCtx.userAgent.isDesktop ? "2.6em" : "2.3em"}
            c={"var(--color-primary)"}
            fw={700}
            lh={1.3}
          >
            {answer || title}
          </Text>
        )}
        {description && (
          <Text
            maw={pageCtx.userAgent.isDesktop ? "68%" : "none"}
            size={pageCtx.userAgent.isDesktop ? "1em" : "0.9em"}
            ta="center"
            c={"var(--color-foreground)"}
            lh={1.3}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {description}
          </Text>
        )}
      </Stack>
      <Box>{children}</Box>
    </Container>
  );
}
