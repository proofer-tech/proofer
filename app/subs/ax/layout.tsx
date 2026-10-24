import React from "react";
import "./web.scss";
import "./ax.scss";
import Providers from "@/app/subs/ax/components/Providers";
import Shell from "@/app/subs/ax/components/Shell";
import Dock from "@/app/subs/ax/components/Dock";
import Header from "@/app/subs/ax/components/Header";

const ORG_ID = "https://ax.proofer.tech/#organization";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "프루퍼",
    legalName: "프루퍼 주식회사",
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
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Shell>
        <Header />
        {children}
        <Dock />
        <footer className="foot">
          <div className="in">
            <span>프루퍼 주식회사, 대표 임한솔</span>
            <span>사업자등록번호 337-81-03650</span>
            <span>서울 강남구 강남대로112길 47, 2층 421A</span>
            <span>info@proofer.tech</span>
          </div>
        </footer>
      </Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </Providers>
  );
}
