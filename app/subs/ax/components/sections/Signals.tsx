import React from "react";

const ROWS: { scale: string; situation: string; proposal: string }[] = [
  {
    scale: "대기업",
    situation: "부서마다 쓰는 수준이 다르고, 보안팀이 외부 도구부터 막습니다",
    proposal:
      "직무별 L2 분반으로 부서 편차를 좁히고, 컨설팅 진단으로 현행 보안 정책부터 점검합니다",
  },
  {
    scale: "중견기업",
    situation:
      "전 직원 교육까지 돌렸습니다. 그런데 임원이 성과를 물으면 내놓을 것이 없습니다",
    proposal:
      "해커톤에서 부서 과제 하나를 동작하는 결과물까지 만듭니다. 남은 인원은 L1으로 채웁니다",
  },
  {
    scale: "중소기업",
    situation: "한 사람이 여러 일을 겹쳐 맡습니다",
    proposal:
      "L1 8시간이면 전 인원을 한 번에 끝냅니다. 끌고 갈 인원만 L3로 올립니다",
  },
  {
    scale: "스타트업",
    situation: "배울 시간에 만들어야 하고, 배운 사람이 그날 바로 실무자입니다",
    proposal: "L3 파워유저부터 엽니다. 막힌 일을 그대로 해커톤 과제로 겁니다",
  },
];

export default function Signals() {
  return (
    <section className="page snap" id="signals" data-sec="대상">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">SIGNALS</div>
          <h2>우리 회사는</h2>
        </div>
        <div className="signals-scroll">
          <table className="signals-table">
            <thead>
              <tr>
                <th>규모</th>
                <th>전형적 상황</th>
                <th>첫 제안</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.scale}>
                  <th scope="row">{row.scale}</th>
                  <td>{row.situation}</td>
                  <td className="col-proposal">{row.proposal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
