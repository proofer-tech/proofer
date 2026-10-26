import React from "react";
import StartupView, {
  COURSES as STARTUP_COURSES,
  FAQ as STARTUP_FAQ,
} from "@/app/subs/ax/views/Startup";
import GrowthView, {
  COURSES as GROWTH_COURSES,
  FAQ as GROWTH_FAQ,
} from "@/app/subs/ax/views/Growth";
import EnterpriseView, {
  COURSES as ENTERPRISE_COURSES,
  FAQ as ENTERPRISE_FAQ,
} from "@/app/subs/ax/views/Enterprise";
import type { SegmentKey } from "@/app/subs/ax/segments";

const ORG_ID = "https://ax.proofer.tech/#organization";

const PAGES: Record<
  SegmentKey,
  {
    View: React.ComponentType;
    courses: { name: string; description: string }[];
    faq: { q: string; a: string }[];
  }
> = {
  startup: { View: StartupView, courses: STARTUP_COURSES, faq: STARTUP_FAQ },
  growth: { View: GrowthView, courses: GROWTH_COURSES, faq: GROWTH_FAQ },
  enterprise: {
    View: EnterpriseView,
    courses: ENTERPRISE_COURSES,
    faq: ENTERPRISE_FAQ,
  },
};

/** 세그먼트 3판이 공유하는 페이지 골격. 문면은 views/ 에 있다 */
export default function SegmentPage({ segment }: { segment: SegmentKey }) {
  const { View, courses, faq } = PAGES[segment];
  const jsonLd = [
    ...courses.map((course) => ({
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.name,
      description: course.description,
      provider: { "@id": ORG_ID },
    })),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <>
      <View />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
