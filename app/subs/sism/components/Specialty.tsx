import s from "./Specialty.module.scss";

const ITEMS = [
  {
    abbr: "ERP",
    title: "전사 자원 관리",
    desc: "주문, 재고, 생산, 구매를 한 흐름으로 묶고 회계 프로그램과 연결합니다.",
  },
  {
    abbr: "CRM",
    title: "고객 관계 관리",
    desc: "문의, 상담, 영업 이력을 고객별로 모으고 담당자가 바뀌어도 이어서 봅니다.",
  },
  {
    abbr: "HRM",
    title: "인사 관리",
    desc: "채용 접수부터 인사 기록, 근태와 평가까지 직원의 기록을 한곳에서 관리합니다.",
  },
  {
    abbr: "KMS",
    title: "지식 관리",
    desc: "흩어진 사내 문서와 자료를 권한별로 정리하고 필요할 때 바로 찾게 합니다.",
  },
];

export default function Specialty() {
  return (
    <section id="specialty" className={s.root}>
      <div className={`sism-container ${s.inner}`}>
        <div className={s.head}>
          <div className="sism-label">SPECIALTY</div>
          <h2 className="sism-title">
            회사가 돌아가는 방식을
            <br />
            시스템에 담습니다
          </h2>
        </div>
        <div className={s.grid}>
          {ITEMS.map((i) => (
            <article
              key={i.abbr}
              className={`sism-card ${s.card}`}
              data-reveal="specialty"
            >
              <strong className={`sism-hl ${s.abbr}`} data-abbr={i.abbr}>
                {i.abbr}
              </strong>
              <h3 className={s.cardTitle}>{i.title}</h3>
              <p className={s.desc}>{i.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
