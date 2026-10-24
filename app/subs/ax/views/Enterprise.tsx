import React from "react";
import Link from "next/link";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import Arrow from "@/app/subs/ax/components/Arrow";
import Faq from "@/app/subs/ax/components/Faq";
import { OPEN, SEGMENTS } from "@/app/subs/ax/segments";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

const PDF = SEGMENTS.enterprise.pdf;
const OTHER_HREF = generateSubdomainPath(OPEN.path, SUB_DOMAIN.ax);

export const FAQ: { q: string; a: string }[] = [
  {
    q: "교육이 끝나고 효과는 무엇으로 확인합니까.",
    a: "강의는 사전과 사후 설문을 같은 문항으로 돌리고 공유 보드의 실습 결과물을 함께 검토합니다. 해커톤은 절감 시간과 완성도, 재사용성, 배포 적합성으로 심사합니다. 컨설팅은 도입 뒤의 성과를 기업가치 관점에서 검증합니다.",
  },
  {
    q: "실습은 우리 회사 업무 자료로 합니까.",
    a: "수강생 본인의 업무 자료로 실습하는 것이 원칙입니다. 민감한 자료는 실습 전에 AI에 넣지 않을 자료로 정해 두고 더미 데이터로 대체합니다.",
  },
  {
    q: "사내 보안 정책상 외부 AI 도구를 쓰기 어렵습니다.",
    a: "됩니다. 실습 전에 AI에 넣지 않을 자료와 더미 데이터 원칙을 먼저 정합니다. 보안 정책을 새로 세워야 하면 AX 컨설팅에서 설계까지 맡습니다.",
  },
  {
    q: "이미 쓰는 AI 도구로 가르칩니까.",
    a: "고객사가 쓰는 도구에 맞춰 트랙을 고릅니다. L2는 Claude, Copilot, Gemini, L4는 Claude Code, Google Antigravity, Codex 가운데 고릅니다.",
  },
  {
    q: "견적과 일정은 언제 나옵니까.",
    a: "AX 도입 상담이 먼저입니다. 조직 규모와 목표를 듣고 커리큘럼 초안과 견적, 일정을 함께 드립니다.",
  },
];

/** 구조화 데이터(Course) 문면 */
export const COURSES: { name: string; description: string }[] = [
  {
    name: "AX 강의",
    description:
      "전 직원 리터러시 교육부터 직무별 실무 교육, 파워유저와 에이전트 교육까지 이어지는 사내 AI 교육입니다.",
  },
  {
    name: "AX 해커톤",
    description:
      "교육과 컨설팅을 잇는 사내 AI 해커톤입니다. 시연에서 끝내지 않고 성과로 이어지는 산출물을 만듭니다.",
  },
  {
    name: "AX 컨설팅",
    description:
      "진단부터 전환, 운영까지 이어지는 AI 전환 컨설팅입니다. 조직이 스스로 굴러가게 만드는 것을 목표로 합니다.",
  },
  {
    name: "AI Native 업무환경 구축",
    description:
      "임직원이 쓰는 업무툴을 Claude와 연동하고 기업 온톨로지를 구축해, 온톨로지 기반으로 일하는 시스템까지 만들고 나옵니다.",
  },
];

export default function EnterpriseView() {
  return (
    <>
      <section id="top" className="hero">
        <div className="hero-in">
          <div>
            <div className="eyebrow">AX CURRICULUM / FOR ENTERPRISE</div>
            <h1 className="h1">
              교육 예산이
              <br />
              <em>사내 도구로 남는</em>
              <br />
              AX 커리큘럼
            </h1>
            <p className="lead">
              강의로 시작해 해커톤과 컨설팅을 거쳐 AI Native 업무환경까지. 앞
              단계의 산출물을 받아 다음 단계를 시작합니다.
            </p>
            <div className="cta">
              <AxInquireButton className="btn">AX 도입 상담</AxInquireButton>
              <a className="btn ghost" href={PDF}>
                커리큘럼 다운로드
              </a>
            </div>
            <div className="proof">
              <div>
                <b>L1 ~ L4</b>
                <span>전 직원부터 AI 챔피언까지</span>
              </div>
              <div>
                <b>4주 ~ 8주</b>
                <span>PBL 인큐베이터로 파일럿까지</span>
              </div>
              <div>
                <b>주강사 + 튜터</b>
                <span>분반마다 기술튜터 배치</span>
              </div>
            </div>
          </div>
          <div className="panel">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <span className="tag">AX JOURNEY</span>
            </div>
            <div className="vsteps" data-scene="hero-ent">
              <i className="vline" />
              <div className="vstep">
                <span className="n">01</span>
                <div>
                  <b>AX Lecture</b>
                  <span className="o">직무 표준 프롬프트, 팀 배포 도구</span>
                </div>
                <span className="d">8시간 ~ 3일</span>
              </div>
              <div className="vstep">
                <span className="n">02</span>
                <div>
                  <b>AX Hackathon</b>
                  <span className="o">팀별 결과물, 사내 배포 후보</span>
                </div>
                <span className="d">하루 ~ 8주</span>
              </div>
              <div className="vstep">
                <span className="n">03</span>
                <div>
                  <b>AX Consulting</b>
                  <span className="o">AX 우선순위, 파일럿, 기업가치 검증</span>
                </div>
                <span className="d">진단부터 운영까지</span>
              </div>
              <div className="vstep last">
                <span className="n">04</span>
                <div>
                  <b>AI Native Workspace</b>
                  <span className="o">업무툴 연동, 기업 온톨로지</span>
                </div>
                <span className="d">구축 후 이관</span>
              </div>
            </div>
          </div>
        </div>
        <div className="strip">
          <div className="strip-in">
            <span className="tag">TOOLS</span>
            <b>Claude, ChatGPT, Gemini, 웍스AI</b>
            <b>Claude Code, Antigravity, Codex</b>
            <span>
              사내망 제약과 계정 정책에서 실제로 돌아가는 것을 고릅니다
            </span>
          </div>
        </div>
      </section>

      <section id="problem" className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">PROBLEM</div>
            <h2 className="h2">
              예산은 이미 집행되었는데,
              <br />
              일하는 방식은{" "}
              <span className="hl" data-scene="hl">
                <i />
                그대로인가요?
              </span>
            </h2>
            <p>
              수강생은 강의장에서는 감탄하지만 자리로 돌아오면 자기 업무에
              무엇을 어떻게 붙일지 막막해합니다.
            </p>
          </div>
          <div className="grid3">
            <div className="card">
              <span className="num">01</span>
              <h3>도구 사용법에서 멈춤</h3>
              <p>시연은 화려하지만 내 업무와 연결되지 않습니다.</p>
            </div>
            <div className="card">
              <span className="num">02</span>
              <h3>남는 자산이 없음</h3>
              <p>과정이 끝나면 워크시트도 프롬프트도 흩어집니다.</p>
            </div>
            <div className="card">
              <span className="num">03</span>
              <h3>성과로 이어지지 않음</h3>
              <p>영업이익과 기업가치까지 가는 경로가 없습니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="view" className="sec alt">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">OUR VIEW</div>
            <h2 className="h2">
              회사를 키워 매각까지 해 본 팀이
              <br />
              교육을 맡습니다
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 2fr)",
              gap: "16px",
            }}
          >
            <div className="metric" style={{ justifyContent: "center" }}>
              <span className="tag">FLAGSHIP RECORD</span>
              <div className="big" style={{ color: "var(--good)" }}>
                약{" "}
                <span className="cnt" data-to="1400" data-dec="0">
                  1,400
                </span>
                억
              </div>
              <p>
                어려운 시기에 합류해 1년 만에 팔리는 회사로 만들고 이끈 매각
                규모
              </p>
            </div>
            <div className="grid3">
              <div className="card">
                <h3>현업 구현까지 맡는 전문 FDE</h3>
                <p>
                  실습 예제는 현업에서 쓰던 것이고, 강의에서 나온 피드백을
                  기업에 적용합니다.
                </p>
              </div>
              <div className="card">
                <h3>실무를 고려한 솔루션 선택</h3>
                <p>고객사 환경에 맞는 도구 또는 SI를 중립적으로 권합니다.</p>
              </div>
              <div className="card">
                <h3>기업가치를 끌어올리는 지렛대</h3>
                <p>
                  교육에서 나온 결과물로 회사에 먼저 적용할 업무를 정합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="curriculum" className="sec" data-scene="journey">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">CURRICULUM SYSTEM</div>
            <h2 className="h2">
              강의로 시작해 컨설팅을 넘어
              <br />
              AI Native 업무환경까지
            </h2>
            <p>단계별로 따로 도입할 수 있습니다.</p>
          </div>
          <div className="journey">
            <span className="chip acc hchip" aria-hidden="true" />
            <span className="chip acc hchip" aria-hidden="true" />
            <span className="chip acc hchip" aria-hidden="true" />
            <a className="jstep" href="#lecture">
              <span className="num">STEP 01 / 저변 확대</span>
              <b>AX Lecture</b>
              <span className="t">
                임직원의 AI 활용력을 수준별로 끌어올립니다.
              </span>
              <span className="out">직무 표준 프롬프트와 워크플로</span>
            </a>
            <span className="arrow">
              <i className="seg" />
              <Arrow size={22} />
            </span>
            <a className="jstep" href="#hackathon">
              <span className="num">STEP 02 / 실전 전환</span>
              <b>AX Hackathon</b>
              <span className="t">
                실제 문제에 붙여 돌아가는 결과물을 만듭니다.
              </span>
              <span className="out">팀별 결과물과 배포 후보</span>
            </a>
            <span className="arrow">
              <i className="seg" />
              <Arrow size={22} />
            </span>
            <a className="jstep" href="#consulting">
              <span className="num">STEP 03 / 성과 실행</span>
              <b>AX Consulting</b>
              <span className="t">
                결과물을 실제 서비스와 성과로 연결합니다.
              </span>
              <span className="out">업무와 업무툴 목록</span>
            </a>
            <span className="arrow">
              <i className="seg" />
              <Arrow size={22} />
            </span>
            <a className="jstep key" href="#workspace">
              <span className="num">STEP 04 / 구축</span>
              <b>AI Native Workspace</b>
              <span className="t">
                업무툴을 연동하고 기업 온톨로지 위에서 일하는 환경을 만듭니다.
              </span>
              <span className="out">돌아가는 업무환경</span>
            </a>
          </div>
          <div className="handoff">
            <span className="tag">HANDOVER</span>
            <span className="chip">리더 세션 우선순위</span>
            <span className="chip">해커톤 결과물</span>
            <span className="arrow">
              <Arrow size={18} />
            </span>
            <span className="chip acc">AX 진단서</span>
            <span className="arrow">
              <Arrow size={18} />
            </span>
            <span className="chip acc">업무환경 설계안</span>
          </div>
        </div>
      </section>

      <section id="lecture" className="sec alt">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">01 / AX LECTURE</div>
            <h2 className="h2">
              사내 AI 교육을 전 직원 리터러시부터
              <br />
              파워유저 양성까지
            </h2>
          </div>
          <div className="grid4" data-scene="mods" data-stair>
            <div className="mod">
              <div className="lv">
                <span className="chip acc">L1</span>
                <span className="tag">전 직원</span>
              </div>
              <h3>AI 리터러시</h3>
              <div className="dur">8시간 ~ 1일</div>
              <div className="bar">
                <span style={{ width: "25%" }}></span>
              </div>
              <div className="outc">
                <span className="tag">산출물</span>
                <b>자기 업무 세 가지를 AI로 다시 설계한 워크시트</b>
              </div>
              <details className="more">
                <summary>자세히 +</summary>
                <p>
                  생성형 AI의 기본기, 프롬프트 작성법, 업무 적용 감각, 보안과
                  윤리 기준을 다룹니다. 민감한 데이터나 규제 업무에서 선을 긋는
                  법까지 실패 사례로 짚습니다.
                </p>
              </details>
            </div>
            <div className="mod">
              <div className="lv">
                <span className="chip acc">L2</span>
                <span className="tag">Claude, Copilot, Gemini 중 선택</span>
              </div>
              <h3>도구 실무</h3>
              <div className="dur">1일 ~ 2일</div>
              <div className="bar">
                <span style={{ width: "45%" }}></span>
              </div>
              <div className="outc">
                <span className="tag">산출물</span>
                <b>자기 반복 업무를 자동화한 워크플로</b>
              </div>
              <details className="more">
                <summary>자세히 +</summary>
                <p>
                  사무직 실무자가 선택한 도구로 문서와 데이터와 보고서 업무를
                  자동화합니다. 업무를 도구에 맞게 다시 설계하는 법에 초점을
                  둡니다.
                </p>
              </details>
            </div>
            <div className="mod">
              <div className="lv">
                <span className="chip acc">L3</span>
                <span className="tag">직무 조직 단위</span>
              </div>
              <h3>직무 특화</h3>
              <div className="dur">
                연구, 기획, 영업, 인사, 재무, 안전, 품질, 물류
              </div>
              <div className="bar">
                <span style={{ width: "65%" }}></span>
              </div>
              <div className="outc">
                <span className="tag">산출물</span>
                <b>직무 표준 프롬프트와 재사용 워크플로</b>
              </div>
              <details className="more">
                <summary>자세히 +</summary>
                <p>
                  부서의 실제 데이터와 문서로 실습하고, 만든 프롬프트와
                  워크플로는 같은 직무 구성원이 다시 쓰도록 정리합니다.
                </p>
              </details>
            </div>
            <div className="mod" style={{ borderColor: "var(--acc)" }}>
              <div className="lv">
                <span className="chip acc">L4</span>
                <span className="tag">사내 AI 챔피언</span>
              </div>
              <h3>파워유저와 에이전트</h3>
              <div className="dur">2일 ~ 3일</div>
              <div className="bar">
                <span style={{ width: "90%" }}></span>
              </div>
              <div className="outc">
                <span className="tag">산출물</span>
                <b>팀에 배포하는 작은 도구 또는 에이전트</b>
              </div>
              <details className="more">
                <summary>자세히 +</summary>
                <p>
                  고객사 스택에 맞춰 Claude Code, Google Antigravity, Codex
                  가운데 하나로 직접 만들고, 여러 에이전트를 엮고, 사내 시스템을
                  AI에 연결합니다.
                </p>
              </details>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
              gap: "16px",
            }}
          >
            <div className="card">
              <span className="tag">LEADERSHIP / 임원과 직책자, 2 ~ 3시간</span>
              <h3>리더 세션</h3>
              <p>
                AX 전략 판단, 투자 결정, 조직 도입 로드맵을 다루고 조직의 진짜
                문제를 발굴합니다.
              </p>
              <div className="outc">
                <span className="tag">산출물</span>
                <b>어디부터 도입할지 정한 자사 AX 우선순위</b>
              </div>
            </div>
            <div className="card">
              <span className="tag">운영 방식</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginTop: "4px",
                }}
              >
                <div>
                  <b>주강사 + 기술튜터</b>
                  <p>분반마다 기술튜터가 붙어 막힌 실습을 바로 함께 풉니다.</p>
                </div>
                <div>
                  <b>공유 보드 회수</b>
                  <p>실습 결과물을 한곳에 모아 조직 자산으로 남깁니다.</p>
                </div>
                <div>
                  <b>사전, 사후 설문</b>
                  <p>같은 문항으로 앞뒤를 재서 변화를 숫자로 확인합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hackathon" className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">02 / AX HACKATHON</div>
            <h2 className="h2">
              팀이 자기 업무를 들고 오는
              <br />
              사내 AI 해커톤
            </h2>
            <p>
              심사는 줄어든 업무 시간, 실제 데이터로 돌아가는지, 다른 팀으로
              넓힐 수 있는지로 합니다.
            </p>
          </div>
          <div className="panel" style={{ background: "var(--card)" }}>
            <div className="gantt" data-scene="gantt">
              <div className="grow">
                <b>스프린트</b>
                <div className="track">
                  <span style={{ width: "10%" }}>
                    <i />
                    <em>하루</em>
                  </span>
                </div>
                <span className="res">팀이 고른 문제의 프로토타입</span>
              </div>
              <div className="grow">
                <b>해커톤</b>
                <div className="track">
                  <span style={{ width: "22%" }}>
                    <i />
                    <em>이틀에서 사흘</em>
                  </span>
                </div>
                <span className="res">팀별 결과물과 심사</span>
              </div>
              <div className="grow">
                <b>PBL 인큐베이터</b>
                <div className="track">
                  <span style={{ width: "62%" }}>
                    <i />
                    <em>4주에서 8주</em>
                  </span>
                </div>
                <span className="res">파일럿 수준의 결과물</span>
              </div>
              <div className="grow">
                <b>콘테스트</b>
                <div className="track">
                  <span style={{ width: "100%" }}>
                    <i />
                    <em>시즌 단위</em>
                  </span>
                </div>
                <span className="res">사내 배포 후보 우승작</span>
              </div>
            </div>
          </div>
          <div className="grid3">
            <div className="card">
              <h3>사내 배포와 서비스 연결</h3>
              <p>쓸 만한 결과물을 사내 배포와 실제 서비스로 잇습니다.</p>
            </div>
            <div className="card">
              <h3>코치가 실전 빌더</h3>
              <p>막히는 지점에서 실제 구현을 함께 풉니다.</p>
            </div>
            <div className="card">
              <h3>우승작 배포 스프린트</h3>
              <p>
                우승작을 짧은 스프린트로 배포 수준까지 끌어올리는 옵션을 둡니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="consulting" className="sec alt">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">03 / AX CONSULTING</div>
            <h2 className="h2">
              AX 컨설팅으로 진단부터
              <br />
              운영까지 맡습니다
            </h2>
            <p>
              회사의 일하는 방식과 수익 구조를 AI로 다시 설계해 직접 만들고
              운영합니다.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
              gap: "24px",
              alignItems: "start",
            }}
          >
            <div
              data-scene="layers"
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <div
                className="card"
                style={{
                  padding: "20px 24px",
                  background: "var(--acc-soft)",
                  borderColor: "var(--acc)",
                }}
              >
                <span className="num">LAYER 03</span>
                <h3>진단과 전환</h3>
                <p>
                  현행 프로세스를 진단하고 AI 전환의 우선순위를 세워 파일럿을
                  설계합니다.
                </p>
              </div>
              <div className="card" style={{ padding: "20px 24px" }}>
                <span className="num">LAYER 02</span>
                <h3>개발과 구축</h3>
                <p>기획부터 앱, 서버, AI까지 직접 구현하고 검증합니다.</p>
              </div>
              <div className="card" style={{ padding: "20px 24px" }}>
                <span className="num">LAYER 01</span>
                <h3>비즈니스와 조직</h3>
                <p>
                  사업과 수익 구조를 다시 설계하고 채용과 육성, 역할을
                  재편합니다.
                </p>
              </div>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div className="card">
                <span className="tag">참여 방식</span>
                <div
                  className="steps"
                  data-scene="progress"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <i className="pdot" />
                  <span className="chip acc">진단</span>
                  <span className="arrow">
                    <Arrow size={16} />
                  </span>
                  <span className="chip acc">파일럿</span>
                  <span className="arrow">
                    <Arrow size={16} />
                  </span>
                  <span className="chip acc">실행과 운영</span>
                  <span className="arrow">
                    <Arrow size={16} />
                  </span>
                  <span className="chip acc">기업가치 검증</span>
                </div>
                <p>
                  비용은 진단 범위와 산출물, 실제 투입 일수를 기준으로
                  구성합니다.
                </p>
              </div>
              <div className="card">
                <span className="tag">AX 특화 서비스</span>
                <p>
                  AI 기반 개발 방식 이식, 사내 시스템과 문서를 AI에 연결하는
                  도구 구축, 흩어진 지식의 구조화, 반복 업무 자동화 워크플로,
                  규제와 민감 데이터 환경의 AI 도입 설계
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workspace" className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">04 / AI NATIVE WORKSPACE</div>
            <h2 className="h2">
              쓰던 업무툴 그대로
              <br />
              AI Native 업무환경으로
            </h2>
            <p>
              임직원이 이미 쓰는 업무툴을 사내망과 계정 정책 안에서 Claude와
              연동하고, 회사 맥락 위에서 일하는 환경을 구축합니다.
            </p>
          </div>
          <div className="onto" data-scene="onto">
            <i className="pkt" />
            <i className="pkt" />
            <i className="pkt" />
            <div className="col">
              <span className="tag">업무툴</span>
              <div className="tool">Slack</div>
              <div className="tool">Google Drive</div>
              <div className="tool">메일, 캘린더</div>
              <div className="tool">그룹웨어, 사내 시스템</div>
            </div>
            <div className="flow">
              <span>기여</span>
              <span className="arrow">
                <Arrow size={22} />
              </span>
            </div>
            <div className="core">
              <span className="tag">ONTOLOGY</span>
              <b>기업 온톨로지</b>
              <div className="chips">
                <span className="chip">고객</span>
                <span className="chip">제품</span>
                <span className="chip">조직</span>
                <span className="chip">결정</span>
                <span className="chip">규정</span>
                <span className="chip">업무 절차</span>
                <span className="chip">컨텍스트</span>
                <span className="chip">기록</span>
              </div>
            </div>
            <div className="flow">
              <span>활용</span>
              <span className="arrow">
                <Arrow size={22} />
              </span>
            </div>
            <div className="col">
              <div className="tool" style={{ borderColor: "var(--acc)" }}>
                Claude
                <br />
                <span
                  className="muted"
                  style={{ fontSize: "13px", fontWeight: "400" }}
                >
                  문서 작성, 답변, 분석
                </span>
              </div>
              <div className="tool">
                임직원
                <br />
                <span
                  className="muted"
                  style={{ fontSize: "13px", fontWeight: "400" }}
                >
                  조직별 권한
                </span>
              </div>
            </div>
          </div>
          <div className="grid4">
            <div className="card">
              <span className="num">01</span>
              <h3>연동</h3>
              <p>업무툴을 사내망과 계정 정책 안에서 Claude와 연결합니다.</p>
            </div>
            <div className="card">
              <span className="num">02</span>
              <h3>온톨로지</h3>
              <p>흩어진 대화와 문서를 회사 개념과 관계로 정리합니다.</p>
            </div>
            <div className="card">
              <span className="num">03</span>
              <h3>기여와 활용</h3>
              <p>업무툴이 기록을 더하고 동시에 꺼내 쓰도록 세팅합니다.</p>
            </div>
            <div className="card">
              <span className="num">04</span>
              <h3>업무 시스템</h3>
              <p>
                조직별 권한과 작업 규칙을 세팅하고 돌아가는 것을 확인한 뒤
                나옵니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="package" className="sec alt">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">ROADMAP &amp; PACKAGES</div>
            <h2 className="h2">필요한 단계부터 시작합니다</h2>
            <p>
              강의는 인원과 일수, 해커톤은 기간과 코치 규모와 결과물 수준,
              컨설팅과 구축은 진단 범위와 산출물 기준으로 견적을 잡습니다.
            </p>
          </div>
          <div
            data-scene="pkgs"
            className="pkgs"
            style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}
          >
            <div className="pkg">
              <div className="layer l1">전 직원 리터러시</div>
              <div className="layer l1">리더 세션</div>
              <div className="lab">
                <b>스타터</b>조직 전반의 인식 형성
              </div>
            </div>
            <div className="pkg">
              <div className="layer l2">AX 진단</div>
              <div className="layer l1">1:1 코칭</div>
              <div className="layer l1">리더 세션</div>
              <div className="lab">
                <b>리더십</b>의사결정 계층부터
              </div>
            </div>
            <div className="pkg">
              <div className="layer l2">해커톤</div>
              <div className="layer l1">직무 특화 강의</div>
              <div className="lab">
                <b>그로스</b>실전 전환
              </div>
            </div>
            <div className="pkg">
              <div className="layer l3">우승작 배포 스프린트</div>
              <div className="layer l2">AX 진단</div>
              <div className="layer l2">그로스 전 과정</div>
              <div className="lab">
                <b>트랜스폼</b>성과 실행 착수
              </div>
            </div>
            <div className="pkg final">
              <div className="layer l4">AI Native 업무환경 구축</div>
              <div className="layer l3">컨설팅 실행</div>
              <div className="layer l2">전 과정 롤아웃</div>
              <div className="lab">
                <b>AI Native</b>전사 전환
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="sec">
        <div className="wrap" style={{ maxWidth: "860px" }}>
          <div className="head">
            <div className="eyebrow">FAQ</div>
            <h2 className="h2">자주 묻는 질문</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="in">
          <div
            className="eyebrow"
            style={{ color: "rgba(255, 255, 255, 0.75)" }}
          >
            PROOF OF VALUE
          </div>
          <h2>
            성과로 이어지는 기업 AI 교육 업체를
            <br />
            찾고 계셨다면.
          </h2>
          <p>
            강의, 해커톤, 컨설팅, AI Native 업무환경 구축. 어느 지점부터
            시작할지 함께 정해봅시다.
          </p>
          <div className="cta">
            <AxInquireButton className="btn">AX 도입 상담</AxInquireButton>
            <a className="btn ghost" href={PDF}>
              커리큘럼 다운로드
            </a>
            <Link className="btn ghost" href={OTHER_HREF}>
              공개 교육 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
