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

/** 세그먼트별 title, description, og */
export function segmentMetadata(key: SegmentKey): Metadata {
  const seg = SEGMENTS[key];
  return build({ ...seg, url: `${ORIGIN}${seg.path}` });
}

/** 공개 교육(기관 과정판) 페이지의 title, description, og */
export function openMetadata(): Metadata {
  return build({ ...OPEN, url: `${ORIGIN}${OPEN.path}` });
}

/** 첫 화면(`/`)의 title, description, og. canonical 은 도메인 루트 */
export function homeMetadata(): Metadata {
  return build({
    title: "AX 컨설팅과 AI 업무환경 구축, AI Native 조직 설계",
    description:
      "AI를 들였는데 일하는 방식은 그대로라면. 프루퍼 주식회사가 회사 안에 직접 들어가 AI로 바꿀 업무를 고르고, 회사 자료와 AI를 연결하고, 조직이 그 방식대로 일하게 만듭니다.",
    keywords: [
      "AX 컨설팅",
      "AX 교육",
      "기업 AI 교육",
      "AI 업무환경 구축",
      "AI Native 조직",
      "사내 AI 해커톤",
      "AI 전환 컨설팅",
    ],
    url: ORIGIN,
  });
}
