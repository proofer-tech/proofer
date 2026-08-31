import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";

export default function Contact() {
  return (
    <section className="page snap" id="contact" data-sec="상담">
      <div className="wrap">
        <div className="section-head">
          <h2>상담 한 번으로 품의서에 붙일 커리큘럼 초안과 견적을 드립니다.</h2>
          <p className="contact-body">
            미리 준비해 오실 것은 없습니다. 인원과 일정, 사내 보안 조건만 알려
            주시면 어느 플랜부터 시작할지 같이 정합니다. 도입 결정은 그 뒤에
            하셔도 됩니다.
          </p>
        </div>
        <AxInquireButton className="btn btn-primary">
          무료 AX 상담
        </AxInquireButton>
      </div>
      <div className="mobile-cta">
        <AxInquireButton className="btn btn-primary">
          무료 AX 상담
        </AxInquireButton>
      </div>
    </section>
  );
}
