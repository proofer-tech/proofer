import React from "react";
import IrPdfViewer from "./IrPdfViewer";

const IR_PDF_URL =
  "https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/assets/ir/proofer-ir.pdf?v=20261010";

function PdfLink({ label }: { label: string }) {
  return (
    <a
      href={IR_PDF_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      {label}
    </a>
  );
}

const sections = [
  {
    title: "프루퍼가 하는 일",
    body: [
      "프루퍼는 회사 안으로 들어가 운영을 바꾸고, 바뀐 방식이 계속 돌아가게 만드는 그로스 파트너입니다. 운영효율을 끌어올려 영업이익과 기업가치로 증명합니다.",
      "서비스는 세 가지입니다. 그로스 컨설팅은 회사 안으로 들어가 운영효율을 끌어올리고 영업이익과 기업가치를 만듭니다. AX 교육과 전환은 조직이 AI로 일하도록 가르치고, 진단하고, 필요한 도구를 직접 만듭니다. 프루퍼 플랫폼은 현장에서 만든 사내 앱이 회사가 정한 규칙 안에서 계속 돌아가게 하는 운영 기반입니다.",
    ],
  },
  {
    title: "일하는 방식",
    body: [
      "필요한 도구는 고객사 현장에서 만들고, 여러 회사에 통하는 것만 제품으로 다듬습니다. 고객사 안에서 진단하고 실행까지 맡는 현장 진입, 시중 솔루션으로 안 되는 지점에서 도구를 만드는 도구 개발, 다음 현장에서 다시 써 보며 범용성을 확인하는 단계를 거쳐 제품화합니다.",
      "stream은 채용 현장에서 나온 인재 데이터 허브로, 2026년 1월 특허를 출원했고 출시를 준비 중입니다.",
    ],
  },
  {
    title: "그로스 컨설팅",
    body: [
      "사업 구조부터 코드까지 한 팀이 직접 맡습니다. 사업과 수익 구조 진단, 운영 시스템화, 채용과 육성, 역할 재설계를 다루고, 기획부터 앱, 서버, AI까지 직접 구현합니다. DX, AX 진단과 업무 자동화, 조직의 AI 활용 정착도 포함합니다.",
      "6개월에서 1년간 회사 안에서 함께 일하며, 매각 여부는 대주주가 결정합니다. 대표 사례인 P사에서는 어려울 때 합류해 약 1년 만에 영업이익률을 15%p 이상 개선하고 가맹점을 62개로 늘렸으며, 핵심 인력 40%를 교체해 조직 체질을 개선했습니다. 밸류업 후 매각이 성사되었습니다.",
    ],
  },
  {
    title: "AX 교육과 전환",
    body: [
      "조직이 AI로 일하게 될 때까지 교육, 실전, 실행을 차례로 함께합니다. 교육은 리더 세션과 L1 리터러시, L2 도구 실무, L3 직무 특화, L4 파워유저 과정으로 이루어집니다. 실전은 실제 업무 과제로 만드는 해커톤이고, 실행은 AX 진단, 팀장 1:1 코칭, 구축과 운영 전환입니다.",
      "도구는 Claude Code, Google Antigravity, Codex 가운데 고객사의 개발 환경과 계정 정책에 맞는 것을 고릅니다. 개별 업무를 표준 과업으로 묶어 과업 단위로 진단하며, 그로스 컨설팅 현장에서 시스템을 직접 만들고 운영하는 팀이 가르칩니다. 패키지 구성과 상세는 ax.proofer.tech에서 볼 수 있습니다.",
    ],
  },
  {
    title: "프루퍼 플랫폼",
    body: [
      "직원이 말하면 앱이 생기고, 그 앱은 회사가 정한 규칙 안에서 움직입니다. 고객사 서버나 온프레미스에 설치하며, ERP와 그룹웨어 같은 기존 시스템은 커넥터로 연결해 데이터를 읽어 옵니다. 누가 AI에게 무엇을 지시해 앱을 만들었는지까지, 플랫폼을 거친 행위를 모두 기록합니다.",
      "기존 시스템을 옮기지 않고 그 옆에서 시작합니다. 데이터 접근은 기본값이 전면 거부이고, 실행은 샌드박스에서 돌며, 화면에는 자격증명을 내려보내지 않습니다. 앱은 직원 권한을 넘지 않습니다. 관찰, 보완, 부분 대체, 전면 대체 단계 가운데 어느 단계에서 멈춰도 그때까지의 이득은 고객 몫입니다.",
      "첫 적용 대상은 프루퍼 자신이며, 2027년 1분기까지 자사 채용 업무를 플랫폼 앱으로 처리하는 것이 목표입니다.",
    ],
  },
  {
    title: "연혁과 팀",
    body: [
      "프루퍼주식회사는 2025년 4월 설립되었고, 2025년 9월 시드 투자를 유치했습니다. 2026년 1월 인재 데이터 관리 시스템으로 특허를 출원했고, 2026년 7월 벤처기업확인을 받았습니다. 2026년 9월에는 각자대표 체제로 전환했습니다.",
      "임한솔 대표이사는 2014년부터 개발해 왔으며 플랫폼과 AX 교육을 총괄합니다. 임덕만 Louis 대표이사는 HR 20년 이상의 경력에 M&A EXIT 경험이 있으며 조직과 그로스 컨설팅을 총괄합니다.",
      "문의는 info@proofer.tech 로 보내 주세요. 주소는 서울 강남구 강남대로112길 47, 2층 421A호입니다.",
    ],
  },
];

export default function IntroductionOfProoferPage() {
  return (
    <div className="mx-auto w-full max-w-[1184px] px-4">
      <div className="flex flex-col gap-4 py-8">
        <h1 className="text-4xl font-bold">
          프루퍼주식회사 서비스 소개서: 기업가치를 &apos;증명&apos;합니다
        </h1>
        <IrPdfViewer url={IR_PDF_URL} />
        <p>
          <PdfLink label="서비스 소개서 PDF 열기" />
        </p>
        {sections.map(({ title, body }) => (
          <section key={title} className="flex flex-col gap-3">
            <h2 className="mt-6 text-2xl font-bold">{title}</h2>
            {body.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
        ))}
        <p className="mt-6">
          <PdfLink label="서비스 소개서 PDF 열기" />
        </p>
      </div>
    </div>
  );
}
