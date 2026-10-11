import type { ReactNode } from "react";
import Image from "next/image";
import type { Root, RootContent, PhrasingContent, Table } from "mdast";
import { CARD, FOCUS_RING } from "@/app/subs/blog/ui";
import {
  ALLOWED_BLOCKS,
  ALLOWED_HEADING_DEPTHS,
  ALLOWED_LINK_PROTOCOLS,
  createParser,
} from "../pmd";

/** 발행 때 저장된 링크 카드 정보. 없으면 URL 만으로 그린다. */
export type LinkCardInfo = {
  title?: string;
  description?: string;
  image?: string;
};
/** 발행 때 저장된 이미지 크기, 키는 이미지 URL. */
export type ImageSize = { width: number; height: number };

export type PmdMeta = {
  linkCards?: Record<string, LinkCardInfo>;
  imageSizes?: Record<string, ImageSize>;
};

// 단순화: 크기를 모르는 이미지는 3:2 로 가정한다. 천장은 레이아웃이 어긋날 수 있다는 점이고,
// 발행 때 imageSizes 를 채우면 사라진다.
const FALLBACK_SIZE: ImageSize = { width: 1200, height: 800 };

const allowed = new Set<string>(ALLOWED_BLOCKS);
const YOUTUBE =
  /^https:\/\/(?:www\.)?(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtu\.be\/)([\w-]{11})/;

function fail(node: {
  type: string;
  position?: { start: { line: number } };
}): never {
  throw new Error(
    `PMD 렌더 실패: 허용하지 않는 노드 ${node.type} (줄 ${node.position?.start.line ?? "?"})`,
  );
}

function safeUrl(url: string, node: { type: string }) {
  const p = (() => {
    try {
      return new URL(url).protocol;
    } catch {
      return "";
    }
  })();
  if (!(ALLOWED_LINK_PROTOCOLS as readonly string[]).includes(p)) {
    throw new Error(`PMD 렌더 실패: 허용하지 않는 URL ${url} (${node.type})`);
  }
  return url;
}

const text = (n: PhrasingContent) => (n.type === "text" ? n.value : "");

/** 문단이 URL 하나뿐이면 그 URL, 아니면 undefined. */
function loneUrl(p: RootContent): string | undefined {
  if (p.type !== "paragraph" || p.children.length !== 1) return;
  const c = p.children[0];
  if (c.type !== "link" || c.children.length !== 1) return;
  return text(c.children[0]) === c.url ? c.url : undefined;
}

/** 이미지(와 사이 공백)만 있는 문단이면 이미지 목록. */
function onlyImages(p: RootContent) {
  if (p.type !== "paragraph") return;
  const imgs = p.children.filter((c) => c.type === "image");
  const rest = p.children.every(
    (c) =>
      c.type === "image" ||
      (c.type === "text" && !c.value.trim()) ||
      c.type === "break",
  );
  return imgs.length && rest ? imgs : undefined;
}

function Img({
  node,
  meta,
  sizes,
}: {
  node: Extract<PhrasingContent, { type: "image" }>;
  meta: PmdMeta;
  sizes?: string;
}) {
  const s = meta.imageSizes?.[node.url] ?? FALLBACK_SIZE;
  return (
    <Image
      src={safeUrl(node.url, node)}
      alt={node.alt ?? ""}
      width={s.width}
      height={s.height}
      sizes={sizes}
      className="h-auto w-full rounded-proofer-sm"
    />
  );
}

function Inline({ nodes, meta }: { nodes: PhrasingContent[]; meta: PmdMeta }) {
  return (
    <>
      {nodes.map((n, i) => {
        const k = i;
        const kids =
          "children" in n ? (
            <Inline nodes={n.children as PhrasingContent[]} meta={meta} />
          ) : null;
        switch (n.type) {
          case "text":
            return n.value;
          case "strong":
            return (
              <strong key={k} className="font-bold">
                {kids}
              </strong>
            );
          case "emphasis":
            return (
              <em key={k} className="italic">
                {kids}
              </em>
            );
          case "inlineCode":
            return (
              <code
                key={k}
                className="rounded-proofer-xs border border-proofer-line bg-proofer-bg-alt px-1.5 py-0.5 font-mono text-[0.86em] text-proofer-ink"
              >
                {n.value}
              </code>
            );
          case "break":
            return <br key={k} />;
          case "link":
            return (
              <a
                key={k}
                href={safeUrl(n.url, n)}
                className={`text-proofer-blue underline underline-offset-4 hover:text-proofer-blue-deep ${FOCUS_RING}`}
                rel="noopener noreferrer"
              >
                {kids}
              </a>
            );
          case "image":
            return <Img key={k} node={n} meta={meta} />;
          default:
            return fail(n);
        }
      })}
    </>
  );
}

function LinkCard({ url, info }: { url: string; info?: LinkCardInfo }) {
  return (
    <a
      href={safeUrl(url, { type: "linkCard" })}
      rel="noopener noreferrer"
      className={`${CARD} ${FOCUS_RING} my-8 flex overflow-hidden no-underline`}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-1 p-5">
        {info?.title && (
          <span className="line-clamp-2 text-[16px] font-bold text-proofer-ink">
            {info.title}
          </span>
        )}
        {info?.description && (
          <span className="line-clamp-2 text-[14.5px] text-proofer-gray">
            {info.description}
          </span>
        )}
        <span className="truncate text-[13px] text-proofer-gray">{url}</span>
      </span>
      {info?.image && (
        <Image
          src={safeUrl(info.image, { type: "linkCard" })}
          alt=""
          width={160}
          height={160}
          className="h-auto w-[132px] shrink-0 bg-proofer-bg-alt object-cover md:w-40"
        />
      )}
    </a>
  );
}

function Block({
  node,
  meta,
}: {
  node: RootContent;
  meta: PmdMeta;
}): ReactNode {
  if (!allowed.has(node.type)) fail(node);
  const inline = (n: { children: unknown }) => (
    <Inline nodes={n.children as PhrasingContent[]} meta={meta} />
  );
  switch (node.type) {
    case "yaml":
      return null;
    case "heading": {
      if (!(ALLOWED_HEADING_DEPTHS as readonly number[]).includes(node.depth))
        fail(node);
      return node.depth === 2 ? (
        <h2 className="mb-4 mt-14 text-[23px] font-bold leading-[1.3] tracking-[-0.02em]">
          {inline(node)}
        </h2>
      ) : (
        <h3 className="mb-3 mt-10 text-[21px] font-bold leading-[1.35] tracking-[-0.02em]">
          {inline(node)}
        </h3>
      );
    }
    case "paragraph": {
      const url = loneUrl(node);
      if (url) {
        const yt = YOUTUBE.exec(url);
        if (yt) {
          return (
            <div className="my-8 aspect-video w-full overflow-hidden rounded-proofer-sm">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${yt[1]}`}
                title="YouTube video"
                allowFullScreen
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          );
        }
        return <LinkCard url={url} info={meta.linkCards?.[url]} />;
      }
      const imgs = onlyImages(node);
      if (imgs && imgs.length > 1) {
        return (
          <div
            className={`my-8 grid gap-2 ${imgs.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
          >
            {imgs.map((im, i) => (
              <Img
                key={i}
                node={im}
                meta={meta}
                sizes="(min-width: 768px) 25vw, 33vw"
              />
            ))}
          </div>
        );
      }
      if (imgs) {
        const im = imgs[0];
        return (
          <figure className="my-8">
            <Img
              node={im}
              meta={meta}
              sizes="(min-width: 768px) 680px, 100vw"
            />
            {im.title && (
              <figcaption className="mt-3 text-center text-[14.5px] leading-[1.55] text-proofer-gray">
                {im.title}
              </figcaption>
            )}
          </figure>
        );
      }
      return <p className="my-6">{inline(node)}</p>;
    }
    case "blockquote":
      return (
        <blockquote className="my-8 border-l-4 border-proofer-blue pl-5 text-proofer-gray [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {node.children.map((c, i) => (
            <Block key={i} node={c} meta={meta} />
          ))}
        </blockquote>
      );
    case "list": {
      const L = node.ordered ? "ol" : "ul";
      return (
        <L
          className={`my-6 pl-6 marker:text-proofer-gray ${node.ordered ? "list-decimal" : "list-disc"}`}
        >
          {node.children.map((li, i) => (
            <li key={i} className="my-1.5">
              {li.children.map((c, j) =>
                c.type === "paragraph" ? (
                  <Inline key={j} nodes={c.children} meta={meta} />
                ) : (
                  <Block key={j} node={c} meta={meta} />
                ),
              )}
            </li>
          ))}
        </L>
      );
    }
    case "code":
      return (
        <pre
          tabIndex={0}
          className={`my-8 overflow-x-auto rounded-proofer-sm border border-proofer-line bg-proofer-bg-alt p-5 font-mono text-[14.5px] leading-[1.6] text-proofer-ink ${FOCUS_RING}`}
        >
          <code className="font-mono" data-lang={node.lang ?? undefined}>
            {node.value}
          </code>
        </pre>
      );
    case "thematicBreak":
      return (
        <div
          role="separator"
          className="my-14 text-center text-2xl tracking-[0.5em] text-proofer-gray"
        >
          &middot;&middot;&middot;
        </div>
      );
    case "table":
      return <TableBlock node={node} meta={meta} />;
    default:
      return fail(node);
  }
}

function TableBlock({ node, meta }: { node: Table; meta: PmdMeta }) {
  const [head, ...rows] = node.children;
  const row = (r: Table["children"][number], Cell: "th" | "td") => (
    <tr className="[&:last-child>td]:border-b-0">
      {r.children.map((c, i) => (
        <Cell
          key={i}
          className={`border-b border-proofer-line px-4 py-2.5 text-left align-top ${Cell === "th" ? "bg-proofer-bg-alt font-bold text-proofer-ink" : ""}`}
        >
          <Inline nodes={c.children as PhrasingContent[]} meta={meta} />
        </Cell>
      ))}
    </tr>
  );
  return (
    <div
      tabIndex={0}
      className={`my-8 overflow-x-auto rounded-proofer-sm border border-proofer-line ${FOCUS_RING}`}
    >
      <table className="w-full border-collapse text-[14.5px] leading-[1.55]">
        <thead>{row(head, "th")}</thead>
        <tbody>
          {rows.map((r, i) => (
            <FragmentRow key={i}>{row(r, "td")}</FragmentRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const FragmentRow = ({ children }: { children: ReactNode }) => <>{children}</>;

/** 이미 파싱한 트리를 그린다. 허용 밖 노드가 있으면 예외를 던진다. */
export function PmdTree({ tree, meta = {} }: { tree: Root; meta?: PmdMeta }) {
  return (
    <div className="font-proofer break-keep text-[18px] font-normal leading-[1.72] text-proofer-ink [&>*:first-child]:mt-0">
      {tree.children.map((n, i) => (
        <Block key={i} node={n} meta={meta} />
      ))}
    </div>
  );
}

/** PMD 원문을 검증기와 같은 파서로 읽어 그린다. */
export function PmdBody({ source, meta }: { source: string; meta?: PmdMeta }) {
  return <PmdTree tree={createParser().parse(source) as Root} meta={meta} />;
}
