import React from "react";
import { Box, Group, Image } from "@mantine/core";

export function Down({ children, ...props }: any) {
  return (
    <>
      <Group justify={"center"} {...props}>
        <Box w={"min(5vw, 2em)"}>
          <Image src={"/images/divider-down.svg"} />
        </Box>
      </Group>
      {children}
    </>
  );
}

export function Done({ children, ...props }: any) {
  return (
    <>
      <Group justify={"center"} {...props}>
        <Box w={"min(5vw, 2em)"}>
          <Image src={"/images/divider-done.svg"} />
        </Box>
      </Group>
      {children}
    </>
  );
}
