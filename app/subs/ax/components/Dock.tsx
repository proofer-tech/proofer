"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";

// 히어로가 화면 아래쪽 이 비율보다 위까지 남아 있으면 숨는다(히어로 하단이 화면의 40% 지점 아래)
const HERO_VISIBLE_EDGE = 0.4;
// #contact 머리가 화면의 이 비율 지점보다 위로 올라오면 숨는다. 섹션 높이와 상관없이 동작한다
const CONTACT_TOP_EDGE = 0.6;

/**
 * 스펙 3.3.1절 도킹 CTA. 히어로가 보이는 동안과 #contact 에 들어선 뒤에는 숨는다.
 * layout 에 한 번 마운트되므로 탭 이동(클라이언트 내비게이션) 뒤에도 새 페이지의 #top, #contact 를
 * 다시 찾아야 한다. 그래서 IntersectionObserver 대신 스크롤마다 id 로 다시 찾는다.
 */
export default function Dock() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);

  useEffect(() => {
    let ticking = false;
    const check = () => {
      ticking = false;
      const vh = window.innerHeight;
      const hero = document.getElementById("top");
      const contact = document.getElementById("contact");
      const heroVisible = hero
        ? hero.getBoundingClientRect().bottom > vh * HERO_VISIBLE_EDGE
        : false;
      const inContact = contact
        ? contact.getBoundingClientRect().top < vh * CONTACT_TOP_EDGE
        : false;
      setOn(!heroVisible && !inContact);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <div className={`ax-dock${on ? " ax-dock--on" : ""}`} aria-hidden={!on}>
      <b>어디서부터 시작할지 함께 정해봅시다</b>
      <AxInquireButton className="ax-dock__btn">도입 문의하기</AxInquireButton>
    </div>
  );
}
