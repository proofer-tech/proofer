import "@react-pdf-viewer/core/lib/styles/index.css";
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
      url: "https://with-cto.proofer.tech",
      images: ["/assets/images/with-cto/og-image-1st.png"],
    },
  },
  generateMetadataFromTitle({
    title: "with CTO: 1st meet",
    description:
      "프루퍼팀에서 준비한 CTO 커뮤니티 CTO들의 위대한 시작, with CTO: the agora of CTO ... 구글 스타트업 캠퍼스 에서 만나요!",
  }),
);
export default async function Layout({ children }: any) {
  return <>{children}</>;
}
