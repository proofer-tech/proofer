"use client";

import React, { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

// 천장: 텍스트 레이어와 주석 레이어가 없어 PDF 안에서 선택, 검색, 링크 클릭이 안 된다.
// 본문 텍스트는 서버 렌더링 HTML 에 있다. 필요해지면 pdfjs-dist 의 TextLayer 를 붙인다.
// 한 번 그린 canvas 는 화면에서 멀어져도 지우지 않는다(16쪽이라 메모리가 충분하다).
const PAGE_RATIO = "960 / 540";

function PdfPage({
  doc,
  pageNumber,
  width,
}: {
  doc: PDFDocumentProxy;
  pageNumber: number;
  width: number;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [near, setNear] = useState(false);

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
    doc.getPage(pageNumber).then((page) => {
      if (cancelled) return;
      const base = page.getViewport({ scale: 1 });
      const dpr = window.devicePixelRatio || 1;
      const viewport = page.getViewport({ scale: (width / base.width) * dpr });
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      task = page.render({ canvas, viewport });
      task.promise.catch(() => {});
    });
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [near, doc, pageNumber, width]);

  return (
    <div
      ref={boxRef}
      className="w-full overflow-hidden bg-white shadow-sm"
      style={{ aspectRatio: PAGE_RATIO }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        aria-label={`소개서 ${pageNumber}쪽`}
      />
    </div>
  );
}

export default function IrPdfViewer({ url }: { url: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setWidth(Math.round(entry.contentRect.width)),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let loaded: PDFDocumentProxy | undefined;
    let destroy: (() => Promise<void>) | undefined;
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();
        const task = pdfjs.getDocument({ url });
        destroy = () => task.destroy();
        task.onProgress = ({
          loaded: got,
          total,
        }: {
          loaded: number;
          total: number;
        }) => {
          if (!cancelled && total) setProgress(got / total);
        };
        loaded = await task.promise;
        if (cancelled) return;
        setDoc(loaded);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [url]);

  return (
    <div ref={wrapRef} className="flex w-full flex-col gap-3">
      {failed ? (
        <div
          className="flex flex-col items-center justify-center gap-3 bg-gray-100 text-center"
          style={{ aspectRatio: PAGE_RATIO }}
          role="alert"
        >
          <p>소개서를 불러오지 못했습니다.</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            PDF 새 탭에서 열기
          </a>
        </div>
      ) : !doc ? (
        <div
          className="flex flex-col items-center justify-center gap-3 bg-gray-100"
          style={{ aspectRatio: PAGE_RATIO }}
          role="status"
        >
          <p>소개서를 불러오는 중입니다 ({Math.round(progress * 100)}%)</p>
          <div className="h-1 w-1/2 bg-gray-300">
            <div
              className="h-full bg-blue-600"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      ) : (
        Array.from({ length: doc.numPages }, (_, i) => (
          <PdfPage key={i} doc={doc} pageNumber={i + 1} width={width} />
        ))
      )}
    </div>
  );
}
