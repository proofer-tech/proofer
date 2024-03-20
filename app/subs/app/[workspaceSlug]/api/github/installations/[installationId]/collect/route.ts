import { NextRequest, NextResponse } from "next/server";
import { GitHubApp } from "@/src/integrations/github";

export const GET = async (_: NextRequest, { params }: any) => {
  const { installationId } = params;
  return NextResponse.json({});
};
