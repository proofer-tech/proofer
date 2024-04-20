import FullPageIframe from "@/app/docs/components/FullPageIframe";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle({
  title: "개인정보처리방침",
  description:
    "정확한 개발자 성과측정을 위한 엔지니어링 매니징 파트너 프루퍼는 여러분의 개인정보를 최고의 보안으로 철저히 보호합니다.",
});

export default function PrivacyPage() {
  return (
    <FullPageIframe
      src={
        "https://e.notionhero.io/e1/p/36fd58e-b6436b479d667db2ec9f0f705fffdb7"
      }
    />
  );
}
