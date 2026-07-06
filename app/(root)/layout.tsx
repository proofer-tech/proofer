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
    title: "프루퍼 : 기업가치를 증명합니다",
    fullTitle:
      "프루퍼 : 기업가치를 증명합니다 - 그로스 컨설팅, 밸류업, 운영효율, EXIT",
    description:
      "프루퍼 주식회사는 운영효율을 극한까지 끌어올려 '팔리는 회사'를 직접 만드는 그로스 컨설팅 파트너입니다. 진단부터 실행·개발·조직·운영까지 직접 책임지며 기업가치를 증명합니다.",
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
