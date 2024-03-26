import "@mantine/core/styles.css";
import "./globals.scss";
import "@mantine/dates/styles.css";
import "dayjs/locale/ko";
import React from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import { UserProvider } from "@auth0/nextjs-auth0/client";

export const viewport: Viewport = {
  themeColor: "#0052cc",
  initialScale: 1,
  minimumScale: 1,
  width: "device-width",
  userScalable: false,
};

const title = "프루퍼";
const shortTitle = "최고의 개발자 성과측정 SaaS 솔루션";
const description =
  "실리콘밸리 검증 방법으로 개발자 성과평가 인사이트 제공. 무료 상담과 14일 무료 평가판으로 성과 향상 여정 시작. 지금 연락하세요!";

export const metadata = {
  applicationName: title,
  metadataBase: new URL("https://proofer.tech"),
  title: `${title} | ${shortTitle}`,
  description: description,
  keywords: [
    "프루퍼",
    "개발자 성과",
    "Developer Velocity",
    "DORA Metrics",
    "SPACE Framework",
    "DevEx",
    "proofer",
    "proofer tech",
  ],
  openGraph: {
    locale: "ko",
    type: "website",
    url: "https://proofer.tech",
    siteName: title,
    title: `${title} | ${shortTitle}`,
    description: description,
    images: ["/assets/images/og-image.png"],
  },
};

export default async function RootLayout({ children }: { children: any }) {
  return (
    <html lang="ko">
      <head>
        <ColorSchemeScript />
        <meta
          name="naver-site-verification"
          content="66a885dd71e438eca763ad82a8131045e4dabb59"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/pwa-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/pwa-192x192.png"
        />
        <link rel="icon" type="image/png" sizes="64x64" href="/pwa-64x64.png" />
        <link
          rel="mask-icon"
          href="/maskable-icon-512x512.png"
          color="#0052cc"
        />
        <script async src="https://tally.so/widgets/embed.js"></script>
      </head>
      <body>
        <UserProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
          <Analytics />
          <SpeedInsights />

          <GoogleAnalytics gaId="G-L765E402KF" />
        </UserProvider>
      </body>
    </html>
  );
}
