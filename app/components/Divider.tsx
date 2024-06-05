import React from "react";
import { Box, Group } from "@mantine/core";
import Image from "next/image";

export function Down({ children, ...props }: any) {
  return (
    <>
      <Group justify={"center"} {...props}>
        <Box w={"min(5vw, 2em)"}>
          <Image
            src={"/assets/images/divider-down.svg"}
            alt={"↓"}
            width={24}
            height={27}
          />
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
          <Image
            src={"/assets/images/divider-end.svg"}
            alt={"</>"}
            width={32}
            height={32}
          />
        </Box>
      </Group>
      {children}
    </>
  );
}
