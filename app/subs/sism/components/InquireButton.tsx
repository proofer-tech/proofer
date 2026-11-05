"use client";

import React from "react";
import { useChannelIOApi } from "react-channel-plugin";
import { useIsChannelIOLoaded } from "@/src/hooks/channel";

interface InquireButtonProps {
  className?: string;
  children: React.ReactNode;
}

/** "무료상담 신청" 버튼. 채널톡 메신저를 연다(docs/sism-home-spec.md 5절). */
export default function InquireButton({
  className,
  children,
}: InquireButtonProps) {
  const isChannelIOLoaded = useIsChannelIOLoaded();
  const { showMessenger } = useChannelIOApi();

  return (
    <button
      type="button"
      className={className}
      onClick={() => (isChannelIOLoaded ? showMessenger() : null)}
    >
      {children}
    </button>
  );
}
