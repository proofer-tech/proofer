import Image from "next/image";
import type { SegmentKey } from "@/app/subs/ax/segments";

const HERO_POS: Record<SegmentKey, string> = {
  startup: "62% 50%",
  growth: "60% 45%",
  enterprise: "62% 40%",
};

/** 히어로 맨 아래 배경. 이미지, 포인트 색 틴트, 그림자 순으로 깔고 움직임은 scenes.ts 의 heroBg 가 맡는다 */
export function HeroBg({ seg }: { seg: SegmentKey }) {
  return (
    <>
      <div className="hero-bg" data-bg="hero">
        <Image
          src={`/assets/images/ax/seg/axhero-${seg}.jpg`}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: HERO_POS[seg] }}
        />
      </div>
      <div className="hero-tint" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
    </>
  );
}

/** 히어로 다음부터 문의 섹션 전까지 깔리는 sticky 배경 */
export function DeepBg({ seg }: { seg: SegmentKey }) {
  return (
    <div className="deep-bg" aria-hidden="true">
      <div className="deep-img" data-bg="deep">
        <Image
          src={`/assets/images/ax/seg/axbg-${seg}.jpg`}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="deep-tint" />
      <div className="deep-shade" />
    </div>
  );
}
