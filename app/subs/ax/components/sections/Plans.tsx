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
    tagline:
      "수료하는 날 직원마다 자기 업무에 바로 쓸 결과물 하나를 들고 나갑니다",
    when: "AI를 업무에 쓰는 직원이 한두 명뿐입니다",
    duration: "반일에서 2일",
    scale: "15명에서 40명",
    includes:
      "L1에서 L4 중 선택, 고객사 자료로 만든 실습, 교육 기간 AI 계정, 수료 후 교안 열람",
    deliverable: "직원별 업무 적용 결과물, 만족도와 적용률 리포트",
  },
  {
    name: "해커톤 플랜",
    tagline: "팀이 부서 병목 하나를 골라 실제로 도는 도구까지 만들어 냅니다",
    when: "교육은 했는데 임원에게 보여줄 결과물이 없습니다",
    duration: "6주에서 8주",
    scale: "4팀에서 10팀",
    includes: "과제 발굴 2주, 킥오프, 빌드 멘토링, 데모데이 심사, 이관 2주",
    deliverable: "팀별로 동작하는 결과물, 데모 영상, 이관 리포트",
    featured: true,
  },
  {
    name: "컨설팅 플랜",
    tagline:
      "프루퍼가 파일럿까지 직접 만든 뒤 조직이 스스로 굴러가게 넘겨 드립니다",
    when: "임원이 전사 계획을 요구하는데 어디서부터 세워야 할지 모르겠습니다",
    duration: "3개월에서 6개월",
    scale: "전사",
    includes:
      "업무 인벤토리 진단, 우선순위 과제 선정, 파일럿 구축, 사내 강사 양성",
    deliverable:
      "진단 리포트, 3개년 로드맵, 보안 가이드라인, 동작하는 파일럿, 사내 강사 인증",
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
