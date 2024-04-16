import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import { HeaderPortal } from "@/app/components/Header";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import { get } from "@vercel/edge-config";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle({
  title: "프루퍼 테크",
  description: "정확한 개발자 성과측정을 위한 엔지니어링 매니징 파트너",
});
export default async function Layout({ children }: any) {
  const portals: readonly HeaderPortal[] = (await get("portals")) || [];
  return (
    <LandingPageShellLayout portals={portals}>
      {children}
    </LandingPageShellLayout>
  );
}
