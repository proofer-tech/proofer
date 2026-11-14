import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프루퍼 OTel",
  robots: { index: false, follow: false },
};

export default function OtelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-proofer-bg-alt font-proofer text-proofer-ink">
      {children}
    </div>
  );
}
