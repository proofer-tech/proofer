import React from "react";

type Module = { name: string; time: string; content: string };

type Level = {
  id: string;
  code: string;
  name: string;
  target: string;
  duration: string;
  scale: string;
  goal: string;
  modules: Module[];
  note?: string;
};

const LEVELS: Level[] = [
  {
    id: "l1",
    code: "L1",
    name: "AX 입문 - 전사 확산",
    target:
      "직무를 가리지 않는 전 직원. AI를 한 번도 업무에 써 본 적 없는 사람에게 맞춰 짰습니다.",
    duration: "4시간 또는 8시간",
    scale: "30명에서 40명",
    goal: "이 과정을 마친 직원은 자기 반복 업무 세 가지를 AI 워크플로로 옮겨 놓고 나갑니다.",
    modules: [
      {
        name: "오프닝",
        time: "0.5H",
        content: "왜 지금 AI인가, 오늘 하루 사용법, 내 반복 업무 3개 적어내기",
      },
      {
        name: "생성형 AI 트렌드와 이해",
        time: "0.5H",
        content: "모델 지형, 무엇을 할 수 있고 무엇을 못 하는가, 환각의 원리",
      },
      {
        name: "프롬프트 설계 4원칙",
        time: "1H",
        content:
          "RCTF 프레임워크(Role, Context, Task, Format), 실패한 프롬프트 고쳐 쓰기",
      },
      {
        name: "나만의 업무 AI 만들기",
        time: "1H",
        content: "GPTs / Gems / Projects로 반복 업무를 고정 자산으로 만들기",
      },
      {
        name: "보안 수칙",
        time: "0.5H",
        content: "AI 입력은 곧 외부 전송, 절대 넣지 않는 것, 더미 데이터 원칙",
      },
      {
        name: "업무 적용 실습과 공유",
        time: "1H",
        content: "본인 업무 자료로 실습, 결과물 업로드, 상호 피드백",
      },
    ],
    note: "4시간을 8시간으로 늘리면 세 모듈이 더 들어갑니다 - 엑셀 반복 업무 자동화(ChatGPT + VBA, 1H), 리서치 자동화(Deep Research + NotebookLM, 1H), 용도별 AI 도구 지도(0.5H).",
  },
  {
    id: "l2",
    code: "L2",
    name: "AX 직무 - 직무 심화",
    target:
      "직무로 반을 나눕니다. HR, 기획관리, 영업마케팅, 설계기술, 안전품질, 생산, 재무 등 하는 일이 같은 사람끼리 한 반입니다.",
    duration: "2일(16시간)",
    scale: "20명에서 30명",
    goal: "수강생 한 명이 자기 직무에서 실제로 쓰는 산출물 한 종을 AI로 처음부터 끝까지 만들어 냅니다.",
    modules: [
      {
        name: "프롬프트 엔지니어링의 기술",
        time: "1H",
        content: "L1 복습을 겸한 심화, 직무 문맥을 프롬프트에 넣는 법",
      },
      {
        name: "실전 문서 생성형 AI 활용법",
        time: "1.5H",
        content: "보고서, 기획안, 회의록의 초안 생성과 사실 검증",
      },
      {
        name: "엑셀을 코딩 없이 자동화하기",
        time: "1.5H",
        content: "ChatGPT + VBA로 직무 반복 계산과 서식 작업 자동화",
      },
      {
        name: "직무 데이터 분석",
        time: "2H",
        content: "직무 데이터셋으로 문제 정의, 지표 설계, 시각화, 해석",
      },
      {
        name: "직무별 심화 문서 처리",
        time: "1.5H",
        content:
          "분반별로 다름. HR은 채용, 평가 문서. 기획관리는 계약, 기성 문서",
      },
      {
        name: "직무별 보안 실무 가이드",
        time: "1H",
        content: "분반이 실제로 다루는 민감 정보 기준으로 반출 금지선 확정",
      },
      {
        name: "바이브 코딩 체험",
        time: "1H",
        content: "코드를 몰라도 동작하는 화면을 만들어 보는 첫 경험",
      },
      {
        name: "개인 MVP 기획 및 개발",
        time: "2H",
        content: "본인 업무 병목 하나를 골라 동작하는 도구로 만들기",
      },
      {
        name: "결과물 공유 및 피드백",
        time: "1H",
        content: "시연, 상호 피드백, 현업 적용 계획 확정",
      },
    ],
    note: "부록 다섯 가지는 편성에 상관없이 늘 함께 드립니다 - NotebookLM 활용, Perplexity와 Comet 브라우저, MCP와 API 이해하기, 실무 데이터 연동 방법, 용도별 AI 도구 확인표.",
  },
  {
    id: "l3",
    code: "L3",
    name: "AX 파워유저 - 에이전트와 컨텍스트 엔지니어링",
    target:
      "부서에서 AI를 끌고 갈 사람, 개발 조직, 데이터 담당자를 보내십시오. L1이나 L2 수료가 전제입니다.",
    duration: "2일(16시간)",
    scale: "15명에서 20명(실습 밀도가 높아 정원을 낮게 잡습니다)",
    goal: "사람이 매번 지시하지 않아도 혼자 도는 에이전트 하나를 자기 업무에 걸어 둡니다.",
    modules: [
      {
        name: "동작 원리",
        time: "1.5H",
        content:
          "답이 만들어지는 과정, 컨텍스트 윈도우와 토큰, 추론 모델의 차이",
      },
      {
        name: "진입점 지도",
        time: "1H",
        content: "Chat, Project, Desktop, Code, Cowork를 언제 각각 쓰는가",
      },
      {
        name: "컨텍스트 엔지니어링",
        time: "2H",
        content: "프롬프트가 아니라 환경을 설계한다, 요청을 짜는 다섯 칸",
      },
      {
        name: "규칙 파일 작성",
        time: "1.5H",
        content:
          "CLAUDE.md로 폴더에 규칙을 두기, 용어와 양식과 금지사항 명문화",
      },
      {
        name: "검증과 재현성",
        time: "1.5H",
        content:
          "답을 검증하는 3단계, 스스로 검토시키기, 같은 지시 다른 결과 잡기",
      },
      {
        name: "에이전트와 스킬",
        time: "2H",
        content: "에이전트 5단계 사이클, 도구 호출, 서브 에이전트, 스킬 제작",
      },
      {
        name: "사내 데이터 연결",
        time: "1.5H",
        content: "MCP와 커넥터로 사내 시스템, 파일, API 붙이기와 그 경계",
      },
      {
        name: "종합 실습",
        time: "3H",
        content:
          "주간 보고 에이전트, 점검 일지 정리 에이전트 등 실제 업무 과제",
      },
      {
        name: "배포와 운영",
        time: "2H",
        content: "동료에게 넘기기, 오류 확인과 수정, 유지보수 부담 줄이기",
      },
    ],
  },
  {
    id: "l4",
    code: "L4",
    name: "AX 리더 - 임원, 리더",
    target:
      "임원과 팀장, 의사결정 라인이 듣습니다. 도구를 익히는 자리가 아니라 판단 기준을 세우는 자리입니다.",
    duration: "3시간",
    scale: "제한 없음",
    goal: "우리 조직에서 무엇부터 AI로 바꿀지를 남의 보고서가 아니라 자기 판단으로 정합니다.",
    modules: [
      {
        name: "지금 무엇이 가능해졌는가",
        time: "0.5H",
        content: "데모 중심. 경쟁사와 동종업계가 실제로 하고 있는 것",
      },
      {
        name: "도입 의사결정 프레임",
        time: "1H",
        content: "어떤 업무가 후보인가, 효과 추정, 실패하는 도입의 공통점",
      },
      {
        name: "리스크 판단",
        time: "0.5H",
        content: "보안, 법무, 환각, 저작권을 리더가 어디까지 알아야 하는가",
      },
      {
        name: "조직 설계",
        time: "0.5H",
        content: "AI 담당자와 챔피언을 어디에 두는가, 성과를 무엇으로 재는가",
      },
      {
        name: "리더가 물어야 할 질문",
        time: "0.5H",
        content: "실무진 보고를 검증하는 질문 목록을 손에 쥐고 나갑니다",
      },
    ],
  },
];

type Stage = {
  name: string;
  duration: string;
  items: string[];
  deliverable: string;
};

const HACKATHON: Stage[] = [
  {
    name: "Phase 0. 과제 발굴",
    duration: "2주, 비집합",
    items: [
      "설문과 담당자 인터뷰로 부서마다 무엇이 막혀 있는지를 모읍니다.",
      "모인 후보를 두 가지로 거릅니다. 해커톤 기간 안에 동작까지 갈 크기인가, 쓸 데이터가 있는가.",
      "팀은 3명에서 5명으로 짜고 현업과 IT 인력을 한 팀에 섞습니다.",
      "환경 세팅 가이드를 나눠 주고 시작 전에 점검을 마칩니다.",
    ],
    deliverable: "확정 과제 목록, 팀 편성표, 심사 기준표",
  },
  {
    name: "Phase 1. 킥오프",
    duration: "0.5일",
    items: [
      "먼저 문제를 정의합니다. 무엇이 얼마나 불편한지를 팀이 숫자로 적어 냅니다.",
      "그 다음 팀별로 기획 3단 PRD, SPEC, PLAN을 씁니다.",
      "심사 기준은 여기서 공개합니다. 팀은 무엇으로 평가받는지 알고 나서 만들기 시작합니다.",
    ],
    deliverable: "팀별 PRD 문서",
  },
  {
    name: "Phase 2. 빌드",
    duration: "1일에서 2일",
    items: [
      "팀이 바이브 코딩으로 동작하는 최소 결과물을 만듭니다.",
      "강사 한 명이 최대 4팀을 맡아 자리를 돌며 멘토링합니다.",
      "중간에 두 번 끊습니다. 범위가 커진 팀을 잘라 주려고 두는 자리입니다.",
    ],
    deliverable: "동작하는 결과물, 중간 점검 기록",
  },
  {
    name: "Phase 3. 데모데이",
    duration: "0.5일",
    items: [
      "팀마다 시연 5분, 질의 3분입니다.",
      "배점은 문제 적합성 30, 동작 완성도 30, 확장 가능성 20, 발표 20입니다.",
      "심사는 프루퍼 강사와 고객사 임원이 함께 봅니다.",
    ],
    deliverable: "데모 영상, 발표 자료, 심사 결과",
  },
  {
    name: "Phase 4. 이관",
    duration: "2주, 비집합",
    items: [
      "상위 과제를 사내에 배포할 수 있는지 판정합니다. 보안과 유지보수 부담, 이어받을 담당자가 있는지를 한자리에서 함께 봅니다.",
      "이관 리포트에 무엇을 누가 이어받는지까지 적습니다.",
      "다음 파일럿 후보를 고릅니다.",
    ],
    deliverable: "이관 리포트, 후속 과제 목록",
  },
];

const CONSULTING: Stage[] = [
  {
    name: "Step 1. 진단",
    duration: "2주에서 4주",
    items: [
      "부서마다 무슨 일을 얼마나 하는지를 시간 단위로 훑어 업무 인벤토리를 만듭니다.",
      "병목을 지도로 옮기고 AI를 붙일 수 있는지 점수를 냅니다. 빈도, 규칙성, 데이터 유무, 리스크 네 축으로 봅니다.",
      "현행 도구와 보안 정책을 점검합니다. 이미 산 도구가 왜 안 쓰이는지가 여기서 드러납니다.",
      "경영진을 인터뷰해 무엇을 성과로 볼 것인지 이 자리에서 확정합니다.",
    ],
    deliverable: "진단 리포트, 과제 후보 풀, 적용 가능성 점수표",
  },
  {
    name: "Step 2. 로드맵",
    duration: "2주",
    items: [
      "3개년 AX 로드맵을 씁니다. 연차마다 목표와 그때 도달해 있을 상태를 적습니다.",
      "과제를 효과와 난이도로 4분면에 놓고 1년차에 할 것부터 확정합니다.",
      "AI 담당자와 부서 챔피언을 조직 어디에 둘지, 권한과 평가 방법까지 정합니다.",
      "도구 스택은 무엇을 사고 무엇을 안 사는지로 가릅니다. 계정 정책과 비용 구조까지 이 단계에서 결정합니다.",
      "반출 금지 데이터 기준과 승인 절차를 담은 보안 가이드라인 초안을 문서로 냅니다.",
    ],
    deliverable:
      "AX 로드맵, 과제 우선순위표, 조직 설계안, 도구 스택 제안서, 보안 가이드라인",
  },
  {
    name: "Step 3. 파일럿",
    duration: "6주에서 12주",
    items: [
      "1개에서 2개 부서를 골라 실제로 도는 자동화를 구축합니다. 프루퍼가 직접 만듭니다.",
      "도입 전후의 소요 시간과 처리 건수, 오류율을 같은 기준으로 재서 효과를 확인합니다.",
      "표준 프롬프트와 규칙 파일, 에이전트를 사내에서 다시 쓸 수 있는 형태로 남깁니다.",
    ],
    deliverable: "동작하는 자동화, 효과 측정 리포트, 사내 표준 자산 묶음",
  },
  {
    name: "Step 4. 내재화",
    duration: "상시",
    items: [
      "사내 인력이 프루퍼 교안으로 직접 가르칠 수 있는 상태까지 끌어올립니다.",
      "AI 담당자는 동료가 어디서 막혔는지 진단하고 부서에 뿌릴 자산을 직접 만드는 데까지 훈련합니다.",
      "교안과 자산을 사내 포털로 넘기고 갱신 주체를 함께 지정합니다.",
      "분기마다 함께 확산 지표를 봅니다. 다음 과제는 그 자리에서 정합니다.",
    ],
    deliverable: "사내 강사 인증, 담당자 운영 매뉴얼, 분기 점검 리포트",
  },
];

function LevelCard({ level }: { level: Level }) {
  return (
    <details className="card level-card">
      <summary className="level-summary">
        <div className="level-head">
          <span className="level-code">{level.code}</span>
          <h3>{level.name}</h3>
        </div>
        <dl className="level-meta">
          <div>
            <dt>대상</dt>
            <dd>{level.target}</dd>
          </div>
          <div>
            <dt>분량</dt>
            <dd>{level.duration}</dd>
          </div>
          <div>
            <dt>정원</dt>
            <dd>{level.scale}</dd>
          </div>
          <div>
            <dt>도달 목표</dt>
            <dd>{level.goal}</dd>
          </div>
        </dl>
      </summary>
      <div className="level-detail">
        <div className="why-scroll">
          <table className="why-table">
            <thead>
              <tr>
                <th>모듈</th>
                <th>시간</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              {level.modules.map((mod) => (
                <tr key={mod.name}>
                  <th>{mod.name}</th>
                  <td>{mod.time}</td>
                  <td>{mod.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {level.note && <p className="level-note">{level.note}</p>}
      </div>
    </details>
  );
}

function StageTimeline({ stages }: { stages: Stage[] }) {
  return (
    <ol className="stage-timeline">
      {stages.map((stage) => (
        <li className="stage-item" key={stage.name}>
          <div className="stage-head">
            <h3>{stage.name}</h3>
            <span className="stage-duration">{stage.duration}</span>
          </div>
          <ul className="stage-items">
            {stage.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="stage-deliverable">
            <span className="stage-deliverable-label">산출물</span>
            {stage.deliverable}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Curriculum() {
  return (
    <section className="page snap" id="curriculum" data-sec="커리큘럼">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">CURRICULUM</div>
          <h2>커리큘럼</h2>
        </div>
        <div className="curriculum-tabs">
          <input
            type="radio"
            name="curriculum-tab"
            id="tab-lecture"
            className="tab-input"
            defaultChecked
          />
          <label htmlFor="tab-lecture" className="tab-label">
            AX 강의
          </label>
          <input
            type="radio"
            name="curriculum-tab"
            id="tab-hackathon"
            className="tab-input"
          />
          <label htmlFor="tab-hackathon" className="tab-label">
            AX 해커톤
          </label>
          <input
            type="radio"
            name="curriculum-tab"
            id="tab-consulting"
            className="tab-input"
          />
          <label htmlFor="tab-consulting" className="tab-label">
            AX 컨설팅
          </label>

          <div className="tab-panel panel-lecture">
            <div className="level-grid">
              {LEVELS.map((level) => (
                <LevelCard level={level} key={level.id} />
              ))}
            </div>
          </div>
          <div className="tab-panel panel-hackathon">
            <StageTimeline stages={HACKATHON} />
          </div>
          <div className="tab-panel panel-consulting">
            <StageTimeline stages={CONSULTING} />
          </div>
        </div>
      </div>
    </section>
  );
}
