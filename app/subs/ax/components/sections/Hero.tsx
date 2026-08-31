import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";

export default function Hero() {
  return (
    <section className="page snap" id="hero" data-sec="홈">
      <div className="wrap">
        <div className="eyebrow">기업 AX 교육, 해커톤, 컨설팅</div>
        <h1>교육을 듣고 끝나지 않게 만듭니다</h1>
        <p className="sub">
          강의로 쓸 줄 알게 만들고, 해커톤으로 성과를 만들고, 컨설팅으로 조직이
          스스로 굴러가게 합니다.
        </p>
        <div className="mini-metrics">
          <span>개발 10년+ 대표가 직접 강의</span>
          <span className="dotx">·</span>
          <span>HR 20년+ 조직 설계</span>
          <span className="dotx">·</span>
          <span>직접 만들어 운영 중인 서비스 3종</span>
        </div>
        <div className="hero-actions">
          <AxInquireButton className="btn btn-primary">
            무료 AX 상담
          </AxInquireButton>
          <a href="#curriculum" className="btn btn-secondary">
            커리큘럼 보기
          </a>
        </div>
      </div>
    </section>
  );
}
