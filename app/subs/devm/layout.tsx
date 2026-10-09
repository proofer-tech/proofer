import { generateEndedMetadata } from "@/app/components/ServiceEnded";

export const metadata = generateEndedMetadata({
  name: "프루퍼 데브엠",
  subDomain: "devm",
  intro: "회사에 맞는 개발자 성과추적 대시보드를 설계해 주는 서비스였습니다.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
