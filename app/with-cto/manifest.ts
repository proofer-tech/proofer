import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "with CTO: the agora of CTO",
    short_name: "with CTO:",
    description:
      "프루퍼팀에서 준비한 CTO 커뮤니티 CTO들의 위대한 시작, with CTO: the agora of CTO ... 구글 스타트업 캠퍼스 에서 만나요!",
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
