import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";

export default function Hero() {
  return (
    <section className="page snap" id="hero" data-sec="홈">
      <div className="wrap">
        <div className="eyebrow">기업 AX 교육, 해커톤, 컨설팅</div>
        <h1>히어로</h1>
        <AxInquireButton className="btn btn-primary">
          무료 AX 상담
        </AxInquireButton>
      </div>
    </section>
  );
}
