"use client";
import { Button, ButtonProps, CopyButton } from "@mantine/core";
import React from "react";

interface CopyWithCTOButtonProps extends ButtonProps {}
export default function CopyWithCTOButton(props: CopyWithCTOButtonProps) {
  return (
    <CopyButton value="https://proofer.tech/with-cto/join?utm_source=proofer&utm_medium=landing&utm_campaign=cta&utm_content=share">
      {({ copied, copy }) => (
        <Button
          color={copied ? "secondary" : "primary"}
          onClick={copy}
          {...props}
        >
          {copied ? "복사되었습니다!" : "링크 복사하여 공유하기"}
        </Button>
      )}
    </CopyButton>
  );
}
