import { NextRequest, NextResponse } from "next/server";
import {
  findTenant,
  publicOrigin,
  tenantPath,
} from "@/app/subs/otel/lib/tenant";
import {
  SESSION_TTL_SEC,
  cookieOptions,
  oauthCookie,
  sessionCookie,
  sign,
  verify,
  type OAuthState,
} from "@/app/subs/otel/auth/session";
import {
  clientSecret,
  exchangeCode,
  verifyIdToken,
} from "@/app/subs/otel/auth/vercel";

// Vercel 앱의 Sign-In Access 가 "Members of the team" 이면 팀 멤버가 아닌 사용자는
// 여기까지 오지 못하고 error=access_denied 로 돌아온다.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenant: string }> },
) {
  const { tenant: slug } = await params;
  const origin = publicOrigin(req.nextUrl.origin);
  const home = origin + tenantPath(slug);
  const fail = (reason: string) => {
    const res = NextResponse.redirect(`${home}?error=${reason}`);
    res.cookies.delete(oauthCookie(slug));
    return res;
  };

  const tenant = await findTenant(slug);
  const saved = verify<OAuthState>(req.cookies.get(oauthCookie(slug))?.value);
  const q = req.nextUrl.searchParams;

  if (q.get("error"))
    return fail(q.get("error") === "access_denied" ? "denied" : "oauth");
  if (!tenant?.vercel_client_id || !saved) return fail("state");
  if (saved.clientId !== tenant.vercel_client_id) return fail("state");
  if (!q.get("code") || q.get("state") !== saved.state) return fail("state");

  const secret = clientSecret(tenant.vercel_client_id);
  if (!secret) return fail("config");

  try {
    const tokens = await exchangeCode({
      clientId: tenant.vercel_client_id,
      clientSecret: secret,
      code: q.get("code")!,
      verifier: saved.verifier,
      redirectUri: origin + tenantPath(slug, "/auth/callback"),
    });
    const claims = await verifyIdToken(tokens.id_token, {
      clientId: tenant.vercel_client_id,
      nonce: saved.nonce,
    });

    const res = NextResponse.redirect(home);
    res.cookies.delete(oauthCookie(slug));
    res.cookies.set(
      sessionCookie(slug),
      sign({
        tenantId: tenant.id,
        tenantSlug: tenant.slug,
        tenantName: tenant.name,
        sub: claims.sub,
        email: claims.email ?? null,
        name: claims.name ?? claims.preferred_username ?? null,
        exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SEC,
      }),
      cookieOptions(SESSION_TTL_SEC),
    );
    return res;
  } catch (error) {
    console.error("otel login failed", error);
    return fail("token");
  }
}
