import type { Metadata } from "next";
import { generateMetadataFromTitle } from "@/src/manifest";
import { SEGMENTS, type SegmentKey } from "@/app/subs/ax/segments";

const ORIGIN = "https://ax.proofer.tech";
const ogImage = "/assets/images/ax/og-image.webp";

/**
 * 세그먼트별 title, description, og. `/` 와 `/enterprise` 는 같은 내용이라
 * canonical 을 `/` 하나로 모은다 (검색 노출과 기존 공유 링크를 지킨다).
 */
export function segmentMetadata(key: SegmentKey, atRoot = false): Metadata {
  const seg = SEGMENTS[key];
  const url = key === "enterprise" ? ORIGIN : `${ORIGIN}${seg.path}`;
  const fullTitle = `${seg.title} | 프루퍼`;
  return generateMetadataFromTitle(
    { title: seg.title, description: seg.description },
    {
      metadataBase: new URL(ORIGIN),
      alternates: { canonical: url },
      keywords: seg.keywords,
      openGraph: {
        locale: "ko",
        type: "website",
        url: atRoot ? ORIGIN : `${ORIGIN}${seg.path}`,
        images: [ogImage],
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description: seg.description,
        images: [ogImage],
      },
      other: {
        "naver-site-verification": "540b6d827c4e811af74ab953bd05d5b3d35cdd96",
      },
    },
  );
}
