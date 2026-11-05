import s from "./Partner.module.scss";

const CARDS = [
  {
    tag: "기업 프로젝트",
    title: "아이디어만 있어도 시작합니다",
    body: "기획서가 없어도 됩니다. 만들고 싶은 것과 참고할 서비스를 보고 기획부터 같이 잡습니다.",
  },
  {
    tag: "공공과 지원사업",
    title: "입찰과 과제 증빙까지 준비합니다",
    body: "나라장터 입찰에 참가할 수 있습니다. 지원사업 과제라면 개발과 함께 제출할 산출물과 증빙 문서도 만듭니다.",
  },
];

export default function Partner() {
  return (
    <section id="partner" className={s.root}>
      <div className={`sism-container ${s.inner}`}>
        <div className={s.head}>
          <div className="sism-label">HOW TO WORK WITH US</div>
          <h2 className="sism-title">
            공공 과제, 기업 프로젝트
            <br />
            모두 가능합니다
          </h2>
        </div>
        <div className={s.grid}>
          {CARDS.map((c) => (
            <article key={c.tag} className={`sism-card ${s.card}`}>
              <span className={s.tag}>{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
