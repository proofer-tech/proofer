import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "with CTO: 1st Meet",
    short_name: "with CTO:",
    description:
      "CTO들의 위대한 시작, 그 첫번째 모임. 프루퍼팀에서 준비한 with CTO: 2024년 6월 7일 금요일 저녁 7시 30분 구글 스타트업 캠퍼스 에서 만나요!",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#ffffff",
    theme_color: "#0052cc",
    icons: [
      {
        src: "/assets/images/with-cto/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/assets/images/with-cto/pwa-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/assets/images/with-cto/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/images/with-cto/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
