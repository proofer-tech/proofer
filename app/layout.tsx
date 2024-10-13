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

export const viewport: Viewport = {
  themeColor: "#344FE0",
  initialScale: 1,
  minimumScale: 1,
  width: "device-width",
  userScalable: true,
};
export const metadata = generateMetadataFromTitle(
  {
    title: "",
    description: "프루퍼 홈페이지입니다.",
  },
  {
    metadataBase: new URL("https://proofer.tech"),
    keywords: ["프루퍼"],
    openGraph: {
      locale: "ko",
      type: "website",
      url: "https://proofer.tech",
      images: ["/assets/images/og-image.webp"],
    },
    icons: [
      {
        rel: "shortcut icon",
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
        color: "#344FE0",
        url: "/maskable-icon-512x512.png",
        href: "/maskable-icon-512x512.png",
      },
    ],
  },
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
            <Notifications position={"top-left"} />
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
