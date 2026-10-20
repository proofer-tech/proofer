import SegmentPage from "@/app/subs/ax/SegmentPage";
import { segmentMetadata } from "@/app/subs/ax/segmentMetadata";

export const metadata = segmentMetadata("startup");

export default function Page() {
  return <SegmentPage segment="startup" />;
}
