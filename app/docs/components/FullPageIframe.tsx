"use client";
import { ElementProps } from "@mantine/core/lib/core";
import React, { useState } from "react";
import { Center, Loader } from "@mantine/core";

interface FullPageIframeProps extends ElementProps<"iframe"> {}

export default function FullPageIframe(props: FullPageIframeProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <>
      {isLoading && (
        <Center
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Loader color="blue" size="xl" />
        </Center>
      )}
      <iframe
        allowFullScreen
        style={{
          border: "none",
          width: "100%",
          height: isLoading
            ? 0
            : "calc(100vh - var(--app-shell-header-offset))",
        }}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </>
  );
}
