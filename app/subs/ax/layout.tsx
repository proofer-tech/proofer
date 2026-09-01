import React from "react";
import Image from "next/image";
import { generateMetadataFromTitle } from "@/src/manifest";
import "./ax.scss";
import Providers from "@/app/subs/ax/components/Providers";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";

export const metadata = generateMetadataFromTitle(
  {
    title: "기업 AX 교육, 해커톤, 컨설팅",
    description:
      "프루퍼의 기업 AX 서비스입니다. AX 강의로 쓸 줄 알게 만들고, AX 해커톤으로 성과를 만들고, AX 컨설팅으로 조직이 스스로 굴러가게 합니다.",
  },
  {
    metadataBase: new URL("https://ax.proofer.tech"),
    alternates: {
      canonical: "https://ax.proofer.tech",
    },
    keywords: [
      "기업 AI 교육",
      "AX 교육",
      "사내 AI 교육",
      "임직원 AI 교육",
      "AI 해커톤",
      "AI 컨설팅",
      "생성형 AI 교육",
      "프롬프트 교육",
      "HRD",
      "기업교육",
    ],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://ax.proofer.tech",
    },
  },
);

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "프루퍼",
    url: "https://ax.proofer.tech/",
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "기업 AX 교육, 해커톤, 컨설팅",
    description:
      "AX 강의, AX 해커톤, AX 컨설팅으로 이어지는 기업 AX 도입 과정입니다.",
    provider: {
      "@type": "Organization",
      name: "프루퍼",
      sameAs: "https://proofer.tech",
    },
  },
];

const NAV = [
  { href: "#approach", label: "관점" },
  { href: "#system", label: "커리큘럼" },
  { href: "#lecture", label: "Lecture" },
  { href: "#hackathon", label: "Hackathon" },
  { href: "#consulting", label: "Consulting" },
  { href: "#package", label: "패키지" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="ax-root">
        <header className="ax-header">
          <a
            href="#top"
            className="ax-header__brand"
            aria-label="proofer AX 홈"
          >
            <Image
              src="/assets/images/branding.svg"
              alt="proofer"
              width={21}
              height={22}
              priority
            />
            <span className="ax-header__brand-mark">AX</span>
          </a>
          <nav className="ax-nav" aria-label="섹션 내비게이션">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <AxInquireButton className="ax-btn">도입 문의</AxInquireButton>
        </header>
        {children}
        <footer className="ax-footer">
          <div className="ax-container">
            <div>
              <Image
                src="/assets/images/branding.svg"
                alt="proofer"
                width={23}
                height={24}
              />
              <div className="ax-footer__biz">
                <div>
                  <strong>프루퍼주식회사</strong> · 대표 임한솔
                </div>
                <div>사업자등록번호 337-81-03650</div>
                <div>서울 강남구 강남대로112길 47, 2층 421A</div>
              </div>
            </div>
            <div className="ax-footer__contact">
              <div className="ax-footer__contact-label">CONTACT</div>
              <a href="mailto:info@proofer.tech">info@proofer.tech</a>
              <a href="https://proofer.tech">proofer.tech</a>
              <div>ax.proofer.tech</div>
            </div>
          </div>
        </footer>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </Providers>
  );
}
