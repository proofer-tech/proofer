import { NextRequest, NextResponse } from "next/server";
import { VercelKVStream, VercelKVStreamGroup } from "@/app/src/redis";

export async function GET(request: NextRequest) {
  const stream = new VercelKVStream("test");
  const group = new VercelKVStreamGroup(stream, "test-1");
  const data = await group.consume();

  return NextResponse.json({ success: true, data: data });
}
