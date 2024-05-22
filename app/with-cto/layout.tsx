import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import { HeaderPortal } from "@/app/components/Header";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import { merge } from "lodash";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = merge(
  {
    metadataBase: new URL("https://proofer.tech/"),
    keywords: ["CTO", "CTO 커뮤니티", "컨퍼런스", "세미나"],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://proofer.tech/with-cto",
      images: ["/assets/images/with-cto/og-image.png"],
    },
  },
  generateMetadataFromTitle({
    title: "with CTO: 1st meet",
    description:
      "CTO들의 위대한 시작, 그 첫번째 모임. 프루퍼팀에서 준비한 with CTO: 2024년 6월 7일 수요일 저녁 7시 30분 구글 스타트업 캠퍼스 에서 만나요!",
  }),
);
export default async function Layout({ children }: any) {
  const portals: readonly HeaderPortal[] = [
    {
      title: "프루퍼 홈",
      href: "https://proofer.tech",
    },
    {
      title: "with CTO:",
      href: "#",
    },
    {
      title: "타임테이블",
      href: "#timetable",
    },
  ];
  return (
    <LandingPageShellLayout portals={portals}>
      {children}
    </LandingPageShellLayout>
  );
}
