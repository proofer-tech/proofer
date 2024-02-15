import "@mantine/core/styles.css";
import "./globals.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "@/theme";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://proofer.tech"),
  title: "프루퍼 | 개발자 성과측정 SaaS",
  description:
    "정확한 개발자 성과측정을 위해 실리콘 밸리 빅테크기업들에서 검증된 프레임워크를 기반한 플랫폼을 제공하는 엔지니어링 매니징 파트너",
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
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <script async src="https://tally.so/widgets/embed.js"></script>
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
        <Analytics />
      </body>
    </html>
  );
}
