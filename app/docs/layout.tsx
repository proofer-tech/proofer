import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";
import { HeaderPortal } from "@/app/components/Header";
import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import { get } from "@vercel/edge-config";

export default async function Layout({ children }: any) {
  const portals: readonly HeaderPortal[] = (await get("portals")) || [];
  return (
    <LandingPageShellLayout portals={portals}>
      {children}
    </LandingPageShellLayout>
  );
}
