"use client";

import { useEffect } from "react";

/**
 * 메인 페이지의 클라이언트 인터랙션을 담당한다.
 * 스크롤 스냅 토글, 진입 reveal, 히어로/마무리 타이핑, 카운트업,
 * 컨설팅 카드 펼침, 마그네틱 버튼, 히어로 패럴랙스,
 * 도킹 CTA, 도트 내비, 스크롤 프로그레스를 담당한다.
 */
export default function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cleanups: Array<() => void> = [];

    // 모든 섹션을 한 화면 스냅으로
    root.classList.add("snapping");
    cleanups.push(() => root.classList.remove("snapping"));

    const $ = (sel: string) => document.querySelector<HTMLElement>(sel);

    // 스크롤 프로그레스 + 헤더 블러
    const hd = $("#site-hd");
    const prog = $("#progress");
    const onScroll = () => {
      const st = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (prog) prog.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
      if (hd) hd.classList.toggle("scrolled", st > 16);
    };
    const onScrollRaf = () => requestAnimationFrame(onScroll);
    addEventListener("scroll", onScrollRaf, { passive: true });
    onScroll();
    cleanups.push(() => removeEventListener("scroll", onScrollRaf));

    // 카운트업
    const runCount = (el: HTMLElement) => {
      if (el.dataset.run) return;
      el.dataset.run = "1";
      const to = +(el.dataset.to ?? "0");
      if (reduce) {
        el.textContent = String(to);
        return;
      }
      let s: number | null = null;
      const step = (t: number) => {
        if (!s) s = t;
        const p = Math.min((t - s) / 1000, 1);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // 히어로 타이핑 ("비즈니스에" / "기술을 더하다")
    const typeEl = $("#heroType");
    let typing = false;
    const typeHero = () => {
      if (!typeEl || typing) return;
      if (reduce) return; // 축약 모드: SSR 텍스트 유지
      typing = true;
      typeEl.innerHTML = "";
      const full = [
        { t: "비즈니스에", c: 0 },
        { t: "기술을 더하다", c: 1 },
      ];
      let li = 0;
      let ci = 0;
      const tick = () => {
        if (li >= full.length) {
          typing = false;
          return;
        }
        const part = full[li];
        let sp = typeEl.querySelector<HTMLElement>(`span[data-li="${li}"]`);
        if (!sp) {
          if (li > 0) typeEl.appendChild(document.createElement("br"));
          sp = document.createElement("span");
          if (part.c) sp.className = "hl";
          sp.dataset.li = String(li);
          typeEl.appendChild(sp);
        }
        sp.textContent = part.t.slice(0, ++ci);
        if (ci >= part.t.length) {
          li++;
          ci = 0;
          setTimeout(tick, li === 1 ? 170 : 60);
        } else setTimeout(tick, 70);
      };
      tick();
    };

    // 마무리 타이핑 (문제 섹션)
    const typeClosing = () => {
      const host = $("#closeText");
      if (!host || host.dataset.t) return;
      if (reduce) {
        host.textContent =
          "익숙하시다면, 바로 그 지점부터 프루퍼가 함께합니다.";
        return;
      }
      host.dataset.t = "1";
      host.innerHTML = "";
      const parts = [
        { t: "익숙하시다면, 바로 그 지점부터 ", c: 0 },
        { t: "프루퍼가 함께합니다.", c: 1 },
      ];
      let li = 0;
      let ci = 0;
      const tick = () => {
        if (li >= parts.length) {
          host.dataset.t = "";
          return;
        }
        const p = parts[li];
        let sp = host.querySelector<HTMLElement>(`[data-li="${li}"]`);
        if (!sp) {
          sp = document.createElement("span");
          if (p.c) sp.className = "hl";
          sp.dataset.li = String(li);
          host.appendChild(sp);
        }
        sp.textContent = p.t.slice(0, ++ci);
        if (ci >= p.t.length) {
          li++;
          ci = 0;
          setTimeout(tick, 120);
        } else setTimeout(tick, 52);
      };
      tick();
    };

    // 페이지 가시성 -> reveal + count + typing
    const pages = Array.from(document.querySelectorAll<HTMLElement>(".page"));
    const pio = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          e.target.classList.toggle("vis", e.isIntersecting);
          if (e.isIntersecting) {
            e.target.querySelectorAll<HTMLElement>(".count").forEach(runCount);
            if (e.target.id === "hero") typeHero();
            if (e.target.id === "problem") setTimeout(typeClosing, 2200);
          }
        }),
      { threshold: 0.35 },
    );
    pages.forEach((p) => pio.observe(p));
    cleanups.push(() => pio.disconnect());

    // 컨설팅 레이어 클릭 (모바일 친화)
    const layers = Array.from(document.querySelectorAll<HTMLElement>(".layer"));
    const layerHandlers: Array<() => void> = [];
    layers.forEach((l) => {
      const h = () => {
        layers.forEach((x) => x.classList.remove("open"));
        l.classList.add("open");
      };
      l.addEventListener("click", h);
      layerHandlers.push(() => l.removeEventListener("click", h));
    });
    cleanups.push(() => layerHandlers.forEach((fn) => fn()));

    // 히어로 패럴랙스
    const hero = $("#hero");
    const hp = $("#heroPhoto");
    const mA = $("#markA");
    const mB = $("#markB");
    if (hero && !reduce) {
      const move = (e: MouseEvent) => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        if (hp) hp.style.transform = `translate(${x * 16}px,${y * 14}px)`;
        if (mA) mA.style.transform = `translate(${x * -30}px,${y * -26}px)`;
        if (mB) mB.style.transform = `translate(${x * 26}px,${y * 22}px)`;
      };
      const leave = () => {
        if (hp) hp.style.transform = "";
        if (mA) mA.style.transform = "";
        if (mB) mB.style.transform = "";
      };
      hero.addEventListener("mousemove", move);
      hero.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        hero.removeEventListener("mousemove", move);
        hero.removeEventListener("mouseleave", leave);
      });
    }

    // 도킹 CTA: 히어로 이후 노출, 문의 섹션에서 안착
    const dock = $("#dock-cta");
    const finalCTA = $("#finalCTA");
    const contact = $("#contact");
    let heroVis = true;
    let contactVis = false;
    const upd = () => dock?.classList.toggle("on", !heroVis && !contactVis);
    if (hero) {
      const hio = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            heroVis = e.isIntersecting;
            upd();
          }),
        { threshold: 0.4 },
      );
      hio.observe(hero);
      cleanups.push(() => hio.disconnect());
    }
    if (contact) {
      const cio = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            contactVis = e.isIntersecting;
            finalCTA?.classList.toggle("show", e.isIntersecting);
            upd();
          }),
        { threshold: 0.5 },
      );
      cio.observe(contact);
      cleanups.push(() => cio.disconnect());
    }

    // 도트 내비
    const secs = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-sec]"),
    );
    const dots = Array.from(
      document.querySelectorAll<HTMLElement>(".dotnav a"),
    );
    const dnio = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            const i = secs.indexOf(e.target as HTMLElement);
            dots.forEach((d, k) => d.classList.toggle("on", k === i));
          }
        }),
      { threshold: 0.5 },
    );
    secs.forEach((s) => dnio.observe(s));
    cleanups.push(() => dnio.disconnect());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
