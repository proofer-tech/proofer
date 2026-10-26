import Image from "next/image";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import { homeMetadata } from "@/app/subs/ax/segmentMetadata";
import s from "@/app/subs/ax/Home.module.scss";

export const metadata = homeMetadata();

const SERVICES = [
  {
    href: "#start",
    title: "AX 진단과 컨설팅",
    desc: "무엇부터 AI로 바꿀지 정하고 파일럿으로 확인합니다",
  },
  {
    href: "#start",
    title: "AI 업무환경 구축",
    desc: "흩어진 회사 자료를 AI와 연결합니다",
  },
  {
    href: "#org",
    title: "AI Native 조직 설계",
    desc: "역할, 채용, 평가 기준을 AI와 일하는 방식에 맞춥니다",
  },
  {
    href: "#start",
    title: "사내 AI 해커톤과 실무 전환",
    desc: "팀이 자기 업무로 실제 쓸 도구를 만듭니다",
  },
];

const CASES_ROW1 = [
  ["L모 유통그룹 면세점", "AI 마케팅 아카데미"],
  ["N모 대형 게임사", "조직 AX 핸즈온"],
  ["결제망을 운영하는 K모 금융 기관", "팀장 AI 에이전트 과정"],
  ["천안 소재 K모 대학 사업단", "AX 교육"],
  ["H모 제조그룹", "AI 심화 해커톤 코치"],
  ["E모 IT 교육기업", "QA 자동화 트랙 코치"],
];

const CASES_ROW2 = [
  ["S모 청년 SW 아카데미", "개발자 커리어 특강"],
  ["J모 청소년 창업교육 단체", "비즈니스모델 강의"],
  ["B모 국립대 창업캠프", "노코드 MVP와 그로스"],
  ["N모 웹툰 플랫폼", "사내 세미나"],
  ["정부 산하 SW 부트캠프", "심사위원"],
  ["H모 대학 SW 창업아이디어톤", "멘토"],
];

const STRENGTHS = [
  {
    title: "교육, 구축, 조직 설계를 같은 팀이 맡습니다",
    desc: "교육 업체는 사용법에서 멈추고 구축 업체는 사람 문제를 비켜 갑니다. 프루퍼 주식회사는 개발자와 HR 경영진이 한 프로젝트에 같이 들어갑니다.",
  },
  {
    title: "특정 AI 도구를 팔지 않습니다",
    desc: "고객사 보안 정책과 예산, 지금 쓰는 업무툴을 보고 맞는 도구를 고릅니다.",
  },
  {
    title: "성과를 영업이익과 기업가치로 봅니다",
    desc: "수료율이나 만족도보다 줄어든 비용, 늘어난 매출, 회사의 값어치가 어떻게 바뀌었는지를 먼저 봅니다.",
  },
];

const MEMBERS = [
  {
    img: "hansol",
    name: "임한솔 대표",
    role: "AX 전략과 AI 업무환경 구축",
    alt: "임한솔 대표 일러스트",
    desc: "SI 개발자로 시작해 리디와 토스에서 개발했습니다. 지금은 Claude Code 오픈소스 확장 dira를 만들고 있습니다.",
  },
  {
    img: "hr",
    name: "조직 설계 담당 경영진",
    role: "AI Native 조직 설계",
    alt: "조직 설계 담당 경영진 일러스트",
    desc: "대형 이커머스를 거친 HR 20년 경력에 스타트업 대표 경험이 있습니다. 인수된 회사의 국내대표로 매각까지 경영했고, AI와 사람이 일을 나누는 조직 구조와 채용, 평가 기준을 설계합니다.",
  },
  {
    img: "dev",
    name: "개발 총괄 출신 컨설턴트",
    role: "AI 도입과 시스템 구축",
    alt: "개발 총괄 출신 컨설턴트 일러스트",
    desc: "여러 파트에 걸친 기술 결정을 맡은 개발 총괄이었습니다. 사내 AI 에이전트 도입 성과를 숫자로 정리해 투자사에 보고했습니다.",
  },
  {
    img: "ai",
    name: "AI 개발 생산성 컨설턴트",
    role: "AI 코딩과 개발 조직 전환",
    alt: "AI 개발 생산성 컨설턴트 일러스트",
    desc: "10년 넘게 백엔드와 풀스택을 개발해 온 엔지니어입니다. 코드 분석, 버그 수정, 테스트 작성을 AI가 맡는 개발 프로세스를 직접 설계해 개발 조직의 일하는 방식을 바꿨고, 고객사 개발 조직의 AI 전환을 맡습니다.",
  },
];

function Marquee({
  rows,
  dir,
  muted,
}: {
  rows: string[][];
  dir: "l" | "r";
  muted?: boolean;
}) {
  const set = (hidden: boolean) => (
    <span className={s.mqSet} aria-hidden={hidden || undefined}>
      {rows.map(([name, note]) => (
        <span key={name} className={s.mqItem}>
          <strong className={muted ? s.mqMuted : undefined}>{name}</strong>{" "}
          <span>{note}</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className={s.mq}>
      <div className={dir === "l" ? s.mqL : s.mqR}>
        {set(false)}
        {set(true)}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className={s.home}>
      <section id="top" className={s.hero}>
        <Image
          src="/assets/images/ax/home/ax-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={s.heroBg}
        />
        <div aria-hidden="true" className={s.heroShade} />
        <div className={s.heroInner}>
          <header className={s.header}>
            <a href="#top" aria-label="proofer AX 홈" className={s.brand}>
              <Image
                src="/assets/images/branding.svg"
                alt=""
                width={22}
                height={23}
              />
              <span>AX</span>
            </a>
            <nav aria-label="주 메뉴" className={s.nav}>
              <a href="#team">팀</a>
              <a href="#org">AI Native 조직</a>
              <a href="#start">커리큘럼</a>
              <a href="#faq">자주 묻는 질문</a>
              <AxInquireButton className={s.navCta}>
                무료상담 신청
              </AxInquireButton>
            </nav>
          </header>
          <div className={s.heroCopy}>
            <h1>
              <span>AI를 들였는데</span>
              <span>일하는 방식은 그대로라면</span>
            </h1>
            <p>
              프루퍼 주식회사는 회사 안에 직접 들어가 AI로 바꿀 업무를 고르고,
              회사 자료와 AI를 연결하고, 조직이 그 방식대로 일하게 만듭니다.
            </p>
            <div className={s.heroBtns}>
              <AxInquireButton className={s.btnPrimary}>
                무료상담 신청
              </AxInquireButton>
              <a href="#start" className={s.btnGhost}>
                커리큘럼 보기
              </a>
            </div>
          </div>
          <div className={s.strip}>
            {SERVICES.map((v) => (
              <a key={v.title} href={v.href}>
                <strong>{v.title}</strong>
                <span>{v.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className={s.cases}>
        <div className={s.casesHead}>
          <h2>함께한 곳</h2>
        </div>
        <div className={s.mqRows}>
          <Marquee rows={CASES_ROW1} dir="l" />
          <Marquee rows={CASES_ROW2} dir="r" muted />
        </div>
      </section>

      <section id="team" className={s.team}>
        <div className={s.teamInner}>
          <div className={s.teamIntro}>
            <h2>
              회사를 직접 키워서
              <br />
              팔아 본 팀입니다
            </h2>
            <p>
              저희가 고객사에 권하는 방식은 모두 직접 경영을 맡았던 회사에서
              먼저 써 본 것입니다. 그 회사에서 개발 조직에 AI 에이전트를 들였고,
              그에 맞춰 채용과 평가 기준을 고쳤고, 회사는 매각까지 갔습니다. 그
              과정에서 겪은 시행착오를 고객사 프로젝트에 그대로 가져갑니다.
            </p>
            <ul>
              {STRENGTHS.map((v) => (
                <li key={v.title}>
                  <strong>{v.title}</strong>
                  <span>{v.desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.members}>
            {MEMBERS.map((m) => (
              <div key={m.img} className={s.member}>
                <Image
                  src={`/assets/images/ax/home/${m.img}.jpg`}
                  alt={m.alt}
                  width={72}
                  height={72}
                />
                <div>
                  <div className={s.memberHead}>
                    <strong>{m.name}</strong>
                    <span>{m.role}</span>
                  </div>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 다음 티켓: #org, #start, 결과 확인, #faq, #contact */}

      <footer className={s.footer}>
        <div>
          <span>프루퍼 주식회사, 대표 임한솔</span>
          <span>사업자등록번호 337-81-03650</span>
          <span>서울 강남구 강남대로112길 47, 2층 421A호</span>
          <a href="https://proofer.tech">proofer.tech</a>
          <span>info@proofer.tech</span>
        </div>
      </footer>
    </div>
  );
}
