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
          content="66a885dd71e438eca763ad82a8131045e4dabb59"
        />
      </head>
      <LandingPageShellLayout portals={portals}>
        {children}
      </LandingPageShellLayout>
    </>
  );
}
