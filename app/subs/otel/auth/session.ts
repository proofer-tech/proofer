import { createHmac, timingSafeEqual } from "node:crypto";

// 서명한 쿠키 값. 내용은 base64url(JSON) 이고 HMAC-SHA256 으로 위조를 막는다.
// 비밀값은 OTEL_SESSION_SECRET (32바이트 이상 임의 문자열).

// 테넌트마다 쿠키를 따로 둔다. 두 팀에 다 속한 사람은 두 대시보드에 동시에 로그인해 있을 수 있다.
export const sessionCookie = (slug: string) => `otel_session_${slug}`;
export const oauthCookie = (slug: string) => `otel_oauth_${slug}`;
export const SESSION_TTL_SEC = 60 * 60 * 12;
export const OAUTH_TTL_SEC = 60 * 10;

export type Session = {
  tenantId: number;
  tenantSlug: string;
  tenantName: string;
  sub: string;
  email: string | null;
  name: string | null;
  exp: number;
};

export type OAuthState = {
  state: string;
  verifier: string;
  nonce: string;
  clientId: string;
  exp: number;
};

function secret(): string {
  const s = process.env.OTEL_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error("OTEL_SESSION_SECRET must be at least 32 characters");
  }
  return s;
}

function mac(data: string, key: string): string {
  return createHmac("sha256", key).update(data).digest("base64url");
}

export function sign(payload: object, key: string = secret()): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${mac(data, key)}`;
}

export function verify<T extends { exp: number }>(
  value: string | undefined,
  key: string = secret(),
  now: number = Date.now() / 1000,
): T | null {
  if (!value) return null;
  const [data, sig] = value.split(".");
  if (!data || !sig) return null;
  const expected = Buffer.from(mac(data, key));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as T;
    return typeof payload.exp === "number" && payload.exp > now
      ? payload
      : null;
  } catch {
    return null;
  }
}

export const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});
