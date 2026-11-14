import { NextRequest } from "next/server";
import { ingest } from "@/app/subs/otel/ingest";

export const runtime = "nodejs";

// otel.proofer.tech/{tenant}/v1/traces. 토큰이 이 테넌트 것이 아니면 401.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tenant: string }> },
) {
  const { tenant } = await params;
  return ingest(req, "traces", tenant);
}
