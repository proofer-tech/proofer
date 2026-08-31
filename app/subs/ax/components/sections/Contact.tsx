import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";

export default function Contact() {
  return (
    <section className="page snap" id="contact" data-sec="상담">
      <div className="wrap">
        <div className="section-head">
          <h2>우리 회사에 무엇부터 맞을지 같이 봐 드립니다.</h2>
          <p className="contact-body">
            상담은 무료이고, 커리큘럼 초안과 견적까지 드립니다. 도입 결정은 그
            뒤에 하셔도 됩니다.
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
