import React from "react";
import "./sism.scss";
import Providers from "@/app/subs/sism/components/Providers";

const ORG_ID = "https://sism.proofer.tech/#organization";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "프루퍼",
    legalName: "프루퍼 주식회사",
    url: "https://sism.proofer.tech/",
    logo: "https://sism.proofer.tech/assets/images/sism/proofer-logo.svg",
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
      <div className="sism-root">{children}</div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </Providers>
  );
}
