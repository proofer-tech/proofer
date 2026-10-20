import React from "react";
import Image from "next/image";
import "./ax.scss";
import Providers from "@/app/subs/ax/components/Providers";
import Dock from "@/app/subs/ax/components/Dock";
import Header from "@/app/subs/ax/components/Header";

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
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="ax-root">
        <Header />
        {children}
        <Dock />
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
                  <strong>프루퍼주식회사</strong> / 대표 임한솔
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
