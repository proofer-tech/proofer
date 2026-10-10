import fixture from "../__fixtures__/medium-images.json";
import type { ImageResolver } from "./docsToPmd";

const images = fixture as Record<string, string[]>;

/** 이전 글용: 글 안 n 번째 blob 자리표시를 Medium 원본의 n 번째 이미지 주소에 짝짓는다. */
export function mediumImageResolver(mediumId: string): ImageResolver {
  return (blob, index) => {
    const url = images[mediumId]?.[index];
    if (!url)
      throw new Error(
        `${mediumId}: ${index + 1}번째 이미지(${blob}) 짝이 없다`,
      );
    return { url };
  };
}
