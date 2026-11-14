/**
 * @jest-environment node
 */
import { sign, verify } from "./session";

const KEY = "k".repeat(40);

describe("session", () => {
  it("서명한 값은 그대로 돌아온다", () => {
    const v = sign({ tenantId: 1, exp: 2000 }, KEY);
    expect(verify<{ tenantId: number; exp: number }>(v, KEY, 1000)).toEqual({
      tenantId: 1,
      exp: 2000,
    });
  });

  it("내용을 바꾸면 거부한다", () => {
    const [, sig] = sign({ tenantId: 1, exp: 2000 }, KEY).split(".");
    const forged =
      Buffer.from(JSON.stringify({ tenantId: 2, exp: 2000 })).toString(
        "base64url",
      ) +
      "." +
      sig;
    expect(verify(forged, KEY, 1000)).toBeNull();
  });

  it("다른 키로 서명한 값은 거부한다", () => {
    expect(verify(sign({ exp: 2000 }, "x".repeat(40)), KEY, 1000)).toBeNull();
  });

  it("만료된 값은 거부한다", () => {
    expect(verify(sign({ exp: 999 }, KEY), KEY, 1000)).toBeNull();
  });
});
