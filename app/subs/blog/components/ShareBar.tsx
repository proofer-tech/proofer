"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, Link as LinkIcon, Share2 } from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { FOCUS_RING } from "../ui";

const BTN =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-proofer-line bg-white text-proofer-menu-ink transition duration-200 ease-proofer hover:border-proofer-border-hover hover:bg-proofer-blue-soft hover:text-proofer-blue-deep " +
  FOCUS_RING;
const ICON = { size: 20, strokeWidth: 2, "aria-hidden": true } as const;

/** 글 화면 공유 줄. docs/blog/design.md 4절 "공유 줄". navigator 를 읽어야 해서 이 줄만 client 다. */
export default function ShareBar({
  url,
  title,
  className = "",
}: {
  url: string;
  title: string;
  className?: string;
}) {
  // 서버 렌더와 첫 페인트에는 false, 마운트 뒤 지원하면 true.
  const canShare = useSyncExternalStore(
    () => () => {},
    () => typeof navigator.share === "function",
    () => false,
  );
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const flash = (text: string, ok: boolean) => {
    clearTimeout(timer.current);
    setMsg({ text, ok });
    timer.current = setTimeout(() => setMsg(null), ok ? 2000 : 4000);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      flash("링크를 복사했습니다", true);
    } catch {
      flash("링크를 복사하지 못했습니다. 주소창의 주소를 복사해 주세요", false);
    }
  };

  const share = async () => {
    try {
      await navigator.share({ title, url });
    } catch {
      // 시트를 닫아 나는 AbortError 를 포함해 아무것도 표시하지 않는다.
    }
  };

  const u = encodeURIComponent(url);
  const links = [
    {
      label: "X에 공유 (새 탭)",
      href: `https://x.com/intent/post?url=${u}&text=${encodeURIComponent(title)}`,
      Icon: IconBrandX,
    },
    {
      label: "Facebook에 공유 (새 탭)",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      Icon: IconBrandFacebook,
    },
    {
      label: "LinkedIn에 공유 (새 탭)",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      Icon: IconBrandLinkedin,
    },
  ];

  return (
    <div className={className}>
      <div
        role="group"
        aria-label="이 글 공유하기"
        className="flex items-center gap-2"
      >
        <button
          type="button"
          aria-label="링크 복사"
          title="링크 복사"
          onClick={copy}
          className={BTN}
        >
          {msg?.ok ? <Check {...ICON} /> : <LinkIcon {...ICON} />}
        </button>
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={BTN}
          >
            <Icon {...ICON} />
          </a>
        ))}
        {canShare && (
          <button
            type="button"
            aria-label="공유하기"
            title="공유하기"
            onClick={share}
            className={BTN}
          >
            <Share2 {...ICON} />
          </button>
        )}
      </div>
      <p
        role="status"
        aria-live="polite"
        className={`mt-2 min-h-[20px] text-[13px] font-bold leading-[20px] ${msg?.ok === false ? "text-proofer-ink" : "text-proofer-gray"}`}
      >
        {msg?.text}
      </p>
    </div>
  );
}
