import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";

export default function Hero() {
  return (
    <section className="page snap" id="hero" data-sec="홈">
      <div className="wrap">
        <div className="eyebrow">임직원 AI 교육, 쓰게 만드는 데까지</div>
        <h1>교육이 끝난 자리에 동작하는 결과물이 남습니다</h1>
        <p className="sub">
          만족도는 높았는데 석 달 뒤에는 아무도 안 쓰는 교육을 겪어 보셨을
          겁니다. 프루퍼는 부서 병목 하나를 과제로 걸고, 그것이 실제로 돌아갈
          때까지 같이 만듭니다.
        </p>
        <div className="mini-metrics">
          <span>현업 개발 10년+ 대표가 직접 강의</span>
          <span className="dotx">·</span>
          <span>조직 설계는 HR 20년+ 임원</span>
          <span className="dotx">·</span>
          <span>자체 서비스 3종 운영 중</span>
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
