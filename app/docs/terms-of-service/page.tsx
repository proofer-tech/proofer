import FullPageIframe from "@/app/docs/components/FullPageIframe";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle({
  title: "서비스이용약관",
  description:
    "정확한 개발자 성과측정을 위한 엔지니어링 매니징 파트너 프루퍼의 이용약관입니다.",
});
export default function TermsOfServicePage() {
  return (
    <FullPageIframe
      src={
        "https://e.notionhero.io/e1/p/6e9487c-362128a6fedd47b05bfa9d2e9ad907e"
      }
    />
  );
}
