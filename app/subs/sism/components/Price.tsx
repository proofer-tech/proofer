import s from "./Price.module.scss";

const MAILTO =
  "mailto:info@proofer.tech?subject=%EA%B2%AC%EC%A0%81%20%EC%9A%94%EC%B2%AD&body=%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD%EB%AA%85%EC%84%B8%EC%84%9C%EB%A5%BC%20%EC%B2%A8%EB%B6%80%ED%95%98%EC%8B%9C%EA%B1%B0%EB%82%98%20%EC%95%84%EB%9E%98%EC%97%90%20%ED%95%84%EC%9A%94%ED%95%9C%20%EA%B8%B0%EB%8A%A5%EC%9D%84%20%EC%A0%81%EC%96%B4%20%EC%A3%BC%EC%84%B8%EC%9A%94.%0A%0A%ED%9A%8C%EC%82%AC%EB%AA%85%3A%0A%EB%8B%B4%EB%8B%B9%EC%9E%90%20%EC%97%B0%EB%9D%BD%EC%B2%98%3A%0A%ED%95%84%EC%9A%94%ED%95%9C%20%EA%B8%B0%EB%8A%A5%3A%0A%ED%9D%AC%EB%A7%9D%20%EC%98%A4%ED%94%88%20%EC%8B%9C%EA%B8%B0%3A%0A";

const PLANS = [
  {
    tag: "SI",
    title: "홈페이지 제작",
    desc: "맞춤 디자인 10페이지 내외, 관리자 화면, 문의 접수와 메일 알림",
    prefix: "",
    amount: 250,
  },
  {
    tag: "SI",
    title: "업무 시스템",
    desc: "업무 영역 1개, 역할별 권한, 엑셀 업로드와 다운로드, 현황 대시보드",
    prefix: "",
    amount: 800,
  },
  {
    tag: "SI",
    title: "시스템 연동",
    desc: "외부 프로그램 1개와 자동 동기화, 오류 재처리, 기존 데이터 이관",
    prefix: "",
    amount: 450,
  },
  {
    tag: "SM",
    title: "운영 유지관리",
    desc: "보안 점검, 서버와 인증서, 장애 대응, 개선 작업",
    prefix: "월 ",
    amount: 90,
  },
];

export default function Price() {
  return (
    <section id="price" className={s.root}>
      <div className={`sism-container ${s.inner}`}>
        <div className={s.head}>
          <div className="sism-label">ENGAGEMENT MODEL</div>
          <h2 className="sism-title">
            기능 단위로 범위를 정하고
            <br />
            시작 금액을 먼저 보여드립니다
          </h2>
        </div>
        <div className={s.grid}>
          {PLANS.map((p) => {
            const sm = p.tag === "SM";
            return (
              <article
                key={p.title}
                className={`sism-card ${s.card} ${sm ? s.sm : ""}`}
                data-reveal="price"
              >
                <span className={`${s.tag} ${sm ? s.tagSm : ""}`}>{p.tag}</span>
                <h3 className={s.cardTitle}>{p.title}</h3>
                <p className={s.desc}>{p.desc}</p>
                <div className={s.price}>
                  <strong>
                    {p.prefix}
                    <span data-count={p.amount}>{p.amount}</span>만원
                  </strong>
                  <span className={s.from}>부터</span>
                </div>
              </article>
            );
          })}
        </div>
        <p className={s.vat}>부가세 별도입니다.</p>
        <div className={s.quote} data-reveal="card">
          <div className={s.quoteText}>
            <strong>하루 안에 메일로 견적을 드립니다</strong>
            <p>요구사항명세서를 첨부하거나 필요한 기능을 정리해 보내 주세요.</p>
          </div>
          <a href={MAILTO} className="sism-btn-p">
            이메일로 견적 받아보기
          </a>
        </div>
      </div>
    </section>
  );
}
