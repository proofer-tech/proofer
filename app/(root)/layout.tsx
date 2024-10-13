import React from "react";
import { get } from "@vercel/edge-config";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import { merge } from "lodash";
import { generateMetadataFromTitle } from "@/src/manifest";
import { HeaderPortal } from "@/app/components/Header";

export const metadata = merge(
  {
    metadataBase: new URL("https://proofer.tech/"),
    keywords: [
      "프루퍼",
      "프루퍼 테크",
      "프루퍼팀",
      "프루퍼 주식회사",
      "주식회사 프루퍼",
      "임한솔",
    ],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://proofer.tech/",
      images: ["/assets/images/og-image.webp"],
    },
    alternates: {
      canonical: "https://proofer.tech",
    },
    other: {
      "naver-site-verification": "a044ad12d46fb84c4b43c9132cd443911989605d",
    },
  },
  generateMetadataFromTitle({
    title: "만능 문제해결사 프루퍼",
    fullTitle: "만능 문제해결사 프루퍼",
    description:
      "고객을 직접 만나 업무 프로세스를 듣고 관찰하여 고통스럽거나 골치아픈 문제를 해결하고, 비효율적인 과정을 찾아 효율적으로 개선할 수 있는 방법을 함께 고민하여 제공합니다.",
  }),
);
export default async function Layout({ children }: any) {
  const portals: readonly HeaderPortal[] = [
    ...((await get("portals")) as HeaderPortal[]),
    { title: "서비스소개", href: "" },
    { title: "데모", href: "https://insight-demo.proofer.tech" },
  ];
  return (
    <LandingPageShellLayout portals={portals}>
      {children}
    </LandingPageShellLayout>
  );
}
