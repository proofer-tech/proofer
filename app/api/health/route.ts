import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import { Health } from "@/app/src/interfaces";

export async function GET(request: NextRequest) {
  const health: { [key: string]: Health } | undefined = await get("health");
  return NextResponse.json(health);
}
