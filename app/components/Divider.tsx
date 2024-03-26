import React from "react";
import { Box, Group, Image } from "@mantine/core";

export function Down({ children, ...props }: any) {
  return (
    <>
      <Group justify={"center"} {...props}>
        <Box w={"min(5vw, 2em)"}>
          <Image src={"/assets/images/divider-down.svg"} alt={"↓"} />
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
          <Image src={"/assets/images/divider-end.svg"} alt={"</>"} />
        </Box>
      </Group>
      {children}
    </>
  );
}
