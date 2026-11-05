import InquireButton from "@/app/subs/sism/components/InquireButton";
import s from "./Proof.module.scss";

const ITEMS = [
  { year: "2026", text: "콘텐츠 제작사 웹사이트 리뉴얼과 백오피스 구축" },
  { year: "2023", text: "정부 증명서 발급 자동화 솔루션" },
  { year: "2023", text: "태권도 도장 관리 시스템, 웹과 모바일 앱" },
  { year: "2016", text: "버거 프랜차이즈 주문 시스템" },
  { year: "2015", text: "피자 프랜차이즈 홈페이지와 주문 시스템" },
  { year: "2015", text: "피자 프랜차이즈 e쿠폰 관리자 웹" },
];

export default function Proof() {
  return (
    <section id="proof" className={s.root}>
      <div className={`sism-container ${s.inner}`}>
        <div className={s.head}>
          <div className="sism-label">PROOF</div>
          <h2 className="sism-title">
            피자 주문부터
            <br />
            정부 서류 자동화까지
          </h2>
        </div>
        <div className={s.box}>
          <div className={s.grid}>
            {ITEMS.map((it) => (
              <div key={it.text} className={s.item} data-reveal="card">
                <span className={s.year}>{it.year}</span>
                <strong>{it.text}</strong>
              </div>
            ))}
          </div>
          <div className={s.more} data-reveal="proof-more">
            <div className={s.moreText}>
              <div aria-hidden="true" className={s.dots}>
                <span className={s.dotBlue} />
                <span className={s.dotGreen} />
                <span className={s.dotPlus}>+</span>
              </div>
              <p>
                <strong className="sism-hl">100건이 넘는</strong> 프로젝트
                가운데 일부입니다. 홈페이지, 업무 시스템, 앱, AI 서비스까지
                이어집니다.
              </p>
            </div>
            <InquireButton className={s.btn}>무료상담 신청</InquireButton>
          </div>
        </div>
      </div>
    </section>
  );
}
