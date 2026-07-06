import React from "react";

const PROBLEMS = [
  {
    title: "매각이 막힙니다",
    desc: "매수자는 '정리된 회사'를 원합니다. 운영효율이 안 나오면 리스팅·중개만으론 가격 갭이 좁혀지지 않습니다.",
  },
  {
    title: "영업이익이 바닥입니다",
    desc: "아이템은 훌륭하고 급성장했지만, 매출은 느는데 정작 남는 게 없습니다.",
  },
  {
    title: "사람 때문에 멈춥니다",
    desc: "창업멤버와 경력직 간 갈등으로 실행이 어긋나고 회사 성장이 주춤합니다.",
  },
  {
    title: "제조 역량이 없습니다",
    desc: "브랜드·글로벌·유통·테크·커머스가 핵심인데, 결국 승부는 운영과 시스템에서 납니다.",
  },
];

export default function Problem() {
  return (
    <section className="page snap" id="problem" data-sec="문제">
      <div className="wrap center">
        <div className="eyebrow reveal">PROBLEM</div>
        <h2
          className="reveal d1"
          style={{ fontSize: "clamp(23px,3.2vw,34px)", marginTop: 6 }}
        >
          좋은 아이템이, 회사 가치로 이어지지 않을 때
        </h2>
        <div className="prob-grid">
          {PROBLEMS.map((p, i) => (
            <div key={p.title} className={`prob-card reveal d${i + 1}`}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
        <p
          className="closing reveal"
          style={{
            marginTop: 44,
            fontSize: "clamp(17px,2.4vw,25px)",
            color: "var(--ink)",
          }}
        >
          <span id="closeText">
            밸류업 없이는, <span className="hl">엑싯도 없습니다.</span>
          </span>
          <span className="caret" />
        </p>
      </div>
    </section>
  );
}
