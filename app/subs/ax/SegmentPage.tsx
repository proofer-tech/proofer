import React from "react";
import Hero from "@/app/subs/ax/components/sections/Hero";
import Problem from "@/app/subs/ax/components/sections/Problem";
import Approach from "@/app/subs/ax/components/sections/Approach";
import System from "@/app/subs/ax/components/sections/System";
import Lecture from "@/app/subs/ax/components/sections/Lecture";
import Hackathon from "@/app/subs/ax/components/sections/Hackathon";
import Consulting from "@/app/subs/ax/components/sections/Consulting";
import Workspace from "@/app/subs/ax/components/sections/Workspace";
import Case from "@/app/subs/ax/components/sections/Case";
import Package from "@/app/subs/ax/components/sections/Package";
import Outcome from "@/app/subs/ax/components/sections/Outcome";
import Faq from "@/app/subs/ax/components/sections/Faq";
import Contact from "@/app/subs/ax/components/sections/Contact";
import { CONTENT } from "@/app/subs/ax/content";
import { SEGMENTS, type SegmentKey } from "@/app/subs/ax/segments";
import type { Block } from "@/app/subs/ax/content/types";

const ORG_ID = "https://ax.proofer.tech/#organization";

function renderBlock(block: Block) {
  switch (block.kind) {
    case "course":
      return <Lecture key={block.id} block={block} />;
    case "table":
      return <Hackathon key={block.id} block={block} />;
    case "consulting":
      return <Consulting key={block.id} block={block} />;
    case "workspace":
      return <Workspace key={block.id} block={block} />;
    case "case":
      return <Case key={block.id} block={block} />;
  }
}

/** 세그먼트 3판이 공유하는 페이지 골격. 문면은 content/ 에서 온다 */
export default function SegmentPage({ segment }: { segment: SegmentKey }) {
  const meta = SEGMENTS[segment];
  const c = CONTENT[segment];
  const jsonLd = [
    ...c.courses.map((course) => ({
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.name,
      description: course.description,
      provider: { "@id": ORG_ID },
    })),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <Hero segment={meta} hero={c.hero} />
      <Problem problem={c.problem} />
      <Approach approach={c.approach} />
      <System system={c.system} />
      {c.blocks.map(renderBlock)}
      <Package pkg={c.package} />
      <Outcome outcome={c.outcome} />
      <Faq faqs={c.faq} />
      <Contact contact={c.contact} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
