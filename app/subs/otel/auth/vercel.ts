import {
  createHash,
  createPublicKey,
  randomBytes,
  verify as cryptoVerify,
  type JsonWebKey,
} from "node:crypto";

// Sign in with Vercel (OAuth 2.0 + OIDC).
// https://vercel.com/docs/sign-in-with-vercel/authorization-server-api
export const AUTHORIZE_URL = "https://vercel.com/oauth/authorize";
export const TOKEN_URL = "https://api.vercel.com/login/oauth/token";
export const JWKS_URL = "https://vercel.com/.well-known/jwks";
export const ISSUER = "https://vercel.com";

// 테넌트 앱의 client secret. client id 를 키로 하는 JSON 이다.
//   OTEL_VERCEL_APPS='{"cl_abc":"secret1","cl_def":"secret2"}'
export function clientSecret(clientId: string): string | null {
  try {
    const apps = JSON.parse(process.env.OTEL_VERCEL_APPS ?? "{}");
    return typeof apps[clientId] === "string" ? apps[clientId] : null;
  } catch {
    return null;
  }
}

export const randomToken = () => randomBytes(32).toString("base64url");

export function pkceChallenge(verifier: string): string {
  return createHash("sha256").update(verifier).digest("base64url");
}

export function authorizeUrl(p: {
  clientId: string;
  redirectUri: string;
  state: string;
  nonce: string;
  verifier: string;
}): string {
  const q = new URLSearchParams({
    client_id: p.clientId,
    redirect_uri: p.redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state: p.state,
    nonce: p.nonce,
    code_challenge: pkceChallenge(p.verifier),
    code_challenge_method: "S256",
  });
  return `${AUTHORIZE_URL}?${q}`;
}

export async function exchangeCode(p: {
  clientId: string;
  clientSecret: string;
  code: string;
  verifier: string;
  redirectUri: string;
  fetchImpl?: typeof fetch;
}): Promise<{ id_token: string; access_token: string }> {
  const res = await (p.fetchImpl ?? fetch)(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: p.clientId,
      client_secret: p.clientSecret,
      code: p.code,
      code_verifier: p.verifier,
      redirect_uri: p.redirectUri,
    }),
  });
  if (!res.ok) throw new Error(`token endpoint ${res.status}`);
  return res.json();
}

type Jwk = JsonWebKey & { kid?: string };
let jwksCache: { at: number; keys: Jwk[] } | null = null;

async function jwks(fetchImpl: typeof fetch, force = false): Promise<Jwk[]> {
  if (!force && jwksCache && Date.now() - jwksCache.at < 60 * 60 * 1000) {
    return jwksCache.keys;
  }
  const res = await fetchImpl(JWKS_URL);
  if (!res.ok) throw new Error(`jwks ${res.status}`);
  const { keys } = (await res.json()) as { keys: Jwk[] };
  jwksCache = { at: Date.now(), keys };
  return keys;
}

export function resetJwksCache() {
  jwksCache = null;
}

export type IdClaims = {
  sub: string;
  aud: string | string[];
  email?: string;
  name?: string;
  preferred_username?: string;
  nonce?: string;
};

// ID 토큰 서명(RS256/ES256)과 iss, aud, exp, nbf, nonce 를 검사한다.
export async function verifyIdToken(
  idToken: string,
  p: {
    clientId: string;
    nonce: string;
    fetchImpl?: typeof fetch;
    now?: number;
  },
): Promise<IdClaims> {
  const [h, b, s] = idToken.split(".");
  if (!h || !b || !s) throw new Error("malformed id_token");
  const header = JSON.parse(Buffer.from(h, "base64url").toString());
  const claims = JSON.parse(Buffer.from(b, "base64url").toString());

  const fetchImpl = p.fetchImpl ?? fetch;
  let keys = await jwks(fetchImpl);
  let jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) {
    keys = await jwks(fetchImpl, true);
    jwk = keys.find((k) => k.kid === header.kid);
  }
  if (!jwk) throw new Error("unknown kid");

  const key = createPublicKey({ key: jwk, format: "jwk" });
  const data = Buffer.from(`${h}.${b}`);
  const sig = Buffer.from(s, "base64url");
  if (header.alg !== "RS256" && header.alg !== "ES256") {
    throw new Error(`unsupported alg ${header.alg}`);
  }
  const ok =
    header.alg === "RS256"
      ? cryptoVerify("sha256", data, key, sig)
      : cryptoVerify("sha256", data, { key, dsaEncoding: "ieee-p1363" }, sig);
  if (!ok) throw new Error("bad signature");

  const now = p.now ?? Date.now() / 1000;
  const skew = 60;
  const aud = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (claims.iss !== ISSUER) throw new Error("bad iss");
  if (!aud.includes(p.clientId)) throw new Error("bad aud");
  if (typeof claims.exp !== "number" || claims.exp + skew < now) {
    throw new Error("expired");
  }
  if (typeof claims.nbf === "number" && claims.nbf - skew > now) {
    throw new Error("not yet valid");
  }
  if (claims.nonce !== p.nonce) throw new Error("bad nonce");
  if (typeof claims.sub !== "string") throw new Error("no sub");
  return claims as IdClaims;
}
