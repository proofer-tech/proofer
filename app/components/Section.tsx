import { Box, Container, ContainerProps, Stack, Text } from "@mantine/core";
import React from "react";
import { ElementProps } from "@mantine/core/lib/core";

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
            size={"min(2.4vw, 1.3em)"}
            c={"var(--color-lightgray)"}
            lh={1}
          >
            {question}
          </Text>
        )}
        {(answer || title) && (
          <Text
            ta="center"
            size={"min(6vw, 2.6em)"}
            c={"var(--color-primary)"}
            fw={700}
            lh={1.3}
          >
            {answer || title}
          </Text>
        )}
        {description && (
          <Text
            maw={"68%"}
            ta="center"
            size={"min(2vw, 1em)"}
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
