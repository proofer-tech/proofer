import "./global.scss";
import WithCTOCustomerServiceWidget from "@/app/with-cto/components/WithCTOCustomerServiceWidget";
import React from "react";
import { merge } from "lodash";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = merge(
  {
    metadataBase: new URL("https://proofer.tech/"),
    keywords: ["CTO", "CTO 커뮤니티", "컨퍼런스", "세미나"],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://proofer.tech/with-cto/2nd",
      images: ["/assets/images/with-cto/og-image-2nd.png"],
    },
  },
  generateMetadataFromTitle({
    title: "with CTO: 2nd meet",
    description:
      "프루퍼팀에서 준비한 CTO 커뮤니티 CTO들의 위대한 시작, with CTO: the agora of CTO ... 구글 스타트업 캠퍼스 에서 만나요!",
  }),
);
export default function Layout({ children }: any) {
  return (
    <>
      <WithCTOCustomerServiceWidget />
      {children}
    </>
  );
}
