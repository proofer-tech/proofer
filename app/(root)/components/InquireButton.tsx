"use client";

import React, { useContext } from "react";
import TallyContext from "@/src/contexts/TallyContext";

interface InquireButtonProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/** "무료상담 신청" 버튼. 기존 Tally 팝업 연동을 재사용한다. */
export default function InquireButton({
  className,
  children,
  style,
}: InquireButtonProps) {
  const { openTallyPopup } = useContext(TallyContext);

  return (
    <button
      type="button"
      className={className}
      style={style}
      onClick={() => openTallyPopup()}
    >
      {children}
    </button>
  );
}
