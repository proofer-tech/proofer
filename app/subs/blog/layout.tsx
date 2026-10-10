import React from "react";
import Link from "next/link";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle(
  {
    title: "프루퍼 블로그",
    description: "프루퍼가 쓰는 AI 네이티브 개발과 커뮤니티 이야기",
  },
  {
    metadataBase: new URL("https://blog.proofer.tech"),
    alternates: { canonical: "https://blog.proofer.tech" },
  },
);

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white font-[LINESeedKR] text-gray-900">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex h-14 max-w-3xl items-center px-5">
          <Link href="/" className="text-lg font-bold">
            프루퍼 블로그
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-10">{children}</main>
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        &copy; 프루퍼
      </footer>
    </div>
  );
}
