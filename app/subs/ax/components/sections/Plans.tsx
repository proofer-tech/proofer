import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";

const PLANS: {
  name: string;
  tagline: string;
  when: string;
  duration: string;
  scale: string;
  includes: string;
  deliverable: string;
  featured?: boolean;
}[] = [
  {
    name: "강의 플랜",
    tagline: "쓸 줄 알게 만듭니다",
    when: "AI를 아직 안 씁니다",
    duration: "반일에서 2일",
    scale: "15명에서 40명",
    includes: "L1에서 L4 중 선택, 교안, 계정, 결과 리포트",
    deliverable: "개인별 업무 적용 결과물",
  },
  {
    name: "해커톤 플랜",
    tagline: "성과를 만들어 봅니다",
    when: "교육했는데 성과가 없습니다",
    duration: "6주에서 8주",
    scale: "4팀에서 10팀",
    includes: "과제 발굴, 킥오프, 빌드, 데모데이, 이관",
    deliverable: "팀별 동작 결과물, 이관 리포트",
    featured: true,
  },
  {
    name: "컨설팅 플랜",
    tagline: "조직이 스스로 굴립니다",
    when: "전사 체계가 필요합니다",
    duration: "3개월에서 6개월",
    scale: "전사",
    includes: "진단, 로드맵, 파일럿, 내재화",
    deliverable: "로드맵, 보안 가이드, 파일럿, 사내 강사",
  },
];

export default function Plans() {
  return (
    <section className="page snap" id="plans" data-sec="플랜">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">PLANS</div>
          <h2>세 가지 플랜</h2>
        </div>
        <div className="plans-grid">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`card plan-card${plan.featured ? " featured" : ""}`}
            >
              {plan.featured && <span className="plan-badge">추천</span>}
              <h3>{plan.name}</h3>
              <p className="plan-tagline">{plan.tagline}</p>
              <dl className="plan-info">
                <div>
                  <dt>이럴 때</dt>
                  <dd>{plan.when}</dd>
                </div>
                <div>
                  <dt>기간</dt>
                  <dd>{plan.duration}</dd>
                </div>
                <div>
                  <dt>규모</dt>
                  <dd>{plan.scale}</dd>
                </div>
                <div>
                  <dt>포함</dt>
                  <dd>{plan.includes}</dd>
                </div>
                <div>
                  <dt>산출물</dt>
                  <dd>{plan.deliverable}</dd>
                </div>
              </dl>
              <div className="plan-price">상담 후 견적</div>
              <AxInquireButton className="btn btn-primary plan-btn">
                무료 AX 상담
              </AxInquireButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
