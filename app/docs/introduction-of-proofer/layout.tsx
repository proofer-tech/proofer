import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = {
  ...generateMetadataFromTitle({
    title: "서비스소개서",
    description:
      "회사 안으로 들어가 운영을 바꾸고 영업이익과 기업가치로 증명하는 프루퍼의 그로스 컨설팅, AX 교육과 전환, 프루퍼 플랫폼 서비스 소개서입니다.",
  }),
  alternates: { canonical: "/docs/introduction-of-proofer" },
};

export default function Layout({ children }: any) {
  return <>{children}</>;
}
