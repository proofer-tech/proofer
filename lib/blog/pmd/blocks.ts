/**
 * 렌더러(9a030b8a)와 검증기가 공유하는 허용 mdast 노드 목록.
 * 여기에 없는 노드 type 이 본문에 오면 그리지 않고 실패시킨다.
 * 블록 규칙(8cd19f5c)이 이 목록을 근거로 PMD001 등을 판정한다.
 */
export const ALLOWED_BLOCKS = [
  "root",
  "yaml", // frontmatter
  "heading", // depth 2, 3 만
  "paragraph",
  "blockquote",
  "list",
  "listItem",
  "code",
  "thematicBreak",
  "table",
  "tableRow",
  "tableCell",
  "text",
  "strong",
  "emphasis",
  "inlineCode",
  "link",
  "image",
  "break",
] as const;

export const ALLOWED_HEADING_DEPTHS = [2, 3] as const;
export const ALLOWED_LINK_PROTOCOLS = ["https:", "mailto:"] as const;
