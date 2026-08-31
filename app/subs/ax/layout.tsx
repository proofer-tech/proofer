import React from "react";
import { generateMetadataFromTitle } from "@/src/manifest";
import "./ax.scss";
import Providers from "@/app/subs/ax/components/Providers";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="ax-root">{children}</div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </Providers>
  );
}
