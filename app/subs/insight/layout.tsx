import { generateEndedMetadata } from "@/app/components/ServiceEnded";

export const metadata = generateEndedMetadata({
  name: "프루퍼 인사이트",
  subDomain: "insight",
  intro:
    "개발 없이 업무 데이터 대시보드를 만들 수 있는 노코드 대시보드 빌더였습니다.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
