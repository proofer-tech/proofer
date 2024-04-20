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
  userScalable: false,
};
export const metadata = merge(
  {
    metadataBase: new URL("https://proofer.tech"),
    keywords: [
      "개발자 성과",
      "개발자 평가",
      "개발자 성과 평가",
      "성과 평가",
      "HR SaaS",
      "개발자 성과 관리",
    ],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://proofer.tech",
      images: ["/assets/images/og-image.png"],
    },
  },
  generateMetadataFromTitle({
    title: "프루퍼, 최고의 개발자 성과 평가 SaaS 솔루션",
    description:
      "프루퍼는 개발자의 성과를 정확하게 평가하고 개선할 수 있는 데이터 기반의 HR SaaS 솔루션을 제공합니다. 무료 상담과 14일 평가판으로 성과 향상 여정 시작. 지금 바로 연락해보세요!",
  }),
);

export default async function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
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
