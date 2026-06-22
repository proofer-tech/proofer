import React from "react";
import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import Solution from "./components/sections/Solution";
import Consulting from "./components/sections/Consulting";
import Proof from "./components/sections/Proof";
import Work from "./components/sections/Work";
import Team from "./components/sections/Team";
import Contact from "./components/sections/Contact";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "프루퍼",
  alternateName: ["proofer", "proofer inc", "프루퍼 주식회사", "프루퍼(주)"],
  url: "https://proofer.tech/",
  logo: "https://proofer.tech/assets/images/logo.svg",
  description:
    "프루퍼 주식회사는 현장을 직접 보고 문제부터 진단합니다. 사람으로 풀 일은 컨설팅으로, 도구가 필요한 일은 직접 만들어 해결합니다.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "강남대로112길 47, 2층 421A호",
    addressLocality: "강남구",
    addressRegion: "서울특별시",
    addressCountry: "KR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+82-10-5182-0520",
    contactType: "customer service",
    email: "info@proofer.tech",
    areaServed: "KR",
    availableLanguage: "Korean",
  },
  sameAs: [
    "https://medium.com/proofer-blog",
    "https://www.linkedin.com/showcase/proofer-tech",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Problem />
      <Solution />
      <Consulting />
      <Proof />
      <Work />
      <Team />
      <Contact />
    </>
  );
}
