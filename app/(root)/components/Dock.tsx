import React from "react";
import InquireButton from "./InquireButton";

/** 스크롤 중 따라오는 도킹 CTA. 노출/숨김은 Effects 가 .on 토글로 제어. */
export default function Dock() {
  return (
    <div className="dock-cta" id="dock-cta">
      <b>프루퍼와 이야기 나눠 보세요</b>
      <InquireButton className="btn btn-primary">무료상담 신청</InquireButton>
    </div>
  );
}
