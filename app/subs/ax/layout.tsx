import React from "react";
import Image from "next/image";
import { generateMetadataFromTitle } from "@/src/manifest";
import "./ax.scss";
import Providers from "@/app/subs/ax/components/Providers";
import Header from "@/app/subs/ax/components/Header";
import { FAQS } from "@/app/subs/ax/components/sections/Faq.data";

const title = "기업 AI 교육, AX 해커톤, AX 컨설팅";
const fullTitle = `${title} | 프루퍼`;
const description =
  "임직원 AI 교육을 강의로 끝내지 않습니다. 직무별 사내 AI 교육으로 쓸 줄 알게 만들고, " +
  "사내 AI 해커톤으로 성과를 내고, AX 컨설팅으로 조직이 스스로 굴러가게 합니다.";
const ogImage = "/assets/images/ax/og-image.webp";

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

const ORG_ID = "https://ax.proofer.tech/#organization";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "프루퍼",
    legalName: "프루퍼주식회사",
    url: "https://ax.proofer.tech/",
    logo: "https://ax.proofer.tech/assets/images/branding.svg",
    email: "info@proofer.tech",
    address: {
      "@type": "PostalAddress",
      streetAddress: "서울 강남구 강남대로112길 47, 2층 421A",
      addressCountry: "KR",
    },
    sameAs: ["https://proofer.tech"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AX 강의",
    description:
      "전 직원 리터러시 교육부터 직무별 실무 교육, 파워유저와 에이전트 교육까지 이어지는 사내 AI 교육입니다.",
    provider: { "@id": ORG_ID },
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AX 해커톤",
    description:
      "교육과 컨설팅을 잇는 사내 AI 해커톤입니다. 시연에서 끝내지 않고 성과로 이어지는 산출물을 만듭니다.",
    provider: { "@id": ORG_ID },
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AX 컨설팅",
    description:
      "진단부터 전환, 운영까지 이어지는 AI 전환 컨설팅입니다. 조직이 스스로 굴러가게 만드는 것을 목표로 합니다.",
    provider: { "@id": ORG_ID },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
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
