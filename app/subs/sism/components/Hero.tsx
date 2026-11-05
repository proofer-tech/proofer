"use client";

import Image from "next/image";
import { useRef } from "react";
import InquireButton from "@/app/subs/sism/components/InquireButton";
import s from "./Hero.module.scss";

export const MENU = [
  ["서비스", "#scope"],
  ["비용", "#price"],
  ["업무 시스템", "#specialty"],
  ["업종", "#industry"],
  ["수행 이력", "#proof"],
  ["등록 서류", "#credentials"],
  ["자주 묻는 질문", "#faq"],
];

const BAND = [
  ["나라장터 경쟁입찰참가자격", "공공기관 발주 입찰 참가"],
  ["소프트웨어사업자 신고", "한국인공지능소프트웨어산업협회"],
  ["벤처기업 확인", "2026년 7월 확인"],
  ["수행 프로젝트 100건+", "홈페이지, 업무시스템과 앱, AI까지"],
];

export default function Hero() {
  const menu = useRef<HTMLDetailsElement>(null);
  // 패널 안의 항목을 누르면(앵커 이동이든 상담 버튼이든) 메뉴를 닫는다
  const closeMenu = () => {
    if (menu.current) menu.current.open = false;
  };

  return (
    <section id="top" className={s.root}>
      <Image
        src="/assets/images/sism/sism-hero-office.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className={s.bg}
      />
      <div aria-hidden="true" className={s.veil} />
      <div className={`sism-container ${s.inner}`}>
        <header className={s.header}>
          <a href="#top" aria-label="proofer SI SM 홈" className={s.brand}>
            <Image
              src="/assets/images/sism/proofer-mark.svg"
              alt=""
              width={22}
              height={23}
            />
            <span className={s.brandName}>SI SM</span>
          </a>
          <details className={s.mMenu} ref={menu}>
            <summary aria-label="메뉴 열기">
              <span />
              <span />
            </summary>
            <div className={s.mPanel} onClick={closeMenu}>
              {MENU.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
              <InquireButton className={s.mCta}>무료상담 신청</InquireButton>
            </div>
          </details>
          <nav aria-label="주 메뉴" className={s.nav}>
            {MENU.map(([label, href]) => (
              <a key={href} href={href} className={s.navlink}>
                {label}
              </a>
            ))}
            <InquireButton className={`sism-btn-p ${s.navCta}`}>
              무료상담 신청
            </InquireButton>
          </nav>
        </header>

        <div className={s.body}>
          <div className={s.copy}>
            <div className="sism-label">
              SYSTEM INTEGRATION + SYSTEM MANAGEMENT
            </div>
            <h1 className={s.h1}>
              <span className="sism-hl">내 사업</span>처럼
              <br />
              만들고, 관리합니다
            </h1>
            <p className={s.sub}>
              고객사의 사정을 백번 이해하고, 유연하게 함께 움직입니다. 오픈한
              뒤에도 운영에 필요한것들을 알아서 챙기며 관리해드립니다.
            </p>
            <div className={s.actions}>
              <InquireButton className="sism-btn-p">
                무료상담 신청
              </InquireButton>
              <a href="#price" className={s.ghost}>
                비용 보기
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={s.band}>
        <div className={`sism-container ${s.bandGrid}`} data-m="band">
          {BAND.map(([title, desc]) => (
            <div key={title} className={s.bandItem}>
              <strong>{title}</strong>
              <span className={s.bandDesc}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
