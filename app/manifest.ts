import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "프루퍼",
    short_name: "프루퍼",
    description: "진짜 업무 데이터를 활용하는 성과 측정/평가/관리 통합 솔루션",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#ffffff",
    theme_color: "#344FE0",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/pwa-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
