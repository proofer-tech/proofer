import "@mantine/core/styles.css";
import "./globals.css";
import React from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0052cc",
  initialScale: 1,
  minimumScale: 1,
  width: "device-width",
  userScalable: false,
};

export const metadata = {
  metadataBase: new URL("https://proofer.tech"),
  title: "프루퍼 | 개발자 성과측정 SaaS",
  description:
    "정확한 개발자 성과측정을 위해 실리콘 밸리 빅테크기업들에서 검증된 프레임워크를 기반한 플랫폼을 제공하는 엔지니어링 매니징 파트너",
  keywords: [
    "프루퍼",
    "개발자 성과",
    "DORA",
    "도라메트릭",
    "SPACE",
    "DevEx",
    "proofer",
    "proofer tech",
  ],
  openGraph: {
    locale: "ko",
    type: "website",
    url: "https://proofer.tech",
    siteName: "프루퍼 | 개발자 성과측정 SaaS",
    title: "프루퍼 | 개발자 성과측정 SaaS",
    description:
      "정확한 개발자 성과측정을 위해 실리콘 밸리 빅테크기업들에서 검증된 프레임워크를 기반한 플랫폼을 제공하는 엔지니어링 매니징 파트너",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="naver-site-verification"
          content="66a885dd71e438eca763ad82a8131045e4dabb59"
        />
        <script async src="https://tally.so/widgets/embed.js"></script>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L765E402KF"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-L765E402KF');
        </script>
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
