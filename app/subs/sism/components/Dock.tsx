"use client";

import { useEffect, useState } from "react";
import InquireButton from "@/app/subs/sism/components/InquireButton";
import s from "./Dock.module.scss";

// 히어로 하단이 화면 높이의 이 비율 지점보다 아래에 있는 동안은 숨는다(ax Dock 과 같다)
const HERO_VISIBLE_EDGE = 0.4;
// #contact 머리가 화면 높이의 이 비율 지점보다 위로 올라오면 숨는다
const CONTACT_TOP_EDGE = 0.6;

/** 도킹 CTA(docs/sism-home-spec.md 5절). 판정은 app/subs/ax/components/Dock.tsx 의 사본이다. */
export default function Dock() {
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
  }, []);

  return (
    <div className={`${s.root}${on ? ` ${s.on}` : ""}`} aria-hidden={!on}>
      <b>프루퍼와 이야기 나눠 보세요</b>
      <InquireButton className={s.btn}>무료상담 신청</InquireButton>
    </div>
  );
}
