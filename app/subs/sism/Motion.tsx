"use client";

/* sism 첫 화면 모션(docs/sism-home-spec.md 7절, docs/sism-home/motion-spec.md).
   모션은 이 파일 한 곳에서만 등록하고, 페이지를 떠나면 useGSAP 의 context revert 와 아래 cleanup 이 정리한다.
   prefers-reduced-motion: reduce 이면 아무것도 등록하지 않는다(미니 헤더는 숨겨진 채 남는다).
   천장: 레이아웃이 바뀌는 리사이즈마다 ScrollTrigger 가 다시 계산하지만, 분할한 제목 줄은 다시 나누지 않는다. */

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { animate, stagger } from "animejs";
import InquireButton from "@/app/subs/sism/components/InquireButton";
import { MENU } from "@/app/subs/sism/components/Hero";
import s from "./Motion.module.scss";

const $ = <T extends Element = HTMLElement>(
  sel: string,
  root: ParentNode = document,
) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(
  sel: string,
  root: ParentNode = document,
) => Array.from(root.querySelectorAll<T>(sel));

export default function Motion() {
  const mini = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const safe = contextSafe!;
      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ ease: "power3.out", duration: 0.8 });

      const rootEl = mini.current!.closest(".sism-root")!;
      rootEl.classList.add(s.on);
      const abort = new AbortController();
      const { signal } = abort;
      const anims: { revert(): unknown }[] = [];
      const undo: (() => void)[] = [];

      /* 제목 줄 마스크 분할. 원래 마크업은 cleanup 에서 되돌린다 */
      const splitLines = (el: HTMLElement | null) => {
        if (!el || el.dataset.split) return [];
        el.dataset.split = "1";
        const html = el.innerHTML;
        undo.push(() => {
          el.innerHTML = html;
          delete el.dataset.split;
        });
        el.innerHTML = html
          .split(/<br\s*\/?>/i)
          .map(
            (p) =>
              `<span class="${s.ln}"><span class="${s.lnIn}">${p}</span></span>`,
          )
          .join("");
        return $$(`.${s.lnIn}`, el);
      };

      /* 숫자 카운트업. 끝나면 원래 글자로 되돌려 둔다 */
      const countUp = (
        el: HTMLElement,
        to: number,
        render: (v: number) => string,
        delay = 0,
        duration = 1300,
      ) => {
        const original = el.textContent;
        undo.push(() => {
          el.textContent = original;
        });
        const o = { v: 0 };
        anims.push(
          animate(o, {
            v: to,
            duration,
            delay,
            ease: "outExpo",
            onUpdate: () => {
              el.textContent = render(Math.round(o.v));
            },
          }),
        );
      };

      /* 1. 히어로 인트로 */
      const hero = $("#top")!;
      const heroImg = $("#top > img")!;
      const header = $("#top header")!;
      const h1 = $("#top h1")!;
      const heroLines = splitLines(h1);
      const copy = h1.parentElement!;
      const eyebrow = copy.children[0];
      const sub = h1.nextElementSibling!;
      const ctas = Array.from(sub.nextElementSibling!.children);
      const trust = $$("[data-m='band'] > div");

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(heroImg, { scale: 1.12, duration: 2.4, ease: "power2.out" }, 0)
        .from(header, { y: -16, autoAlpha: 0, duration: 0.7 }, 0.1)
        .from(eyebrow, { y: 14, autoAlpha: 0, duration: 0.6 }, 0.25)
        .from(heroLines, { yPercent: 110, duration: 1, stagger: 0.12 }, 0.35)
        .fromTo(
          "#top h1 .sism-hl",
          { backgroundPosition: "100% 0" },
          { backgroundPosition: "0% 0", duration: 1.6, ease: "power2.inOut" },
          0.7,
        )
        .from(sub, { y: 18, autoAlpha: 0, duration: 0.8 }, 0.8)
        .from(
          ctas,
          {
            y: 14,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.08,
            clearProps: "transform,opacity,visibility",
          },
          0.95,
        )
        .from(trust, { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, 1.1)
        .add(() => {
          const el = trust
            .map((t) => $("strong", t)!)
            .find((x) => /\d+건\+/.test(x.textContent ?? ""));
          const m = el?.textContent?.match(/^(.*?)(\d+)(건\+.*)$/);
          if (el && m) countUp(el, +m[2], (v) => m[1] + v + m[3], 0, 1600);
        }, 1.2);

      /* 2. 히어로 배경 패럴랙스 */
      gsap.to(heroImg, {
        yPercent: window.innerWidth < 760 ? 5 : 10,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* 3. 미니 헤더: 히어로를 지나면 내려오고, 진행 막대와 현재 섹션 밑줄을 그린다 */
      const mh = mini.current!;
      gsap.set(mh, { yPercent: -110 });
      ScrollTrigger.create({
        trigger: hero,
        start: "bottom top+=72",
        onEnter: () =>
          gsap.to(mh, { yPercent: 0, autoAlpha: 1, duration: 0.5 }),
        onLeaveBack: () =>
          gsap.to(mh, {
            yPercent: -110,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.in",
          }),
      });
      gsap.to($(`.${s.bar}`, mh), {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
      $$<HTMLAnchorElement>(`.${s.navlink}`, mh).forEach((a) => {
        const sec = $(a.getAttribute("href")!);
        if (!sec) return;
        ScrollTrigger.create({
          trigger: sec,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => a.toggleAttribute("data-on", self.isActive),
        });
      });

      /* 4. 섹션 머리 */
      $$("section[id]:not(#top):not(#contact)").forEach((sec) => {
        const h2 = $("h2", sec);
        if (!h2) return;
        const lines = splitLines(h2);
        const eb = h2.previousElementSibling;
        const next = h2.parentElement!.nextElementSibling;
        const aside = next?.tagName === "P" ? next : null;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: h2, start: "top 82%", once: true },
        });
        if (eb) tl.from(eb, { y: 12, autoAlpha: 0, duration: 0.5 }, 0);
        tl.from(lines, { yPercent: 110, duration: 0.9, stagger: 0.1 }, 0.08);
        if (aside) tl.from(aside, { y: 14, autoAlpha: 0, duration: 0.7 }, 0.3);
      });

      /* 5. 카드 배치 등장과 카드별 보조 모션 */
      const problemCards = $$("[data-reveal='problem']");

      const problemSvg = (card: HTMLElement) => {
        const svg = $<SVGSVGElement>("svg", card);
        if (!svg || svg.dataset.done) return;
        svg.dataset.done = "1";
        const shapes = Array.from(svg.children);
        const after = 250 + shapes.length * 45 + 500;
        anims.push(
          animate(shapes, {
            opacity: [0, 1],
            delay: stagger(45, { start: 250 }),
            duration: 500,
            ease: "outQuad",
          }),
          animate(svg, {
            scale: [0.92, 1],
            duration: 900,
            delay: 200,
            ease: "outBack",
          }),
        );
        const i = problemCards.indexOf(card);
        if (i === 0) {
          anims.push(
            animate($$("path[stroke-dasharray]", svg), {
              strokeDashoffset: [0, -20],
              ease: "linear",
              duration: 1400,
              loop: true,
              delay: after,
            }),
          );
        }
        if (i === 1) {
          const bulb = $$("path", svg).find(
            (p) => p.getAttribute("fill") === "#344fe0",
          );
          if (bulb)
            anims.push(
              animate(bulb, {
                opacity: [1, 0.45],
                alternate: true,
                loop: true,
                duration: 900,
                ease: "inOutSine",
                delay: after,
              }),
            );
        }
        if (i === 2) {
          const bad = $$("circle", svg).find(
            (c) => c.getAttribute("fill") === "#f05252",
          );
          if (bad)
            anims.push(
              animate(bad, {
                opacity: [1, 0.35],
                alternate: true,
                loop: true,
                duration: 700,
                ease: "inOutSine",
                delay: after,
              }),
            );
        }
        if (i === 3) {
          const spark = $$("path", svg).find(
            (p) => p.getAttribute("stroke") === "#f05252",
          );
          if (spark)
            anims.push(
              animate(spark, {
                translateX: [0, -2, 2, -1, 0],
                loop: true,
                duration: 600,
                loopDelay: 1400,
                ease: "linear",
                delay: after,
              }),
            );
        }
      };

      const scopeTags = (card: HTMLElement) =>
        anims.push(
          animate($$("li", card), {
            opacity: [0, 1],
            translateY: [6, 0],
            scale: [0.92, 1],
            delay: stagger(55, { start: 300 }),
            duration: 500,
            ease: "outQuad",
          }),
        );

      const priceCount = (card: HTMLElement) => {
        const el = $("[data-count]", card);
        if (el)
          countUp(
            el,
            +el.dataset.count!,
            (v) => v.toLocaleString("ko-KR"),
            200,
          );
      };

      const acronym = (card: HTMLElement) => {
        const st = $("[data-abbr]", card);
        if (!st) return;
        gsap.from(st, {
          y: 14,
          autoAlpha: 0,
          letterSpacing: "0.12em",
          duration: 0.9,
          delay: 0.15,
        });
        gsap.fromTo(
          st,
          { backgroundPosition: "100% 0" },
          {
            backgroundPosition: "0% 0",
            duration: 1.4,
            delay: 0.3,
            ease: "power2.inOut",
          },
        );
      };

      const proofDots = (bar: HTMLElement) => {
        const dots = $$("[aria-hidden='true'] > span", bar);
        gsap.from(dots, {
          x: -14,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.09,
          delay: 0.25,
          ease: "back.out(1.7)",
        });
        gsap.to(dots[dots.length - 1], {
          scale: 1.12,
          duration: 0.9,
          delay: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      };

      const onCardIn = (card: HTMLElement) => {
        switch (card.dataset.reveal) {
          case "problem":
            return problemSvg(card);
          case "scope":
            return scopeTags(card);
          case "price":
            return priceCount(card);
          case "specialty":
            return acronym(card);
          case "proof-more":
            return proofDots(card);
        }
      };

      const cards = $$("[data-reveal]");
      cards.forEach((c) => c.classList.add(s.pre));
      gsap.set(cards, { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        interval: 0.12,
        batchMax: 4,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.09,
            overwrite: true,
            clearProps: "transform,opacity,visibility",
            onStart: () => (batch as HTMLElement[]).forEach(onCardIn),
            onComplete: () => batch.forEach((b) => b.classList.remove(s.pre)),
          }),
      });

      /* 6. 등록 서류: 액자 안에서 천천히 움직이고, 마우스에 따라 기운다 */
      $$<HTMLAnchorElement>("#credentials a").forEach((card) => {
        const img = $("img", card)!;
        gsap.set(img, { scale: 1.08, transformOrigin: "50% 0%" });
        gsap.fromTo(
          img,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        let to:
          Record<"rotationX" | "rotationY" | "y", gsap.QuickToFunc> | undefined;
        card.addEventListener(
          "pointerenter",
          (e) => {
            if (e.pointerType !== "mouse") return;
            if (!to) {
              const q = (p: string) =>
                gsap.quickTo(card, p, { duration: 0.5, ease: "power3" });
              gsap.set(card, { transformPerspective: 900 });
              to = {
                rotationX: q("rotationX"),
                rotationY: q("rotationY"),
                y: q("y"),
              };
            }
            to.y(-4);
          },
          { signal },
        );
        card.addEventListener(
          "pointermove",
          (e) => {
            if (!to || e.pointerType !== "mouse") return;
            const r = card.getBoundingClientRect();
            to.rotationY(((e.clientX - r.left) / r.width - 0.5) * 10);
            to.rotationX(-((e.clientY - r.top) / r.height - 0.5) * 8);
          },
          { signal },
        );
        card.addEventListener(
          "pointerleave",
          () => to && (to.rotationX(0), to.rotationY(0), to.y(0)),
          { signal },
        );
      });

      /* 7. FAQ: 부드럽게 열고 닫기 */
      $$<HTMLDetailsElement>("#faq details").forEach((d) => {
        const body = d.querySelector("summary")!.nextElementSibling!;
        d.querySelector("summary")!.addEventListener(
          "click",
          safe((e: Event) => {
            e.preventDefault();
            gsap.killTweensOf(body);
            if (d.open && !d.dataset.closing) {
              d.dataset.closing = "1";
              gsap.to(body, {
                height: 0,
                autoAlpha: 0,
                duration: 0.35,
                ease: "power2.in",
                onComplete: () => {
                  d.open = false;
                  delete d.dataset.closing;
                  gsap.set(body, { clearProps: "height,opacity,visibility" });
                },
              });
              return;
            }
            delete d.dataset.closing;
            if (!d.open) {
              d.open = true;
              gsap.set(body, { height: 0, autoAlpha: 0 });
            }
            gsap.to(body, {
              height: "auto",
              autoAlpha: 1,
              duration: 0.45,
              onComplete: () => {
                gsap.set(body, { clearProps: "height" });
              },
            });
          }),
          { signal },
        );
      });

      /* 8. 마지막 상담 박스 */
      const ctaBox = $("[data-m='cta']");
      if (ctaBox) {
        gsap.from(ctaBox, {
          y: 40,
          autoAlpha: 0,
          scale: 0.98,
          duration: 1,
          scrollTrigger: { trigger: ctaBox, start: "top 85%", once: true },
        });
        gsap.to(ctaBox, {
          backgroundPosition: "100% 50%",
          duration: 8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      /* 9. 버튼 자석 효과(마우스 포인터에서만) */
      $$(".sism-btn-p, #contact button").forEach((btn) => {
        let xTo: gsap.QuickToFunc | undefined;
        let yTo: gsap.QuickToFunc | undefined;
        btn.addEventListener(
          "pointerenter",
          (e) => {
            if (e.pointerType !== "mouse" || xTo) return;
            xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
            yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });
          },
          { signal },
        );
        btn.addEventListener(
          "pointermove",
          (e) => {
            if (!xTo || !yTo || e.pointerType !== "mouse") return;
            const r = btn.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
          },
          { signal },
        );
        btn.addEventListener(
          "pointerleave",
          () => {
            xTo?.(0);
            yTo?.(0);
          },
          { signal },
        );
      });

      let cancelNav: (() => void) | null = null;
      signal.addEventListener("abort", () => cancelNav?.());
      /* 10. 메뉴 이동: 부드럽게, 미니 헤더 높이만큼 띄워 멈춘다 */
      document.addEventListener(
        "click",
        (e) => {
          if (
            e.defaultPrevented ||
            e.button !== 0 ||
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey
          )
            return;
          const a = (e.target as Element).closest<HTMLAnchorElement>(
            "a[href^='#']",
          );
          const t =
            a && a.getAttribute("href")!.length > 1
              ? $(a.getAttribute("href")!)
              : null;
          if (!t) return;
          e.preventDefault();
          /* 이동 중에 refresh 나 줄 분할로 높이가 바뀌므로 목표를 매 프레임 다시 계산한다 */
          const goal = () =>
            t.getBoundingClientRect().top +
            window.scrollY -
            (t.id === "top" ? 0 : mh.offsetHeight);
          cancelNav?.();
          const t0 = performance.now();
          let raf = 0;
          const stop = () => {
            cancelAnimationFrame(raf);
            ["wheel", "touchstart", "keydown"].forEach((n) =>
              removeEventListener(n, stop),
            );
            cancelNav = null;
          };
          cancelNav = stop;
          ["wheel", "touchstart", "keydown"].forEach((n) =>
            addEventListener(n, stop, { passive: true }),
          );
          const step = () => {
            const g = goal();
            const d = g - window.scrollY;
            if (Math.abs(d) < 1 || performance.now() - t0 > 2500) {
              window.scrollTo(0, g);
              stop();
              return;
            }
            window.scrollTo(
              0,
              window.scrollY + Math.sign(d) * Math.max(1, Math.abs(d) * 0.14),
            );
            raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        },
        { signal },
      );

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh, { signal });

      return () => {
        abort.abort();
        anims.forEach((a) => a.revert());
        undo.reverse().forEach((f) => f());
        rootEl.classList.remove(s.on);
      };
    },
    { scope: mini },
  );

  return (
    <div ref={mini} className={s.mini}>
      <div className={s.in}>
        <a href="#top" aria-label="proofer SI SM 홈" className={s.brand}>
          <Image
            src="/assets/images/sism/proofer-mark.svg"
            alt=""
            width={22}
            height={23}
          />
          <span className={s.brandName}>SI SM</span>
        </a>
        <details className={s.menu} ref={menu}>
          <summary aria-label="메뉴 열기">
            <span />
            <span />
          </summary>
          <div
            className={s.panel}
            onClick={() => {
              if (menu.current) menu.current.open = false;
            }}
          >
            {MENU.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </div>
        </details>
        <nav aria-label="미니 메뉴" className={s.nav}>
          {MENU.map(([label, href]) => (
            <a key={href} href={href} className={s.navlink}>
              {label}
            </a>
          ))}
          <InquireButton className={`sism-btn-p ${s.cta}`}>
            무료상담 신청
          </InquireButton>
        </nav>
      </div>
      <i className={s.bar} />
    </div>
  );
}
