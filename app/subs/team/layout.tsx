import React from "react";
import { get } from "@vercel/edge-config";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import { merge } from "lodash";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = merge(
  {
    metadataBase: new URL("https://proofer.tech/"),
    keywords: [
      "프루퍼",
      "프루퍼 테크",
      "프루퍼팀",
      "프루퍼 주식회사",
      "주식회사 프루퍼",
      "홍제형",
      "임한솔",
    ],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://team.proofer.tech/",
      images: ["/assets/images/og-image.png"],
    },
  },
  generateMetadataFromTitle({
    title: "HR의 어려움을 해결하는 팀",
    fullTitle: "프루퍼팀은 HR 업무를 편하게 만듭니다.",
    description:
      "인사업무에서 어렵고 힘든 부분들에 대해 진심으로 공감하는 사람들이 모였습니다. 프루퍼팀이 HR팀 업무의 어려움을 덜어드리겠습니다.",
  }),
);
export default async function Layout({ children }: any) {
  // @ts-ignore
  const portals: any[] = Array.from(await get("portals")).concat([
    { title: "블로그", href: "https://medium.com/proofer-blog" },
  ]);
  return (
    <>
      <head>
        <meta
          name="naver-site-verification"
          content="a044ad12d46fb84c4b43c9132cd443911989605d"
        />
      </head>
      <LandingPageShellLayout portals={portals}>
        {children}
      </LandingPageShellLayout>
    </>
  );
}
