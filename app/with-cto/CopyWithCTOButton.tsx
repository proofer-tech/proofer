"use client";
import { Button, ButtonProps, CopyButton } from "@mantine/core";
import React from "react";

interface CopyWithCTOButtonProps extends ButtonProps {}
export default function CopyWithCTOButton(props: CopyWithCTOButtonProps) {
  return (
    <CopyButton value="https://bit.ly/with-cto">
      {({ copied, copy }) => (
        <Button color={copied ? "teal" : "blue"} onClick={copy} {...props}>
          {copied ? "복사되었습니다!" : "참여링크 복사하여 공유하기"}
        </Button>
      )}
    </CopyButton>
  );
}
