"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import SegmentTabs from "@/app/subs/ax/components/SegmentTabs";
import { SEGMENTS, segmentFromPath } from "@/app/subs/ax/segments";

// 스펙 4.3절 "상단 헤더" 행: 40px 넘게 내리면 배경/경계선이 짙어진다
const SCROLL_THRESHOLD = 40;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const nav = SEGMENTS[segmentFromPath(usePathname() ?? "/")].nav;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`ax-header${scrolled ? " ax-header--scrolled" : ""}`}>
      <a href="#top" className="ax-header__brand" aria-label="proofer AX 홈">
        <Image
          src="/assets/images/branding.svg"
          alt="proofer"
          width={21}
          height={22}
          priority
        />
        <span className="ax-header__brand-mark">AX</span>
      </a>
      <nav className="ax-nav" aria-label="섹션 내비게이션">
        {nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <AxInquireButton className="ax-btn">도입 문의</AxInquireButton>
      <SegmentTabs />
    </header>
  );
}
