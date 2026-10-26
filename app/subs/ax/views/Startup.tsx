import React from "react";
import Image from "next/image";
import Link from "next/link";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import Arrow from "@/app/subs/ax/components/Arrow";
import { HeroBg, DeepBg } from "@/app/subs/ax/components/SegBg";
import Faq from "@/app/subs/ax/components/Faq";
import { OPEN, SEGMENTS } from "@/app/subs/ax/segments";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

const PDF = SEGMENTS.startup.pdf;
const OTHER_HREF = generateSubdomainPath(OPEN.path, SUB_DOMAIN.ax);

export const FAQ: { q: string; a: string }[] = [
  {
    q: "회사 자료를 AI에 넣어도 괜찮습니까.",
    a: "실습 전에 AI에 넣지 않을 자료를 먼저 정하고, 쓰는 도구의 데이터 정책을 함께 확인합니다. 민감한 자료는 바꿔 넣거나 더미 데이터로 대체합니다.",
  },
  {
    q: "유료 구독이 꼭 있어야 합니까.",
    a: "팀이 이미 쓰는 도구로 진행하고, 실습에 필요한 요금제는 상담에서 미리 안내합니다.",
  },
  {
    q: "정리된 사업자료가 많지 않습니다.",
    a: "사업계획서와 회사소개서면 시작할 수 있습니다. 부족하면 예시 창업팀 자료로 먼저 실습하고 같은 방법을 자기 자료에 옮깁니다.",
  },
  {
    q: "개발자가 없는 팀도 할 수 있습니까.",
    a: "됩니다. 코딩 에이전트 모듈만 개발자나 기술 담당이 있을 때 붙입니다.",
  },
  {
    q: "견적과 일정은 언제 나옵니까.",
    a: "무료 AX 상담에서 팀 규모와 지금 가장 시간이 드는 일을 듣고 구성과 견적, 일정을 함께 드립니다.",
  },
];

/** 구조화 데이터(Course) 문면 */
export const COURSES: { name: string; description: string }[] = [
  {
    name: "Founder Session",
    description:
      "대표와 1:1로 앉아 대표가 매주 붙잡고 있는 일을 회사 자료로 끝까지 돌려 보고 회사 기준 문서를 만듭니다.",
  },
  {
    name: "Team Workshop",
    description:
      "팀 전원이 같은 회사 자료를 AI에 연결하고 직무별 반복 업무를 실습하는 팀 워크숍입니다.",
  },
  {
    name: "Build Sprint",
    description:
      "팀이 고른 반복 업무를 하루 만에 실제 데이터로 돌아가는 도구로 바꾸는 과정입니다.",
  },
  {
    name: "AI Native 업무환경 구축",
    description:
      "팀이 쓰는 업무툴을 Claude와 연동하고 기업 온톨로지를 구축해, 온톨로지 기반으로 일하는 시스템까지 만들고 나옵니다.",
  },
];

export default function StartupView() {
  return (
    <>
      <section id="top" className="hero">
        <HeroBg seg="startup" />
        <div className="hero-in">
          <div className="hero-copy">
            <div className="eyebrow">AX CURRICULUM / FOR STARTUPS</div>
            <h1 className="h1">
              우리 회사를 아는 AI,
              <br />
              <em>오후 반나절이면</em>
              <br />
              팀에 생깁니다
            </h1>
            <p className="lead">
              회사의 사업자료를 AI에 연결하고, 대표와 팀이 다음 날부터 그
              환경에서 일합니다.
            </p>
            <div className="cta">
              <AxInquireButton className="btn">AX 도입 상담</AxInquireButton>
              <a className="btn ghost" href={PDF}>
                커리큘럼 다운로드
              </a>
            </div>
            <div className="proof">
              <div>
                <b>1:1, 3시간</b>
                <span>대표와 Founder Session</span>
              </div>
              <div>
                <b>하루</b>
                <span>Build Sprint로 반복 업무를 도구로</span>
              </div>
              <div>
                <b>2주</b>
                <span>상담부터 교육 완료까지</span>
              </div>
            </div>
          </div>
          <div data-scene="hero-startup" className="panel hero-flow">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <span className="tag">INPUT / 사업자료 폴더</span>
              <span className="chip">사업계획서</span>
              <span className="chip">회사소개서</span>
              <span className="chip">IR 자료</span>
              <span className="chip">제품 문서</span>
              <span className="chip">회의록</span>
              <span className="tag" style={{ marginTop: "10px" }}>
                RULES / 회사 기준
              </span>
              <span className="chip acc">최신 수치, 쓰는 용어</span>
              <span className="chip acc">AI에 넣지 않을 자료</span>
            </div>
            <span className="arrow">
              <i className="pkt" />
              <i className="pkt" />
              <i className="pkt" />
              <Arrow size={24} />
            </span>
            <div
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                background: "#f6f7fb",
                boxShadow: "0 24px 48px -20px rgba(0, 0, 0, 0.6)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  padding: "10px 12px",
                  background: "#e2e6ee",
                }}
              >
                <i
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#c3c9d6",
                    display: "block",
                  }}
                ></i>
                <i
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#c3c9d6",
                    display: "block",
                  }}
                ></i>
                <i
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#c3c9d6",
                    display: "block",
                  }}
                ></i>
              </div>
              <div
                className="rot"
                data-rot
                role="img"
                aria-label="수강생이 실습에서 만든 자사 소개 페이지들, 식별되지 않게 흐리게 처리"
              >
                <Image
                  src="/assets/images/ax/outputs-blur-1.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 960px) 100vw, 640px"
                />
                <Image
                  src="/assets/images/ax/outputs-blur-2.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 960px) 100vw, 640px"
                />
                <Image
                  src="/assets/images/ax/outputs-blur-3.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 960px) 100vw, 640px"
                />
                <Image
                  src="/assets/images/ax/outputs-blur-4.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 960px) 100vw, 640px"
                />
                <Image
                  src="/assets/images/ax/outputs-blur-5.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 960px) 100vw, 640px"
                />
                <i className="rot-cover" />
              </div>
              <div
                style={{
                  padding: "10px 16px",
                  background: "#0f2a1f",
                  color: "#9be3b4",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                OUTPUT / 수강생이 만든 자사 소개 페이지
              </div>
            </div>
          </div>
        </div>
        <div className="strip">
          <div className="strip-in">
            <span className="tag">TOOLS</span>
            <b>Claude, ChatGPT, Gemini, 웍스AI</b>
            <b>Claude Code, Antigravity, Codex</b>
            <span>팀이 이미 쓰는 도구에서 시작합니다</span>
          </div>
        </div>
      </section>

      <div className="deep">
        <DeepBg seg="startup" />{" "}
        <section id="problem" className="sec">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">PROBLEM</div>
              <h2 className="h2">
                대표는 AI를 쓰는데
                <br />
                팀은{" "}
                <span className="hl" data-scene="hl">
                  <i />
                  그대로인가요?
                </span>
              </h2>
              <p>대표가 찾은 방법이 팀의 일하는 방식으로 넘어가지 않습니다.</p>
            </div>
            <div className="grid3">
              <div className="card">
                <span className="num">01</span>
                <h3>대표 혼자의 실험</h3>
                <p>
                  대표가 찾은 방법이 문서로 정리되지 않고, 팀원은 각자 처음부터
                  다시 시작합니다.
                </p>
              </div>
              <div className="card">
                <span className="num">02</span>
                <h3>우리 회사를 모르는 AI</h3>
                <p>
                  사업계획서는 여러 벌이고 용어는 피봇 전후로 섞여, 쓸 때마다
                  회사 설명부터 다시 넣습니다.
                </p>
              </div>
              <div className="card">
                <span className="num">03</span>
                <h3>배울 시간이 없음</h3>
                <p>
                  몇 주짜리 과정은 출시 일정과 부딪힙니다. 짧게 배우고 다음 날
                  바로 써야 합니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="view" className="sec alt">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">OUR VIEW</div>
              <h2 className="h2">
                우리 회사 자료를 읽는 AI부터
                <br />
                만듭니다
              </h2>
            </div>
            <div className="journey" data-scene="chain">
              <span className="chip acc token" aria-hidden="true" />
              <div className="jstep">
                <span className="num">INPUT</span>
                <b>사업자료 폴더</b>
                <span className="t">
                  사업계획서, 회사소개서, IR 자료, 제품 문서, 회의록
                </span>
              </div>
              <span className="arrow">
                <Arrow size={22} />
              </span>
              <div className="jstep">
                <span className="num">RULES</span>
                <b>회사 기준 문서</b>
                <span className="t">
                  최신 수치, 쓰는 용어와 버린 용어, 브랜드 표현, AI에 넣지 않을
                  자료
                </span>
              </div>
              <span className="arrow">
                <Arrow size={22} />
              </span>
              <div className="jstep key">
                <span className="num">OUTPUT</span>
                <b>회사 맥락의 결과물</b>
                <span className="t">
                  소개자료, 제안서, 지원사업 서류 초안, 고객 응대 초안
                </span>
              </div>
            </div>
            <div className="grid3">
              <div className="card">
                <h3>최신 문서를 그때그때 읽습니다</h3>
                <p>
                  모델을 따로 학습시키지 않아, 자료를 고치면 다음 답부터
                  반영됩니다.
                </p>
              </div>
              <div className="card">
                <h3>넣을 자료는 대표가 정합니다</h3>
                <p>
                  AI는 최신판 문서를 찾고, 무엇을 넣고 뺄지는 대표가 정합니다.
                </p>
              </div>
              <div className="card">
                <h3>다음 날 쓰는 산출물</h3>
                <p>
                  실습 자료는 수강생 본인의 사업자료이고, 만든 업무환경을 그대로
                  들고 갑니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="flow" className="sec" data-scene="journey">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">CURRICULUM FLOW</div>
              <h2 className="h2">
                교육으로 시작해
                <br />
                AI Native 업무환경까지
              </h2>
              <p>단계별로 따로 도입할 수 있습니다.</p>
            </div>
            <div className="journey">
              <span className="chip acc hchip" aria-hidden="true" />
              <span className="chip acc hchip" aria-hidden="true" />
              <a className="jstep key" href="#founder">
                <span className="num">STEP 01 / 교육</span>
                <b>AX Education</b>
                <span className="t">
                  Founder Session, Team Workshop, Build Sprint
                </span>
                <span className="out">회사 기준 문서, 반복 업무 목록</span>
              </a>
              <span className="arrow">
                <i className="seg" />
                <Arrow size={22} />
              </span>
              <div className="jstep">
                <span className="num">STEP 02 / 컨설팅</span>
                <b>AX Consulting</b>
                <span className="t">
                  AX 진단으로 우선순위와 연동할 업무툴을 정합니다.
                </span>
                <span className="out">우선순위와 업무툴 목록</span>
              </div>
              <span className="arrow">
                <i className="seg" />
                <Arrow size={22} />
              </span>
              <a className="jstep" href="#workspace">
                <span className="num">STEP 03 / 구축</span>
                <b>AI Native Workspace</b>
                <span className="t">
                  업무툴을 Claude와 연동하고 기업 온톨로지를 구축합니다.
                </span>
                <span className="out">돌아가는 업무환경</span>
              </a>
            </div>
          </div>
        </section>
        <section id="founder" className="sec alt">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">01 / FOUNDER SESSION</div>
              <h2 className="h2">
                대표 업무부터 AI로
                <br />
                다시 짭니다
              </h2>
              <p>
                대표와 1:1로 앉아, 대표가 매주 붙잡고 있는 일을 실제 자료로
                끝까지 돌려 봅니다.
              </p>
            </div>
            <div className="grid4 c5">
              <div className="card">
                <span className="num">01</span>
                <h3>반입 기준</h3>
                <p>넣을 자료, 바꿔서 넣을 자료, 넣지 않을 자료를 나눕니다.</p>
                <div className="outc">
                  <b>반입 기준 카드</b>
                </div>
              </div>
              <div className="card">
                <span className="num">02</span>
                <h3>업무 해부</h3>
                <p>최근 4주 반복 업무에서 취합, 대조, 검증 지점을 짚습니다.</p>
                <div className="outc">
                  <b>자동화 후보와 선정 업무</b>
                </div>
              </div>
              <div className="card" style={{ borderColor: "var(--acc)" }}>
                <span className="num">03</span>
                <h3>빌드</h3>
                <p>선정한 업무를 실제 자료로 끝까지 돌립니다.</p>
                <div className="outc">
                  <b>돌아가는 업무 1건</b>
                </div>
              </div>
              <div className="card">
                <span className="num">04</span>
                <h3>이양</h3>
                <p>개인용 결과물을 팀원이 그대로 쓰는 문서로 다듬습니다.</p>
                <div className="outc">
                  <b>팀 배포본</b>
                </div>
              </div>
              <div className="card">
                <span className="num">05</span>
                <h3>약속</h3>
                <p>30일 사용 약속과 팀에 넘길 우선순위를 정합니다.</p>
                <div className="outc">
                  <b>팀 AI 우선순위</b>
                </div>
              </div>
            </div>
            <div
              className="strip"
              style={{ border: "1px solid var(--line)", borderRadius: "16px" }}
            >
              <div className="strip-in" style={{ padding: "18px 24px" }}>
                <span className="tag">대상</span>
                <b>대표, 공동창업자</b>
                <span className="tag">형식</span>
                <b>1:1, 회당 3시간</b>
                <span className="tag">산출물</span>
                <b>회사 기준 문서</b>
              </div>
            </div>
          </div>
        </section>
        <section id="workshop" className="sec">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">02 / TEAM WORKSHOP</div>
              <h2 className="h2">
                팀 전원이 같은 회사 자료로
                <br />
                실습합니다
              </h2>
              <p>수업 대부분을 실습에 쓰고, 모듈은 팀 상황에 맞춰 고릅니다.</p>
            </div>
            <div className="grid4" data-scene="mods">
              <div className="mod">
                <div className="lv">
                  <span className="chip acc">W1</span>
                  <span className="tag">전 팀원</span>
                </div>
                <h3>기본기와 선 긋기</h3>
                <div className="dur">1 ~ 2시간</div>
                <div className="bar">
                  <span style={{ width: "20%" }}></span>
                </div>
                <div className="outc">
                  <span className="tag">산출물</span>
                  <b>팀 AI 사용 기준</b>
                </div>
              </div>
              <div className="mod">
                <div className="lv">
                  <span className="chip acc">W2</span>
                  <span className="tag">전 팀원</span>
                </div>
                <h3>회사 자료 연결</h3>
                <div className="dur">2 ~ 3시간</div>
                <div className="bar">
                  <span style={{ width: "35%" }}></span>
                </div>
                <div className="outc">
                  <span className="tag">산출물</span>
                  <b>각자의 회사 AI 업무환경</b>
                </div>
              </div>
              <div className="mod">
                <div className="lv">
                  <span className="chip acc">W3</span>
                  <span className="tag">영업, 마케팅, 운영, CS</span>
                </div>
                <h3>직무 실습</h3>
                <div className="dur">직무별 반일</div>
                <div className="bar">
                  <span style={{ width: "55%" }}></span>
                </div>
                <div className="outc">
                  <span className="tag">산출물</span>
                  <b>직무별 재사용 요청문과 워크플로</b>
                </div>
              </div>
              <div className="mod">
                <div className="lv">
                  <span className="chip acc">W4</span>
                  <span className="tag">개발자, 기술 담당</span>
                </div>
                <h3>코딩 에이전트</h3>
                <div className="dur">1일</div>
                <div className="bar">
                  <span style={{ width: "80%" }}></span>
                </div>
                <div className="outc">
                  <span className="tag">산출물</span>
                  <b>팀이 쓰는 작은 도구 또는 에이전트</b>
                </div>
                <details className="more">
                  <summary>자세히 +</summary>
                  <p>개발자가 없는 팀은 이 모듈을 빼고 진행합니다.</p>
                </details>
              </div>
            </div>
          </div>
        </section>
        <section id="sprint" className="sec alt">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">03 / BUILD SPRINT</div>
              <h2 className="h2">
                반복 업무를 하루 만에
                <br />
                돌아가는 도구로
              </h2>
              <p>
                줄어든 시간, 실제 데이터로 돌아가는지, 다른 팀원도 쓸 수
                있는지로 결과를 봅니다.
              </p>
            </div>
            <div className="rows" data-scene="rows">
              <div>
                <b>문제 고르기</b>
                <span className="soft">
                  반복 업무 목록에서 과제를 정하고 하루에 끝낼 크기로 자릅니다
                </span>
                <span className="r">과제 정의서</span>
              </div>
              <div>
                <b>준비</b>
                <span className="soft">
                  도구를 세팅하고 데이터를 정리합니다
                </span>
                <span className="r">실습 환경</span>
              </div>
              <div>
                <b>빌드</b>
                <span className="soft">
                  코치와 함께 만들고 실제 데이터로 돌립니다
                </span>
                <span className="r">돌아가는 프로토타입</span>
              </div>
              <div>
                <b>시연과 회고</b>
                <span className="soft">
                  줄어든 시간을 재고 팀에 배포할지 정합니다
                </span>
                <span className="r">배포 후보와 다음 과제</span>
              </div>
            </div>
            <div className="handoff">
              <span className="tag">과제 예시</span>
              <span className="chip">문의 메일 분류와 답장 초안</span>
              <span className="chip">지원사업 공고와 요건 대조</span>
              <span className="chip">미팅 기록을 CRM 형식으로</span>
              <span className="chip">주간 지표 취합과 보고</span>
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
              <p>새 팀원도 첫날부터 회사 자료를 바로 찾아 씁니다.</p>
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
                <div className="tool">그 밖에 쓰는 툴</div>
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
                  <span className="chip">프로젝트</span>
                  <span className="chip">결정</span>
                  <span className="chip">정책</span>
                  <span className="chip">사람</span>
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
                  팀원
                  <br />
                  <span
                    className="muted"
                    style={{ fontSize: "13px", fontWeight: "400" }}
                  >
                    같은 회사 자료
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="case" className="sec alt">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">CASE / OO대학교 앵커사업단</div>
              <h2 className="h2">
                초기창업기업 대표들이
                <br />
                자기 사업자료로 만든 업무환경
              </h2>
              <p>
                2026년 10월, 예비창업자와 초기창업기업 대표가 자기 사업자료를
                AI에 연결하고 그 위에서 자사 소개 페이지를 만들었습니다.
              </p>
            </div>
            <div className="split split-stat">
              <div className="metric">
                <span className="tag">PARTICIPANTS</span>
                <div className="big">
                  <span className="cnt" data-to="33" data-dec="0">
                    33
                  </span>
                  <small>명</small>
                </div>
                <p>예비창업자와 초기창업기업 대표</p>
              </div>
              <div className="metric" style={{ borderColor: "var(--acc)" }}>
                <svg
                  className="donut"
                  width="52"
                  height="52"
                  viewBox="0 0 64 64"
                  fill="none"
                  aria-hidden="true"
                  data-ratio="0.97"
                >
                  <circle cx="32" cy="32" r="27" className="donut-bg" />
                  <circle
                    cx="32"
                    cy="32"
                    r="27"
                    className="donut-fg"
                    pathLength="1"
                    style={{ strokeDashoffset: 0.03 }}
                    transform="rotate(-90 32 32)"
                  />
                </svg>
                <span className="tag">COMPLETED</span>
                <div className="big" style={{ color: "var(--good)" }}>
                  <span className="cnt" data-to="32" data-dec="0">
                    32
                  </span>
                  <small>명</small>
                </div>
                <p>자사 소개 페이지까지 완성</p>
              </div>
              <div className="metric">
                <span className="tag">DURATION</span>
                <div className="big">
                  <span className="cnt" data-to="3.5" data-dec="1">
                    3.5
                  </span>
                  <small>시간</small>
                </div>
                <p>시연, 구축 실습, 적용 실습, 공유</p>
              </div>
              <div
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  position: "relative",
                  minHeight: "220px",
                }}
              >
                <Image
                  src="/assets/images/ax/open/lab.jpg"
                  alt="자기 사업자료로 실습 중인 수강생"
                  fill
                  sizes="(max-width: 960px) 100vw, 640px"
                />
              </div>
            </div>
            <div
              className="card"
              style={{
                flexDirection: "row",
                gap: "18px",
                alignItems: "flex-start",
              }}
            >
              <span className="ico">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 18h6M10 21h4" />
                  <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" />
                </svg>
              </span>
              <div>
                <h3>회사 기준을 적어 둔 참가자의 답이 정확했습니다</h3>
                <p>
                  최신판 문서는 AI가 찾았습니다. 같은 질문에서 답이 정확했던
                  참가자는 문서에 없는 기준을 따로 적어 둔 경우였습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="package" className="sec">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">PACKAGES &amp; ROADMAP</div>
              <h2 className="h2">
                필요한 단계만 골라
                <br />
                2주 안에 시작합니다
              </h2>
              <p>
                견적은 인원과 시간을 기준으로 잡습니다. 패키지 밖이라도 필요한
                모듈만 골라 구성할 수 있습니다.
              </p>
            </div>
            <div data-scene="pkgs" className="pkgs c4">
              <div className="pkg">
                <div className="layer l2">회사 기준 문서</div>
                <div className="layer l1">Founder Session</div>
                <div className="lab">
                  <b>파운더</b>대표 업무부터 바꿉니다
                </div>
              </div>
              <div className="pkg">
                <div className="layer l2">Team Workshop</div>
                <div className="layer l1">파운더</div>
                <div className="lab">
                  <b>팀 런치</b>팀이 같은 자료로 일합니다
                </div>
              </div>
              <div className="pkg">
                <div className="layer l3">Build Sprint</div>
                <div className="layer l2">Team Workshop</div>
                <div className="layer l1">파운더</div>
                <div className="lab">
                  <b>팀 빌드</b>반복 업무가 도구가 됩니다
                </div>
              </div>
              <div className="pkg final">
                <div className="layer l4">AI Native 업무환경 구축</div>
                <div className="layer l3">AX 진단</div>
                <div className="layer l2">팀 빌드</div>
                <div className="lab">
                  <b>AI Native</b>일하는 방식이 바뀝니다
                </div>
              </div>
            </div>
            <div className="grid2">
              <div className="card">
                <span className="tag">1주차</span>
                <p>
                  무료 AX 상담으로 범위를 정하고, Founder Session에서 회사 기준
                  문서를 만든 뒤 Team Workshop을 엽니다.
                </p>
              </div>
              <div className="card">
                <span className="tag">2주차</span>
                <p>
                  Build Sprint로 반복 업무를 도구로 바꾸고, 회고에서 다음에
                  자동화할 일을 고릅니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="faq" className="sec alt">
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="head">
              <div className="eyebrow">FAQ</div>
              <h2 className="h2">자주 묻는 질문</h2>
            </div>
            <Faq items={FAQ} />
          </div>
        </section>
      </div>

      <section id="contact" className="contact">
        <div className="in">
          <div
            className="eyebrow"
            style={{ color: "rgba(255, 255, 255, 0.8)" }}
          >
            PROOF OF VALUE
          </div>
          <h2>
            AI로 일하는 팀을 함께 만들
            <br />
            파트너를 찾고 계셨다면.
          </h2>
          <p>
            교육, 컨설팅, AI Native 업무환경 구축. 어느 단계부터 시작할지 함께
            정해봅시다.
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
