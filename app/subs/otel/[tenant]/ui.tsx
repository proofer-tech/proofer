import React from "react";
import Link from "next/link";
import { tenantPath } from "@/app/subs/otel/lib/tenant";
import type { Session } from "@/app/subs/otel/auth/session";

export const usd = (v: number) =>
  `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const n = (v: number) => v.toLocaleString("ko-KR");
export const compact = (v: number) =>
  Intl.NumberFormat("ko-KR", { notation: "compact" }).format(v);
export const kst = (v: string | Date) =>
  new Date(v).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-proofer border border-proofer-line bg-white p-5 ${className}`}
    >
      {title && <h2 className="mb-3 text-sm font-bold">{title}</h2>}
      {children}
    </section>
  );
}

export function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-proofer border border-proofer-line bg-white p-4">
      <div className="text-xs text-proofer-gray">{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
      {sub && <div className="mt-1 text-xs text-proofer-gray">{sub}</div>}
    </div>
  );
}

export function Table({
  head,
  rows,
  align,
}: {
  head: string[];
  rows: React.ReactNode[][];
  align?: ("left" | "right")[];
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-proofer-gray">아직 데이터가 없습니다.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-proofer-line text-xs text-proofer-gray">
            {head.map((h, i) => (
              <th
                key={h}
                className={`py-2 pr-3 font-normal ${align?.[i] === "right" ? "text-right" : "text-left"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-proofer-line last:border-0">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`py-2 pr-3 align-top ${align?.[j] === "right" ? "text-right tabular-nums" : ""}`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Header({ session }: { session: Session }) {
  return (
    <header className="border-b border-proofer-line bg-white">
      <div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between px-6">
        <div className="flex items-center gap-5">
          <Link href={tenantPath(session.tenantSlug)} className="font-bold">
            {session.tenantName} <span className="text-proofer-gray">OTel</span>
          </Link>
          <nav className="flex gap-4 text-sm text-proofer-gray">
            <Link
              href={tenantPath(session.tenantSlug)}
              className="hover:text-proofer-ink"
            >
              대시보드
            </Link>
            <Link
              href={tenantPath(session.tenantSlug, "/sessions")}
              className="hover:text-proofer-ink"
            >
              세션
            </Link>
            <Link
              href={tenantPath(session.tenantSlug, "/events")}
              className="hover:text-proofer-ink"
            >
              이벤트
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm text-proofer-gray">
          <span>{session.email ?? session.name}</span>
          <form
            method="post"
            action={tenantPath(session.tenantSlug, "/auth/logout")}
          >
            <button className="underline underline-offset-2">로그아웃</button>
          </form>
        </div>
      </div>
    </header>
  );
}
