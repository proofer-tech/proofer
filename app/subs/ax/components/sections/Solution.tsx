import React from "react";

const STEPS = [
  { label: "AX 강의", desc: "쓸 줄 알게 만든다" },
  { label: "AX 해커톤", desc: "성과를 만들어 본다" },
  { label: "AX 컨설팅", desc: "조직이 스스로 굴린다" },
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
          프루퍼는 가르치고 끝나지 않고, 실제로 도는 것을 만들어 놓고 나옵니다.
        </p>
      </div>
    </section>
  );
}
