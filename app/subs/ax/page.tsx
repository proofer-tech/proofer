import SegmentPage from "@/app/subs/ax/SegmentPage";
import { segmentMetadata } from "@/app/subs/ax/segmentMetadata";

// `/` 는 리다이렉트하지 않고 enterprise 판을 그대로 렌더한다 (기존 공유 링크와 검색 노출 유지)
export const metadata = segmentMetadata("enterprise", true);

export default function Page() {
  return <SegmentPage segment="enterprise" />;
}
