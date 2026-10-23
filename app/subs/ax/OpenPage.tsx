import React from "react";
import Image from "next/image";
import Link from "next/link";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import Arrow from "@/app/subs/ax/components/Arrow";
import Enter from "@/app/subs/ax/components/Enter";
import { OPEN } from "@/app/subs/ax/segments";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import styles from "./OpenPage.module.scss";

// 공개 교육(기관 과정판) 한 장짜리 페이지. 문면은 시안 편집본 AX커리큘럼_기관과정판_20261022.md 와 글자 단위로 맞춘다.
// ponytail: 문면과 구성이 이 페이지 하나에만 쓰여서 content/ 로 나누지 않고 한 파일에 둔다.
// 공개 교육 페이지가 둘 이상(개인 신청형 세미나 등)이 되면 문면을 content/ 로 빼고 섹션을 나눈다.
// 키보드 기본 밖 특수문자(가운뎃점, 화살표 글리프, 둥근 따옴표, em dash)는 쓰지 않는다. 화살표는 SVG 다.

type Tone = "b" | "g" | "y";

const ICONS: Record<string, React.ReactNode> = {
  doc: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h6M10 17h4" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c1-3.5 3.5-5.5 6.5-5.5s5.5 2 6.5 5.5" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
      <path d="M18 14.5c1.8.7 3 2.6 3.5 5.5" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1" />
      <path d="M9 11h6M9 15h4" />
    </>
  ),
  folder: (
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  ),
  pen: (
    <>
      <path d="M4 20h4L19 9l-4-4L4 16z" />
      <path d="M13.5 6.5l4 4" />
    </>
  ),
  box: (
    <>
      <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
      <path d="M3 7l9 4 9-4M12 11v10" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19V5" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" />
    </>
  ),
  brief: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5h6v2" />
      <path d="M3 12h18" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c2 2 10 2 12 0v-5" />
    </>
  ),
  shop: (
    <>
      <path d="M3 9l2-5h14l2 5" />
      <path d="M4 9v11h16V9" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8v8l6-4z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  check: <path d="M5 12l5 5 9-10" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-2 4-4 2 2-4z" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 10v4h4l8 5V5L7 10z" />
      <path d="M18 9a4 4 0 0 1 0 6" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </>
  ),
};

function Icon({
  name,
  tone,
  size = 22,
}: {
  name: string;
  tone: Tone;
  size?: number;
}) {
  return (
    <span className={`${styles.ico} ${styles[`ico_${tone}`]}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {ICONS[name]}
      </svg>
    </span>
  );
}

function Step() {
  return (
    <span className={styles.arrow}>
      <Arrow size={18} />
    </span>
  );
}

/** 쪽 상단의 `NN / 제목` 줄, 키커, 제목, 도입 문단 */
function Head({
  run,
  tag,
  kick,
  title,
  lead,
}: {
  run: string;
  tag: string;
  kick: string;
  title: string[];
  lead?: string;
}) {
  return (
    <div className={styles.head}>
      <div className={styles.run}>
        <span>{run}</span>
        <span>{tag}</span>
      </div>
      <div className={styles.kick}>{kick}</div>
      <h2 className={styles.h2}>
        {title.map((line, i) => (
          <React.Fragment key={line}>
            {i > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}

function Photo({
  src,
  alt,
  ratio,
  sizes = "(max-width: 1100px) 100vw, 1000px",
  priority,
}: {
  src: string;
  alt: string;
  ratio: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={styles.photo} style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </div>
  );
}

const PHOTO = "/assets/images/ax/open";

const PROBLEM_FLOWS: { label: string; on: boolean; boxes: string[][] }[] = [
  {
    label: "강사 예제로 따라 하는 과정",
    on: false,
    boxes: [
      ["강사 예제 파일", "모두 같은 파일로 따라 합니다"],
      ["수료", "출석과 만족도가 기록됩니다"],
      ["다음 주", "자기 일에 옮기지 못하고 멈춥니다"],
    ],
  },
  {
    label: "자기 자료로 실습하는 과정",
    on: true,
    boxes: [
      ["내 자료 연결", "사업계획서, 직무 문서, 과제"],
      ["내 결과물", "그날 완성해 들고 갑니다"],
      ["다음 주", "같은 방법으로 이어 씁니다"],
    ],
  },
];

const PROBLEM_CARDS: {
  icon: string;
  tone: Tone;
  title: string;
  text: string;
}[] = [
  {
    icon: "doc",
    tone: "y",
    title: "남의 예제로 하는 실습",
    text: "강사가 준비한 예제 파일로 따라 합니다. 자기 일에 옮기는 단계에서 막히고, 교육은 거기서 끝납니다.",
  },
  {
    icon: "people",
    tone: "y",
    title: "한 반에 섞인 수준",
    text: "처음 쓰는 사람과 매일 쓰는 사람이 같은 반에 앉습니다. 진도를 어디에 맞춰도 절반은 놓칩니다.",
  },
  {
    icon: "clipboard",
    tone: "b",
    title: "보여줄 성과가 없음",
    text: "출석과 만족도 외에 수강생이 무엇을 만들었는지 보여줄 자료가 없습니다. 다음 해 사업 계획에 쓸 근거가 약합니다.",
  },
];

const SIGNALS = [
  "수료 설문에서는 유익했다는 응답이 많은데, 지금도 쓰고 있는지 물으면 답이 흐려진다",
  "같은 과정을 해마다 다시 열지만 회차마다 내용이 거의 같다",
  "모집 공고를 내면 이름만 다른 AI 교육이 같은 지역에 여럿 겹친다",
];

const VIEW_TRIO: {
  icon: string;
  tone: Tone;
  tag: string;
  title: string;
  text: string;
}[] = [
  {
    icon: "folder",
    tone: "b",
    tag: "Input",
    title: "수강생의 자료",
    text: "사업계획서, 직무 문서와 업무 양식, 수업 과제와 활동 기록",
  },
  {
    icon: "pen",
    tone: "y",
    tag: "Rules",
    title: "문서에 없는 기준",
    text: "최신 수치, 쓰는 용어와 버린 용어, 표현 기준, AI에 넣지 않을 자료",
  },
  {
    icon: "doc",
    tone: "g",
    tag: "Output",
    title: "들고 가는 결과물",
    text: "소개 페이지, 업무 자동화, 포트폴리오, 기획서와 시제품 화면",
  },
];

const VIEW_CARDS: { icon: string; tone: Tone; title: string; text: string }[] =
  [
    {
      icon: "book",
      tone: "b",
      title: "학습시키지 않고 읽게 합니다",
      text: "자료를 AI에 학습시키지 않습니다. 필요한 문서를 그때그때 읽게 합니다. 이 구분을 먼저 잡아야 뒤의 실습이 어긋나지 않습니다.",
    },
    {
      icon: "chat",
      tone: "g",
      title: "막히는 사람 옆에 보조강사",
      text: "환경 설정, 권한, 폴더 연결처럼 사람마다 다른 곳에서 막힙니다. 보조강사가 반을 나눠 맡아 옆에서 화면을 보고 풉니다.",
    },
    {
      icon: "box",
      tone: "y",
      title: "자료가 없으면 예시 자료부터",
      text: "자기 자료가 부족한 수강생은 프루퍼 주식회사가 준비한 예시 자료로 먼저 실습하고, 같은 방법을 자기 자료에 옮깁니다.",
    },
  ];

const FORMATS: {
  id: string;
  name: string;
  time: string;
  who: string;
  text: string;
  out: string;
  tone: Tone | "n";
}[] = [
  {
    id: "F1",
    name: "AI Talk",
    time: "1 ~ 2시간",
    who: "특강, 대상 무관",
    text: "AI로 일하는 방식을 실제 운영 화면으로 보여주고, 무엇이 되고 안 되는지와 자료를 다루는 기준을 짚습니다. 실습 과정 앞에 붙이거나 단독으로 엽니다.",
    out: "AI 사용 기준과 다음 실습 안내",
    tone: "n",
  },
  {
    id: "F2",
    name: "Hands-on Lab",
    time: "반일, 3 ~ 4시간",
    who: "개인 실습",
    text: "자기 자료를 AI에 연결하고 기준을 적은 뒤 결과물을 완성합니다. 대학 앵커사업단 창업실무 과정이 이 형식으로 진행됐습니다.",
    out: "개인 AI 업무환경과 결과물",
    tone: "b",
  },
  {
    id: "F3",
    name: "Project Course",
    time: "2 ~ 4회차",
    who: "개인 또는 팀",
    text: "회차마다 과제를 넓혀 업무나 프로젝트에 쓰는 결과물로 키웁니다. 회차 사이에 과제와 피드백이 들어갑니다.",
    out: "실사용 결과물과 발표",
    tone: "g",
  },
  {
    id: "F4",
    name: "AI Hackathon",
    time: "1 ~ 2일",
    who: "팀",
    text: "팀이 고른 문제를 실제 데이터로 돌아가는 결과물로 만들고 시연합니다. 운영은 기업 AI 심화 해커톤을 코치한 방식을 따릅니다.",
    out: "돌아가는 프로토타입과 시연",
    tone: "n",
  },
];

const AUDIENCE: {
  icon: string;
  tone: Tone;
  who: string;
  material: string;
  output: string;
  format: string;
}[] = [
  {
    icon: "bulb",
    tone: "y",
    who: "예비창업자, 초기창업기업 대표",
    material: "사업계획서, 회사소개서, IR 자료",
    output: "자사 소개 페이지, 지원사업 서류 초안",
    format: "Hands-on Lab",
  },
  {
    icon: "brief",
    tone: "b",
    who: "지역 재직자",
    material: "직무 문서, 업무 양식, 더미로 바꾼 업무 데이터",
    output: "직무 반복 업무를 줄이는 워크플로",
    format: "Project Course",
  },
  {
    icon: "cap",
    tone: "g",
    who: "대학생",
    material: "수업 과제, 활동 기록, 이력",
    output: "포트폴리오 페이지, 팀 프로젝트 결과물",
    format: "Project Course, AI Hackathon",
  },
  {
    icon: "book",
    tone: "y",
    who: "고등학생, 직업계고",
    material: "팀 프로젝트 자료, 전공 실습 기록",
    output: "팀 기획서와 시제품 화면",
    format: "AI Talk, Hands-on Lab",
  },
  {
    icon: "shop",
    tone: "y",
    who: "일반 시민, 소상공인",
    material: "가게나 활동 소개 자료, 반복하는 문서",
    output: "소개 페이지, 반복 문서 자동화",
    format: "Hands-on Lab",
  },
];

const LAB_STEPS: { title: string; text: string; pill: string }[] = [
  {
    title: "시연",
    text: "예시 자료로 결과물과 근거 문서가 나오는 과정을 봅니다",
    pill: "완성된 모습",
  },
  {
    title: "개념",
    text: "학습과 읽기의 차이, 폴더 구조가 단서가 되는 이유",
    pill: "실습 기준",
  },
  {
    title: "자료 연결",
    text: "각자의 자료 폴더를 AI에 연결합니다",
    pill: "개인 AI 업무환경",
  },
  {
    title: "기준 입력",
    text: "문서에 없는 정보와 표현 기준을 적습니다",
    pill: "기준 문서",
  },
  {
    title: "적용 실습",
    text: "연결한 자료와 기준으로 결과물을 만듭니다",
    pill: "자기 결과물",
  },
  {
    title: "공유",
    text: "결과물을 서로 보고 피드백을 나눕니다",
    pill: "다음 할 일",
  },
];

const LAB_FACTS: {
  icon: string;
  tone: Tone;
  tag: string;
  title: string;
  text: string;
}[] = [
  {
    icon: "people",
    tone: "b",
    tag: "대상",
    title: "누구나, 반당 20 ~ 30명",
    text: "인원이 많으면 보조강사를 늘려 반을 나눠 맡습니다.",
  },
  {
    icon: "play",
    tone: "y",
    tag: "형식",
    title: "대면, 3 ~ 4시간",
    text: "수강생은 자기 노트북과 자료를 가져옵니다. 준비물은 사전 안내문으로 알립니다.",
  },
  {
    icon: "box",
    tone: "g",
    tag: "배포 자료",
    title: "설치 패키지",
    text: "교육 뒤에도 업무환경을 처음부터 다시 꾸릴 수 있는 설치 패키지와 요청문을 드립니다.",
  },
];

const LAB_RESULTS: { icon: string; tone: Tone; who: string; what: string }[] = [
  { icon: "bulb", tone: "y", who: "창업팀", what: "자사 소개 페이지" },
  { icon: "brief", tone: "b", who: "재직자", what: "직무 문서 초안" },
  { icon: "cap", tone: "g", who: "학생", what: "포트폴리오 페이지" },
];

const ROUNDS: {
  n: string;
  title: string;
  text: string;
  h: number;
  bg: string;
  fg: string;
}[] = [
  {
    n: "1회차",
    title: "개인 AI 업무환경, 과제 정의",
    text: "기본기와 자료 연결, 회차 동안 다룰 과제 고르기",
    h: 90,
    bg: "#D7DDFB",
    fg: "#0F1424",
  },
  {
    n: "2회차",
    title: "첫 결과물",
    text: "과제를 실제 자료로 처음 돌려 보고 막힌 곳 정리",
    h: 130,
    bg: "#AFBBF5",
    fg: "#0F1424",
  },
  {
    n: "3회차",
    title: "실사용 결과물",
    text: "피드백 반영, 다른 사람도 쓸 수 있게 다듬기",
    h: 170,
    bg: "#7F92EE",
    fg: "#0F1424",
  },
  {
    n: "4회차",
    title: "발표와 결과 기록",
    text: "시연과 회고, 교육 뒤에 이어 갈 과제 정리",
    h: 210,
    bg: "#344FE0",
    fg: "#FFFFFF",
  },
];

const HACKATHON: { icon: string; tone: Tone; title: string; text: string }[] = [
  {
    icon: "target",
    tone: "y",
    title: "문제는 팀이 고릅니다",
    text: "팀원이 실제로 겪는 문제 가운데 기간 안에 끝낼 크기를 골라 과제로 정합니다.",
  },
  {
    icon: "check",
    tone: "g",
    title: "기준은 돌아가는지",
    text: "실제 데이터로 돌아가는지, 다른 사람도 쓸 수 있는지, 얼마나 시간을 줄였는지를 봅니다.",
  },
  {
    icon: "chat",
    tone: "b",
    title: "코치가 같이 만듭니다",
    text: "팀마다 코치가 붙어 막히는 지점의 구현을 함께 풉니다. 시연용으로 만들고 버리지 않습니다.",
  },
];

const OPERATION: {
  icon: string;
  tone: Tone;
  title: string;
  items: string[];
}[] = [
  {
    icon: "compass",
    tone: "b",
    title: "기획",
    items: [
      "사업 목적에 맞춘 커리큘럼",
      "대상별 트랙과 분반 설계",
      "대상에 맞춘 예시 자료",
    ],
  },
  {
    icon: "megaphone",
    tone: "y",
    title: "모집",
    items: [
      "모집 안내문과 리플렛",
      "신청 사전 설문",
      "참가자 오픈채팅방 운영",
      "준비물 사전 안내",
    ],
  },
  {
    icon: "gear",
    tone: "g",
    title: "운영",
    items: [
      "주강사와 보조강사 배치",
      "실습용 AI 도구 계정 지원과 회수",
      "실습 환경 점검",
      "출결 관리",
    ],
  },
  {
    icon: "clipboard",
    tone: "b",
    title: "결과보고",
    items: ["만족도 조사", "수강생 결과물 수록", "기관 양식에 맞춘 결과보고서"],
  },
];

const OPERATION_CARDS: {
  icon: string;
  tone: Tone;
  title: string;
  text: string;
}[] = [
  {
    icon: "people",
    tone: "b",
    title: "기관 강사와 함께 운영",
    text: "기관이 가진 강사풀과 프루퍼 주식회사 인력을 함께 배치할 수 있습니다. 강사 사전 브리핑과 현장 운영 카드는 프루퍼 주식회사가 준비합니다.",
  },
  {
    icon: "doc",
    tone: "g",
    title: "공공 계약 준비",
    text: "나라장터 경쟁입찰참가자격 등록, 소프트웨어사업자 신고, 벤처기업 확인을 마쳤습니다. 견적서 승인부터 조달 입찰까지 기관의 계약 방식에 맞춥니다.",
  },
];

const CASE_PROCESS: { title: string; text: string; green: boolean }[] = [
  {
    title: "시연",
    text: "가상 창업팀 자료로 완성형을 먼저 봅니다",
    green: false,
  },
  {
    title: "자료 연결",
    text: "각자의 사업자료 폴더를 AI에 연결합니다",
    green: false,
  },
  {
    title: "기준 입력",
    text: "문서에 없는 사업 정보와 브랜드 기준을 적습니다",
    green: false,
  },
  {
    title: "페이지 제작",
    text: "연결한 자료로 자사 소개 페이지를 만듭니다",
    green: true,
  },
  { title: "공유", text: "결과물을 서로 보고 피드백을 나눕니다", green: true },
];

// 쌓는 순서는 아래에서 위로: AI Talk, Hands-on Lab, Project 또는 Hackathon, 기획 일괄
const LAYERS = {
  talk: { label: "AI Talk", bg: "#C9CFEF", fg: "#0F1424" },
  lab: { label: "Hands-on Lab", bg: "#344FE0", fg: "#FFFFFF" },
  project: { label: "Project 또는 Hackathon", bg: "#45AF66", fg: "#FFFFFF" },
  plan: { label: "기획, 모집, 운영, 결과보고", bg: "#1E2A66", fg: "#FFFFFF" },
};

const PACKAGES: {
  title: string;
  text: string;
  stack: (keyof typeof LAYERS)[];
}[] = [
  { title: "특강", text: "수강생이 방향을 잡습니다", stack: ["talk"] },
  {
    title: "실습 과정",
    text: "각자 결과물을 만듭니다",
    stack: ["lab", "talk"],
  },
  {
    title: "프로젝트 과정",
    text: "결과물을 실제로 씁니다",
    stack: ["project", "lab", "talk"],
  },
  {
    title: "운영 일괄",
    text: "사업 전체를 맡깁니다",
    stack: ["plan", "project", "lab", "talk"],
  },
];

const START: { title: string; text: string }[] = [
  {
    title: "협의",
    text: "사업 목적, 대상, 예산, 일정을 듣고 형식과 운영 범위를 정합니다.",
  },
  {
    title: "제안과 견적",
    text: "과정 구성과 견적, 비교견적까지 기관 서식에 맞춰 드립니다.",
  },
  {
    title: "교안 리뷰",
    text: "교육 전에 교안을 보내 기관 담당자가 내용을 검토합니다.",
  },
];

const AFTER: { icon: string; tone: Tone; text: string; link?: boolean }[] = [
  {
    icon: "doc",
    tone: "g",
    text: "수강생마다 자기 자료로 만든 결과물을 갖고 돌아갑니다.",
  },
  {
    icon: "box",
    tone: "b",
    text: "수강생은 설치 패키지로 교육 뒤에도 같은 업무환경을 다시 꾸릴 수 있습니다.",
  },
  {
    icon: "clipboard",
    tone: "y",
    text: "기관은 수강생 결과물을 수록한 결과보고서로 성과를 보여줍니다.",
  },
  {
    icon: "brief",
    tone: "y",
    text: "창업하거나 팀 단위 도입이 필요해진 수강생은 기업 교육 과정으로 이어 갑니다.",
    link: true,
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "수강생 수준이 제각각입니다.",
    a: "신청 단계의 사전 설문으로 AI 사용 경험과 가져올 자료를 확인합니다. 그 결과로 반을 나누거나, 같은 반 안에서 결과물의 크기를 사람마다 달리 잡습니다. 실습 중에는 보조강사가 막힌 수강생 옆에서 화면을 보고 풉니다.",
  },
  {
    q: "AI 도구 계정은 누가 준비합니까.",
    a: "수강생이 가진 계정으로도 진행합니다. 실습에 유료 기능이 필요하면 교육 기간 동안 쓸 계정을 프루퍼 주식회사가 지원하고 교육 뒤 회수합니다. 계정 비용은 견적에 따로 적습니다.",
  },
  {
    q: "개인 자료나 기관 자료를 AI에 넣어도 괜찮습니까.",
    a: "실습을 시작하기 전에 AI에 넣지 않을 자료를 먼저 정하고, 쓰는 도구의 데이터 정책을 함께 확인합니다. AI에 입력하는 것이 곧 외부 전송이라는 전제를 수강생 전원이 공유합니다. 민감한 자료는 바꿔 넣거나 예시 자료로 대체합니다.",
  },
  {
    q: "기관 소속 강사와 함께 운영할 수 있습니까.",
    a: "됩니다. 기관 강사풀과 프루퍼 주식회사 인력을 함께 배치하고, 강사 사전 브리핑과 현장 운영 카드를 프루퍼 주식회사가 준비해 강사마다 같은 순서로 진행하게 합니다.",
  },
  {
    q: "조달 입찰로도 계약할 수 있습니까.",
    a: "프루퍼 주식회사는 나라장터 경쟁입찰참가자격을 등록했고 소프트웨어사업자 신고와 벤처기업 확인을 마쳤습니다. 견적서 승인, 수의계약, 경쟁 입찰 가운데 기관의 방식에 맞춥니다.",
  },
  {
    q: "결과보고서 양식이 정해져 있습니다.",
    a: "기관 양식대로 작성합니다. 출결, 만족도 조사, 수강생 결과물을 양식 항목별로 정리하고, 정산에 필요한 서류 순서도 담당자와 미리 맞춥니다.",
  },
];

const ORG_ID = "https://ax.proofer.tech/#organization";

/** 도형 두 개와 글자가 한 덩어리인 버블 차트. 시안 O04 의 SVG 를 그대로 옮겼다 */
function FormatsChart() {
  const bubbles = [
    { cx: 130, cy: 160, r: 36, c: "#8A8FA3", a: "AI Talk", b: "특강" },
    {
      cx: 280,
      cy: 120,
      r: 50,
      c: "#344FE0",
      a: "Hands-on Lab",
      b: "개인 실습",
    },
    { cx: 440, cy: 88, r: 50, c: "#1E2A66", a: "AI Hackathon", b: "팀 결과물" },
    {
      cx: 590,
      cy: 74,
      r: 56,
      c: "#45AF66",
      a: "Project Course",
      b: "개인 또는 팀",
    },
  ];
  const xs: [number, string][] = [
    [130, "1 ~ 2시간"],
    [280, "반일"],
    [440, "1 ~ 2일"],
    [590, "2 ~ 4회차"],
  ];
  return (
    <svg
      viewBox="0 0 680 228"
      role="img"
      aria-label="과정 형식별 시간과 결과물 깊이"
      className={styles.chart}
    >
      <line
        x1="60"
        y1="200"
        x2="660"
        y2="200"
        stroke="#C3C9D6"
        strokeWidth="1"
      />
      <line x1="60" y1="20" x2="60" y2="200" stroke="#C3C9D6" strokeWidth="1" />
      <text x="68" y="14" fontSize="11" fontWeight="700" fill="#3B4256">
        결과물 깊이
      </text>
      <text
        x="660"
        y="190"
        textAnchor="end"
        fontSize="11"
        fontWeight="700"
        fill="#3B4256"
      >
        투입 시간
      </text>
      {xs.map(([x, t]) => (
        <text
          key={t}
          x={x}
          y="218"
          textAnchor="middle"
          fontSize="10.5"
          fill="#5B6275"
        >
          {t}
        </text>
      ))}
      {bubbles.map((b) => (
        <g key={b.a}>
          <circle
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill={b.c}
            fillOpacity="0.18"
            stroke={b.c}
            strokeWidth="1.5"
          />
          <text
            x={b.cx}
            y={b.cy - 2}
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#0F1424"
          >
            {b.a}
          </text>
          <text
            x={b.cx}
            y={b.cy + 15}
            textAnchor="middle"
            fontSize="10.5"
            fill="#3B4256"
          >
            {b.b}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function OpenPage() {
  const enterpriseHref = generateSubdomainPath("/", SUB_DOMAIN.ax);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "기관 위탁 AI 리터러시 교육",
      description: OPEN.description,
      provider: { "@id": ORG_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  return (
    <main className={styles.open}>
      <section id="top" className={`${styles.sec} ${styles.hero}`}>
        <div className={styles.wrap}>
          <Enter index={0} immediate>
            <div className={styles.kick}>기관과 함께 여는 공개 AI 교육</div>
            <h1 className={styles.h1}>
              배운 그날부터 활용하는
              <br />
              <em>AI 리터러시 교육</em>
            </h1>
            <p className={styles.lead}>
              대학 사업단, 창업지원기관, 지자체와 공공기관이 여는 AI 교육을
              맡습니다. 예비창업자, 대학생, 고등학생, 지역 재직자처럼 수강
              대상이 누구든 각자의 자료로 실습하고 자기 결과물을 들고 갑니다.
              기획부터 모집, 운영, 결과보고까지 함께 맡을 수 있습니다.
            </p>
            <div className={styles.actions}>
              <AxInquireButton className={styles.btn}>
                도입 문의
              </AxInquireButton>
              <a href={OPEN.pdf} className={`${styles.btn} ${styles.btnGhost}`}>
                커리큘럼 다운로드
              </a>
            </div>
          </Enter>
          <Enter index={1} immediate>
            <Photo
              src={`${PHOTO}/room.jpg`}
              alt="노트북을 펴고 실습하는 수강생들"
              ratio="1600 / 694"
              priority
            />
          </Enter>
          <div className={styles.grid3}>
            <div className={`${styles.card} ${styles.stat}`}>
              <div className={styles.tag}>Case Record</div>
              <div className={styles.big}>
                32<small>/ 33명</small>
              </div>
              <p className={styles.cb}>
                대학 앵커사업단 창업실무 과정에서 자기 결과물을 완성한 수강생
              </p>
            </div>
            <div className={`${styles.card} ${styles.stat}`}>
              <div className={styles.tag}>Format</div>
              <div className={styles.big}>
                3.5<small>시간</small>
              </div>
              <p className={styles.cb}>
                반일 실습 안에 자료 연결부터 결과물 완성까지
              </p>
            </div>
            <div className={`${styles.card} ${styles.stat}`}>
              <div className={styles.tag}>Tools</div>
              <div className={styles.tools}>
                Claude, ChatGPT, Gemini
                <br />
                Claude Code, Antigravity, Codex
              </div>
              <p className={styles.cb}>
                수강생이 쓰는 도구로 진행하고, 실습용 계정이 필요하면 교육 기간
                동안 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className={styles.sec}>
        <div className={styles.wrap}>
          <Enter>
            <Head
              run="01 / 문제 인식"
              tag="PROBLEM"
              kick="Problem"
              title={["AI 교육은 늘었는데", "수료 뒤에 쓰는 사람은 적습니다"]}
              lead="기관이 여는 AI 교육은 이제 흔합니다. 도구 소개와 따라 하기 시연으로 채운 과정은 모집이 쉬운 대신, 수강생이 다음 주에 다시 열어 보는 일은 드뭅니다. 기관이 결과보고에 담을 성과도 수료 인원에서 멈춥니다."
            />
          </Enter>
          <div className={`${styles.card} ${styles.flows}`}>
            {PROBLEM_FLOWS.map((f) => (
              <div key={f.label} className={styles.flow}>
                <div
                  className={`${styles.flowLabel} ${f.on ? styles.flowOn : ""}`}
                >
                  {f.label}
                </div>
                <div className={styles.flowRow}>
                  {f.boxes.map(([t, d], i) => (
                    <React.Fragment key={t}>
                      {i > 0 && <Step />}
                      <div
                        className={`${styles.flowBox} ${f.on ? styles.flowBoxOn : ""} ${
                          !f.on && i === 2 ? styles.flowBoxOff : ""
                        }`}
                      >
                        <b>{t}</b>
                        <span>{d}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.grid3}>
            {PROBLEM_CARDS.map((c) => (
              <div key={c.title} className={`${styles.card} ${styles.col}`}>
                <Icon name={c.icon} tone={c.tone} />
                <h3 className={styles.ct}>{c.title}</h3>
                <p className={styles.cb}>{c.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.note}>
            기관 교육의 성과는 수강생이 교육 뒤에도 AI를 쓰는지로 갈립니다.{" "}
            <strong>
              그러려면 실습 자료부터 수강생 자신의 것이어야 합니다.
            </strong>
          </div>
          <div className={styles.signals}>
            <div className={styles.tag}>Signals</div>
            {SIGNALS.map((s, i) => (
              <div key={s} className={styles.signal}>
                <b>{"ABC"[i]}</b>
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="view" className={`${styles.sec} ${styles.alt}`}>
        <div className={styles.wrap}>
          <Enter>
            <Head
              run="02 / 프루퍼 주식회사의 관점"
              tag="OUR VIEW"
              kick="Our View"
              title={["수강생이 가져온 자료로", "자기 결과물을 만듭니다"]}
              lead="프루퍼 주식회사의 교육은 대상이 달라도 같은 순서로 진행합니다. 수강생이 가진 자료를 AI에 연결하고, 문서에 없는 기준을 직접 적고, 그 위에서 결과물을 만듭니다. 창업팀은 사업자료, 재직자는 직무 문서, 학생은 과제와 활동 기록이 실습 자료가 됩니다."
            />
          </Enter>
          <div className={`${styles.card} ${styles.trio}`}>
            {VIEW_TRIO.map((t, i) => (
              <React.Fragment key={t.tag}>
                {i > 0 && <Step />}
                <div className={styles.trioItem}>
                  <span className={styles.round}>
                    <Icon name={t.icon} tone={t.tone} size={28} />
                  </span>
                  <div className={styles.tag}>{t.tag}</div>
                  <b>{t.title}</b>
                  <span className={styles.cb}>{t.text}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className={styles.split}>
            <Photo
              src={`${PHOTO}/coach.jpg`}
              alt="보조강사가 수강생 옆에서 화면을 보며 돕는 모습"
              ratio="1600 / 801"
              sizes="(max-width: 900px) 100vw, 420px"
            />
            <div className={styles.stack}>
              {VIEW_CARDS.map((c) => (
                <div key={c.title} className={`${styles.card} ${styles.row}`}>
                  <Icon name={c.icon} tone={c.tone} />
                  <div className={styles.rowText}>
                    <h3 className={styles.ct}>{c.title}</h3>
                    <p className={styles.cb}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.note}>
            프루퍼 주식회사는 사내에서 실제로 일하는 방식을 가르칩니다. 흩어진
            사내 지식을 AI가 읽도록 구조화하고 반복 업무를 자동화 워크플로로
            돌려 온 방식을{" "}
            <strong>수강생의 자료와 수준에 맞춰 옮깁니다.</strong>
          </div>
        </div>
      </section>

      <section id="formats" className={styles.sec}>
        <div className={styles.wrap}>
          <Enter>
            <Head
              run="03 / 과정 형식"
              tag="PROGRAM FORMATS"
              kick="Program Formats"
              title={["기관 일정과 예산에 맞춰", "과정 형식을 고릅니다"]}
              lead="특강부터 몇 회차에 걸친 프로젝트 과정까지 고를 수 있습니다. 어느 형식이든 수강생 자료로 실습하고 자기 결과물을 만드는 쪽으로 무게를 둡니다."
            />
          </Enter>
          <div className={`${styles.card} ${styles.chartBox}`}>
            <FormatsChart />
          </div>
          <div className={styles.grid2}>
            {FORMATS.map((f) => (
              <div key={f.id} className={`${styles.card} ${styles.format}`}>
                <div className={styles.formatTop}>
                  <span
                    className={`${styles.pill} ${f.tone === "n" ? "" : styles[`pill_${f.tone}`]}`}
                  >
                    {f.id} {f.name}
                  </span>
                  <span className={styles.mono}>{f.time}</span>
                </div>
                <div className={styles.who}>{f.who}</div>
                <p className={styles.cb}>{f.text}</p>
                <p className={styles.out}>
                  <b>산출물</b>
                  {f.out}
                </p>
              </div>
            ))}
          </div>
          <div className={`${styles.note} ${styles.noteBlue}`}>
            수강생이 창업하거나, 수강생이 다니는 회사가 팀 단위로 도입하려 하면
            기업 교육 과정(스타트업, 중소-중견)으로 이어 갑니다.{" "}
            <strong>
              교육에서 만든 업무환경과 기준 문서에서 바로 시작합니다.
            </strong>{" "}
            <Link href={enterpriseHref} className={styles.link}>
              기업 교육 보기
            </Link>
          </div>
        </div>
      </section>

      <section id="audience" className={`${styles.sec} ${styles.alt}`}>
        <div className={styles.wrap}>
          <Enter>
            <Head
              run="04 / 대상별 구성 예시"
              tag="AUDIENCE EXAMPLES"
              kick="Audience Examples"
              title={[
                "수강 대상은 가리지 않습니다",
                "자료와 결과물을 수강생에 맞춥니다",
              ]}
              lead="아래는 구성 예시입니다. 과정은 기관의 사업 목적과 수강생 구성을 듣고 함께 짭니다."
            />
          </Enter>
          <div className={`${styles.tag} ${styles.audHead}`}>
            <span />
            <span>대상</span>
            <span>실습 자료</span>
            <span />
            <span>결과물 예시</span>
            <span className={styles.right}>권장 형식</span>
          </div>
          <div className={styles.audList}>
            {AUDIENCE.map((a) => (
              <div key={a.who} className={`${styles.card} ${styles.aud}`}>
                <Icon name={a.icon} tone={a.tone} />
                <b>{a.who}</b>
                <span className={styles.cb}>{a.material}</span>
                <span className={styles.audArrow}>
                  <Arrow size={18} />
                </span>
                <span className={styles.audOut}>{a.output}</span>
                <span className={styles.audFormat}>{a.format}</span>
              </div>
            ))}
          </div>
          <div className={styles.grid2}>
            <div className={`${styles.card} ${styles.col}`}>
              <div className={styles.tag}>Mixed Class</div>
              <div className={styles.cardTitle}>수준이 섞인 반</div>
              <p className={styles.cb}>
                신청 단계의 사전 설문으로 AI 사용 경험과 가져올 자료를 묻습니다.
                그 결과로 반을 나누거나, 같은 반 안에서 사람마다 결과물의 크기를
                달리 잡습니다.
              </p>
            </div>
            <div className={`${styles.card} ${styles.col}`}>
              <div className={styles.tag}>No Materials</div>
              <div className={styles.cardTitle}>자료가 없는 수강생</div>
              <p className={styles.cb}>
                대상에 맞춘 예시 자료를 준비해 먼저 실습합니다. 방법을 익힌 뒤
                자기 자료로 옮기고, 자료가 쌓이면 교육 뒤에도 같은 방법으로 이어
                씁니다.
              </p>
            </div>
          </div>
          <div className={styles.note}>
            한 사업 안에 대상이 여럿이면 대상별로 트랙을 나누고, 트랙마다 형식과
            회차를 따로 잡습니다.{" "}
            <strong>
              같은 대상 안에서도 수준이 크게 갈리면 반을 다시 나눕니다.
            </strong>
          </div>
        </div>
      </section>

      <section id="lab" className={styles.sec}>
        <div className={styles.wrap}>
          <Enter>
            <Head
              run="05 / Hands-on Lab"
              tag="개인 실습"
              kick="F2 / Hands-on Lab"
              title={[
                "반나절 안에 나한테 특화된",
                "결과물까지 가져갈 수 있습니다",
              ]}
              lead="완성된 모습을 먼저 보여주고 개념은 그다음에 설명합니다. 무엇을 만드는지 본 뒤에 설명을 들으면 수강생이 자기 일에 대입해 듣습니다. 이어지는 실습은 전부 수강생 자신의 자료로 합니다."
            />
          </Enter>
          <div className={`${styles.card} ${styles.timeline}`}>
            <ol className={styles.steps}>
              {LAB_STEPS.map((s, i) => (
                <li key={s.title}>
                  <span
                    className={`${styles.stepn} ${i === 4 ? styles.stepnGreen : ""}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <b>{s.title}</b>
                  <span className={styles.cs}>{s.text}</span>
                  <span
                    className={`${styles.pill} ${styles.pillSm} ${i === 4 ? styles.pill_g : ""}`}
                  >
                    {s.pill}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.grid3}>
            {LAB_FACTS.map((f) => (
              <div key={f.tag} className={`${styles.card} ${styles.col}`}>
                <Icon name={f.icon} tone={f.tone} />
                <div className={styles.tag}>{f.tag}</div>
                <div className={styles.cardTitle}>{f.title}</div>
                <p className={styles.cb}>{f.text}</p>
              </div>
            ))}
          </div>
          <div className={`${styles.card} ${styles.col}`}>
            <div className={styles.tag}>결과물 예시</div>
            <div className={styles.grid3}>
              {LAB_RESULTS.map((r) => (
                <div key={r.who} className={styles.result}>
                  <Icon name={r.icon} tone={r.tone} size={20} />
                  <div>
                    <b>{r.who}</b>
                    <div className={styles.cb}>{r.what}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.cb}>
              결과물은 대상에 맞춰 정하고, 그날 완성할 수 있는 크기로 잡습니다.
            </p>
          </div>
        </div>
      </section>

      <section id="project" className={`${styles.sec} ${styles.alt}`}>
        <div className={styles.wrap}>
          <Enter>
            <Head
              run="06 / Project Course, AI Hackathon"
              tag="확장 과정"
              kick="F3 / Project Course"
              title={[
                "업무나 프로젝트에 쓰는 결과물이 될 때까지",
                "회차를 이어 갑니다",
              ]}
              lead="반일 실습에서 만든 결과물을 몇 회차에 걸쳐 업무나 프로젝트에 쓰는 수준으로 키웁니다. 짧은 기간에 팀 단위 결과물이 필요하면 해커톤 형식으로 압축합니다."
            />
          </Enter>
          <div className={`${styles.card} ${styles.rounds}`}>
            <div className={styles.tag}>회차 예시</div>
            <div className={styles.stairs}>
              {ROUNDS.map((r) => (
                <div key={r.n} className={styles.stair}>
                  <div className={styles.stairText}>
                    <b>{r.title}</b>
                    <span className={styles.cs}>{r.text}</span>
                  </div>
                  <div
                    className={styles.stairBar}
                    style={{ height: r.h, background: r.bg, color: r.fg }}
                  >
                    {r.n}
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.cb}>
              회차 수와 간격은 기관 일정에 맞춥니다. 재직자 과정은 평일 저녁이나
              주말로도 엽니다.
            </p>
          </div>
          <div className={styles.kick}>F4 / AI Hackathon</div>
          <div className={styles.grid3}>
            {HACKATHON.map((c) => (
              <div key={c.title} className={`${styles.card} ${styles.col}`}>
                <Icon name={c.icon} tone={c.tone} />
                <h3 className={styles.ct}>{c.title}</h3>
                <p className={styles.cb}>{c.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.note}>
            두 형식 모두 마지막에 수강생이 직접 결과물을 시연합니다.{" "}
            <strong>시연 기록과 결과물은 결과보고서에 그대로 실립니다.</strong>
          </div>
        </div>
      </section>

      <section id="operation" className={styles.sec}>
        <div className={styles.wrap}>
          <Enter>
            <Head
              run="07 / 운영 범위"
              tag="OPERATION"
              kick="Operation"
              title={["기획부터 결과보고까지", "필요한 만큼 맡기세요"]}
              lead="강의만 맡기실 수도 있고, 과정 기획부터 모집, 운영, 결과보고까지 한 번에 맡기실 수도 있습니다. 기관 담당자가 챙길 일이 줄도록 단계마다 산출물을 정해 두고 진행합니다."
            />
          </Enter>
          <ol className={styles.ops}>
            {OPERATION.map((o, i) => (
              <li key={o.title}>
                <span className={styles.round}>
                  <Icon name={o.icon} tone={o.tone} size={26} />
                </span>
                <div className={styles.tag}>
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <b className={styles.opTitle}>{o.title}</b>
                <ul className={styles.opList}>
                  {o.items.map((it) => (
                    <li key={it} className={styles.opItem}>
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className={styles.grid2}>
            {OPERATION_CARDS.map((c) => (
              <div key={c.title} className={`${styles.card} ${styles.row}`}>
                <Icon name={c.icon} tone={c.tone} />
                <div className={styles.rowText}>
                  <h3 className={styles.ct}>{c.title}</h3>
                  <p className={styles.cb}>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.note}>
            대학 앵커사업단 과정에서는 수강생 전원에게 실습용 AI 도구 계정을
            지원하고, 회수 날짜를 미리 정해 운영했습니다.{" "}
            <strong>참가자 결과물을 붙인 결과보고서까지 제출했습니다.</strong>
          </div>
        </div>
      </section>

      <section id="case" className={`${styles.sec} ${styles.alt}`}>
        <div className={styles.wrap}>
          <Enter>
            <Head
              run="08 / 실제로 해 본 과정"
              tag="CASE"
              kick="Case / OO대학교 앵커사업단"
              title={["초기창업기업 대표들이", "자기 사업자료로 만든 업무환경"]}
              lead="2026년 10월, 한 대학 앵커사업단의 창업실무 고도화 과정을 프루퍼 주식회사가 맡았습니다. 예비창업자와 초기창업기업 대표가 자기 사업자료를 AI에 연결하고, 그 위에서 자사 소개 페이지를 만들었습니다."
            />
          </Enter>
          <div className={styles.caseTop}>
            <Photo
              src={`${PHOTO}/lab.jpg`}
              alt="실습 중인 수강생"
              ratio="1600 / 1053"
              sizes="(max-width: 900px) 100vw, 700px"
            />
            <div className={`${styles.card} ${styles.donut}`}>
              <svg
                viewBox="0 0 150 150"
                role="img"
                aria-label="33명 중 32명 완성"
                width="150"
                height="150"
              >
                <circle
                  cx="75"
                  cy="75"
                  r="54"
                  fill="none"
                  stroke="#E6F5EA"
                  strokeWidth="16"
                />
                <circle
                  cx="75"
                  cy="75"
                  r="54"
                  fill="none"
                  stroke="#45AF66"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray="329.0 339.3"
                  transform="rotate(-90 75 75)"
                />
                <text
                  x="75"
                  y="76"
                  textAnchor="middle"
                  fontSize="30"
                  fontWeight="800"
                  fill="#0F1424"
                >
                  32
                </text>
                <text
                  x="75"
                  y="98"
                  textAnchor="middle"
                  fontSize="11"
                  fill="#3B4256"
                >
                  33명 중 완성
                </text>
              </svg>
              <div className={styles.donutFacts}>
                <div>
                  <div className={styles.tag}>참여</div>
                  <div className={styles.fact}>33명</div>
                </div>
                <div>
                  <div className={styles.tag}>시간</div>
                  <div className={styles.fact}>3.5시간</div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.card} ${styles.col}`}>
            <div className={styles.tag}>Process</div>
            <ol className={styles.process}>
              {CASE_PROCESS.map((p) => (
                <li
                  key={p.title}
                  className={p.green ? styles.processGreen : ""}
                >
                  <b>{p.title}</b>
                  <span className={styles.cs}>{p.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.grid2}>
            <div className={`${styles.card} ${styles.col}`}>
              <div className={styles.tag}>Learned</div>
              <div className={styles.cardTitle}>결과를 가른 것은 회사 기준</div>
              <p className={styles.cb}>
                최신판 문서를 찾는 일은 AI가 스스로 해냈습니다. 같은 질문에 답이
                갈린 지점은 문서에 없는 기준을 적어 두었는지였습니다. 그래서
                과정의 무게를 자료 찾기에서 기준 정하기로 옮겼습니다.
              </p>
            </div>
            <div className={`${styles.card} ${styles.col}`}>
              <div className={styles.tag}>Takeaway</div>
              <div className={styles.cardTitle}>
                교육 뒤에도 다시 설치할 수 있게
              </div>
              <p className={styles.cb}>
                참가자는 업무환경을 처음부터 다시 꾸릴 수 있는 설치 패키지를
                받았습니다. 지원사업 조회와 소개 페이지 요청문이 함께 들어
                있습니다.
              </p>
            </div>
          </div>
          <div className={styles.note}>
            기관이 창업팀을 위해 연 Hands-on Lab입니다.{" "}
            <strong>
              다른 대상도 같은 순서로 진행하고, 실습 자료와 결과물을 대상에 맞춰
              바꿉니다.
            </strong>
          </div>
        </div>
      </section>

      <section id="package" className={styles.sec}>
        <div className={styles.wrap}>
          <Enter>
            <Head
              run="09 / 구성과 견적"
              tag="PACKAGES"
              kick="Packages"
              title={["필요한 범위만 골라", "견적을 받습니다"]}
            />
          </Enter>
          <div className={styles.pkgs}>
            {PACKAGES.map((p, i) => (
              <div key={p.title} className={styles.pkg}>
                {p.stack.map((k) => (
                  <div
                    key={k}
                    className={styles.layer}
                    style={{ background: LAYERS[k].bg, color: LAYERS[k].fg }}
                  >
                    {LAYERS[k].label}
                  </div>
                ))}
                <div
                  className={`${styles.pkgLabel} ${i === 3 ? styles.pkgLabelDark : ""}`}
                >
                  <b>{p.title}</b>
                  <div>{p.text}</div>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.cb}>
            견적은 인원, 회차, 운영 범위를 기준으로 잡습니다. 같은 과정을 다시
            여는 경우 두 번째부터는 기획 비용이 빠집니다.
          </p>
          <div className={`${styles.card} ${styles.col}`}>
            <div className={styles.tag}>How We Start</div>
            <div className={styles.start}>
              {START.map((s, i) => (
                <React.Fragment key={s.title}>
                  {i > 0 && <Step />}
                  <div className={styles.startItem}>
                    <b>{s.title}</b>
                    <span className={styles.cb}>{s.text}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <h3 className={styles.h3}>과정 뒤에 달라지는 것</h3>
          <div className={styles.grid2}>
            {AFTER.map((a) => (
              <div
                key={a.text}
                className={`${styles.card} ${styles.row} ${styles.after}`}
              >
                <Icon name={a.icon} tone={a.tone} size={20} />
                <p className={styles.cb}>
                  {a.text}
                  {a.link && (
                    <>
                      {" "}
                      <Link href={enterpriseHref} className={styles.link}>
                        기업 교육 보기
                      </Link>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className={`${styles.sec} ${styles.alt}`}>
        <div className={styles.wrap}>
          <Enter>
            <Head
              run="10 / 자주 묻는 질문"
              tag="FAQ"
              kick="FAQ"
              title={["자주 묻는 질문"]}
            />
          </Enter>
          <div className={`${styles.card} ${styles.faqs}`}>
            {FAQ.map((f, i) => (
              <details key={f.q} className={styles.faq}>
                <summary>
                  <span>Q{i + 1}</span>
                  {f.q}
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={styles.sec}>
        <div className={styles.wrap}>
          <div className={styles.kick}>Proof of Value</div>
          <h2 className={styles.h2}>
            강의만 듣고 끝나지 않는 AI 교육,
            <br />
            <em>함께 만들어 가 봅시다!</em>
          </h2>
          <p className={styles.lead}>
            특강, 실습 과정, 프로젝트 과정, 모집, 운영 일괄 모두 가능합니다.
          </p>
          <Photo
            src={`${PHOTO}/coach.jpg`}
            alt="수강생 옆에서 함께 실습하는 모습"
            ratio="1600 / 520"
          />
          <div className={styles.actions}>
            <AxInquireButton className={styles.btn}>
              도입 문의하기
            </AxInquireButton>
            <a href={OPEN.pdf} className={`${styles.btn} ${styles.btnGhost}`}>
              커리큘럼 다운로드
            </a>
            <Link
              href={enterpriseHref}
              className={`${styles.btn} ${styles.btnGhost}`}
            >
              기업 교육 보기
            </Link>
          </div>
          <div className={`${styles.grid2} ${styles.contact}`}>
            <div className={styles.col}>
              <div className={styles.tag}>Contact</div>
              <a href="mailto:info@proofer.tech" className={styles.mail}>
                info@proofer.tech
              </a>
              <div className={styles.cb}>ax.proofer.tech</div>
              <div className={styles.cb}>proofer.tech</div>
            </div>
            <div className={styles.col}>
              <div className={styles.tag}>Company</div>
              <div className={styles.mail}>프루퍼 주식회사 / 대표 임한솔</div>
              <div className={styles.cb}>사업자등록번호 337-81-03650</div>
              <div className={styles.cb}>
                서울 강남구 강남대로112길 47, 2층 421A
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
