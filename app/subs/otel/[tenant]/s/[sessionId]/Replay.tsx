"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { ReplayItem } from "@/app/subs/otel/lib/replay";

const SPEEDS = [1, 4, 16] as const;
const MIN_STEP_MS = 250;
const MAX_STEP_MS = 1500;

const time = (iso: string) =>
  new Date(iso).toLocaleTimeString("ko-KR", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const usd = (v: number) => `$${v.toFixed(4)}`;

function Missing({ what, length }: { what: string; length: number | null }) {
  return (
    <span className="italic opacity-70">
      {what} 본문 미수집
      {length !== null ? ` (${length.toLocaleString("ko-KR")}자)` : ""}
    </span>
  );
}

function Item({ item }: { item: ReplayItem }) {
  switch (item.kind) {
    case "user":
      return (
        <div className="flex flex-col items-end">
          <div className="max-w-[80%] whitespace-pre-wrap break-words rounded-proofer rounded-br-proofer-xs bg-proofer-ink px-4 py-3 text-sm text-white">
            {item.text ?? <Missing what="프롬프트" length={item.length} />}
          </div>
          <span className="mt-1 text-[11px] text-proofer-gray">
            {time(item.at)}
          </span>
        </div>
      );
    case "assistant":
      return (
        <div className="flex flex-col items-start">
          <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-proofer rounded-bl-proofer-xs border border-proofer-line bg-white px-4 py-3 text-sm">
            {item.text ?? <Missing what="응답" length={item.length} />}
          </div>
          <span className="mt-1 text-[11px] text-proofer-gray">
            {time(item.at)}
            {item.model ? ` / ${item.model}` : ""}
          </span>
        </div>
      );
    case "tool": {
      const failed = item.success === false;
      return (
        <details className="group ml-2 max-w-[85%] text-xs">
          <summary
            className={`flex cursor-pointer list-none items-center gap-2 rounded-proofer-xs border px-3 py-1.5 ${failed ? "border-red-200 bg-red-50 text-red-700" : "border-proofer-line bg-proofer-bg-alt text-proofer-gray"}`}
          >
            <span className="font-mono font-bold text-proofer-ink">
              {item.name}
            </span>
            <span>
              {item.decision === "reject"
                ? "거부됨"
                : item.success === true
                  ? "성공"
                  : item.success === false
                    ? "실패"
                    : ""}
            </span>
            {item.durationMs !== null && (
              <span>{Math.round(item.durationMs)}ms</span>
            )}
            {item.decisionSource && <span>({item.decisionSource})</span>}
            <span className="ml-auto">{time(item.at)}</span>
          </summary>
          <div className="mt-1 space-y-1 rounded-proofer-xs border border-proofer-line bg-white p-3">
            {item.input ? (
              <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-all font-mono">
                {item.input}
              </pre>
            ) : (
              <p className="italic text-proofer-gray">툴 입력 미수집</p>
            )}
            {item.error && (
              <pre className="whitespace-pre-wrap break-all font-mono text-red-700">
                {item.error}
              </pre>
            )}
          </div>
        </details>
      );
    }
    case "api":
      return (
        <p className="ml-2 text-[11px] text-proofer-gray">
          API {item.model ?? ""} / 입력{" "}
          {item.inputTokens.toLocaleString("ko-KR")} / 출력{" "}
          {item.outputTokens.toLocaleString("ko-KR")} / 캐시{" "}
          {item.cacheReadTokens.toLocaleString("ko-KR")} / {usd(item.costUsd)}
          {item.durationMs !== null
            ? ` / ${(item.durationMs / 1000).toFixed(1)}s`
            : ""}{" "}
          / {time(item.at)}
        </p>
      );
    case "error":
      return (
        <p className="ml-2 rounded-proofer-xs bg-red-50 px-3 py-1.5 text-xs text-red-700">
          API 에러 {item.status ?? ""} {item.model ?? ""}:{" "}
          {item.message ?? "(메시지 미수집)"} / {time(item.at)}
        </p>
      );
    case "system":
      return (
        <details className="mx-auto w-fit text-[11px] text-proofer-gray">
          <summary className="cursor-pointer list-none text-center">
            시스템 이벤트 {item.events.length}건 / {time(item.at)}
          </summary>
          <ul className="mt-1 space-y-0.5 rounded-proofer-xs bg-white p-2">
            {item.events.map((e) => (
              <li key={e.id}>
                <code>{e.name}</code>
                {e.detail ? ` ${e.detail}` : ""}
              </li>
            ))}
          </ul>
        </details>
      );
  }
}

// 실제 대화가 오간 간격을 배속에 맞춰 줄여 하나씩 보여준다. 한 단계는 0.25초에서 1.5초 사이.
export default function Replay({ items }: { items: ReplayItem[] }) {
  const [shown, setShown] = useState(items.length);
  const [playingRaw, setPlaying] = useState(false);
  const playing = playingRaw && shown < items.length;
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(4);
  const bottom = useRef<HTMLDivElement>(null);

  const play = useCallback(() => {
    setShown((s) => (s >= items.length ? 0 : s));
    setPlaying(true);
  }, [items.length]);

  useEffect(() => {
    if (!playing) return;
    const prev = shown > 0 ? Date.parse(items[shown - 1].at) : NaN;
    const next = Date.parse(items[shown].at);
    const gap = Number.isFinite(prev) ? Math.max(0, next - prev) / speed : 0;
    const delay = Math.min(MAX_STEP_MS, Math.max(MIN_STEP_MS, gap));
    const t = setTimeout(() => {
      setShown((s) => s + 1);
      if (shown + 1 >= items.length) setPlaying(false);
    }, delay);
    return () => clearTimeout(t);
  }, [playing, shown, items, speed]);

  useEffect(() => {
    if (playing)
      bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [shown, playing]);

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-6 mb-4 flex flex-wrap items-center gap-2 border-b border-proofer-line bg-proofer-bg-alt/95 px-6 py-3 text-sm backdrop-blur">
        <button
          onClick={playing ? () => setPlaying(false) : play}
          className="rounded-proofer-xs bg-proofer-ink px-4 py-1.5 font-bold text-white"
        >
          {playing
            ? "일시정지"
            : shown >= items.length
              ? "처음부터 재생"
              : "이어서 재생"}
        </button>
        <button
          onClick={() => {
            setPlaying(false);
            setShown(items.length);
          }}
          className="rounded-proofer-xs bg-white px-3 py-1.5"
        >
          전체 보기
        </button>
        <span className="ml-2 text-proofer-gray">배속</span>
        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={`rounded-proofer-xs px-2.5 py-1 ${s === speed ? "bg-proofer-ink text-white" : "bg-white"}`}
          >
            {s}x
          </button>
        ))}
        <span className="ml-auto tabular-nums text-proofer-gray">
          {shown} / {items.length}
        </span>
      </div>
      <div className="space-y-3">
        {items.slice(0, shown).map((item) => (
          <Item key={item.key} item={item} />
        ))}
        <div ref={bottom} />
      </div>
    </div>
  );
}
