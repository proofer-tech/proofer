// 세그먼트 3판의 라우팅, 메타, PDF 주소. 클라이언트(Header)도 가져다 쓰므로 문면(views/)은 넣지 않는다.
// 판본이 바뀌면 PDF_VERSION 을 올린다. 네 링크가 같은 회차의 쿼리를 쓴다 (docs/ax-landing-spec.md 3.6절).

export type SegmentKey = "startup" | "growth" | "enterprise";

const BLOB =
  "https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/assets/ax";
export const PDF_VERSION = "20261025";

const pdf = (file: string) => `${BLOB}/${file}?download=1&v=${PDF_VERSION}`;

export interface SegmentMeta {
  key: SegmentKey;
  /** 사이트 경로. enterprise 는 `/` 와 `/enterprise` 가 같은 내용이다 */
  path: string;
  label: string;
  title: string;
  description: string;
  keywords: string[];
  pdf: string;
  nav: { href: string; label: string }[];
}

const COMMON_KEYWORDS = [
  "기업 AI 교육",
  "AX 교육",
  "AX 컨설팅",
  "AI Native 업무환경",
  "생성형 AI 기업 교육",
  "AI 교육 커리큘럼",
  "Claude 기업 교육",
];

export const SEGMENTS: Record<SegmentKey, SegmentMeta> = {
  startup: {
    key: "startup",
    path: "/startup",
    label: "스타트업",
    title: "스타트업 AI 교육, 대표와 팀의 AI Native 업무환경",
    description:
      "대표 1:1 세션, 팀 워크숍, 하루 빌드 스프린트로 우리 회사 자료를 읽는 AI 업무환경을 만듭니다. 5명에서 50명 팀이 2주 안에 시작합니다.",
    keywords: [
      ...COMMON_KEYWORDS,
      "스타트업 AI 교육",
      "대표 AI 교육",
      "팀 AI 워크숍",
    ],
    pdf: pdf("proofer-ax-startup.pdf"),
    nav: [
      { href: "#view", label: "관점" },
      { href: "#flow", label: "커리큘럼" },
      { href: "#founder", label: "Founder" },
      { href: "#workshop", label: "Workshop" },
      { href: "#sprint", label: "Sprint" },
      { href: "#case", label: "사례" },
      { href: "#package", label: "구성" },
    ],
  },
  growth: {
    key: "growth",
    path: "/growth",
    label: "중소-중견",
    title: "중소-중견기업 AI 교육, 더 큰 회사를 향한 AI Native 전환",
    description:
      "50명에서 300명 규모 회사의 엑셀과 메신저 사이 수작업을 AI로 줄이고, 팀장이 스스로 판단하는 구조를 교육, 진단, 업무환경 구축으로 만듭니다.",
    keywords: [
      ...COMMON_KEYWORDS,
      "중소기업 AI 교육",
      "중견기업 AI 교육",
      "팀장 AI 교육",
    ],
    pdf: pdf("proofer-ax-growth.pdf"),
    nav: [
      { href: "#view", label: "관점" },
      { href: "#flow", label: "커리큘럼" },
      { href: "#lecture", label: "Lecture" },
      { href: "#hackathon", label: "Hackathon" },
      { href: "#consulting", label: "진단" },
      { href: "#case", label: "사례" },
      { href: "#package", label: "패키지" },
    ],
  },
  enterprise: {
    key: "enterprise",
    path: "/enterprise",
    label: "엔터프라이즈",
    title: "기업 AI 교육, AX 해커톤, AX 컨설팅",
    description:
      "임직원 AI 교육을 강의로 끝내지 않습니다. 직무별 사내 AI 교육으로 쓸 줄 알게 만들고, 사내 AI 해커톤으로 성과를 내고, AX 컨설팅과 AI Native 업무환경 구축으로 조직이 스스로 굴러가게 합니다.",
    keywords: [
      ...COMMON_KEYWORDS,
      "임직원 AI 교육",
      "사내 AI 교육",
      "기업 AI 교육 업체",
      "직무별 AI 교육",
      "사내 AI 해커톤",
      "AI 해커톤 운영",
      "AI 전환 컨설팅",
      "HRD AI 교육",
      "임원 AI 교육",
    ],
    // 기존 링크를 살리려고 경로를 바꾸지 않고 새 판으로 교체했다
    pdf: pdf("proofer-ax.pdf"),
    nav: [
      { href: "#view", label: "관점" },
      { href: "#curriculum", label: "커리큘럼" },
      { href: "#lecture", label: "Lecture" },
      { href: "#hackathon", label: "Hackathon" },
      { href: "#consulting", label: "Consulting" },
      { href: "#package", label: "패키지" },
    ],
  },
};

/** 공개 교육(기관 과정판). 세그먼트 3판과 별개의 상위 구분이라 SEGMENTS 에 넣지 않는다. PDF 는 판본 쿼리를 따로 쓴다 */
export const OPEN = {
  path: "/open",
  title: "기관 위탁 AI 교육, 대학 사업단과 지자체를 위한 공개 AI 교육",
  description:
    "대학 사업단, 창업지원기관, 지자체와 공공기관이 여는 AI 교육을 맡습니다. 수강생이 자기 자료로 실습하고 자기 결과물을 들고 가며, 기획부터 모집, 운영, 결과보고까지 함께 맡을 수 있습니다.",
  keywords: [
    "공개 AI 교육",
    "기관 위탁 AI 교육",
    "대학 사업단 AI 교육",
    "창업지원기관 AI 교육",
    "지자체 AI 교육",
    "AI 리터러시 교육",
    "AI 교육 운영 대행",
    "AX 교육",
  ],
  pdf: `${BLOB}/proofer-ax-open.pdf?download=1&v=${PDF_VERSION}`,
  nav: [
    { href: "#formats", label: "과정 형식" },
    { href: "#audience", label: "대상별" },
    { href: "#case", label: "사례" },
    { href: "#record", label: "실적과 운영진" },
    { href: "#operation", label: "운영 범위" },
    { href: "#kpi", label: "성과 관리" },
    { href: "#package", label: "견적" },
    { href: "#faq", label: "FAQ" },
  ],
};

export const SEGMENT_ORDER: SegmentKey[] = ["startup", "growth", "enterprise"];

/** 브라우저 경로에서 판을 고른다. `/` 와 알 수 없는 경로는 enterprise */
export function segmentFromPath(pathname: string): SegmentKey {
  if (pathname.includes("/startup")) return "startup";
  if (pathname.includes("/growth")) return "growth";
  return "enterprise";
}

/** 공개 교육 경로인지 본다. 로컬은 `/subs/ax/open` 이라 포함 여부로 맞춘다 */
export function isOpenPath(pathname: string): boolean {
  return pathname.includes(OPEN.path);
}
