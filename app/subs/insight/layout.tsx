import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import { HeaderPortal } from "@/app/components/Header";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import { get } from "@vercel/edge-config";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle(
  {
    title: "프루퍼 인사이트, 쉽고 빠른 노코드 대시보드 빌더",
    fullTitle: "프루퍼 인사이트, 쉽고 빠른 노코드 대시보드 빌더",
    description:
      "프루퍼는 실제 업무 데이터를 볼 수 있는 대시보드를 쉽고 빠르게 만들 수 있는 솔루션을 제공합니다. 무료상담을 통해 '진짜' 업무에 대한 데이터가 무엇인지 확인해보세요!",
  },
  {
    alternates: {
      canonical: "https://proofer.tech",
    },
    other: {
      "naver-site-verification": "66a885dd71e438eca763ad82a8131045e4dabb59",
    },
    metadataBase: new URL("https://insight.proofer.tech"),
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
      url: "https://insight.proofer.tech",
      images: ["/assets/images/insight/og-image.webp"],
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
    { title: "서비스소개", href: "https://insight.proofer.tech/introduction" },
    { title: "데모", href: "http://insight-demo.proofer.tech" },
  ];
  return (
    <LandingPageShellLayout portals={portals}>
      {children}
    </LandingPageShellLayout>
  );
}
