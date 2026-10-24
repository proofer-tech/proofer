import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * 스크롤 장면. 섹션이 말하는 동사를 도식, 선, 칩, 숫자로 움직인다.
 * 장면표와 제약은 docs/ax-landing-spec.md 4장이 단일 출처다.
 *  - 글(헤드라인, 본문)은 숨기지 않는다. 움직이는 것은 data-scene 이 달린 도식 요소뿐이다
 *  - transform, opacity, stroke-dashoffset 만 움직인다
 *  - pin 은 페이지당 한 곳(커리큘럼 여정), 1024px 이상에서만
 *  - 루프는 화면 안에서만 최대 3회
 *  - prefers-reduced-motion 이면 장면을 만들지 않는다(마크업의 기본값이 최종 상태다)
 */
gsap.registerPlugin(ScrollTrigger);

type Rel = { left: number; top: number; width: number; height: number };

const all = <T extends Element = HTMLElement>(root: ParentNode, sel: string) =>
  Array.from(root.querySelectorAll<T>(sel));

/** el 의 위치를 parent 좌표계로 잰다(스크롤과 무관) */
function rel(el: Element, parent: Element): Rel {
  const a = el.getBoundingClientRect();
  const p = parent.getBoundingClientRect();
  return {
    left: a.left - p.left,
    top: a.top - p.top,
    width: a.width,
    height: a.height,
  };
}

const fmt = (v: number, dec: number) =>
  v.toLocaleString("ko-KR", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });

/** 숫자 카운트업. tabular-nums 와 최종 자릿수 고정 폭으로 자리가 흔들리지 않게 1초 안에 끝낸다 */
function counts(root: HTMLElement) {
  all(root, ".cnt").forEach((el) => {
    const to = Number(el.dataset.to);
    const dec = Number(el.dataset.dec ?? 0);
    // 최종 값의 폭을 먼저 재서 고정한다(쉼표와 소수점 때문에 ch 로는 어긋난다)
    el.style.minWidth = `${el.getBoundingClientRect().width}px`;
    el.textContent = fmt(0, dec);
    const o = { v: 0 };
    gsap.to(o, {
      v: to,
      duration: 0.9,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = fmt(o.v, dec);
      },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });
}

/** 완성률 링 */
function donuts(root: HTMLElement) {
  all<SVGElement>(root, ".donut").forEach((svg) => {
    const fg = svg.querySelector(".donut-fg");
    if (!fg) return;
    gsap.fromTo(
      fg,
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 1 - Number(svg.dataset.ratio),
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: svg, start: "top 90%", once: true },
      },
    );
  });
}

/** 헤드라인 핵심 구절에 형광펜이 스크롤만큼 칠해진다. 공개 교육은 세 번째 단계에 취소선이 그어진다 */
function marks(root: HTMLElement) {
  all(root, '[data-scene="hl"]').forEach((el) => {
    gsap.fromTo(
      el.querySelector("i"),
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 45%",
          scrub: 0.5,
        },
      },
    );
  });
  all(root, '[data-scene="strike"]').forEach((el) => {
    gsap.fromTo(
      el.querySelector("i"),
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 55%",
          scrub: 0.5,
        },
      },
    );
  });
}

/** 엔터프라이즈 히어로: 세로 여정선이 01에서 04로 그려지고 선이 닿는 단계마다 산출물이 켜진다 */
function heroEnterprise(el: HTMLElement) {
  const line = el.querySelector<HTMLElement>(".vline");
  const dots = all(el, ".vstep .n");
  if (!line || dots.length < 2) return;
  // 크기 변환 중에도 같은 값이 나오도록 offset 으로 잰다(.vstep 이 위치 기준이다)
  const center = (n: HTMLElement) =>
    (n.parentElement as HTMLElement).offsetTop +
    n.offsetTop +
    n.offsetHeight / 2;
  const place = () => {
    const first = center(dots[0]);
    line.style.top = `${first}px`;
    line.style.height = `${center(dots[dots.length - 1]) - first}px`;
  };
  place();
  ScrollTrigger.addEventListener("refresh", place);

  const total = 1.6;
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.fromTo(
    line,
    { scaleY: 0 },
    { scaleY: 1, duration: total, ease: "none" },
    0,
  );
  all(el, ".vstep").forEach((step, i, arr) => {
    const t = (i / (arr.length - 1)) * total * 0.92;
    tl.fromTo(
      step.querySelector(".n"),
      { scale: 0.7 },
      { scale: 1, duration: 0.35, ease: "back.out(2)" },
      t,
    );
    tl.fromTo(
      all(step, ".o, .d"),
      { opacity: 0.2 },
      { opacity: 1, duration: 0.35 },
      t,
    );
  });
  return () => ScrollTrigger.removeEventListener("refresh", place);
}

/** 스타트업 히어로: 사업자료 칩이 모이고 신호가 목업으로 흘러 들어가, 목업이 위에서 아래로 조립된다 */
function heroStartup(el: HTMLElement) {
  const chips = all(el, ".chip");
  const cover = el.querySelector(".rot-cover");
  const win = el.querySelector<HTMLElement>(".rot");
  const pkts = all(el, ".pkt");
  const tl = gsap.timeline();
  tl.fromTo(
    chips,
    { x: -24, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: "power2.out" },
    0,
  );
  if (cover) {
    tl.fromTo(
      cover,
      { scaleY: 1 },
      { scaleY: 0, duration: 1.4, ease: "power2.inOut" },
      0.7,
    );
  }
  if (win) {
    pkts.forEach((pkt, k) => {
      const parent = (pkt.offsetParent as HTMLElement) ?? el;
      const src = chips[(k * 2) % 5];
      const a = rel(src, parent);
      const b = rel(win, parent);
      const t = 0.55 + k * 0.3;
      tl.set(
        pkt,
        { x: a.left + a.width, y: a.top + a.height / 2, opacity: 1 },
        t,
      );
      tl.to(
        pkt,
        {
          x: b.left,
          y: b.top + b.height * (0.25 + 0.25 * k),
          duration: 0.7,
          ease: "power1.inOut",
        },
        t,
      );
      tl.to(pkt, { opacity: 0, duration: 0.15 }, t + 0.7);
    });
  }

  // 결과물 순환: 화면 안에 있을 때만, 20초 주기로 3번 돌고 첫 화면에서 멈춘다
  const imgs = all<HTMLImageElement>(el, ".rot img");
  if (imgs.length > 1) {
    const slot = 4;
    const loop = gsap.timeline({
      paused: true,
      repeat: 2,
      onComplete: () => {
        gsap.set(imgs, { opacity: (i: number) => (i === 0 ? 1 : 0) });
      },
    });
    loop.set(imgs, { opacity: 0 }, 0).set(imgs[0], { opacity: 1 }, 0);
    imgs.forEach((img, i) => {
      if (i > 0) loop.to(img, { opacity: 1, duration: 0.6 }, i * slot);
      loop.to(
        img,
        { opacity: 0, duration: 0.6 },
        i * slot + slot - 0.6 + (i === imgs.length - 1 ? 0.6 : 0),
      );
    });
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
    });
  }
}

/** 중소-중견 히어로: 메신저와 엑셀 오류가 보고서로 바뀌는 전후 비교 */
function heroGrowth(el: HTMLElement) {
  const msgs = all(el, ".msg");
  const errs = all(el, ".cells .x");
  const arrow = el.querySelector(".arrow");
  const report = el.querySelector(".report");
  const checks = all(el, ".report .ck path");
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.fromTo(
    msgs,
    { y: 14, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, stagger: 0.25 },
    0,
  );
  tl.to(errs, { opacity: 0.3, duration: 0.15, repeat: 5, yoyo: true }, 0.7);
  if (arrow) {
    tl.fromTo(
      arrow,
      { x: -10, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4 },
      1.5,
    );
  }
  if (report) {
    tl.fromTo(
      report,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45 },
      1.7,
    );
  }
  tl.fromTo(
    checks,
    { strokeDashoffset: 1 },
    { strokeDashoffset: 0, duration: 0.3, stagger: 0.25 },
    2.1,
  );
}

/** 관점: 칩이 단계를 지나며 모양(이름)이 바뀐다. 스크롤 위치에 묶는다 */
function chain(el: HTMLElement) {
  const steps = all(el, ".jstep");
  const token = el.querySelector<HTMLElement>(".token");
  if (!token || steps.length < 2) return;
  const labels = steps.map((s) => s.querySelector(".num")?.textContent ?? "");
  const pos = (i: number) => {
    const r = rel(steps[i], el);
    return { x: r.left + 18, y: r.top - 14 };
  };
  token.textContent = labels[0];
  const last = steps.length - 1;
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      end: "bottom 50%",
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
    onUpdate: () => {
      const p = tl.progress();
      const idx = Math.min(last, Math.floor(p * steps.length * 0.999));
      token.textContent = labels[idx];
      steps.forEach((s, i) => s.classList.toggle("is-on", i <= idx));
    },
  });
  tl.fromTo(
    token,
    { x: () => pos(0).x, y: () => pos(0).y, opacity: 0 },
    { opacity: 1, duration: 0.1 },
  );
  for (let i = 1; i <= last; i++) {
    tl.to(token, { x: () => pos(i).x, y: () => pos(i).y, duration: 1 });
  }
  tl.to(token, { opacity: 0, duration: 0.15 });
}

/**
 * 커리큘럼 여정: 화면을 약 1.2배 분량 고정한 채 단계가 차례로 켜지고 연결선이 차오른다.
 * 앞 단계 산출물 칩이 다음 단계로 옮겨 간다(HANDOVER). 1024px 미만은 pin 없이 세로 scrub 이다
 */
function journey(sec: HTMLElement, wide: boolean) {
  const wrap = sec.querySelector<HTMLElement>(".wrap");
  const j = sec.querySelector<HTMLElement>(".journey");
  if (!wrap || !j) return;
  const steps = all(j, ".jstep");
  const segs = all(j, ".seg");
  const chips = all(j, ".hchip");
  const n = steps.length;
  const fits = wrap.offsetHeight + 150 <= window.innerHeight;
  const pin = wide && fits;
  const useChips = wide;

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: wrap,
      start: pin ? "top 120px" : "top 75%",
      end: pin ? () => `+=${window.innerHeight * 1.2}` : "bottom 40%",
      pin,
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
    onUpdate: () => {
      const p = tl.progress();
      steps.forEach((s, i) => s.classList.toggle("is-on", p >= i / n - 0.001));
    },
  });
  segs.forEach((seg, i) => {
    tl.fromTo(seg, { scaleX: 0 }, { scaleX: 1, duration: 1 }, i);
    const chip = chips[i];
    if (!chip || !useChips) return;
    chip.textContent = steps[i].querySelector(".out")?.textContent ?? "";
    const from = () => {
      const r = rel(steps[i].querySelector(".out") ?? steps[i], j);
      return { x: r.left, y: r.top - 6 };
    };
    const to = () => {
      const r = rel(steps[i + 1], j);
      // 다음 단계 카드 윗변에 걸쳐 앉는다(카드 글을 가리지 않는다)
      return { x: r.left + 14, y: r.top - 16 };
    };
    tl.fromTo(
      chip,
      { x: () => from().x, y: () => from().y, opacity: 0 },
      { opacity: 1, duration: 0.15 },
      i,
    );
    tl.to(chip, { x: () => to().x, y: () => to().y, duration: 0.7 }, i + 0.15);
    tl.to(chip, { opacity: 0, duration: 0.15 }, i + 0.85);
  });
  tl.set({}, {}, n - 1 + 0.2);
}

/** 모듈 카드: 기간 막대가 길이만큼 늘어난다. 엔터프라이즈 Lecture 는 깊이 계단으로 올라선다 */
function mods(el: HTMLElement, wide: boolean) {
  const cards = all(el, ".mod");
  const bars = all(el, ".mod .bar span");
  const stair = el.hasAttribute("data-stair") && wide;
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      end: "center 55%",
      scrub: 0.6,
    },
  });
  if (stair) {
    tl.fromTo(
      cards,
      { y: 24 },
      { y: (i: number) => -i * 10, duration: 1, stagger: 0.12 },
      0,
    );
  }
  tl.fromTo(bars, { scaleX: 0 }, { scaleX: 1, duration: 1, stagger: 0.12 }, 0);
}

/** 해커톤: 시간축 위 간트 막대가 하루에서 시즌 길이까지 자란다 */
function gantt(el: HTMLElement) {
  const fills = all(el, ".track span i");
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      end: "center 55%",
      scrub: 0.6,
    },
  });
  // 기간 글자(em)는 처음부터 보인다. 막대 채움만 자란다
  tl.fromTo(fills, { scaleX: 0 }, { scaleX: 1, duration: 1, stagger: 0.15 }, 0);
}

/** 컨설팅 레이어: 아래부터 쌓인다 */
function layers(el: HTMLElement) {
  const cards = Array.from(el.children).reverse();
  gsap.fromTo(
    cards,
    { y: 28 },
    {
      y: 0,
      ease: "none",
      stagger: 0.5,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 0.6,
      },
    },
  );
}

/** 컨설팅 참여 방식: 진행 점이 칩을 차례로 지나간다 */
function progress(el: HTMLElement) {
  const chips = all(el, ".chip");
  const dot = el.querySelector<HTMLElement>(".pdot");
  if (!dot || chips.length < 2) return;
  const at = (i: number) => {
    const r = rel(chips[i], el);
    return { x: r.left + r.width / 2 - 5, y: r.top + r.height + 6 };
  };
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      end: "bottom 55%",
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
    onUpdate: () => {
      const idx = Math.min(
        chips.length - 1,
        Math.floor(tl.progress() * chips.length * 0.999),
      );
      chips.forEach((c, i) => c.classList.toggle("is-on", i <= idx));
    },
  });
  tl.fromTo(
    dot,
    { x: () => at(0).x, y: () => at(0).y, opacity: 0 },
    { opacity: 1, duration: 0.1 },
  );
  for (let i = 1; i < chips.length; i++) {
    tl.to(dot, { x: () => at(i).x, y: () => at(i).y, duration: 1 });
  }
}

/** 진행 행: 결과 칸이 위에서 아래로 차례로 켜진다 */
function rows(el: HTMLElement) {
  gsap.fromTo(
    all(el, ".r"),
    { x: 10 },
    {
      x: 0,
      ease: "none",
      stagger: 0.4,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom 60%",
        scrub: 0.6,
      },
    },
  );
}

/** 업무환경: 업무툴에서 패킷이 온톨로지로 흘러 개념 칩을 켜고 Claude 와 직원 쪽으로 나간다. 화면 안에서만 3회 */
function onto(el: HTMLElement) {
  const cols = all(el, ".col");
  const core = el.querySelector<HTMLElement>(".core");
  const pkts = all(el, ".pkt");
  if (cols.length < 2 || !core) return;
  const tools = all(cols[0], ".tool");
  const outs = all(cols[cols.length - 1], ".tool");
  const chips = all(core, ".chip");
  const c = (node: Element) => {
    const r = rel(node, el);
    return { x: r.left + r.width / 2 - 4, y: r.top + r.height / 2 - 4 };
  };
  const tl = gsap.timeline({ paused: true, repeat: 2 });
  tl.fromTo(
    chips,
    { opacity: 0.4 },
    { opacity: 1, duration: 0.3, stagger: 0.1 },
    0.7,
  );
  pkts.forEach((pkt, k) => {
    const t = k * 0.45;
    tl.set(
      pkt,
      {
        x: () => c(tools[k % tools.length]).x,
        y: () => c(tools[k % tools.length]).y,
        opacity: 1,
      },
      t,
    );
    tl.to(
      pkt,
      {
        x: () => c(core).x,
        y: () => c(core).y,
        duration: 0.8,
        ease: "power1.inOut",
      },
      t,
    );
    tl.to(
      pkt,
      {
        x: () => c(outs[k % outs.length]).x,
        y: () => c(outs[k % outs.length]).y,
        duration: 0.8,
        ease: "power1.inOut",
      },
      t + 0.8,
    );
    tl.to(pkt, { opacity: 0, duration: 0.15 }, t + 1.6);
  });
  let started = false;
  ScrollTrigger.create({
    trigger: el,
    start: "top 75%",
    end: "bottom 25%",
    onToggle: (self) => {
      if (self.isActive) {
        if (!started) {
          started = true;
          tl.invalidate().restart();
        } else if (tl.progress() < 1) {
          tl.play();
        }
      } else {
        tl.pause();
      }
    },
  });
}

/** 패키지: 구성 레이어가 아래부터 떨어져 쌓이고 마지막 열(AI Native)이 강조된다. 1회 */
function pkgs(el: HTMLElement) {
  const cols = all(el, ".pkg");
  const maxLevel = Math.max(...cols.map((c) => all(c, ".layer").length));
  const tl = gsap.timeline({ paused: true });
  for (let lvl = 0; lvl < maxLevel; lvl++) {
    const layerSet = cols
      .map((c) => {
        const ls = all(c, ".layer");
        return ls[ls.length - 1 - lvl];
      })
      .filter(Boolean);
    tl.fromTo(
      layerSet,
      { y: -36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.06 },
      lvl * 0.22,
    );
  }
  const finalLab = el.querySelector(".pkg.final .lab");
  if (finalLab) {
    tl.fromTo(
      finalLab,
      { scale: 1 },
      {
        scale: 1.04,
        duration: 0.25,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      },
      maxLevel * 0.22 + 0.3,
    );
  }
  ScrollTrigger.create({
    trigger: el,
    start: "top 80%",
    once: true,
    onEnter: () => tl.play(),
  });
}

/** 페이지 안의 모든 장면을 만든다. 반환값은 정리 함수다(Shell 의 useGSAP 이 라우트 이동 때 호출) */
export function playScenes(root: HTMLElement, seg: string) {
  void seg;
  const mm = gsap.matchMedia();
  const cleanups: (() => void)[] = [];

  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      wide: "(min-width: 1024px)",
    },
    (ctx) => {
      const { motion, wide } = ctx.conditions as {
        motion: boolean;
        wide: boolean;
      };
      if (!motion) return;

      const each = (
        scene: string,
        fn: (el: HTMLElement) => void | (() => void),
      ) =>
        all(root, `[data-scene="${scene}"]`).forEach((el) => {
          const off = fn(el);
          if (off) cleanups.push(off);
        });

      counts(root);
      donuts(root);
      marks(root);
      each("hero-ent", heroEnterprise);
      each("hero-startup", heroStartup);
      each("hero-growth", heroGrowth);
      each("chain", chain);
      each("journey", (el) => journey(el, wide));
      each("mods", (el) => mods(el, wide));
      each("gantt", gantt);
      each("layers", layers);
      each("progress", progress);
      each("rows", rows);
      each("onto", onto);
      each("pkgs", pkgs);

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    },
  );

  return () => {
    cleanups.forEach((off) => off());
    mm.revert();
  };
}
