// 세그먼트별 문면의 모양. 문면은 시안 편집본(2026-10-20)과 글자 단위로 맞춘다.
// 줄바꿈은 배열로 나눠 적는다. 키보드 기본 밖 특수문자(가운뎃점, 화살표, 둥근 따옴표, em dash)는 쓰지 않는다.

export interface Card {
  title: string;
  desc: string;
}

export interface Hero {
  eyebrow: string;
  headline: string[];
  lead: string;
  toolsNote: string;
}

export interface Problem {
  headline: string[];
  lead: string;
  items: Card[];
  closing: string;
  /** 시안 하단의 Signals / Where Time Leaks 목록 */
  signals?: { label: string; items: string[] };
}

export interface Approach {
  headline: string[];
  lead: string;
  cards: Card[];
  /** 카드 아래의 세 칸 (INPUT/RULES/OUTPUT, NUMBERS/MEANING/CHECK) */
  trio?: { label: string; title: string; text: string }[];
  quote: string;
}

export interface System {
  headline: string[];
  lead: string;
  eyebrow: string;
  steps: { href: string; title: string; subtitle: string; text: string }[];
  inside?: { label: string; items: { title: string; text: string }[] };
  handover: string;
  entry?: { label: string; title: string; text: string };
}

export interface CourseCard {
  level: string;
  duration: string;
  title: string;
  target: string;
  desc: string;
  outcome: string;
}

export interface Panel {
  label: string;
  title: string;
  meta: string;
  desc: string;
  outcome?: string;
}

/** 강의형 블록: 카드 격자, 패널(리더 세션 등), 운영 방식 */
export interface CourseBlock {
  kind: "course";
  id: string;
  alt?: boolean;
  eyebrow: string;
  tag: string;
  headline: string[];
  desc: string;
  cards?: CourseCard[];
  panels?: Panel[];
  ops?: {
    label: string;
    desc: string;
    items?: { label: string; title: string; text: string }[];
  };
}

/** 카드, 표, 진행 설명으로 이루어진 블록 (Founder Session, Build Sprint, 해커톤, 진단) */
export interface TableBlock {
  kind: "table";
  id: string;
  alt?: boolean;
  eyebrow: string;
  tag: string;
  headline: string[];
  lead: string;
  cards?: (Card & { label?: string })[];
  head: string[];
  rows: string[][];
  /** 표 아래 설명 */
  progress?: { label: string; text: string; callout?: string };
  /** 표 아래 작은 칸들 */
  facts?: { label: string; title: string; text: string }[];
  note?: string;
}

export interface ConsultingBlock {
  kind: "consulting";
  id: string;
  alt?: boolean;
  eyebrow: string;
  tag: string;
  headline: string[];
  lead: string;
  layers: { label: string; title: string; desc: string }[];
  servicesTitle: string;
  services: string[];
  engageTitle: string;
  engage: string;
  flow: string[];
  note: string;
}

export interface WorkspaceBlock {
  kind: "workspace";
  id: string;
  eyebrow: string;
  tag: string;
  headline: string[];
  lead: string;
  tools: string[];
  actorName: string;
  actorText: string;
  ontologyDesc: string;
  concepts: string[];
  steps: { title: string; text: string }[];
  exampleTitle: string;
  exampleText: string;
  closing: string;
}

export interface CaseBlock {
  kind: "case";
  id: string;
  alt?: boolean;
  eyebrow: string;
  headline: string[];
  lead: string;
  stats: { label: string; value: string; desc: string }[];
  process: { title: string; text: string }[];
  learned: { title: string; text: string };
  takeaway: { title: string; text: string };
  note: string;
}

export type Block =
  CourseBlock | TableBlock | ConsultingBlock | WorkspaceBlock | CaseBlock;

export interface Package {
  eyebrow: string;
  headline: string;
  cards: { title: string; lines: string[]; foot: string; included?: boolean }[];
  final: { title: string; lines: string[]; foot: string };
  note: string;
  aside?: {
    label: string;
    title?: string;
    items?: { title: string; text: string }[];
    text: string;
  };
}

export interface Outcome {
  headline: string[];
  items: string[];
  /** 마지막 항목을 강조한다 */
  strongLast?: boolean;
}

export interface Contact {
  headline: string[];
  desc: string;
}

export interface SegmentContent {
  hero: Hero;
  problem: Problem;
  approach: Approach;
  system: System;
  blocks: Block[];
  package: Package;
  outcome: Outcome;
  faq: { q: string; a: string }[];
  contact: Contact;
  /** 구조화 데이터(Course) 설명 */
  courses: { name: string; description: string }[];
}
