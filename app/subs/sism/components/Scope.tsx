import s from "./Scope.module.scss";

const ROWS = [
  {
    no: "03 SM",
    title: "운영과 유지관리",
    desc: "보안 업데이트와 서버, 인증서 갱신을 챙기고 장애가 나면 고칩니다. 다른 업체가 만든 시스템은 소스를 먼저 살펴본 뒤 넘겨받습니다.",
    tags: [
      "보안 취약점 점검",
      "서버 이전",
      "장애 접수와 처리 기록",
      "개선 요청 처리",
      "기존 시스템 인수",
    ],
    bg: s.row1,
    green: false,
  },
  {
    no: "02 SI",
    title: "사내 시스템과 연동",
    desc: "주문, 재고, 고객 관리처럼 회사 안에서 쓰는 시스템을 만들고, ERP나 회계 프로그램, 결제 서비스와 연결합니다.",
    tags: [
      "ERP, 재고 연동",
      "PG 결제, 정기결제",
      "알림톡, 문자 발송",
      "공공데이터, 외부 API",
      "주문, 재고 관리",
    ],
    bg: s.row2,
    green: false,
  },
  {
    no: "01 SI",
    title: "웹과 앱",
    desc: "회사 홈페이지와 서비스 웹, 쇼핑몰, iOS 와 안드로이드 앱을 기획부터 디자인, 개발까지 만듭니다. 관리자 화면과 직원별 권한도 같이 만듭니다.",
    tags: ["기업 홈페이지", "서비스 웹", "쇼핑몰", "모바일 앱", "관리자 화면"],
    bg: s.row3,
    green: true,
  },
];

export default function Scope() {
  return (
    <section id="scope" className={s.root}>
      <div className={`sism-container ${s.inner}`}>
        <div className={s.head}>
          <div className={s.headText}>
            <div className="sism-label">OUR ANSWER</div>
            <h2 className="sism-title">
              처음 상담부터 오픈 이후까지
              <br />한 팀이 맡습니다
            </h2>
          </div>
          <p className={s.lead}>
            기획서가 없어도 상담에서 함께 정리해드리고,
            <br />
            여기저기 흩어진 자료들도 하나로 묶어드립니다.
          </p>
        </div>
        <div className={s.list}>
          {ROWS.map((r) => (
            <article key={r.no} className={`${s.row} ${r.bg}`}>
              <div className={s.body}>
                <span className={s.no}>{r.no}</span>
                <h3 className={s.h3}>{r.title}</h3>
                <p className={s.p}>{r.desc}</p>
              </div>
              <ul className={`${s.tags} ${r.green ? s.tagsGreen : ""}`}>
                {r.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
