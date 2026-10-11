/** @jest-environment node */
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

// 빌드 때 DB 를 읽는 blog 경로가 생기면 실패한다. 4857a2b 배포 실패(빌드가 프로덕션 DB 상태에 기댐)의 재발 방지.
// ponytail: 정적 문자열 검사다. searchParams/cookies/headers 로 요청 때 렌더링되는 page 는 빌드 때 DB 를 읽지 않으므로 통과시킨다.
// 이 시험이 놓치는 경우가 생기면 next build 출력의 경로 표시(○ / ƒ)를 읽는 방식으로 갈아탄다.
const root = __dirname;
const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? files(join(dir, e.name))
      : /(^|\/)(page\.tsx|route\.tsx?|sitemap\.ts)$/.test(join(dir, e.name))
        ? [join(dir, e.name)]
        : [],
  );

describe("blog 경로는 빌드 때 DB 를 읽지 않는다", () => {
  for (const f of files(root)) {
    const src = readFileSync(f, "utf8");
    const name = f.slice(root.length + 1);
    if (!/@\/lib\/blog\/queries|@\/database|@\/lib\/db/.test(src)) continue;

    test(name, () => {
      expect(src).not.toMatch(/export\s+const\s+revalidate\b/);
      const dynamic = /export\s+const\s+dynamic\s*=\s*"force-dynamic"/.test(
        src,
      );
      const requestApi = /searchParams|cookies\(|headers\(/.test(src);
      // generateStaticParams 가 DB 를 안 부르면(빈 배열) 첫 요청 때 만든다.
      const gsp = src.match(/generateStaticParams[\s\S]*?\n}/)?.[0] ?? "";
      expect(dynamic || requestApi || gsp !== "").toBe(true);
      expect(gsp).not.toMatch(/await|queries|db\./);
    });
  }
});
