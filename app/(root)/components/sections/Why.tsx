import React from "react";

// ✓ = yes, △ = partial, — = no
const ROWS: {
  label: string;
  cells: [
    "yes" | "partial" | "no",
    "yes" | "partial" | "no",
    "yes" | "partial" | "no",
  ];
}[] = [
  { label: "진짜 문제 진단·제안", cells: ["yes", "no", "yes"] },
  { label: "직접 실행·구축", cells: ["no", "no", "yes"] },
  { label: "앱·서버·AI 직접 개발", cells: ["no", "no", "yes"] },
  { label: "조직·팀 빌딩", cells: ["partial", "no", "yes"] },
  { label: "운영 직접 관리", cells: ["no", "no", "yes"] },
  { label: "결과 책임 (성공 인센티브)", cells: ["partial", "yes", "yes"] },
];

const MARK = { yes: "✓", partial: "△", no: "—" } as const;

export default function Why() {
  return (
    <section className="page snap" id="why" data-sec="차별점">
      <div className="wrap">
        <div className="sect-head reveal" style={{ maxWidth: 720 }}>
          <div className="eyebrow">WHY PROOFER</div>
          <h2>진단만 하는 곳, 매칭만 하는 곳, 그리고 프루퍼</h2>
        </div>
        <div className="why-scroll reveal d1">
          <table className="why-table">
            <thead>
              <tr>
                <th aria-hidden="true" />
                <th>일반 컨설팅펌</th>
                <th>M&amp;A 중개·리스팅</th>
                <th className="col-us">
                  그로스 컨설팅펌
                  <br />
                  <span>프루퍼</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.cells.map((c, i) => (
                    <td key={i} className={i === 2 ? "col-us" : undefined}>
                      <span className={c}>{MARK[c]}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="why-note reveal d2">
          실행·개발·조직·운영까지 모두 책임지는 곳은{" "}
          <b>그로스 컨설팅펌뿐입니다.</b>
        </p>
      </div>
    </section>
  );
}
