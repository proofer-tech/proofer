import React from "react";
import Image from "next/image";
import { generateMetadataFromTitle } from "@/src/manifest";
import "./ax.scss";
import Providers from "@/app/subs/ax/components/Providers";
import Header from "@/app/subs/ax/components/Header";

const title = "기업 AI 교육, AX 해커톤, AX 컨설팅";
const fullTitle = `${title} | 프루퍼`;
const description =
  "임직원 AI 교육을 강의로 끝내지 않습니다. 직무별 사내 AI 교육으로 쓸 줄 알게 만들고, " +
  "사내 AI 해커톤으로 성과를 내고, AX 컨설팅으로 조직이 스스로 굴러가게 합니다.";
const ogImage = "/assets/images/og-image.webp";

export const metadata = generateMetadataFromTitle(
  {
    title,
    description,
  },
  {
    metadataBase: new URL("https://ax.proofer.tech"),
    alternates: {
      canonical: "https://ax.proofer.tech",
    },
    keywords: [
      "기업 AI 교육",
      "임직원 AI 교육",
      "AX 교육",
      "사내 AI 교육",
      "AX 컨설팅",
      "기업 AI 교육 업체",
      "생성형 AI 기업 교육",
      "직무별 AI 교육",
      "사내 AI 해커톤",
      "AI 해커톤 운영",
      "AI 교육 커리큘럼",
      "AI 전환 컨설팅",
      "HRD AI 교육",
      "기업교육 AI",
      "ChatGPT 기업 교육",
      "Claude 기업 교육",
      "프롬프트 교육",
      "AI 에이전트 교육",
      "AI 리터러시 교육",
      "임원 AI 교육",
    ],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://ax.proofer.tech",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="ax-root">
        <Header />
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
