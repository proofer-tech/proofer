import { NextRequest, NextResponse } from "next/server";
import {
  findTenant,
  publicOrigin,
  tenantPath,
} from "@/app/subs/otel/lib/tenant";
import {
  OAUTH_TTL_SEC,
  cookieOptions,
  oauthCookie,
  sign,
} from "@/app/subs/otel/auth/session";
import {
  authorizeUrl,
  clientSecret,
  randomToken,
} from "@/app/subs/otel/auth/vercel";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenant: string }> },
) {
  const { tenant: slug } = await params;
  const tenant = await findTenant(slug);
  if (!tenant?.vercel_client_id || !clientSecret(tenant.vercel_client_id)) {
    return new NextResponse("login is not configured for this tenant", {
      status: 404,
    });
  }

  const state = randomToken();
  const nonce = randomToken();
  const verifier = randomToken();
  const redirectUri =
    publicOrigin(req.nextUrl.origin) + tenantPath(slug, "/auth/callback");

  const res = NextResponse.redirect(
    authorizeUrl({
      clientId: tenant.vercel_client_id,
      redirectUri,
      state,
      nonce,
      verifier,
    }),
  );
  res.cookies.set(
    oauthCookie(slug),
    sign({
      state,
      nonce,
      verifier,
      clientId: tenant.vercel_client_id,
      exp: Math.floor(Date.now() / 1000) + OAUTH_TTL_SEC,
    }),
    cookieOptions(OAUTH_TTL_SEC),
  );
  return res;
}
