import React from "react";
import { merge } from "lodash";
import { generateMetadataFromTitle } from "@/src/manifest";
import "./home.scss";
import Providers from "./components/Providers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dock from "./components/Dock";
import Effects from "./components/Effects";

export const metadata = merge(
  {
    metadataBase: new URL("https://proofer.tech/"),
    keywords: [
      "프루퍼",
      "프루퍼 테크",
      "프루퍼 주식회사",
      "주식회사 프루퍼",
      "임한솔",
    ],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://proofer.tech/",
      images: ["/assets/images/og-image.webp"],
    },
    alternates: {
      canonical: "https://proofer.tech",
    },
    other: {
      "naver-site-verification": "a044ad12d46fb84c4b43c9132cd443911989605d",
    },
  },
  generateMetadataFromTitle({
    title: "프루퍼 : 비즈니스에 기술을 더하다",
    fullTitle:
      "프루퍼 : 비즈니스에 기술을 더하다 - 소프트웨어 외주, 기술자문, DX상담",
    description:
      "프루퍼 주식회사는 현장을 직접 보고 문제부터 진단합니다. 사람으로 풀 일은 컨설팅으로, 도구가 필요한 일은 직접 만들어 해결합니다.",
  }),
);

const DOTS = [
  { href: "#hero", label: "홈" },
  { href: "#problem", label: "문제" },
  { href: "#solution", label: "우리의 답" },
  { href: "#consulting", label: "컨설팅" },
  { href: "#proof", label: "케이스" },
  { href: "#signals", label: "대상" },
  { href: "#why", label: "차별점" },
  { href: "#engagement", label: "참여방식" },
  { href: "#team", label: "회사소개" },
  { href: "#contact", label: "문의" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="home-root">
        <div id="progress" />
        <Header />
        <nav className="dotnav" aria-label="섹션 내비게이션">
          {DOTS.map((d) => (
            <a
              key={d.href}
              href={d.href}
              title={d.label}
              aria-label={d.label}
            />
          ))}
        </nav>
        <a id="top" />
        {children}
        <Footer />
        <Dock />
        <Effects />
      </div>
    </Providers>
  );
}
