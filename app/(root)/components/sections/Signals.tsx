import React from "react";

const SIGNALS = [
  "매각하고 싶은데, 운영효율이 안 나와 팔기 어려운 회사",
  "아이템은 훌륭하고 급성장했지만, 영업이익이 바닥인 회사",
  "창업멤버와 경력직 간 갈등으로 성장이 주춤한 회사",
  "브랜드 · 글로벌 · 유통 · 테크 · 커머스이지만, 제조는 하지 않는 회사",
  "그 외 기업가치 향상(밸류업)을 원하는 모든 회사",
];

export default function Signals() {
  return (
    <section className="page snap" id="signals" data-sec="대상">
      <div className="wrap">
        <div
          className="sect-head center reveal"
          style={{ margin: "0 auto 18px" }}
        >
          <div className="eyebrow">WHO WE WORK WITH</div>
          <h2>밸류업이 필요한 5가지 신호</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            아래 중 하나라도 해당된다면, 프루퍼의 고객이 될 수 있습니다.
          </p>
        </div>
        <ol className="signals reveal d1">
          {SIGNALS.map((s, i) => (
            <li key={s} className="signal">
              <span className="sig-n">{String(i + 1).padStart(2, "0")}</span>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
