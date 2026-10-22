import type { Metadata } from "next";
import { generateMetadataFromTitle } from "@/src/manifest";
import { OPEN, SEGMENTS, type SegmentKey } from "@/app/subs/ax/segments";

const ORIGIN = "https://ax.proofer.tech";
const ogImage = "/assets/images/ax/og-image.webp";

interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  /** canonical 과 og:url */
  url: string;
}

function build({ title, description, keywords, url }: PageMeta): Metadata {
  return generateMetadataFromTitle(
    { title, description },
    {
      metadataBase: new URL(ORIGIN),
      alternates: { canonical: url },
      keywords,
      openGraph: {
        locale: "ko",
        type: "website",
        url,
        images: [ogImage],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | 프루퍼`,
        description,
        images: [ogImage],
      },
      other: {
        "naver-site-verification": "540b6d827c4e811af74ab953bd05d5b3d35cdd96",
      },
    },
  );
}

/**
 * 세그먼트별 title, description, og. `/` 와 `/enterprise` 는 같은 내용이라
 * canonical 을 `/` 하나로 모은다 (검색 노출과 기존 공유 링크를 지킨다).
 */
export function segmentMetadata(key: SegmentKey, atRoot = false): Metadata {
  const seg = SEGMENTS[key];
  const url = key === "enterprise" ? ORIGIN : `${ORIGIN}${seg.path}`;
  return build({ ...seg, url: atRoot ? ORIGIN : url });
}

/** 공개 교육(기관 과정판) 페이지의 title, description, og */
export function openMetadata(): Metadata {
  return build({ ...OPEN, url: `${ORIGIN}${OPEN.path}` });
}
