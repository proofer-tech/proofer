import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle({
  title: "서비스소개서",
  description:
    "진짜 업무 데이터를 활용하는 성과 측정/평가/관리 통합 솔루션 프루퍼 서비스 소개서를 PDF 문서로 확인하세요.",
});

export default function Layout({ children }: any) {
  return <>{children}</>;
}
