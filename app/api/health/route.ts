import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import { Health } from "@/src/interfaces";

export async function GET() {
  const health: { [key: string]: Health } | undefined = await get("health");
  return NextResponse.json(health);
}
