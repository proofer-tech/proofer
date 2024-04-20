import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle({
  title: "서비스소개서",
  description:
    "정확한 개발자 성과측정을 위한 엔지니어링 매니징 파트너 프루퍼 서비스 소개서를 PDF 문서로 확인하세요.",
});

export default function Layout({ children }: any) {
  return <>{children}</>;
}
