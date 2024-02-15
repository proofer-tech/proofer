import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "프루퍼",
    short_name: "프루퍼",
    description:
      "정확한 개발자 성과측정을 위해 실리콘 밸리 빅테크기업들에서 검증된 프레임워크를 기반한 플랫폼을 제공하는 엔지니어링 매니징 파트너",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#ffffff",
    theme_color: "#0052cc",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
