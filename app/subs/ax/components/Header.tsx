"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import {
  OPEN,
  SEGMENTS,
  SEGMENT_ORDER,
  isOpenPath,
  segmentFromPath,
} from "@/app/subs/ax/segments";

// 세그먼트 탭 점 색. 탭 테마의 포인트 색(--acc)과 같은 값이다
const DOT: Record<string, string> = {
  startup: "#45af66",
  growth: "#1f9e97",
  enterprise: "#344fe0",
};

/** 전환 아이콘. 오른쪽 화살표는 옆의 도입 문의를 가리키는 것처럼 보여 쓰지 않는다 */
function SwapIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3 4 7l4 4" />
      <path d="M4 7h16" />
      <path d="m16 21 4-4-4-4" />
      <path d="M20 17H4" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname() ?? "/";
  const open = isOpenPath(pathname);
  const current = segmentFromPath(pathname);
  const nav = open ? OPEN.nav : SEGMENTS[current].nav;
  const href = (path: string) => generateSubdomainPath(path, SUB_DOMAIN.ax);

  return (
    <div className="top">
      <div className="nav">
        <a className="brand" href={href("/")} aria-label="proofer AX 홈">
          <Image
            src="/assets/images/branding.svg"
            alt="proofer"
            width={22}
            height={23}
            priority
          />
          <span>AX</span>
        </a>
        <nav className="links" aria-label="섹션 내비게이션">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="acts">
          <Link
            className="btn ghost go"
            href={href(open ? SEGMENTS.enterprise.path : OPEN.path)}
          >
            <SwapIcon />
            {open ? "기업 교육 보기" : "공개 교육 보기"}
          </Link>
          <AxInquireButton className="btn">도입 문의</AxInquireButton>
        </div>
      </div>
      {!open && (
        <nav className="segs" aria-label="고객 규모별 커리큘럼">
          {SEGMENT_ORDER.map((key) => (
            <Link
              key={key}
              href={href(SEGMENTS[key].path)}
              className={key === current ? "on" : undefined}
              aria-current={key === current ? "page" : undefined}
            >
              <i style={{ background: DOT[key] }} />
              {SEGMENTS[key].label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
