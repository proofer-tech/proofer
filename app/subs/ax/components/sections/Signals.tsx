import React from "react";

const ROWS: { scale: string; situation: string; proposal: string }[] = [
  {
    scale: "대기업",
    situation: "부서마다 성숙도가 다르고 보안 기준이 높습니다",
    proposal: "직무별 L2 분반 + 컨설팅 진단",
  },
  {
    scale: "중견기업",
    situation: "전사 확산은 했는데 성과가 안 보입니다",
    proposal: "L1 전사 확산 + 해커톤",
  },
  {
    scale: "중소기업",
    situation: "인원이 적어 한 번에 끝내야 합니다",
    proposal: "L1 8시간 집중 + L3 소수 정예",
  },
  {
    scale: "스타트업",
    situation: "속도가 중요하고 인원이 곧 실무자입니다",
    proposal: "L3 파워유저 + 해커톤",
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
