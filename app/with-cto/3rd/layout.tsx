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
      url: "https://proofer.tech/with-cto/3rd",
      images: ["/assets/images/with-cto/og-image-3rd.png"],
    },
  },
  generateMetadataFromTitle({
    title: "with CTO: 3rd meet",
    description:
      "프루퍼팀에서 준비한 CTO 커뮤니티 CTO들의 위대한 시작, with CTO: the agora of CTO ... 앤스페이스 에서 만나요!",
  }),
);
export default function Layout({ children }: any) {
  return (
    <>
      <WithCTOCustomerServiceWidget withJoinBtn={false} />
      {children}
    </>
  );
}
