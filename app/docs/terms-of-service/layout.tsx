import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle({
  title: "서비스이용약관",
  description:
    "진짜 업무 데이터를 활용하는 성과 측정/평가/관리 통합 솔루션 프루퍼와 함께할 때 필요한 이용약관입니다.",
});
export default function Layout({ children }: any) {
  return <>{children}</>;
}
