import React from "react";

const STEPS = [
  { label: "AX 강의", desc: "직원이 자기 반복 업무 세 가지를 AI로 옮깁니다" },
  {
    label: "AX 해커톤",
    desc: "팀이 부서 병목 하나를 동작하는 결과물로 만듭니다",
  },
  { label: "AX 컨설팅", desc: "사내 담당자가 다음 과제를 직접 굴립니다" },
];

export default function Solution() {
  return (
    <section className="page snap" id="solution" data-sec="우리의 답">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">SOLUTION</div>
          <h2>우리의 답</h2>
        </div>
        <div className="path-steps">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="path-step">
                <div className="path-step-label">{s.label}</div>
                <div className="path-step-desc">{s.desc}</div>
              </div>
              {i < STEPS.length - 1 && (
                <span className="path-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="solution-message">
          어디서 시작하든 도착하는 자리는 같습니다. 프루퍼가 나간 뒤에도
          사내에서 그 일이 계속 도는 데까지 같이 갑니다.
        </p>
      </div>
    </section>
  );
}
