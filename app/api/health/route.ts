import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();
  const healthRecords = await prisma.health.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json(healthRecords);
}
