/**
 * @jest-environment node
 */
import { generateKeyPairSync, sign as cryptoSign } from "node:crypto";
import { resetJwksCache, verifyIdToken } from "./vercel";

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
});
const jwk = { ...publicKey.export({ format: "jwk" }), kid: "k1" };
const fetchImpl = (async () =>
  new Response(JSON.stringify({ keys: [jwk] }))) as typeof fetch;

function token(claims: object, kid = "k1") {
  const h = Buffer.from(JSON.stringify({ alg: "RS256", kid })).toString(
    "base64url",
  );
  const b = Buffer.from(JSON.stringify(claims)).toString("base64url");
  const s = cryptoSign("sha256", Buffer.from(`${h}.${b}`), privateKey).toString(
    "base64url",
  );
  return `${h}.${b}.${s}`;
}

const base = {
  iss: "https://vercel.com",
  sub: "u1",
  aud: "cl_proofer",
  exp: 2000,
  nonce: "n1",
  email: "a@b.c",
};
const opts = { clientId: "cl_proofer", nonce: "n1", fetchImpl, now: 1000 };

describe("verifyIdToken", () => {
  beforeEach(() => resetJwksCache());

  it("올바른 토큰은 claims 를 돌려준다", async () => {
    await expect(verifyIdToken(token(base), opts)).resolves.toMatchObject({
      sub: "u1",
      email: "a@b.c",
    });
  });

  it("다른 앱(aud)의 토큰은 거부한다", async () => {
    await expect(
      verifyIdToken(token({ ...base, aud: "cl_hsol" }), opts),
    ).rejects.toThrow("bad aud");
  });

  it("nonce 가 다르면 거부한다", async () => {
    await expect(
      verifyIdToken(token({ ...base, nonce: "x" }), opts),
    ).rejects.toThrow("bad nonce");
  });

  it("만료된 토큰은 거부한다", async () => {
    await expect(
      verifyIdToken(token({ ...base, exp: 900 }), opts),
    ).rejects.toThrow("expired");
  });

  it("서명이 틀리면 거부한다", async () => {
    const [h, , s] = token(base).split(".");
    const b = Buffer.from(JSON.stringify({ ...base, sub: "u2" })).toString(
      "base64url",
    );
    await expect(verifyIdToken(`${h}.${b}.${s}`, opts)).rejects.toThrow(
      "bad signature",
    );
  });
});
