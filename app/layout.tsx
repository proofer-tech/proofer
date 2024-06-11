import "@mantine/core/styles.css";
import "./globals.scss";
import "@mantine/dates/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "dayjs/locale/en";
import React from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { generateMetadataFromTitle } from "@/src/manifest";
import { Notifications } from "@mantine/notifications";
import { merge } from "lodash";

export const viewport: Viewport = {
  themeColor: "#0052cc",
  initialScale: 1,
  minimumScale: 1,
  width: "device-width",
  userScalable: true,
};
export const metadata = merge(
  {
    metadataBase: new URL("https://proofer.tech"),
    keywords: [
      "프루퍼",
      "성과측정",
      "성과평가",
      "성과관리",
      "HRDT",
      "Digital Transformation",
      "디지털 전환",
      "HR SaaS",
    ],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://proofer.tech",
      images: ["/assets/images/og-image.png"],
    },
    icons: [
      {
        rel: "shortcut icon",
        media: "(prefers-color-scheme: light)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        rel: "shortcut icon",
        media: "(prefers-color-scheme: dark)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/pwa-512x512.png",
        href: "/pwa-512x512.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/pwa-192x192.png",
        href: "/pwa-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "64x64",
        url: "/pwa-64x64.png",
        href: "/pwa-64x64.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon-180x180.png",
        href: "/apple-touch-icon-180x180.png",
      },
      {
        rel: "mask-icon",
        color: "#0052cc",
        url: "/maskable-icon-512x512.png",
        href: "/maskable-icon-512x512.png",
      },
    ],
  },
  generateMetadataFromTitle({
    title: "프루퍼, SMART 한 데이터 기반 성과 평가",
    fullTitle: "프루퍼, SMART 한 데이터 기반 성과 평가",
    description:
      "프루퍼는 실제 업무 데이터 기반으로 성과를 측정하고 평가하여 관리하는 솔루션을 제공합니다. 무료상담을 통해 '진짜' 성과평가를 경험해보세요!",
  }),
);

export default async function RootLayout({ children }: { children: any }) {
  return (
    <html lang="ko">
      <head>
        <ColorSchemeScript />
        <script async src="https://tally.so/widgets/embed.js"></script>
      </head>
      <body>
        <UserProvider>
          <MantineProvider theme={theme}>
            <Notifications />
            {children}
          </MantineProvider>
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId="G-L765E402KF" />
        </UserProvider>
      </body>
    </html>
  );
}
