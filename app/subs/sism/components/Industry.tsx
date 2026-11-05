import s from "./Industry.module.scss";

const ITEMS = [
  {
    title: "제조, 공장",
    desc: "도면과 수량, 납기를 받아 기술 담당에게 넘깁니다. 도면은 볼 수 있는 사람을 정해 두고, 고친 도면은 이전 판과 함께 보관합니다.",
    tags: ["도면 견적 접수", "고객별 기술자료"],
  },
  {
    title: "건설, 시공",
    desc: "현장 상담을 접수하고, 고객마다 견적과 수정안을 따로 보여줍니다. 공사가 끝난 뒤 하자 접수와 처리 기록도 같은 곳에 남습니다.",
    tags: ["현장 상담", "하자 접수"],
  },
  {
    title: "기업 간 거래, 유통",
    desc: "승인된 거래처만 로그인해서 자기 단가로 발주하고 출고 상태를 확인합니다. 쓰던 엑셀 가격표를 옮기는 데서 시작합니다.",
    tags: ["거래처별 단가", "발주 승인"],
  },
  {
    title: "프랜차이즈, 외식",
    desc: "가맹 문의와 매장 주문, 쿠폰 발행과 정산을 다룹니다. 본사와 매장이 보는 화면은 나눠서 만듭니다.",
    tags: ["주문 시스템", "쇼핑몰 연동", "매장 관리"],
  },
  {
    title: "교육, 회원 관리",
    desc: "출결과 납부는 관리자 화면에서 보고, 보호자 안내는 모바일 앱으로 보냅니다.",
    tags: ["출석부", "회원 관리", "LMS"],
  },
  {
    title: "반복 행정 업무",
    desc: "증명서를 떼고 서류를 모으는 일처럼 매번 같은 사이트를 오가는 작업을 자동으로 돌립니다.",
    tags: ["발급 자동화", "정산", "데이터 수집"],
  },
];

export default function Industry() {
  return (
    <section id="industry" className={s.root}>
      <div className={`sism-container ${s.inner}`}>
        <div className={s.head}>
          <div className="sism-label">WHO WE WORK WITH</div>
          <h2 className="sism-title">
            일하는 방식에
            <br />
            맞춰 만듭니다
          </h2>
        </div>
        <div className={s.grid}>
          {ITEMS.map((i) => (
            <article key={i.title} className={`sism-card ${s.card}`}>
              <h3 className={s.cardTitle}>{i.title}</h3>
              <p className={s.desc}>{i.desc}</p>
              <div className={s.tags}>
                {i.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
