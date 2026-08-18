/**
 * @jest-environment node
 */
import { isBodyTooLarge, MAX_BODY_BYTES } from "./limits";

describe("isBodyTooLarge", () => {
  it("허용 크기 이하는 false", () => {
    expect(isBodyTooLarge("a".repeat(MAX_BODY_BYTES))).toBe(false);
  });

  it("허용 크기를 넘으면 true", () => {
    expect(isBodyTooLarge("a".repeat(MAX_BODY_BYTES + 1))).toBe(true);
  });
});
