import React from "react";

const CARDS = [
  {
    label: "리드타임",
    value: "0.5 ~ 1년",
    desc: "직접 경영에 참여하고 실행하되, 1년 이상은 선택사항입니다.",
  },
  {
    label: "비용 구조",
    value: "급여 + 인센티브",
    desc: "프로젝트 기간 급여는 고객사 부담. 여기에 성과에 따른 성공 인센티브를 더합니다.",
  },
  {
    label: "매각 결정",
    value: "의사결정",
    desc: "밸류업 이후, 매각 여부는 대주주가 결정합니다.",
  },
];

const FLOW = ["진단", "실행 (~1년)", "밸류업", "대주주 매각 결정"];

export default function Engagement() {
  return (
    <section className="page snap" id="engagement" data-sec="참여방식">
      <div className="wrap">
        <div className="sect-head reveal" style={{ maxWidth: 720 }}>
          <div className="eyebrow">ENGAGEMENT MODEL</div>
          <h2>스킨 인 더 게임 — 결과로 정렬된 구조</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            회사를 &apos;팔리는 상태&apos;까지 만들고, 결정은 대주주에게. 보상은
            그에 합당하게.
          </p>
        </div>
        <div className="engage-grid reveal d1">
          {CARDS.map((c) => (
            <div key={c.label} className="engage-card">
              <span className="ec-label">{c.label}</span>
              <div className="ec-value">{c.value}</div>
              <p className="ec-desc">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="engage-flow reveal d2">
          {FLOW.map((step, i) => (
            <React.Fragment key={step}>
              <div className={`ef-step${i === FLOW.length - 1 ? " last" : ""}`}>
                <span className="ef-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="ef-label">{step}</span>
              </div>
              {i < FLOW.length - 1 && <span className="ef-arrow">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
