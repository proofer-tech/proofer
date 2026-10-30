import Image from "next/image";
import Link from "next/link";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import { homeMetadata } from "@/app/subs/ax/segmentMetadata";
import { SEGMENTS } from "@/app/subs/ax/segments";
import HomeMotion from "@/app/subs/ax/HomeMotion";
import Dock from "@/app/subs/ax/components/Dock";
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
    desc: "SI 부터 리디북스, 토스까지 10년이상 서비스를 만들어 온 엔지니어이자 경영자입니다. AI 에이전트가 사람의 개입 없이 긴 작업을 이어가는 업무 구조를 설계하고, 조직에 맞는 AI 업무환경을 구축해 실제 운영까지 연결합니다.",
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
    desc: "10년 가까이 여러 파트에 걸친 기술 결정 및 구현을 맡아 온 테크리드입니다. AI 도입 효과를 숫자로 측정하고, 경영진과 투자자가 판단할 수 있는 근거로 정리해낼 수 있습니다.",
  },
  {
    img: "ai",
    name: "AI 개발 생산성 컨설턴트",
    role: "AI 코딩과 개발 조직 전환",
    alt: "AI 개발 생산성 컨설턴트 일러스트",
    desc: "풀스택으로 10년 넘게 개발해 온 엔지니어입니다. AI 개발 프로세스를 직접 설계해 개발 조직의 일하는 방식을 바꿨고, 고객사 개발 조직의 AI 전환을 맡아 성공적으로 수행해냈습니다.",
  },
];

const ORG_STATS = [
  ["1년", "합류부터 매각까지 걸린 시간"],
  ["0번", "조직을 다시 짜는 동안 서비스가 멈춘 횟수"],
];

const ORG_ROWS = [
  [
    "직무를 새로 씁니다",
    "에이전트가 맡을 일과 사람이 판단할 일을 나누고, 팀마다 직무 설명을 고칩니다.",
  ],
  [
    "뽑는 기준을 바꿉니다",
    "AI를 얼마나 잘 쓰는지를 채용 공고, 면접 질문, 평가표에 넣습니다.",
  ],
  [
    "성과로 잡히게 합니다",
    "AI로 줄인 시간과 만든 결과물이 성과평가와 수습 평가에 반영되게 기준을 손봅니다.",
  ],
];

const CURRICULUM = [
  [
    "어디부터 손댈지 정하지 못했다면",
    "AX 진단과 컨설팅",
    "지금의 업무와 수익 구조를 보고 AI로 먼저 바꿀 일을 고릅니다. 파일럿으로 효과를 확인한 뒤 실행과 운영을 맡고, 거기에 맞춰 역할과 채용, 평가 체계도 손봅니다.",
    "AX 우선순위와 파일럿 결과",
  ],
  [
    "AI는 쓰는데 회사 자료와 따로 논다면",
    "AI 업무환경 구축",
    "이미 쓰는 Slack, 드라이브, 메일, 그룹웨어를 사내 정책 안에서 Claude와 연결합니다. 회사에서 쓰는 개념과 권한을 정리해 두면 AI가 회사 사정을 알고 일합니다.",
    "회사 자료와 연결된 AI 업무환경",
  ],
  [
    "팀마다 해보고 싶은 게 쌓여 있다면",
    "사내 AI 해커톤",
    "팀이 자기 업무를 들고 와서 실제로 돌아가는 시제품을 만듭니다. 업무 시간이 얼마나 줄었는지, 실제 데이터로 작동하는지, 다른 팀도 쓸 수 있는지를 보고 뽑고, 뽑힌 결과물은 사내 배포까지 갑니다.",
    "사내에 배포할 시제품",
  ],
  [
    "직원들이 AI를 거의 쓰지 않는다면",
    "직무별 AI 실무 전환",
    "임원과 팀장이 먼저 방향을 정하고, 직원들은 직무별로 자기 업무를 AI로 처리하는 방식을 익힙니다. 팀에서 쓸 에이전트까지 회사의 실제 업무 자료로 만듭니다. 교육 과정에는 분반마다 기술튜터가 붙습니다.",
    "직무별 프롬프트와 자동화 워크플로",
  ],
];

const COMPARE = [
  [
    "일이 끝나는 날",
    "교육 마지막 날, 보고서를 낸 날",
    "현업에서 쓰이고 숫자가 바뀐 것을 확인한 날",
  ],
  [
    "성과를 재는 기준",
    "수료율과 만족도",
    "줄어든 업무 시간, 영업이익, 기업가치",
  ],
  [
    "고객사에 남기는 것",
    "교안과 보고서",
    "사내에 배포된 도구, AI에 맞춰 바뀐 직무와 채용, 평가 기준",
  ],
  ["들어오는 사람", "외부 컨설턴트", "개발자와 HR 경영진이 한 팀으로"],
];

const FOLLOW_UP = [
  [
    "컨설팅과 구축",
    "파일럿으로 효과를 확인한 뒤 전사로 넓히고, 넓힌 뒤에도 운영 지표를 같이 봅니다. 효과는 영업이익과 기업가치 관점으로 정리해 드립니다.",
  ],
  [
    "해커톤",
    "뽑힌 결과물은 배포 스프린트로 사내에 실제로 배포하고, 다른 팀이 가져다 쓰는지까지 따라갑니다.",
  ],
  [
    "실무 전환",
    "시작 전후로 같은 문항의 설문을 돌려 변화를 재고, 만든 프롬프트와 워크플로가 현업에서 계속 쓰이는지 이후에도 확인합니다.",
  ],
];

const FAQ = [
  [
    "실습은 우리 회사 자료로 하나요?",
    "네. 밖으로 가져갈 수 있는 자료 범위 안에서 실습 과제를 만듭니다.",
  ],
  [
    "보안 때문에 외부 AI 도구를 쓰기 어렵습니다.",
    "사내에서 허용된 도구와 계정 정책에 맞춰 과정을 짭니다. Claude, ChatGPT, Gemini, 웍스AI, Claude Code, Codex 가운데 고르고, 사내 AI가 따로 있다면 그 도구로 실습합니다.",
  ],
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
      <HomeMotion />
      <Dock />
      <section id="top" className={s.hero}>
        <div data-m="hero-bg" className={s.heroBgWrap}>
          <Image
            src="/assets/images/ax/home/ax-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className={s.heroBg}
          />
        </div>
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
          <div data-m="hero-copy" className={s.heroCopy}>
            <h1>
              <span>
                <span data-m="hl">AI를 들였는데</span>
              </span>
              <span>
                <span data-m="hl">일하는 방식은 그대로라면</span>
              </span>
            </h1>
            <p data-m="hero-fade">
              프루퍼 주식회사는 회사 안에 직접 들어가 AI로 바꿀 업무를 고르고,
              회사 자료와 AI를 연결하고, 조직이 그 방식대로 일하게 만듭니다.
            </p>
            <div data-m="hero-fade" className={s.heroBtns}>
              <AxInquireButton className={s.btnPrimary}>
                무료상담 신청
              </AxInquireButton>
              <a href="#start" className={s.btnGhost}>
                커리큘럼 보기
              </a>
            </div>
          </div>
          <div data-m="hero-strip" className={s.strip}>
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
        <div data-m="rv" className={s.casesHead}>
          <h2>함께한 곳</h2>
        </div>
        <div className={s.mqRows}>
          <Marquee rows={CASES_ROW1} dir="l" />
          <Marquee rows={CASES_ROW2} dir="r" muted />
        </div>
      </section>

      <section id="team" className={s.team}>
        <div className={s.teamInner}>
          <div data-m="rv" className={s.teamIntro}>
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
          <div data-m="rvs" className={s.members}>
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

      <section id="org" className={s.org}>
        <div data-m="org-bg" className={s.orgBgWrap}>
          <Image
            src="/assets/images/ax/home/ax-org-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className={s.orgBg}
          />
        </div>
        <div aria-hidden="true" className={s.orgShade} />
        <div className={s.orgInner}>
          <div data-m="rv" className={s.split}>
            <h2>
              AI Native 조직은
              <br />
              채용과 평가부터 다릅니다
            </h2>
            <p>
              AI 도구를 들여도 직무 설명과 평가 기준이 예전 그대로면, AI로 일을
              줄인 사람이 오히려 일을 덜 한 사람처럼 보입니다. 그래서 도구와
              함께 조직 설계도 봅니다.
            </p>
          </div>
          <div data-m="rvs" className={s.stats}>
            {ORG_STATS.map(([n, d]) => (
              <div key={n}>
                <strong>{n}</strong>
                <span>{d}</span>
              </div>
            ))}
          </div>
          <div data-m="rvs" className={s.orgRows}>
            {ORG_ROWS.map(([t, d]) => (
              <div key={t}>
                <strong>{t}</strong>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="start" className={s.start}>
        <div className={s.startInner}>
          <div data-m="rv" className={`${s.split} ${s.splitDark}`}>
            <h2>
              지금 회사 상황에서
              <br />
              시작하시면 됩니다
            </h2>
            <p>
              어느 단계에서 시작하든 앞에서 만든 결과물을 다음 단계가
              이어받습니다. 어디에 해당하는지 애매하면 상담에서 같이 정해도
              됩니다.
            </p>
          </div>
          <div data-m="rvs" className={s.rowLinks}>
            {CURRICULUM.map(([when, title, desc, out]) => (
              <Link key={title} href="/enterprise" className={s.rowLink}>
                <span className={s.rowTitle}>
                  <span>{when}</span>
                  <strong>{title}</strong>
                </span>
                <span className={s.rowDesc}>{desc}</span>
                <span className={s.rowOut}>
                  <span>결과물</span>
                  <strong>{out}</strong>
                  <em>자세히 보기</em>
                </span>
              </Link>
            ))}
          </div>
          <div data-m="rv" className={s.sizes}>
            <strong>회사 규모별 커리큘럼</strong>
            <Link href="/startup">스타트업</Link>
            <Link href="/growth">중소, 중견기업</Link>
            <Link href="/enterprise">엔터프라이즈</Link>
            <Link href="/open">공개 교육</Link>
            <a href={SEGMENTS.enterprise.pdf} className={s.sizesPdf}>
              전체 커리큘럼 PDF
            </a>
          </div>
        </div>
      </section>

      <section className={s.proof}>
        <div className={s.proofInner}>
          <h2 data-m="rv">
            현업에서 쓰이고 숫자가 바뀔 때까지
            <br />
            같이 봅니다
          </h2>
          <p data-m="rv">
            결과물을 넘기는 날을 일의 끝으로 잡지 않습니다. 넘긴 뒤에도 실제로
            쓰이는지, 숫자가 바뀌는지를 정해 둔 기간 동안 함께 확인합니다.
          </p>
          <div data-m="rv" className={s.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">흔히 보는 AX 교육, 컨설팅</th>
                  <th scope="col">프루퍼 주식회사</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([k, a, b]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{a}</td>
                    <td>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div data-m="rvs" className={s.follow}>
            {FOLLOW_UP.map(([t, d]) => (
              <div key={t}>
                <strong>{t}</strong>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className={s.faq}>
        <div className={s.faqInner}>
          <h2 data-m="rv">자주 묻는 질문</h2>
          <div data-m="rvs" className={s.faqList}>
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={s.contact}>
        <div className={s.contactInner}>
          <div data-m="rv" className={s.contactCopy}>
            <h2>
              어디서 시작할지 모르겠다면
              <br />
              상담부터 받아 보세요
            </h2>
            <p>
              지금 하는 일, 교육 예산, 원하는 결과를 알려 주시면 맞는 단계를
              제안드립니다.
            </p>
          </div>
          <div className={s.heroBtns}>
            <AxInquireButton className={s.btnWhite}>
              무료상담 신청
            </AxInquireButton>
            <a href={SEGMENTS.enterprise.pdf} className={s.btnOutline}>
              커리큘럼 PDF 받기
            </a>
          </div>
        </div>
      </section>

      <footer className={s.footer}>
        <div>
          <span>프루퍼 주식회사, 대표 임한솔, 임덕만</span>
          <span>사업자등록번호 337-81-03650</span>
          <span>서울 강남구 강남대로112길 47, 2층 421A호</span>
          <a href="https://proofer.tech">proofer.tech</a>
          <span>info@proofer.tech</span>
        </div>
      </footer>
    </div>
  );
}
