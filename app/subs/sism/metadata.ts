import type { Metadata } from "next";
import { generateMetadataFromTitle } from "@/src/manifest";

const ORIGIN = "https://sism.proofer.tech";
const ogImage = "/assets/images/og-image.webp";
const title = "프루퍼 SI SM | 외주 개발과 운영 유지관리";
const description =
  "고객사의 사정을 백번 이해하고, 유연하게 함께 움직입니다. 오픈한 뒤에도 운영에 필요한 것들을 알아서 챙기며 관리해드립니다.";

export function homeMetadata(): Metadata {
  return generateMetadataFromTitle(
    { fullTitle: title, description },
    {
      metadataBase: new URL(ORIGIN),
      alternates: { canonical: ORIGIN },
      openGraph: {
        locale: "ko",
        type: "website",
        url: ORIGIN,
        images: [ogImage],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    },
  );
}
