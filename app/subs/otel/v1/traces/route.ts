import { NextRequest } from "next/server";
import { ingest } from "@/app/subs/otel/ingest";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return ingest(req, "traces");
}
