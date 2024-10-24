import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import { HeaderPortal } from "@/app/components/Header";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import { get } from "@vercel/edge-config";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle(
  {
    title: "프루퍼 데브엠, 우리 회사만을 위한 개발자 성과추적 대시보드",
    fullTitle: "프루퍼 데브엠, 우리 회사만을 위한 개발자 성과추적 대시보드",
    description:
      "프루퍼 데브엠과 함께라면 CTO 나 시니어 개발자들이 없어도 최소한의 비용으로 회사에 지속적인 개발자 성과추적 시스템을 구축할 수 있습니다. 무료상담을 통해 우리 회사 개발자들이 어떻게 일하는지 확인해보세요!",
  },
  {
    alternates: {
      canonical: "https://devm.proofer.tech",
    },
    other: {
      "naver-site-verification": "66a885dd71e438eca763ad82a8131045e4dabb59",
    },
    metadataBase: new URL("https://devm.proofer.tech"),
    keywords: [
      "프루퍼",
      "생산성",
      "성과측정",
      "성과평가",
      "성과관리",
      "HRDT",
      "Digital Transformation",
      "디지털 전환",
      "HR SaaS",
    ],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://devm.proofer.tech",
      images: ["/assets/images/devm/og-image.webp"],
    },
    icons: [
      {
        rel: "shortcut icon",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/pwa-512x512.png",
        href: "/pwa-512x512.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/pwa-192x192.png",
        href: "/pwa-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "64x64",
        url: "/pwa-64x64.png",
        href: "/pwa-64x64.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon-180x180.png",
        href: "/apple-touch-icon-180x180.png",
      },
      {
        rel: "mask-icon",
        color: "#344FE0",
        url: "/maskable-icon-512x512.png",
        href: "/maskable-icon-512x512.png",
      },
    ],
  },
);
export default async function Layout({ children }: any) {
  const portals: readonly HeaderPortal[] = [
    ...((await get("portals")) as HeaderPortal[]),
    { title: "서비스소개", href: "https://devm.proofer.tech/introduction" },
  ];
  return (
    <LandingPageShellLayout portals={portals}>
      {children}
    </LandingPageShellLayout>
  );
}
