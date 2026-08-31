import React from "react";

const ROWS: { label: string; typical: string; proofer: string }[] = [
  {
    label: "커리큘럼",
    typical: "표준 교안 그대로",
    proofer: "고객사 직무와 데이터에 맞춰 재설계",
  },
  {
    label: "실습 자료",
    typical: "예제 데이터",
    proofer: "고객사 실제 업무 자료(더미 처리)",
  },
  {
    label: "강사",
    typical: "교육 전문 강사",
    proofer: "실제로 시스템을 만드는 사람",
  },
  {
    label: "종료 시점",
    typical: "수료증 발급",
    proofer: "동작하는 결과물과 이관 리포트",
  },
  {
    label: "사후",
    typical: "만족도 조사",
    proofer: "현업 적용률 추적, 사내 담당자 양성",
  },
  {
    label: "보안",
    typical: "일반 안내",
    proofer: "고객사 반출 기준에 맞춘 실무 가이드",
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
          프루퍼가 개발과 운영을 직접 하는 회사라는 점이{" "}
          <b>이 표 전체의 근거입니다.</b>
        </p>
      </div>
    </section>
  );
}
