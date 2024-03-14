import { Health } from "@/src/interfaces";
import { get } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req);
  return NextResponse.json({});
}
