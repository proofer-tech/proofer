import Image from "next/image";
import s from "./Credentials.module.scss";

const CERTS = [
  {
    src: "/assets/images/sism/cert-g2b.jpg",
    alt: "조달청 경쟁입찰참가자격등록증 1쪽, 전화번호는 가림",
    title: "경쟁입찰참가자격등록증",
    sub: "조달청 나라장터, 2026년 10월",
  },
  {
    src: "/assets/images/sism/cert-sw.jpg",
    alt: "소프트웨어사업자 일반 현황 관리확인서, 매출과 인원은 가림",
    title: "소프트웨어사업자 확인서",
    sub: "한국인공지능소프트웨어산업협회, 2026년 10월",
  },
  {
    src: "/assets/images/sism/cert-venture.jpg",
    alt: "벤처기업확인서",
    title: "벤처기업확인서",
    sub: "벤처기업확인기관, 2026년 7월",
  },
  {
    src: "/assets/images/sism/cert-sme.jpg",
    alt: "중소기업 확인서 소기업",
    title: "중소기업 확인서",
    sub: "중소벤처기업부, 2026년 7월",
  },
];

// 천장: 원본 크기 보기는 새 탭으로 연다. 라이트박스가 필요해지면 클라이언트 컴포넌트로 바꾼다.
export default function Credentials() {
  return (
    <section id="credentials" className={s.root}>
      <div className={`sism-container ${s.inner}`}>
        <div className={s.head}>
          <div className="sism-label">CREDENTIALS</div>
          <h2 className="sism-title">
            공인 기관들로부터
            <br />
            보증 받았습니다
          </h2>
        </div>
        <div className={s.grid}>
          {CERTS.map((c) => (
            <a
              key={c.src}
              className={s.card}
              href={c.src}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={s.thumb}>
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 760px) 50vw, 280px"
                />
              </span>
              <span className={s.cap}>
                <strong>{c.title}</strong>
                <span>{c.sub}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
