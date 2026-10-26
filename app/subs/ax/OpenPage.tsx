import React from "react";
import OpenView, { FAQ } from "@/app/subs/ax/views/Open";
import { OPEN } from "@/app/subs/ax/segments";

const ORG_ID = "https://ax.proofer.tech/#organization";

/** 공개 교육(기관 과정판). 문면은 views/Open.tsx 에 있다 */
export default function OpenPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "기관 위탁 AI 리터러시 교육",
      description: OPEN.description,
      provider: { "@id": ORG_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <OpenView />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
