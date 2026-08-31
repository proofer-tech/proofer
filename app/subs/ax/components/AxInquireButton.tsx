"use client";

import React from "react";
import { useChannelIOApi } from "react-channel-plugin";
import { useIsChannelIOLoaded } from "@/src/hooks/channel";

interface AxInquireButtonProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/** "무료 AX 상담" 버튼. 채널톡 상담을 연다(Tally 아님). */
export default function AxInquireButton({
  className,
  children,
  style,
}: AxInquireButtonProps) {
  const isChannelIOLoaded = useIsChannelIOLoaded();
  const { showMessenger } = useChannelIOApi();

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => (isChannelIOLoaded ? showMessenger() : null)}
    >
      {children}
    </button>
  );
}
