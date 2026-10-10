// pnpm blog <lint|preview|publish> <글.md> [--images <폴더>]
// preview 는 728ba2dc, publish 는 1ba8e7f4 가 COMMANDS 에 더한다.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  docsToPmd,
  type ImageResolver,
} from "../../lib/blog/convert/docsToPmd";
import { lint } from "../../lib/blog/pmd";
import {
  PLACEHOLDER_HOST,
  type PublishDeps,
} from "../../lib/blog/publish/assets";
import { publish } from "../../lib/blog/publish/publish";

const USAGE = `사용법: pnpm blog <명령> <글.md> [--images <폴더>]

명령:
  lint      글을 검사한다. 오류가 있으면 종료 코드 1
  preview   DB 에 쓰지 않고 화면으로 미리 본다
  publish   DB 에 글을 쓴다 (기본 --dry-run, 실제 쓰기는 --write)

--images <폴더>  글의 n 번째 blob/ 이미지를 폴더의 이름순 n 번째 파일에 짝짓는다`;

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
const BLOB_REF = /^!\[[^\]]*\]\(blob\/[^)\s]+\)$/gm;

/** 이미지 폴더의 파일을 이름순으로 돌려준다. */
export function listImages(dir: string): string[] {
  if (!existsSync(dir) || !statSync(dir).isDirectory())
    throw new Error(`--images 폴더가 없다: ${dir}`);
  return readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

/**
 * Docs 모양이면 PMD 로 바꾸고, PMD(---로 시작)면 그대로 돌려준다.
 * 업로드 전이라 이미지 주소는 자리표시 https 주소이고, 실제 주소는 publish 가 만든다.
 */
export function loadPmd(file: string, imagesDir?: string): string {
  const src = readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  if (/^---\r?\n/.test(src)) return src;
  const refs = (src.match(BLOB_REF) ?? []).length;
  let resolve: ImageResolver = (blob) => ({
    url: `https://blob.invalid/${blob.replace(/^blob\//, "")}`,
  });
  if (imagesDir) {
    const files = listImages(imagesDir);
    if (files.length !== refs)
      throw new Error(
        `이미지 짝이 안 맞는다: 글의 blob/ 자리 ${refs}개, ${imagesDir} 의 파일 ${files.length}개`,
      );
    resolve = (_b, i) => ({
      url: `https://blob.invalid/${encodeURIComponent(files[i])}`,
    });
  }
  return docsToPmd(src, resolve);
}

function runLint(file: string, imagesDir?: string): number {
  const results = lint(loadPmd(file, imagesDir));
  for (const r of results)
    console.log(`${file}:${r.line} ${r.ruleId} ${r.message} -> ${r.fix}`);
  const errors = results.filter((r) => r.severity === "error").length;
  console.log(`오류 ${errors}건, 경고 ${results.length - errors}건`);
  return errors > 0 ? 1 : 0;
}

const MIME: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
};

/** 실제 파일, 네트워크, Vercel Blob. --write 에서만 불린다. */
function realDeps(imagesDir?: string): PublishDeps {
  return {
    async readImage(url) {
      const ext = url.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
      const contentType = MIME[ext] ?? "application/octet-stream";
      if (url.startsWith(PLACEHOLDER_HOST)) {
        if (!imagesDir) throw new Error(`--images 폴더가 필요하다: ${url}`);
        const name = decodeURIComponent(url.slice(PLACEHOLDER_HOST.length));
        return { bytes: readFileSync(join(imagesDir, name)), contentType };
      }
      const res = await fetch(url);
      if (!res.ok)
        throw new Error(`이미지를 받지 못했다(${res.status}): ${url}`);
      return {
        bytes: new Uint8Array(await res.arrayBuffer()),
        contentType: res.headers.get("content-type") ?? contentType,
      };
    },
    async putBlob(name, bytes, contentType) {
      const { put } = await import("@vercel/blob");
      const r = await put(name, Buffer.from(bytes), {
        access: "public",
        contentType,
        addRandomSuffix: false,
      });
      return r.url;
    },
    async fetchHtml(url) {
      const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.text();
    },
  };
}

// DB 쓰기는 이미 끝났으므로 실패해도 되돌리지 않고 경고만 찍는다.
async function revalidate(slug: string) {
  const secret = process.env.BLOG_REVALIDATE_SECRET;
  if (!secret) {
    console.warn("경고: BLOG_REVALIDATE_SECRET 이 없어 revalidate 를 건너뛴다");
    return;
  }
  const base = process.env.BLOG_REVALIDATE_URL ?? "https://blog.proofer.tech";
  try {
    const res = await fetch(`${base}/api/blog/revalidate`, {
      method: "POST",
      headers: { authorization: `Bearer ${secret}` },
      body: JSON.stringify({ slug }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    console.log(`revalidate 완료: ${slug}`);
  } catch (e) {
    console.warn(`경고: revalidate 실패, DB 는 이미 써졌다: ${e}`);
  }
}

async function runPublish(
  file: string,
  images?: string,
  flags: string[] = [],
): Promise<number> {
  const write = flags.includes("--write");
  if (write && flags.includes("--dry-run"))
    throw new Error("--write 와 --dry-run 은 같이 쓸 수 없다");
  const source = loadPmd(file, images);
  if (!process.env.POSTGRES_URL) {
    const errors = lint(source).filter((r) => r.severity === "error");
    console.log(`검증 오류 ${errors.length}건`);
    console.error("POSTGRES_URL 이 없어 DB 계획을 만들 수 없다");
    return errors.length ? 1 : 2;
  }
  const { drizzleBlogDb } = await import("./db");
  const plan = await publish(
    await drizzleBlogDb(),
    source,
    { write },
    realDeps(images),
  );
  if (plan.action === "invalid") {
    for (const r of plan.errors)
      console.log(`${file}:${r.line} ${r.ruleId} ${r.message} -> ${r.fix}`);
    console.log(`검증 오류 ${plan.errors.length}건: 아무것도 쓰지 않았다`);
    return 1;
  }
  const verb = {
    insert: "새로 넣는다",
    update: "갱신한다",
    unchanged: "바뀐 것이 없다",
  }[plan.action];
  console.log(
    `${write ? "[write]" : "[dry-run]"} ${plan.slug}: ${verb}${plan.revision ? " (이전 본문을 article_revision 에 남긴다)" : ""} 이미지 업로드 ${plan.uploads}건, 링크 카드 받기 ${plan.cards}건${write ? "" : " (dry-run 이라 하지 않았다)"}`,
  );
  if (write && plan.action !== "unchanged") await revalidate(plan.slug);
  return 0;
}

const COMMANDS: Record<
  string,
  (file: string, images?: string, flags?: string[]) => number | Promise<number>
> = {
  lint: runLint,
  publish: runPublish,
};

async function main(argv: string[]): Promise<number> {
  const args = [...argv];
  const take = (flag: string) => {
    const i = args.indexOf(flag);
    if (i < 0) return undefined;
    const v = args[i + 1];
    if (!v || v.startsWith("--")) throw new Error(`${flag} 에 값이 필요하다`);
    args.splice(i, 2);
    return v;
  };
  try {
    if (!args.length || args.includes("--help") || args.includes("-h")) {
      console.log(USAGE);
      return 0;
    }
    const images = take("--images");
    const [cmd, file, ...flags] = args;
    const run = COMMANDS[cmd];
    if (!run) {
      console.error(
        cmd === "preview"
          ? `${cmd} 는 아직 구현되지 않았다`
          : `알 수 없는 명령: ${cmd}\n\n${USAGE}`,
      );
      return 2;
    }
    if (!file || !existsSync(file)) {
      console.error(`글 파일이 없다: ${file ?? "(인자 없음)"}`);
      return 2;
    }
    return await run(file, images, flags);
  } catch (e) {
    console.error(e instanceof Error ? e.message : String(e));
    return 2;
  }
}

void main(process.argv.slice(2)).then((c) => {
  process.exitCode = c;
});
