"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import {
  SEGMENTS,
  SEGMENT_ORDER,
  segmentFromPath,
} from "@/app/subs/ax/segments";

/** 세그먼트 전환 탭. 현재 판은 aria-current 로 표시한다 */
export default function SegmentTabs() {
  const current = segmentFromPath(usePathname() ?? "/");
  return (
    <nav className="ax-tabs" aria-label="고객 규모별 커리큘럼">
      {SEGMENT_ORDER.map((key) => (
        <Link
          key={key}
          href={generateSubdomainPath(SEGMENTS[key].path, SUB_DOMAIN.ax)}
          className={`ax-tab${key === current ? " ax-tab--on" : ""}`}
          aria-current={key === current ? "page" : undefined}
        >
          {SEGMENTS[key].label}
        </Link>
      ))}
    </nav>
  );
}
