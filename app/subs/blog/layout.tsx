import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import { HeaderPortal } from "@/app/components/Header";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import { get } from "@vercel/edge-config";

export const metadata = {
  alternates: {
    canonical: "https://blog.proofer.tech",
  },
  other: {
    "naver-site-verification": "f9b91d4a15d7caa887ca361142c225a3da52a6fc",
  },
};
export default async function Layout({ children }: any) {
  const portals: readonly HeaderPortal[] = (await get("portals")) || [];
  return (
    <LandingPageShellLayout portals={portals}>
      {children}
    </LandingPageShellLayout>
  );
}
