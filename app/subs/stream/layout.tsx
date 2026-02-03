import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import { HeaderPortal } from "@/app/components/Header";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import { get } from "@vercel/edge-config";
import { generateMetadataFromTitle } from "@/src/manifest";
import streamLayoutStyles from "./layout.module.scss";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

export const metadata = generateMetadataFromTitle(
  {
    title: "스트림, 인재 데이터가 끊임없이 흐르는 조직 내 인재 허브",
    fullTitle: "스트림(Stream) | 인재 데이터 통합·관리 B2B SaaS",
    description:
      "Stream은 LinkedIn·사람인 등 외부 인재DB와 사내 인재 정보를 연결하여 단일 인재 허브를 구축하는 TRM(경량형) 플랫폼입니다. HR·TA 조직의 인재 데이터 자산화를 실현하세요.",
  },
  {
    alternates: {
      canonical: "https://stream.proofer.tech",
    },
    other: {
      "naver-site-verification": "66a885dd71e438eca763ad82a8131045e4dabb59",
    },
    metadataBase: new URL("https://stream.proofer.tech"),
    keywords: [
      "스트림",
      "Stream",
      "인재관리",
      "TRM",
      "Talent Relationship Management",
      "ATS",
      "채용",
      "HR SaaS",
      "인재 데이터",
      "LinkedIn",
      "사람인",
    ],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://stream.proofer.tech",
      images: ["/assets/images/stream/banner.png"],
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
        color: "#534EE3",
        url: "/maskable-icon-512x512.png",
        href: "/maskable-icon-512x512.png",
      },
    ],
  },
);
export default async function Layout({ children }: any) {
  const basePortals = (await get("portals")) as HeaderPortal[];
  const portals: readonly HeaderPortal[] = [
    ...basePortals,
    {
      title: "기능소개",
      href: generateSubdomainPath("#features", SUB_DOMAIN.stream),
    },
    {
      title: "문의하기",
      href: generateSubdomainPath("#contact", SUB_DOMAIN.stream),
    },
  ];
  return (
    <LandingPageShellLayout
      portals={portals}
      isServiceEnded={false}
      logoSrc="/assets/images/stream/logo.png"
    >
      <div className={streamLayoutStyles.streamRoot}>{children}</div>
    </LandingPageShellLayout>
  );
}
