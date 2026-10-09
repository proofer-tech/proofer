"use client";

import React, { useEffect, useState } from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";

/** 스펙 3.3.1절 도킹 CTA. 히어로가 40% 넘게 보이거나 #contact 가 50% 넘게 보이면 숨는다. */
export default function Dock() {
  const [heroVis, setHeroVis] = useState(true);
  const [contactVis, setContactVis] = useState(false);

  useEffect(() => {
    const watch = (
      id: string,
      threshold: number,
      set: (v: boolean) => void,
    ) => {
      const el = document.getElementById(id);
      if (!el) return () => {};
      const io = new IntersectionObserver(
        (es) => es.forEach((e) => set(e.isIntersecting)),
        { threshold },
      );
      io.observe(el);
      return () => io.disconnect();
    };
    const offHero = watch("top", 0.4, setHeroVis);
    const offContact = watch("contact", 0.5, setContactVis);
    return () => {
      offHero();
      offContact();
    };
  }, []);

  const on = !heroVis && !contactVis;
  return (
    <div className={`ax-dock${on ? " ax-dock--on" : ""}`} aria-hidden={!on}>
      <b>어디서부터 시작할지 함께 정해봅시다</b>
      <AxInquireButton className="ax-dock__btn">도입 문의하기</AxInquireButton>
    </div>
  );
}
