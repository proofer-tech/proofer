import React from "react";

const ROWS: { label: string; typical: string; proofer: string }[] = [
  {
    label: "커리큘럼",
    typical: "표준 교안 그대로",
    proofer: "고객사 직무와 실제 데이터에 맞춰 모듈을 다시 짭니다",
  },
  {
    label: "실습 자료",
    typical: "공개 예제 데이터",
    proofer: "담당자가 실제로 다루는 업무 파일을 더미로 바꿔 씁니다",
  },
  {
    label: "강사",
    typical: "교육을 전업으로 하는 강사",
    proofer: "자체 서비스 3종을 직접 만들어 운영 중인 사람",
  },
  {
    label: "종료 시점",
    typical: "수료증 발급",
    proofer: "동작하는 결과물과 이관 리포트",
  },
  {
    label: "사후",
    typical: "만족도 조사",
    proofer:
      "현업 적용률까지 담은 결과 리포트를 내고, 이어 갈 사내 담당자를 남깁니다",
  },
  {
    label: "보안",
    typical: "일반 보안 수칙 안내",
    proofer: "분반이 다루는 자료를 기준으로 반출 금지선을 확정합니다",
  },
];

export default function Why() {
  return (
    <section className="page snap" id="why" data-sec="차별점">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">WHY</div>
          <h2>왜 프루퍼인가</h2>
        </div>
        <div className="why-scroll">
          <table className="why-table">
            <thead>
              <tr>
                <th aria-hidden="true" />
                <th>일반 교육업체</th>
                <th className="col-us">프루퍼</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>{row.typical}</td>
                  <td className="col-us">{row.proofer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="why-note">
          오른쪽 열은 프루퍼가 개발과 운영을 직접 하는 회사라서 적을 수 있는
          것들입니다. 만드는 회사가 가르치면 남는 것이 달라집니다.
        </p>
      </div>
    </section>
  );
}
