/** @jest-environment node */
import fs from "fs";
import path from "path";
import { docsToPmd, type ImageResolver } from "./docsToPmd";
import { mediumImageResolver } from "./mediumImages";

const FIX = path.join(__dirname, "../__fixtures__");
const DOCS = path.join(FIX, "docs-backup");
const stub: ImageResolver = (blob, i) => ({ url: `https://img.test/${i}` });
const wrap = (body: string) =>
  `# 제목\n\n2026-10-11 백업 · 작성자\n\n\`\`\`yaml\nauthor: "proofer"\n\`\`\`\n\n${body}`;

describe("docsToPmd 대응표", () => {
  it("H1 -> title, 날짜와 작성자 칩 줄 버림, 첫 yaml 블록 -> 나머지 frontmatter", () => {
    const out = docsToPmd(wrap("본문\n"), stub);
    expect(out).toBe('---\ntitle: "제목"\nauthor: "proofer"\n---\n\n본문\n');
    expect(out).not.toContain("작성자");
  });

  it("둘째 yaml 블록은 본문에 남는다", () => {
    const out = docsToPmd(wrap("```yaml\na: 1\n```\n"), stub);
    expect(out).toContain("```yaml\na: 1\n```");
  });

  it("이미지 바로 아래 기울임 문단 -> 캡션", () => {
    const out = docsToPmd(
      wrap("![알트](blob/x1)\n\n*캡션 글*\n\n다음 문단\n"),
      stub,
    );
    expect(out).toContain('![알트](https://img.test/0 "캡션 글")\n\n다음 문단');
  });

  it("기울임이 이미지 바로 아래가 아니면 캡션이 아니다", () => {
    const out = docsToPmd(wrap("![알트](blob/x1)\n\n본문\n\n*강조*\n"), stub);
    expect(out).toContain("![알트](https://img.test/0)");
    expect(out).toContain("*강조*");
  });

  it("링크 하나만 있는 문단 -> 링크 카드 줄(URL 만)", () => {
    const out = docsToPmd(
      wrap(
        "[행사 안내](https://event-us.kr/a/1)\n\n글 속 [링크](https://a.b) 는 그대로\n",
      ),
      stub,
    );
    expect(out).toContain("\n\nhttps://event-us.kr/a/1\n\n");
    expect(out).toContain("글 속 [링크](https://a.b) 는 그대로");
  });

  it("YouTube 링크 하나만 있는 문단 -> 임베드 줄", () => {
    const out = docsToPmd(
      wrap(
        "[영상 제목](https://www.youtube.com/watch?v=HnKjouazi3k)\n\nhttps://youtu.be/abcdefghijk\n",
      ),
      stub,
    );
    expect(out).toContain(
      "\n\nhttps://www.youtube.com/watch?v=HnKjouazi3k\n\n",
    );
    expect(out).toContain("https://www.youtube.com/watch?v=abcdefghijk");
  });

  it("문단 안 줄바꿈 -> 줄 끝 역슬래시, 목록과 코드는 건드리지 않는다", () => {
    const out = docsToPmd(
      wrap("첫 줄  \n둘째 줄<br>\n셋째 줄\\\n끝\n\n- a\n- b\n"),
      stub,
    );
    expect(out).toContain("첫 줄\\\n둘째 줄\\\n셋째 줄\\\n끝");
    expect(out).toContain("- a\n- b");
  });
});

describe("이전 글 49건", () => {
  const images = JSON.parse(
    fs.readFileSync(path.join(FIX, "medium-images.json"), "utf8"),
  ) as Record<string, string[]>;
  const files = fs.readdirSync(DOCS).filter((f) => f.endsWith(".md"));

  it("픽스처는 49건이다", () => expect(files).toHaveLength(49));

  const mismatched: string[] = [];
  it.each(files)("%s 자리표시 수와 Medium 이미지 수가 맞고 변환된다", (f) => {
    const id = f.replace(".md", "");
    const src = fs.readFileSync(path.join(DOCS, f), "utf8");
    const n = (src.match(/\(blob\//g) ?? []).length;
    if (n !== (images[id] ?? []).length)
      mismatched.push(`${id} (${n} / ${(images[id] ?? []).length})`);
    expect(mismatched).toEqual([]);
    const out = docsToPmd(src, mediumImageResolver(id));
    expect(out).toMatch(/^---\ntitle: ".+"\n/);
    expect(out).not.toContain("blob/");
    expect(out).not.toMatch(/^\d{4}-\d{2}-\d{2} 백업/m);
  });
});
