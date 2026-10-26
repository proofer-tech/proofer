"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * `/` 모션. docs/ax-home-spec.md 7절과 시안 Home.dc.html 의 initMotion 값을 따른다.
 * 대상은 data-m 속성으로 찾는다. gsap 을 import 하는 곳은 여기뿐이라 기존 네 판에는 로드되지 않는다.
 * 처음부터 숨기는 CSS 가 없고 gsap.from 이 JS 실행 뒤에만 숨기므로, JS 가 안 돌면 전부 보인다.
 */
export default function HomeMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const q = (name: string) => `[data-m="${name}"]`;
    const doc = document.scrollingElement || document.documentElement;
    const scrolls = doc.scrollHeight > window.innerHeight + 200;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(
          q("hero-bg"),
          { scale: 1.12, duration: 1.8, ease: "power2.out" },
          0,
        )
        .from(q("hl"), { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0.15)
        .from(
          q("hero-fade"),
          { y: 24, opacity: 0, duration: 0.9, stagger: 0.12 },
          0.55,
        )
        .from(
          `${q("hero-strip")} > *`,
          { y: 28, opacity: 0, duration: 0.8, stagger: 0.08 },
          0.8,
        );

      if (!scrolls) return;
      const hero = {
        trigger: "#top",
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(q("hero-bg"), {
        yPercent: 14,
        ease: "none",
        scrollTrigger: hero,
      });
      gsap.to(q("hero-copy"), {
        y: -90,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: hero,
      });
      gsap.fromTo(
        q("org-bg"),
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: "#org",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>(q("rv")).forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(q("rvs")).forEach((el) => {
        gsap.from(el.children, {
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.11,
          scrollTrigger: { trigger: el, start: "top 84%", once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return null;
}
