import React from "react";
import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import Solution from "./components/sections/Solution";
import Consulting from "./components/sections/Consulting";
import Proof from "./components/sections/Proof";
import Signals from "./components/sections/Signals";
import Why from "./components/sections/Why";
import Engagement from "./components/sections/Engagement";
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
    "프루퍼 주식회사는 운영효율을 극한까지 끌어올려 '팔리는 회사'를 직접 만드는 그로스 컨설팅 파트너입니다. 진단부터 실행·개발·조직·운영까지 직접 책임지며 기업가치를 증명합니다.",
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
      <Signals />
      <Why />
      <Engagement />
      <Team />
      <Contact />
    </>
  );
}
