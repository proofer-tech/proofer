import React from "react";

const STEPS = [
  {
    n: "01",
    title: "현장 진단부터 직접",
    desc: "받은 과제가 아니라 그 뒤의 '진짜 문제'를 다시 정의합니다.",
  },
  {
    n: "02",
    title: "필요하면 직접 개발",
    desc: "사람·프로세스로 풀 일은 컨설팅으로, 도구가 필요하면 앱·서버·AI까지 직접 만듭니다.",
  },
  {
    n: "03",
    title: "운영효율 → 기업가치",
    desc: "영업이익과 기업가치를 끌어올립니다. 매각 여부는 대주주가 결정합니다.",
  },
];

export default function Solution() {
  return (
    <section className="page snap" id="solution" data-sec="우리의 답">
      <div className="sweep" />
      <div className="wrap inner">
        <div>
          <div className="eyebrow">OUR ANSWER</div>
          <h2>
            직접 들어가, 직접 만들고,
            <br />
            가치를 남깁니다
          </h2>
          <p>
            받은 과제만 처리하지 않습니다. 현장에 직접 들어가 진짜 문제부터 다시
            정의하고, 손이 필요한 곳은 직접 만들어 운영효율을 끌어올립니다.
          </p>
          <p className="answer-note">
            결국 일은 사람이 합니다 — 일할 수 있는 환경을 만들고, 업무관리를
            직접 합니다.
          </p>
        </div>
        <ol className="answer-steps">
          {STEPS.map((s) => (
            <li key={s.n}>
              <span className="astep-n">{s.n}</span>
              <div>
                <b>{s.title}</b>
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
