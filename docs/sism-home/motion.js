(() => {
  /* 모바일 메뉴: 모션 설정과 상관없이 동작 */
  const nav = document.querySelector('#top header nav');
  if (!nav) return;
  const drawer = document.createElement('div');
  drawer.className = 'm-drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-label', '메뉴');
  drawer.innerHTML = Array.from(nav.querySelectorAll('a.navlink'))
    .map(a => `<a class="m-link" href="${a.getAttribute('href')}">${a.textContent}</a>`).join('')
    + '<a class="m-cta" href="#contact">무료상담 신청</a>'
    + '<button class="menu-btn m-close" type="button" aria-label="메뉴 닫기"><span></span><span></span></button>';
  document.body.appendChild(drawer);
  const root = document.documentElement;
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const anim = !RM && window.gsap;
  function setBtns(open) {
    document.querySelectorAll('.menu-btn').forEach(b => b.setAttribute('aria-expanded', open ? 'true' : 'false'));
  }
  function open() {
    root.classList.add('nav-open'); setBtns(true);
    if (anim) {
      gsap.set(drawer, { visibility: 'visible' });
      gsap.to(drawer, { opacity: 1, duration: 0.25 });
      gsap.fromTo(drawer.querySelectorAll('.m-link, .m-cta'), { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power3.out' });
    } else { drawer.style.visibility = 'visible'; drawer.style.opacity = '1'; }
    document.body.style.overflow = 'hidden';
  }
  function close() {
    root.classList.remove('nav-open'); setBtns(false);
    document.body.style.overflow = '';
    if (anim) gsap.to(drawer, { opacity: 0, duration: 0.2, onComplete: () => gsap.set(drawer, { visibility: 'hidden' }) });
    else { drawer.style.visibility = 'hidden'; drawer.style.opacity = '0'; }
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('.menu-btn');
    if (b) { e.preventDefault(); root.classList.contains('nav-open') ? close() : open(); return; }
    if (e.target.closest('.m-drawer a')) close();
  }, true);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && root.classList.contains('nav-open')) close(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 960 && root.classList.contains('nav-open')) close(); });
})();

(() => {
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (RM || !window.gsap || !window.ScrollTrigger || !window.anime) {
    document.documentElement.classList.add('no-motion');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', duration: 0.8 });

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const EASE_OUT = 'cubic-bezier(.22,1,.36,1)';

  /* 1. 제목 줄 마스크 분할 */
  function splitLines(el) {
    if (!el || el.dataset.split) return [];
    el.dataset.split = '1';
    const parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map(p => `<span class="ln"><span class="ln-in">${p}</span></span>`).join('');
    return $$('.ln-in', el);
  }

  /* 2. 히어로 인트로 */
  const hero = $('#top');
  const heroImg = $('#top > img');
  const heroH1 = $('#top h1');
  const heroLines = splitLines(heroH1);
  const heroCopy = heroH1.parentElement;
  const eyebrow = heroCopy.children[0];
  const sub = heroH1.nextElementSibling;
  const ctas = $$('a', sub.nextElementSibling);
  const trust = $$('#top > div:last-child > div > div');
  const header = $('#top header');

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from(heroImg, { scale: 1.12, duration: 2.4, ease: 'power2.out' }, 0)
    .from(header, { y: -16, autoAlpha: 0, duration: 0.7 }, 0.1)
    .from(eyebrow, { y: 14, autoAlpha: 0, duration: 0.6 }, 0.25)
    .from(heroLines, { yPercent: 110, duration: 1, stagger: 0.12 }, 0.35)
    .fromTo('#top h1 .hl', { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', duration: 1.6, ease: 'power2.inOut' }, 0.7)
    .from(sub, { y: 18, autoAlpha: 0, duration: 0.8 }, 0.8)
    .from(ctas, { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.08, clearProps: 'transform,opacity,visibility', onStart: () => ctas.forEach(c => c.classList.add('m-pre')), onComplete: () => ctas.forEach(c => c.classList.remove('m-pre')) }, 0.95)
    .from(trust, { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, 1.1)
    .add(() => countUpTrust(), 1.2);

  function countUpTrust() {
    const el = trust.map(t => t.querySelector('strong')).find(s => /\d+건\+/.test(s.textContent));
    if (!el) return;
    const m = el.textContent.match(/^(.*?)(\d+)(건\+.*)$/);
    const o = { v: 0 };
    anime({ targets: o, v: [0, +m[2]], round: 1, duration: 1600, easing: 'easeOutExpo',
      update: () => { el.textContent = m[1] + o.v + m[3]; } });
  }

  /* 히어로 배경 패럴랙스 */
  gsap.to(heroImg, { yPercent: window.innerWidth < 760 ? 5 : 10, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });

  /* 3. 고정 미니 헤더, 진행 막대, 현재 섹션 표시 */
  const mini = document.createElement('div');
  mini.className = 'mini-head';
  mini.innerHTML = `<div class="mini-in">${header.outerHTML}</div><i class="mini-bar"></i>`;
  document.body.appendChild(mini);
  const mh = $('header', mini);
  mh.style.opacity = ''; mh.style.visibility = ''; mh.style.transform = '';
  $$('[style*="translate"]', mini).forEach(n => { n.style.transform = ''; n.style.opacity = ''; n.style.visibility = ''; });
  gsap.set(mini, { yPercent: -110 });
  ScrollTrigger.create({
    trigger: hero, start: 'bottom top+=72',
    onEnter: () => gsap.to(mini, { yPercent: 0, duration: 0.5 }),
    onLeaveBack: () => gsap.to(mini, { yPercent: -110, duration: 0.4, ease: 'power2.in' })
  });
  gsap.to('.mini-bar', { scaleX: 1, ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
  $$('.mini-in .navlink').forEach(a => {
    const sec = $(a.getAttribute('href'));
    if (!sec) return;
    ScrollTrigger.create({ trigger: sec, start: 'top 45%', end: 'bottom 45%',
      onToggle: self => a.classList.toggle('is-on', self.isActive) });
  });

  /* 4. 섹션 머리 */
  $$('section:not(#top):not(#contact)').forEach(sec => {
    const h2 = $('h2', sec);
    if (!h2) return;
    const lines = splitLines(h2);
    const eb = h2.previousElementSibling;
    const aside = h2.parentElement.nextElementSibling && h2.parentElement.nextElementSibling.tagName === 'P'
      ? h2.parentElement.nextElementSibling : null;
    const tl = gsap.timeline({ scrollTrigger: { trigger: h2, start: 'top 82%', once: true } });
    if (eb) tl.from(eb, { y: 12, autoAlpha: 0, duration: 0.5 }, 0);
    tl.from(lines, { yPercent: 110, duration: 0.9, stagger: 0.1 }, 0.08);
    if (aside) tl.from(aside, { y: 14, autoAlpha: 0, duration: 0.7 }, 0.3);
  });

  /* 5. 카드 배치 등장 */
  const cards = [
    ...$$('#problem article'),
    ...$$('#scope article'),
    ...$$('#price article'),
    ...$$('#specialty article'),
    ...$$('#industry article'),
    ...$$('#proof [style*="grid-template-columns"] > div'),
    ...$$('#credentials a.card'),
    ...$$('#partner article'),
    ...$$('#faq details')
  ];
  const emailBox = $$('#price a').find(a => /이메일로 견적/.test(a.textContent));
  if (emailBox) cards.push(emailBox.parentElement);
  const proofMore = $$('#proof p').find(p => /가운데 일부/.test(p.textContent));
  if (proofMore) cards.push(proofMore.closest('div[style*="linear-gradient(90deg"]'));

  cards.forEach(c => c && c.classList.add('m-pre'));
  gsap.set(cards, { autoAlpha: 0, y: 36 });
  ScrollTrigger.batch(cards, {
    start: 'top 88%', once: true, interval: 0.12, batchMax: 4,
    onEnter: batch => gsap.to(batch, {
      autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09, overwrite: true,
      onComplete() { batch.forEach(b => b.classList.remove('m-pre')); },
      onStart() { batch.forEach(onCardIn); }
    })
  });

  /* 카드별 보조 모션 */
  function onCardIn(card) {
    if (card.closest('#problem')) problemSvg(card);
    if (card.closest('#scope')) scopeTags(card);
    if (card.closest('#price')) priceCount(card);
    if (card.closest('#specialty')) acronym(card);
    if (card === (proofMore && proofMore.closest('div[style*="linear-gradient(90deg"]'))) proofDots(card);
  }

  /* 5-1. PROBLEM 일러스트: 도형이 차례로 놓이고, 상황별 반복 모션 */
  const problemCards = $$('#problem article');
  function problemSvg(card) {
    const svg = $('svg', card);
    if (!svg || svg.dataset.done) return;
    svg.dataset.done = '1';
    const shapes = $$('rect, circle, path, text, g', svg).filter(n => n.parentNode === svg);
    anime({ targets: shapes, opacity: [0, 1], delay: anime.stagger(45, { start: 250 }),
      duration: 500, easing: 'easeOutQuad' });
    anime({ targets: svg, scale: [0.92, 1], duration: 900, delay: 200, easing: 'easeOutBack' });
    const i = problemCards.indexOf(card);
    const after = 250 + shapes.length * 45 + 500;
    if (i === 0) {
      anime({ targets: $$('path[stroke-dasharray]', svg), strokeDashoffset: [0, -20],
        easing: 'linear', duration: 1400, loop: true, delay: after });
    }
    if (i === 1) {
      const bulb = $$('path', svg).find(p => p.getAttribute('fill') === '#344fe0');
      if (bulb) anime({ targets: bulb, opacity: [1, 0.45], direction: 'alternate', loop: true,
        duration: 900, easing: 'easeInOutSine', delay: after });
    }
    if (i === 2) {
      const bad = $$('circle', svg).find(c => c.getAttribute('fill') === '#f05252');
      if (bad) anime({ targets: bad, opacity: [1, 0.35], direction: 'alternate', loop: true,
        duration: 700, easing: 'easeInOutSine', delay: after });
    }
    if (i === 3) {
      const spark = $$('path', svg).find(p => p.getAttribute('stroke') === '#f05252');
      if (spark) anime({ targets: spark, translateX: [0, -2, 2, -1, 0], loop: true,
        duration: 600, endDelay: 1400, easing: 'linear', delay: after });
    }
  }

  /* 5-2. 서비스 줄: 태그가 차례로 붙는다 */
  function scopeTags(card) {
    anime({ targets: $$('li', card), opacity: [0, 1], translateY: [6, 0], scale: [0.92, 1],
      delay: anime.stagger(55, { start: 300 }), duration: 500, easing: 'easeOutQuad' });
  }

  /* 5-3. 가격: 숫자가 올라간다 */
  function priceCount(card) {
    const el = $$('strong', card).find(s => /만원$/.test(s.textContent.trim()));
    if (!el || el.dataset.done) return;
    el.dataset.done = '1';
    const m = el.textContent.trim().match(/^(월 )?([\d,]+)만원$/);
    if (!m) return;
    const to = +m[2].replace(/,/g, '');
    const o = { v: 0 };
    anime({ targets: o, v: [0, to], round: 1, duration: 1300, delay: 200, easing: 'easeOutExpo',
      update: () => { el.textContent = (m[1] || '') + o.v.toLocaleString('ko-KR') + '만원'; } });
  }

  /* 5-4. 업무 시스템 약어: 글자가 올라오고 그라데이션이 흐른다 */
  function acronym(card) {
    const st = $('strong.hl', card);
    if (!st || st.dataset.done) return;
    st.dataset.done = '1';
    gsap.from(st, { y: 14, autoAlpha: 0, letterSpacing: '0.12em', duration: 0.9, delay: 0.15 });
    gsap.fromTo(st, { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', duration: 1.4, delay: 0.3, ease: 'power2.inOut' });
  }

  /* 5-5. 수행 이력 더보기 줄: 원이 겹쳐 들어오고 + 가 숨 쉰다 */
  function proofDots(bar) {
    const dots = $$('[aria-hidden="true"] > span', bar);
    gsap.from(dots, { x: -14, autoAlpha: 0, duration: 0.6, stagger: 0.09, delay: 0.25, ease: 'back.out(1.7)' });
    gsap.to(dots[dots.length - 1], { scale: 1.12, duration: 0.9, delay: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }

  /* 6. 등록 서류: 문서가 액자 안에서 천천히 움직이고, 마우스에 따라 기운다 */
  $$('#credentials a.card').forEach(card => {
    const img = $('img', card);
    gsap.set(img, { scale: 1.08, transformOrigin: '50% 0%' });
    gsap.fromTo(img, { yPercent: -3 }, { yPercent: 3, ease: 'none',
      scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
    card.style.transformStyle = 'preserve-3d';
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' });
    gsap.set(card, { transformPerspective: 900 });
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 10);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
    });
    card.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });

  /* 7. FAQ: 부드럽게 열고 닫기 */
  $$('#faq details').forEach(d => {
    const sum = $('summary', d);
    const body = sum.nextElementSibling;
    sum.addEventListener('click', e => {
      e.preventDefault();
      if (d.open) {
        gsap.to(body, { height: 0, autoAlpha: 0, duration: 0.35, ease: 'power2.in',
          onComplete: () => { d.open = false; gsap.set(body, { clearProps: 'height,opacity,visibility' }); } });
      } else {
        d.open = true;
        gsap.fromTo(body, { height: 0, autoAlpha: 0 }, { height: 'auto', autoAlpha: 1, duration: 0.45 });
      }
    });
  });

  /* 8. 마지막 상담 박스: 그라데이션이 천천히 흐르고 등장 */
  const ctaBox = $('#contact > div > div');
  if (ctaBox) {
    ctaBox.classList.add('cta-flow');
    gsap.from(ctaBox, { y: 40, autoAlpha: 0, scale: 0.98, duration: 1,
      scrollTrigger: { trigger: ctaBox, start: 'top 85%', once: true } });
    gsap.to(ctaBox, { backgroundPosition: '100% 50%', duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true });
  }

  /* 9. 버튼 자석 효과 (마우스 포인터에서만) */
  if (window.matchMedia('(pointer: fine)').matches) {
    $$('a.btn-p, #contact a, #price a[href^="mailto"]').forEach(btn => {
      let xTo, yTo;
      btn.addEventListener('pointerenter', () => {
        if (!xTo) { xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
          yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' }); }
      });
      btn.addEventListener('pointermove', e => {
        if (!xTo) return;
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
      });
      btn.addEventListener('pointerleave', () => { if (xTo) { xTo(0); yTo(0); } });
    });
  }

  /* 10. 앵커 이동은 부드럽게, 미니 헤더 높이만큼 띄운다 */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const t = $(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - (t.id === 'top' ? 0 : 64), behavior: 'smooth' });
  });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
