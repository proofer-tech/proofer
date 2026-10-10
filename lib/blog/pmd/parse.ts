import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkCjkFriendly from "remark-cjk-friendly";
import { parse as parseYaml } from "yaml";
import type { Root } from "mdast";
import type { ParsedPmd } from "./types";

/** 렌더러도 같은 파서를 쓰도록 생성 함수를 따로 내보낸다. */
export function createParser() {
  return unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkGfm)
    .use(remarkCjkFriendly);
}

export function parse(source: string): ParsedPmd {
  const tree = createParser().parse(source) as Root;
  const node = tree.children[0]?.type === "yaml" ? tree.children[0] : undefined;
  const doc: ParsedPmd = {
    frontmatter: undefined,
    frontmatterLine: node ? node.position!.start.line + 1 : 1,
    tree,
    source,
  };
  if (node) {
    try {
      doc.frontmatter = parseYaml(node.value) ?? {};
    } catch (e) {
      doc.frontmatterError =
        e instanceof Error ? e.message.split("\n")[0] : String(e);
    }
  }
  return doc;
}
