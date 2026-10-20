import type { SegmentKey } from "@/app/subs/ax/segments";
import type { SegmentContent } from "./types";
import { startup } from "./startup";
import { growth } from "./growth";
import { enterprise } from "./enterprise";

export const CONTENT: Record<SegmentKey, SegmentContent> = {
  startup,
  growth,
  enterprise,
};
