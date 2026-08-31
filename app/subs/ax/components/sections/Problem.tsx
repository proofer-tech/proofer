import React from "react";

const PROBLEMS = [
  {
    title: "강의는 좋았고, 업무는 그대로입니다",
    desc: "만족도는 잘 나왔습니다. 그날 만든 실습 파일을 다시 연 사람은 지금 한 명도 없습니다.",
  },
  {
    title: "도구는 샀는데 요금만 나갑니다",
    desc: "전사 계정을 열어 놓았습니다. 정작 여는 사람은 한두 팀이고, 나머지 계정은 로그인 기록도 없이 다음 달 청구서에 그대로 올라옵니다.",
  },
  {
    title: "내년 예산 앞에서 말문이 막힙니다",
    desc: "임원이 알고 싶은 것은 하나입니다. 그래서 뭐가 달라졌느냐는 물음에, 수료 인원과 만족도 점수 말고는 내밀 것이 없습니다.",
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
