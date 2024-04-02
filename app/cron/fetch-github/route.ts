import { withCronApi } from "@/src/api-decorators";
import { NextRequest, NextResponse } from "next/server";
import { dz } from "@/database/engine";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";

export const GET = withCronApi(async function (_: NextRequest) {
  return NextResponse.json({});
});
