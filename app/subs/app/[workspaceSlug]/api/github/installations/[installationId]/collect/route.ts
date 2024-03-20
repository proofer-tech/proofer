import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest, { params }: any) => {
  const { installationId } = params;
  return NextResponse.json({});
};
