"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  LoaderCircle,
  Maximize,
  Minimize,
  MoveHorizontal,
  TriangleAlert,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import styles from "./IrPdfViewer.module.css";

// 천장: 텍스트 레이어와 주석 레이어가 없어 PDF 안에서 선택, 검색, 링크 클릭이 안 된다.
// 본문 텍스트는 서버 렌더링 HTML 에 있다. 필요해지면 pdfjs-dist 의 TextLayer 를 붙인다.
// 한 번 그린 canvas 는 화면에서 멀어져도 지우지 않는다(16쪽이라 메모리가 충분하다).
// PDF 를 fetch 로 통째로 받아 getDocument 에 넘긴다(다운로드용 Blob 을 얻기 위해서다).
// 3.6MB 라 range 요청을 포기했고, 수십 MB 로 커지면 getDocument({ url }) 로 바꾸고 다운로드는 링크로 돌린다.
const PDF_WIDTH = 960;
const FALLBACK_PAGES = 16;
const ZOOM_STEPS = [50, 67, 75, 90, 100, 110, 125, 150, 175, 200];

const cx = (...c: (string | false | undefined)[]) =>
  c.filter(Boolean).join(" ");

function PdfPage({
  doc,
  pageNumber,
  numPages,
  width,
}: {
  doc: PDFDocumentProxy;
  pageNumber: number;
  numPages: number;
  width: number;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    // 한 쪽 높이(=가로폭의 56%)만큼 앞뒤를 미리 그린다.
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setNear(true),
      { rootMargin: `${Math.round(width * 0.5625)}px 0px` },
    );
    io.observe(box);
    return () => io.disconnect();
  }, [width]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!near || !canvas || !width) return;
    let task: { cancel: () => void; promise: Promise<unknown> } | undefined;
    let cancelled = false;
    doc
      .getPage(pageNumber)
      .then((page) => {
        if (cancelled) return;
        const base = page.getViewport({ scale: 1 });
        const dpr = window.devicePixelRatio || 1;
        const viewport = page.getViewport({
          scale: (width / base.width) * dpr,
        });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        task = page.render({ canvas, viewport });
        return task.promise.then(() => setFailed(false));
      })
      .catch((e) => {
        if (!cancelled && e?.name !== "RenderingCancelledException")
          setFailed(true);
      });
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [near, doc, pageNumber, width]);

  return (
    <div
      ref={boxRef}
      data-page={pageNumber}
      className={styles.page}
      style={{ width, aspectRatio: "960 / 540" }}
    >
      {failed ? (
        <div className={styles.center}>이 쪽을 표시하지 못했습니다</div>
      ) : (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`소개서 ${numPages}쪽 중 ${pageNumber}쪽`}
        />
      )}
    </div>
  );
}

export default function IrPdfViewer({ url }: { url: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<Blob | null>(null);
  const [fitWidth, setFitWidth] = useState(0);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [zoom, setZoom] = useState<number | null>(null); // null 이 폭 맞춤
  const [current, setCurrent] = useState(1);
  const [draft, setDraft] = useState("1");
  const [mobile, setMobile] = useState(false);
  const [canFs, setCanFs] = useState(false);
  const [fs, setFs] = useState(false);
  const anchorRef = useRef<{ page: number; frac: number } | null>(null);
  const currentRef = useRef(1);
  currentRef.current = current;

  const numPages = doc?.numPages ?? FALLBACK_PAGES;
  const effZoom = mobile ? null : zoom;
  const pageWidth = effZoom ? PDF_WIDTH * (effZoom / 100) : fitWidth;
  const percent = (pageWidth / PDF_WIDTH) * 100;
  const ready = !!doc;

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setFitWidth(Math.floor(entry.contentRect.width)),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [doc, failed]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = () => setMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    setCanFs(!!document.fullscreenEnabled);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    let doc2: PDFDocumentProxy | undefined;
    (async () => {
      try {
        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok || !res.body) throw new Error(String(res.status));
        const total = Number(res.headers.get("content-length")) || 0;
        const reader = res.body.getReader();
        const chunks: Uint8Array<ArrayBuffer>[] = [];
        let got = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value as Uint8Array<ArrayBuffer>);
          got += value.length;
          if (total) setProgress(Math.min(got / total, 1));
        }
        const blob = new Blob(chunks, { type: "application/pdf" });
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();
        const loaded = await pdfjs.getDocument({
          data: new Uint8Array(await blob.arrayBuffer()),
        }).promise;
        if (ac.signal.aborted) return loaded.destroy();
        if (!loaded.numPages) throw new Error("empty");
        doc2 = loaded;
        blobRef.current = blob;
        setDoc(loaded);
      } catch {
        if (!ac.signal.aborted) setFailed(true);
      }
    })();
    return () => {
      ac.abort();
      doc2?.destroy();
    };
  }, [url]);

  // 툴바 아래에 가장 많이 보이는 쪽을 현재 쪽으로 삼는다.
  const updateCurrent = useCallback(() => {
    const list = listRef.current;
    const toolbar = toolbarRef.current;
    if (!list || !toolbar) return;
    const top = toolbar.getBoundingClientRect().bottom;
    const bottom = window.innerHeight;
    let best = 0;
    let bestVisible = -1;
    list.querySelectorAll<HTMLElement>("[data-page]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const visible = Math.min(r.bottom, bottom) - Math.max(r.top, top);
      if (visible > bestVisible) {
        bestVisible = visible;
        best = Number(el.dataset.page);
      }
    });
    if (best) setCurrent(best);
  }, []);

  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateCurrent);
    };
    const frame = frameRef.current;
    window.addEventListener("scroll", onScroll, { passive: true });
    frame?.addEventListener("scroll", onScroll, { passive: true });
    updateCurrent();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      frame?.removeEventListener("scroll", onScroll);
    };
  }, [ready, updateCurrent]);

  useEffect(() => setDraft(String(current)), [current]);

  const pageEl = (n: number) =>
    listRef.current?.querySelector<HTMLElement>(`[data-page="${n}"]`);

  const scrollByDelta = (delta: number, smooth: boolean) => {
    const behavior: ScrollBehavior =
      smooth && !matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "smooth"
        : "instant";
    (document.fullscreenElement === frameRef.current
      ? frameRef.current!
      : window
    ).scrollBy({ top: delta, behavior });
  };

  const goTo = (n: number, smooth = true) => {
    const el = pageEl(n);
    const toolbar = toolbarRef.current;
    if (!el || !toolbar) return;
    setCurrent(n);
    scrollByDelta(
      el.getBoundingClientRect().top - toolbar.getBoundingClientRect().bottom,
      smooth,
    );
  };

  // 배율이나 폭이 바뀌면 보던 쪽의 같은 위치가 툴바 아래에 남도록 스크롤을 맞춘다.
  const keepAnchor = (frac?: number) => {
    const el = pageEl(currentRef.current);
    const toolbar = toolbarRef.current;
    if (!el || !toolbar) return;
    const r = el.getBoundingClientRect();
    anchorRef.current = {
      page: currentRef.current,
      frac: frac ?? (toolbar.getBoundingClientRect().bottom - r.top) / r.height,
    };
  };
  useLayoutEffect(() => {
    const a = anchorRef.current;
    anchorRef.current = null;
    const el = a && pageEl(a.page);
    const toolbar = toolbarRef.current;
    if (!a || !el || !toolbar) return;
    const r = el.getBoundingClientRect();
    scrollByDelta(
      r.top + a.frac * r.height - toolbar.getBoundingClientRect().bottom,
      false,
    );
  }, [pageWidth]);

  const changeZoom = (next: number | null) => {
    keepAnchor();
    setZoom(next);
  };
  const zoomIn = () =>
    changeZoom(ZOOM_STEPS.find((s) => s > percent + 0.5) ?? 200);
  const zoomOut = () =>
    changeZoom([...ZOOM_STEPS].reverse().find((s) => s < percent - 0.5) ?? 50);

  const download = () => {
    const blob = blobRef.current;
    if (!blob) return;
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "proofer-ir.pdf";
    a.click();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
  };

  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else frameRef.current?.requestFullscreen();
  };
  useEffect(() => {
    const onChange = () => {
      const on = document.fullscreenElement === frameRef.current;
      setFs(on);
      setZoom(null);
      frameRef.current?.focus();
      // 쪽 폭이 같아도 틀의 위치가 바뀌므로 보던 쪽을 다시 맞춘다.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => goTo(currentRef.current, false)),
      );
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  });

  const commitDraft = () => {
    const n = /^\d+$/.test(draft.trim()) ? Number(draft) : 0;
    if (n >= 1 && n <= numPages) goTo(n);
    else setDraft(String(current));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!ready || e.ctrlKey || e.metaKey || e.altKey) return;
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    const k = e.key;
    let handled = true;
    if (k === "ArrowLeft" || k === "PageUp") goTo(Math.max(current - 1, 1));
    else if (k === "ArrowRight" || k === "PageDown")
      goTo(Math.min(current + 1, numPages));
    else if (!mobile && (k === "+" || k === "=")) zoomIn();
    else if (!mobile && k === "-") zoomOut();
    else if (!mobile && k === "0") changeZoom(null);
    else handled = false;
    if (handled) e.preventDefault();
  };

  if (failed)
    return (
      <div ref={frameRef} className={styles.frame}>
        <div className={styles.error} role="alert">
          <div className={styles.errorIcon}>
            <TriangleAlert size={28} strokeWidth={2} />
          </div>
          <h3 className={styles.errorTitle}>소개서를 불러오지 못했습니다</h3>
          <p className={styles.errorDesc}>
            네트워크 상태를 확인한 뒤 새로고침하거나, PDF 를 새 탭에서 열어
            보세요.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.errorLink}
          >
            PDF 새 탭에서 열기
            <ExternalLink size={16} strokeWidth={2} />
          </a>
        </div>
      </div>
    );

  const icon = { size: 20, strokeWidth: 2 };
  const btn = (
    label: string,
    onClick: () => void,
    disabled: boolean,
    children: React.ReactNode,
    extra: React.ButtonHTMLAttributes<HTMLButtonElement> = {},
  ) => (
    <button
      type="button"
      className={styles.btn}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      {...extra}
    >
      {children}
    </button>
  );

  return (
    <div
      ref={frameRef}
      className={styles.frame}
      role="region"
      aria-label="프루퍼 서비스 소개서 PDF 뷰어"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        ref={toolbarRef}
        className={styles.toolbar}
        role="toolbar"
        aria-label="소개서 보기 도구"
      >
        <div className={styles.group}>
          <span className={styles.desktopOnly}>
            {btn(
              "이전 쪽",
              () => goTo(current - 1),
              !ready || current <= 1,
              <ChevronLeft {...icon} />,
              { "aria-keyshortcuts": "ArrowLeft PageUp" },
            )}
            {btn(
              "다음 쪽",
              () => goTo(current + 1),
              !ready || current >= numPages,
              <ChevronRight {...icon} />,
              { "aria-keyshortcuts": "ArrowRight PageDown" },
            )}
          </span>
          <span className={cx(styles.group, styles.desktopOnly)}>
            <input
              className={cx(styles.pageInput, numPages > 99 && styles.wide)}
              inputMode="numeric"
              aria-label={`쪽 번호, 전체 ${numPages}쪽`}
              disabled={!ready}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onFocus={(e) => e.target.select()}
              onBlur={() => setDraft(String(current))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  commitDraft();
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  setDraft(String(current));
                  frameRef.current?.focus();
                }
              }}
            />
            <span className={styles.total}>/ {numPages}</span>
          </span>
          <span className={styles.mobileOnly}>
            <span className={styles.srOnly}>현재 쪽 </span>
            <b>{current}</b> / {numPages}
          </span>
        </div>
        <div className={styles.group}>
          <span className={cx(styles.group, styles.desktopOnly)}>
            {btn(
              "축소",
              zoomOut,
              !ready || percent <= 50.5,
              <ZoomOut {...icon} />,
              {
                "aria-keyshortcuts": "-",
              },
            )}
            <output className={styles.zoomValue} aria-live="polite">
              {Math.round(percent)}%
            </output>
            {btn(
              "확대",
              zoomIn,
              !ready || percent >= 199.5,
              <ZoomIn {...icon} />,
              {
                "aria-keyshortcuts": "+",
              },
            )}
            {btn(
              "폭에 맞추기",
              () => changeZoom(null),
              !ready || zoom === null,
              <MoveHorizontal {...icon} />,
              { "aria-pressed": zoom === null, "aria-keyshortcuts": "0" },
            )}
            <span className={styles.sep} />
          </span>
          {btn("PDF 다운로드", download, !ready, <Download {...icon} />)}
          {canFs &&
            btn(
              fs ? "전체 화면 끝내기" : "전체 화면",
              toggleFs,
              false,
              fs ? <Minimize {...icon} /> : <Maximize {...icon} />,
            )}
        </div>
      </div>
      <div ref={listRef} className={styles.list}>
        {doc
          ? Array.from({ length: doc.numPages }, (_, i) => (
              <PdfPage
                key={i}
                doc={doc}
                pageNumber={i + 1}
                numPages={doc.numPages}
                width={pageWidth}
              />
            ))
          : Array.from({ length: FALLBACK_PAGES }, (_, i) => (
              <div
                key={i}
                data-page={i + 1}
                className={styles.page}
                style={{ width: pageWidth, aspectRatio: "960 / 540" }}
              >
                {i === 0 && (
                  <div className={styles.center} role="status">
                    <LoaderCircle
                      size={24}
                      strokeWidth={2}
                      className={styles.spinner}
                    />
                    <p style={{ margin: "10px 0 0" }}>
                      소개서를 불러오는 중입니다
                      {progress !== null && ` (${Math.round(progress * 100)}%)`}
                    </p>
                    <div className={styles.progress}>
                      <div style={{ width: `${(progress ?? 0) * 100}%` }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
