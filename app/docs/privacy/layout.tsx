import { generateMetadataFromTitle } from "@/src/manifest";
import React from "react";

export const metadata = generateMetadataFromTitle({
  title: "개인정보처리방침",
  description:
    "진짜 업무 데이터를 활용하는 성과 측정/평가/관리 통합 솔루션 프루퍼는 여러분의 개인정보를 최고의 보안으로 철저히 보호합니다.",
});
export default function Layout({ children }: any) {
  return <>{children}</>;
}
