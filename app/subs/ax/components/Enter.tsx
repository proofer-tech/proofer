"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { animate, cubicBezier } from "animejs";

/**
 * 스크롤 진입 모션 공용 유틸. `docs/ax-landing-spec.md` 4장이 단일 출처다.
 * 값을 여기서 바꾸지 말고 스펙을 먼저 고친다.
 */
const ENTER_EASE = cubicBezier(0.2, 0.7, 0.2, 1);
const ENTER_DURATION = 600;
const STAGGER_STEP = 80;
const STAGGER_MAX_STEPS = 4;
const TRANSLATE_Y = 26;
// 뷰포트 아래쪽 경계에서 화면 높이의 12%만큼 안으로 들어오면 재생(스펙 4.2절 "계기가 되는 지점")
const TRIGGER_ROOT_MARGIN = "0px 0px -12% 0px";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface EnterProps {
  children: React.ReactNode;
  /** 계단 진입에서 이 요소의 순서(0부터). 지연은 0.08s 단위, 5단(0.32s)에서 멈춘다 */
  index?: number;
  /** 관찰 없이 로드 직후 재생한다. 첫 화면에 이미 들어와 있는 요소에만 쓴다 */
  immediate?: boolean;
}

export default function Enter({
  children,
  index = 0,
  immediate = false,
}: EnterProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // prefers-reduced-motion: reduce -> 최종 상태 그대로, 아무 것도 숨기지 않는다
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // 초기 숨김은 여기(자바스크립트가 켜졌고 동작 줄이기가 꺼진 것을 확인한 뒤)에만 적용한다
    el.style.opacity = "0";
    el.style.transform = `translateY(${TRANSLATE_Y}px)`;

    let anim: ReturnType<typeof animate> | null = null;
    const play = () => {
      el.style.willChange = "opacity, transform";
      anim = animate(el, {
        opacity: [0, 1],
        translateY: [TRANSLATE_Y, 0],
        duration: ENTER_DURATION,
        delay: Math.min(index, STAGGER_MAX_STEPS) * STAGGER_STEP,
        ease: ENTER_EASE,
        onComplete: () => {
          el.style.willChange = "";
        },
      });
    };

    if (immediate) {
      play();
      return () => anim?.pause();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { rootMargin: TRIGGER_ROOT_MARGIN },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      anim?.pause();
    };
  }, [index, immediate]);

  return <div ref={ref}>{children}</div>;
}
