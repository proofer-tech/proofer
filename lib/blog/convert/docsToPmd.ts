// Docs 내보내기 마크다운 -> PMD. 대응표: 포맷규격과-하네스.md "Docs 표기와 PMD 의 대응".
// 천장: 블록 단위(빈 줄로 나눈 덩어리) 처리라 중첩 구조는 보지 않는다. PMD 가 중첩 목록을 금지하므로 충분하다.
// 코드 펜스 안의 빈 줄은 한 블록으로 묶는다. 펜스 판정은 줄 머리 ``` 만 본다.

export type ResolvedImage = { url: string; width?: number; height?: number };
/** blob 자리표시(`blob/<id>`)와 글 안 순번(0부터)을 받아 https 주소를 돌려준다. */
export type ImageResolver = (blob: string, index: number) => ResolvedImage;

const YOUTUBE =
  /^https:\/\/(?:www\.|m\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/;
const LINK_ONLY = /^(?:\[[^\]]*\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/\S+))$/;
const IMAGE_ONLY = /^!\[([^\]]*)\]\((blob\/[^)\s]+)\)$/;
const ITALIC_ONLY = /^\*([^*].*)\*$/s;
const CHIP_LINE = /^\d{4}-\d{2}-\d{2}\b.*·/;

function splitBlocks(md: string): string[] {
  const blocks: string[] = [];
  let cur: string[] = [];
  let fenced = false;
  const flush = () => {
    if (cur.length) blocks.push(cur.join("\n"));
    cur = [];
  };
  for (const line of md.replace(/\r\n/g, "\n").split("\n")) {
    if (line.startsWith("```")) fenced = !fenced;
    if (!fenced && line.trim() === "" && !line.startsWith("```")) flush();
    else cur.push(line);
  }
  flush();
  return blocks;
}

const isPlainParagraph = (b: string) =>
  !/^(#|>|```|\||\s*(?:[-*+]|\d+\.)\s|!\[)/.test(b);

function toBackslashBreaks(b: string): string {
  return b
    .split("\n")
    .map((l, i, a) => {
      if (i === a.length - 1) return l;
      const t = l.replace(/(?:<br\s*\/?>|\s{2,})$/, "");
      return t.endsWith("\\") ? t : `${t}\\`;
    })
    .join("\n");
}

export function docsToPmd(md: string, resolveImage: ImageResolver): string {
  const blocks = splitBlocks(md);
  let title = "";
  let yaml = "";
  const body: string[] = [];
  let imageIndex = 0;
  let seenYaml = false;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (!title && /^# /.test(b)) {
      title = b.slice(2).trim();
      if (CHIP_LINE.test(blocks[i + 1] ?? "")) i++;
      continue;
    }
    if (!seenYaml && b.startsWith("```yaml")) {
      seenYaml = true;
      yaml = b.split("\n").slice(1, -1).join("\n");
      continue;
    }
    const img = IMAGE_ONLY.exec(b);
    if (img) {
      const { url } = resolveImage(img[2], imageIndex++);
      const cap = ITALIC_ONLY.exec(blocks[i + 1] ?? "");
      if (cap) i++;
      const caption = cap ? ` "${cap[1].trim().replace(/"/g, '\\"')}"` : "";
      body.push(`![${img[1]}](${url}${caption})`);
      continue;
    }
    const link = LINK_ONLY.exec(b);
    if (link && !b.includes("\n")) {
      const url = link[1] ?? link[2];
      const yt = YOUTUBE.exec(url);
      body.push(yt ? `https://www.youtube.com/watch?v=${yt[1]}` : url);
      continue;
    }
    body.push(isPlainParagraph(b) ? toBackslashBreaks(b) : b);
  }

  return `---\ntitle: ${JSON.stringify(title)}\n${yaml}\n---\n\n${body.join("\n\n")}\n`;
}
