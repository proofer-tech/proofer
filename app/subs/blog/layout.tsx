import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import { HeaderPortal } from "@/app/components/Header";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import { get } from "@vercel/edge-config";

export default async function Layout({ children }: any) {
  const portals: readonly HeaderPortal[] = (await get("portals")) || [];
  return (
    <>
      <head>
        <meta
          name="naver-site-verification"
          content="f9b91d4a15d7caa887ca361142c225a3da52a6fc"
        />
      </head>
      <LandingPageShellLayout portals={portals}>
        {children}
      </LandingPageShellLayout>
    </>
  );
}
