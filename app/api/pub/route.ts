import { NextRequest, NextResponse } from "next/server";
import { VercelKVStream } from "@/app/src/redis";

export async function POST(request: NextRequest) {
  const stream = new VercelKVStream("test");
  await stream.produce({ currentTimestamp: Date.now() });
  return NextResponse.json({ success: true });
}
