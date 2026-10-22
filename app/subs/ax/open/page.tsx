import OpenPage from "@/app/subs/ax/OpenPage";
import { openMetadata } from "@/app/subs/ax/segmentMetadata";

export const metadata = openMetadata();

export default function Page() {
  return <OpenPage />;
}
