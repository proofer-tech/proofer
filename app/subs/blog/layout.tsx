import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FOCUS_RING } from "./ui";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle(
  {
    title: "프루퍼 블로그",
    description: "프루퍼가 쓰는 AI 네이티브 개발과 커뮤니티 이야기",
  },
  {
    metadataBase: new URL("https://blog.proofer.tech"),
    alternates: {
      canonical: "https://blog.proofer.tech",
      types: { "application/rss+xml": "https://blog.proofer.tech/rss.xml" },
    },
  },
);

const FOOTER_LINKS = [
  ["프루퍼 홈", "https://proofer.tech"],
  ["RSS", "/rss.xml"],
] as const;

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-proofer text-proofer-ink">
      <header className="border-b border-proofer-line">
        <div className="mx-auto flex h-14 max-w-[1160px] items-center justify-between px-6 min-[780px]:h-[70px]">
          <Link
            href="/"
            className={`flex items-center gap-2.5 rounded-proofer-xs ${FOCUS_RING}`}
          >
            <Image
              src="/assets/images/logo.svg"
              alt="proofer"
              width={120}
              height={31}
              className="h-[26px] w-auto min-[780px]:h-[31px]"
            />
            <span aria-hidden className="h-4 w-px bg-proofer-line" />
            <span className="text-[15.5px] font-bold text-proofer-menu-ink">
              블로그
            </span>
          </Link>
          <a
            href="https://proofer.tech"
            className={`inline-flex items-center gap-1.5 rounded-full border border-proofer-blue px-4 py-2 text-[14.5px] font-bold text-proofer-blue transition duration-200 ease-proofer hover:bg-proofer-blue-soft ${FOCUS_RING}`}
          >
            프루퍼 홈
            <ArrowUpRight aria-hidden size={14} />
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-[1160px] px-6 pb-[84px] pt-12 md:pt-16">
        {children}
      </main>
      <footer className="border-t border-proofer-line py-11 text-[13.5px] text-proofer-gray">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-6 px-6">
          <div>
            <Image
              src="/assets/images/logo.svg"
              alt="proofer"
              width={90}
              height={22}
              className="h-[22px] w-auto"
            />
            <p className="mt-2.5">&copy; 프루퍼주식회사</p>
          </div>
          <nav className="flex gap-5">
            {FOOTER_LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={`rounded-proofer-xs hover:text-proofer-blue ${FOCUS_RING}`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
