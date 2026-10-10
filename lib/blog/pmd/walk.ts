import type { Nodes } from "mdast";

/** 트리를 깊이 우선으로 돈다. fn 의 두 번째 인자는 조상 목록(가까운 쪽이 끝)이다. */
export function walk(
  node: Nodes,
  fn: (n: Nodes, ancestors: Nodes[]) => void,
  ancestors: Nodes[] = [],
) {
  fn(node, ancestors);
  if ("children" in node) {
    for (const c of node.children as Nodes[]) walk(c, fn, [...ancestors, node]);
  }
}

export const nodes = (tree: Nodes) => {
  const out: { n: Nodes; anc: Nodes[] }[] = [];
  walk(tree, (n, anc) => out.push({ n, anc }));
  return out;
};

export const textOf = (n: Nodes): string =>
  "value" in n
    ? String(n.value)
    : "children" in n
      ? (n.children as Nodes[]).map(textOf).join("")
      : "";

export const lineOf = (n: Nodes) => n.position?.start.line ?? 1;
