import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle({
  title: "서비스소개서",
  description: "프루퍼 인사이트 서비스 소개서를 PDF 문서로 확인하세요.",
});

export default function Layout({ children }: any) {
  return <>{children}</>;
}
