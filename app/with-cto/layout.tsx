import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import { HeaderPortal } from "@/app/components/Header";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import { merge } from "lodash";
import { generateMetadataFromTitle } from "@/src/manifest";
import { get } from "@vercel/edge-config";

export const metadata = merge(
  {
    metadataBase: new URL("https://proofer.tech/"),
    keywords: ["CTO", "CTO 커뮤니티", "컨퍼런스", "세미나"],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://with-cto.proofer.tech",
      images: ["/assets/images/with-cto/og-image.webp"],
    },
    icons: [
      {
        rel: "shortcut icon",
        url: "/favicon.ico",
        href: "/assets/images/with-cto/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/pwa-512x512.png",
        href: "/assets/images/with-cto/pwa-512x512.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/pwa-192x192.png",
        href: "/assets/images/with-cto/pwa-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "64x64",
        url: "/pwa-64x64.png",
        href: "/assets/images/with-cto/pwa-64x64.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon-180x180.png",
        href: "/assets/images/with-cto/apple-touch-icon-180x180.png",
      },
      {
        rel: "mask-icon",
        color: "#344FE0",
        url: "/maskable-icon-512x512.png",
        href: "/assets/images/with-cto/maskable-icon-512x512.png",
      },
    ],
    alternates: {
      canonical: "https://with-cto.proofer.tech",
    },
  },
  generateMetadataFromTitle({
    title: "with CTO: the agora of CTO",
    description:
      "프루퍼팀에서 준비한 CTO 커뮤니티 CTO들의 위대한 시작, with CTO: the agora of CTO, 그 어디에서도 볼 수 없었던 CTO 들의 모임!",
  }),
);
export default async function Layout({ children }: any) {
  const portals: readonly HeaderPortal[] = (await get("portals")) || [];
  return (
    <LandingPageShellLayout
      portals={portals}
      logoSrc={"/assets/images/with-cto/pwa-512x512.png"}
      channelIO={{
        hideChannelButtonOnBoot: true,
      }}
    >
      {children}
    </LandingPageShellLayout>
  );
}
