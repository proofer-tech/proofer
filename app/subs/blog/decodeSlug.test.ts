/** @jest-environment node */
import { decodeSlug } from "./ArticleList";

describe("decodeSlug", () => {
  it("한글 slug 를 푼다", () => {
    expect(decodeSlug(encodeURIComponent("개발자-생산성"))).toBe(
      "개발자-생산성",
    );
    expect(decodeSlug("%ED%96%89%EC%82%AC-%ED%9B%84%EA%B8%B0")).toBe(
      "행사-후기",
    );
  });
  it("이미 풀렸거나 깨진 값은 그대로 둔다", () => {
    expect(decodeSlug("dora-metrics")).toBe("dora-metrics");
    expect(decodeSlug("%E0%A4%A")).toBe("%E0%A4%A");
  });
});
