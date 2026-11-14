import { NextRequest, NextResponse } from "next/server";
import { publicOrigin, tenantPath } from "@/app/subs/otel/lib/tenant";
import { sessionCookie } from "@/app/subs/otel/auth/session";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tenant: string }> },
) {
  const { tenant: slug } = await params;
  const res = NextResponse.redirect(
    publicOrigin(req.nextUrl.origin) + tenantPath(slug),
    303,
  );
  res.cookies.delete(sessionCookie(slug));
  return res;
}
