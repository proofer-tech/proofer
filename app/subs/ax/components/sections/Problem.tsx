import React from "react";

const PROBLEMS = [
  {
    title: "교육은 했는데 아무도 안 씁니다",
    desc: "만족도는 높은데 현업 적용률이 잡히지 않습니다.",
  },
  {
    title: "도구는 샀는데 방치됩니다",
    desc: "계정 비용만 나가고 활용 부서가 한두 곳에 멈춥니다.",
  },
  {
    title: "성과를 숫자로 못 냅니다",
    desc: "다음 해 예산을 지킬 근거가 만들어지지 않습니다.",
  },
];

export default function Problem() {
  return (
    <section className="page snap" id="problem" data-sec="문제">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">PROBLEM</div>
          <h2>문제</h2>
        </div>
        <div className="prob-grid">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="card prob-card">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
