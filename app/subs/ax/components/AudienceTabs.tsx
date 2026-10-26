"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import { OPEN, isOpenPath } from "@/app/subs/ax/segments";

/** 상위 구분. 기업 교육(세그먼트 3탭)과 공개 교육(기관 과정판)을 오간다 */
export default function AudienceTabs() {
  const open = isOpenPath(usePathname() ?? "/");
  const items = [
    { href: "/enterprise", label: "기업 교육", on: !open },
    { href: OPEN.path, label: "공개 교육", on: open },
  ];
  return (
    <nav className="ax-aud" aria-label="교육 구분">
      {items.map((it) => (
        <Link
          key={it.href}
          href={generateSubdomainPath(it.href, SUB_DOMAIN.ax)}
          className={`ax-aud__item${it.on ? " ax-aud__item--on" : ""}`}
          aria-current={it.on ? "page" : undefined}
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
