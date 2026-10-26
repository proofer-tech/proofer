import React from "react";
import Link from "next/link";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import Arrow from "@/app/subs/ax/components/Arrow";
import { HeroBg, DeepBg } from "@/app/subs/ax/components/SegBg";
import Faq from "@/app/subs/ax/components/Faq";
import { OPEN, SEGMENTS } from "@/app/subs/ax/segments";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

const PDF = SEGMENTS.growth.pdf;
const OTHER_HREF = generateSubdomainPath(OPEN.path, SUB_DOMAIN.ax);

export const FAQ: { q: string; a: string }[] = [
  {
    q: "교육 예산이 따로 잡혀 있지 않습니다.",
    a: "반나절 진단 라이트로 작게 시작할 수 있고, 진단 대금은 이어지는 과정에서 차감합니다.",
  },
  {
    q: "팀장들이 이틀을 비우기 어렵습니다.",
    a: "팀장 과정은 1:1로 3시간씩 나눠 진행하고, 만든 결과물을 그날 바로 팀에 배포합니다.",
  },
  {
    q: "IT 담당자가 한두 명뿐입니다.",
    a: "L1부터 L3까지는 코드 없이 진행합니다. IT 담당자는 L4에서 사내 AI 챔피언으로 키웁니다.",
  },
  {
    q: "직원들이 이미 개인 계정으로 AI를 씁니다.",
    a: "막기 전에 기준을 먼저 정하고, 업무환경 구축 단계에서 회사 계정과 권한 안에서 쓰도록 세팅합니다.",
  },
  {
    q: "견적과 일정은 언제 나옵니까.",
    a: "무료 AX 상담에서 조직 규모와 반복 업무를 듣고 커리큘럼 초안과 견적, 일정을 함께 드립니다.",
  },
];

/** 구조화 데이터(Course) 문면 */
export const COURSES: { name: string; description: string }[] = [
  {
    name: "AX 교육",
    description:
      "전 직원 기본기부터 직무 특화, 팀장 1:1 밀착, 사내 AI 챔피언 양성과 해커톤까지 이어지는 중소-중견기업 AI 교육입니다.",
  },
  {
    name: "AX 컨설팅",
    description:
      "반나절 진단 라이트와 AX 진단으로 반복 업무를 가르고 AI 전환의 우선순위와 연동할 업무툴을 정합니다.",
  },
  {
    name: "AI Native 업무환경 구축",
    description:
      "회사가 쓰는 업무툴을 Claude와 연동하고 기업 온톨로지를 구축해, 임직원이 온톨로지 기반으로 일하는 시스템까지 만들고 나옵니다.",
  },
];

export default function GrowthView() {
  return (
    <>
      <section id="top" className="hero">
        <HeroBg seg="growth" />
        <div className="hero-in">
          <div className="hero-copy">
            <div className="eyebrow">AX CURRICULUM / FOR GROWING COMPANIES</div>
            <h1 className="h1">
              엑셀로 옮기던 일부터
              <br />
              <em>AI에 넘깁니다</em>
            </h1>
            <p className="lead">
              사람을 더 뽑기 전에, 메신저로 받아 엑셀에 옮겨 적던 일을 AI로
              줄이고 팀장이 스스로 판단하는 구조를 만듭니다.
            </p>
            <div className="cta">
              <AxInquireButton className="btn">AX 도입 상담</AxInquireButton>
              <a className="btn ghost" href={PDF}>
                커리큘럼 다운로드
              </a>
            </div>
            <div className="proof">
              <div>
                <b>전사 배포</b>
                <span>B사, 한 팀에서 시작해 전사로 확대 중</span>
              </div>
              <div>
                <b>13%</b>
                <span>변경 작업 중 에이전트 수행</span>
              </div>
              <div>
                <b>하루</b>
                <span>사업계획 23차 실측 작성</span>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="ba" data-scene="hero-growth">
              <div className="side">
                <span className="tag">BEFORE / 손으로 옮기는 일</span>
                <div className="msg">
                  팀장님, 3월 2주 채널별 실적 엑셀로 정리해서 올려주세요
                </div>
                <div className="msg">
                  휴가 신청 메신저로 드렸어요, 근태표에 반영 부탁드립니다
                </div>
                <div className="cells">
                  <span>채널</span>
                  <span>3/9</span>
                  <span>3/10</span>
                  <span>합계</span>
                  <span>A몰</span>
                  <span>1,240</span>
                  <span className="x">?</span>
                  <span className="x">#REF</span>
                  <span>B몰</span>
                  <span className="x">?</span>
                  <span>860</span>
                  <span className="x">#REF</span>
                </div>
              </div>
              <span className="arrow">
                <Arrow size={24} />
              </span>
              <div className="side">
                <span className="tag">AFTER / 워크플로가 하는 일</span>
                <div className="report">
                  <b style={{ fontSize: "15px" }}>주간 채널 실적 보고</b>
                  <div className="line">
                    <span>
                      <svg
                        className="ck"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8.5l3.2 3.2L13 4.8" pathLength="1" />
                      </svg>
                      취합
                    </span>
                    <b>코드로 계산</b>
                  </div>
                  <div className="line">
                    <span>
                      <svg
                        className="ck"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8.5l3.2 3.2L13 4.8" pathLength="1" />
                      </svg>
                      해석
                    </span>
                    <b>AI가 요약</b>
                  </div>
                  <div className="line">
                    <span>
                      <svg
                        className="ck"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8.5l3.2 3.2L13 4.8" pathLength="1" />
                      </svg>
                      검증
                    </span>
                    <b>원본과 대조</b>
                  </div>
                  <span className="soft" style={{ fontSize: "12.5px" }}>
                    팀장 작업: 결과 확인과 판단
                  </span>
                </div>
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
              회사가 이미 쓰는 엑셀, SaaS, 계정 정책 안에서 실제로 돌아가는
              도구를 고릅니다
            </span>
          </div>
        </div>
      </section>

      <div className="deep">
        <DeepBg seg="growth" />{" "}
        <section id="problem" className="sec">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">PROBLEM</div>
              <h2 className="h2">
                사람은 늘었는데
                <br />
                일은 여전히 손으로{" "}
                <span className="hl" data-scene="hl">
                  <i />
                  옮기고 있나요?
                </span>
              </h2>
              <p>
                50명에서 300명 사이 회사는 큰 시스템을 새로 들이기는 부담스럽고,
                손으로 옮기는 일은 인원만큼 늘어납니다.
              </p>
            </div>
            <div className="grid3">
              <div className="card">
                <span className="num">01</span>
                <h3>대표에게 몰리는 판단</h3>
                <p>
                  작은 결정까지 대표에게 올라와, 대표 일정이 비어야 일이
                  진행됩니다.
                </p>
              </div>
              <div className="card">
                <span className="num">02</span>
                <h3>엑셀과 메신저 사이의 수작업</h3>
                <p>
                  근태와 휴가, 구매 요청, 채널별 실적을 메신저로 받아 엑셀에
                  다시 옮겨 적습니다.
                </p>
              </div>
              <div className="card">
                <span className="num">03</span>
                <h3>혼자 버티는 IT 담당</h3>
                <p>
                  담당자 한두 명이 요청을 다 받지 못하는 사이, 팀원은 개인 계정
                  AI에 회사 데이터를 넣기 시작합니다.
                </p>
              </div>
            </div>
            <div className="grid4">
              <div className="card" style={{ padding: "22px" }}>
                <span className="tag">브랜드와 커머스</span>
                <p>채널별 상품 등록, 상세페이지 수정, 리뷰와 CS 응대</p>
              </div>
              <div className="card" style={{ padding: "22px" }}>
                <span className="tag">제조</span>
                <p>품질 실적 취합, 월간 실적 보고, 인증과 표시사항 서류 대조</p>
              </div>
              <div className="card" style={{ padding: "22px" }}>
                <span className="tag">유통</span>
                <p>거래처별 단가와 재고 취합, 발주 수량 정리</p>
              </div>
              <div className="card" style={{ padding: "22px" }}>
                <span className="tag">경영지원</span>
                <p>근태와 급여 검증, 구매 요청과 비품 관리</p>
              </div>
            </div>
          </div>
        </section>
        <section id="view" className="sec alt">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">OUR VIEW</div>
              <h2 className="h2">
                AI가 숫자를 어림하지 않게
                <br />
                계산과 검증 절차를 함께 만듭니다
              </h2>
            </div>
            <div className="journey" data-scene="chain">
              <span className="chip acc token" aria-hidden="true" />
              <div className="jstep">
                <span className="num">NUMBERS</span>
                <b>합계와 비율 계산</b>
                <span className="t">
                  합계와 비율은 AI가 어림하지 않게 수식과 코드로 계산합니다.
                </span>
              </div>
              <span className="arrow">
                <Arrow size={22} />
              </span>
              <div className="jstep">
                <span className="num">MEANING</span>
                <b>결과 해석과 요약</b>
                <span className="t">
                  계산된 결과를 읽고 요약하고 다음 조치를 제안하는 일을
                  맡깁니다.
                </span>
              </div>
              <span className="arrow">
                <Arrow size={22} />
              </span>
              <div className="jstep key">
                <span className="num">CHECK</span>
                <b>원본 대조 검증</b>
                <span className="t">
                  결과를 원본 데이터와 기계적으로 맞춰 보는 절차를 함께
                  만듭니다.
                </span>
              </div>
            </div>
            <div className="grid3">
              <div className="card">
                <h3>현업에서 만들어 본 FDE</h3>
                <p>
                  실습 예제는 현업에서 쓰던 것이고, 피드백을 회사 업무에
                  적용하는 일까지 함께 합니다.
                </p>
              </div>
              <div className="card">
                <h3>회사 규모에 맞는 도구 선택</h3>
                <p>
                  큰 시스템 전에, 이미 쓰는 엑셀과 SaaS 위에서 풀 수 있는 것부터
                  고릅니다.
                </p>
              </div>
              <div className="card">
                <h3>영업이익으로 잇는 관점</h3>
                <p>
                  줄어든 시간과 비용을 숫자로 확인하고 다음 투자 판단에 씁니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="flow" className="sec" data-scene="journey">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">CURRICULUM SYSTEM</div>
              <h2 className="h2">
                교육과 컨설팅을 넘어
                <br />
                AI Native 업무환경까지
              </h2>
              <p>한 단계씩 도입할 수 있습니다.</p>
            </div>
            <div className="journey">
              <span className="chip acc hchip" aria-hidden="true" />
              <span className="chip acc hchip" aria-hidden="true" />
              <a className="jstep" href="#lecture">
                <span className="num">STEP 01 / 교육</span>
                <b>AX Education</b>
                <span className="t">
                  AX Lecture, 리더 세션과 팀장 1:1, AX Hackathon
                </span>
                <span className="out">적용 후보와 해커톤 결과물</span>
              </a>
              <span className="arrow">
                <i className="seg" />
                <Arrow size={22} />
              </span>
              <a className="jstep key" href="#consulting">
                <span className="num">STEP 02 / 컨설팅</span>
                <b>AX Consulting</b>
                <span className="t">
                  진단 라이트와 AX 진단으로 반복 업무를 가릅니다.
                </span>
                <span className="out">우선순위와 업무툴 지도</span>
              </a>
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
            <div
              className="card"
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: "20px",
                background: "var(--acc-soft)",
                borderColor: "var(--acc)",
              }}
            >
              <span className="chip acc">ENTRY</span>
              <p style={{ color: "var(--ink)" }}>
                어디서 시작할지 모르겠다면 반나절짜리 진단 라이트부터. 진단
                대금은 이어지는 과정의 비용에서 차감합니다.
              </p>
            </div>
          </div>
        </section>
        <section id="lecture" className="sec alt">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">01 / AX LECTURE</div>
              <h2 className="h2">
                전 직원 기본기부터
                <br />
                직무 특화까지
              </h2>
              <p>
                회차당 25명 기준, 실습은 회사가 이미 쓰는 엑셀과 문서로 합니다.
              </p>
            </div>
            <div className="grid4" data-scene="mods">
              <div className="mod">
                <div className="lv">
                  <span className="chip acc">L1</span>
                  <span className="tag">전 직원</span>
                </div>
                <h3>AI 리터러시</h3>
                <div className="dur">반일 ~ 1일</div>
                <div className="bar">
                  <span style={{ width: "25%" }}></span>
                </div>
                <div className="outc">
                  <span className="tag">산출물</span>
                  <b>자기 업무 세 가지를 AI로 다시 설계한 워크시트</b>
                </div>
              </div>
              <div className="mod">
                <div className="lv">
                  <span className="chip acc">L2</span>
                  <span className="tag">회사가 쓰는 도구로</span>
                </div>
                <h3>도구 실무</h3>
                <div className="dur">1일</div>
                <div className="bar">
                  <span style={{ width: "40%" }}></span>
                </div>
                <div className="outc">
                  <span className="tag">산출물</span>
                  <b>자기 반복 업무를 자동화한 워크플로</b>
                </div>
              </div>
              <div className="mod">
                <div className="lv">
                  <span className="chip acc">L3</span>
                  <span className="tag">
                    영업, 마케팅, MD, 생산관리, 품질, 경영지원
                  </span>
                </div>
                <h3>직무 특화</h3>
                <div className="dur">직무 단위</div>
                <div className="bar">
                  <span style={{ width: "60%" }}></span>
                </div>
                <div className="outc">
                  <span className="tag">산출물</span>
                  <b>직무 표준 요청문과 재사용 워크플로</b>
                </div>
              </div>
              <div className="mod" style={{ borderColor: "var(--acc)" }}>
                <div className="lv">
                  <span className="chip acc">L4</span>
                  <span className="tag">IT 담당, 개발 인접 직무</span>
                </div>
                <h3>사내 AI 챔피언</h3>
                <div className="dur">2일</div>
                <div className="bar">
                  <span style={{ width: "80%" }}></span>
                </div>
                <div className="outc">
                  <span className="tag">산출물</span>
                  <b>팀에 배포하는 작은 도구 또는 에이전트</b>
                </div>
              </div>
            </div>
            <div className="grid2">
              <div className="card">
                <span className="tag">
                  LEADERSHIP / 대표, 임원, 팀장, 2 ~ 3시간
                </span>
                <h3>리더 세션</h3>
                <p>
                  어디부터 도입할지, 무엇을 팀장이 결정하게 할지를 정합니다.
                </p>
                <div className="outc">
                  <b>자사 AX 우선순위</b>
                </div>
              </div>
              <div className="card" style={{ borderColor: "var(--acc)" }}>
                <span className="tag">AX MARK / 팀장, 1:1, 3시간</span>
                <h3>팀장 1:1 밀착</h3>
                <p>
                  팀장 본인의 실제 반복 업무를 실데이터로 끝까지 돌리고 팀
                  채널에 배포합니다.
                </p>
                <div className="outc">
                  <b>돌아가는 업무 1건, 팀 배포본, 30일 사용 약속</b>
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
                한 팀부터 시작하는
                <br />
                사내 AI 해커톤
              </h2>
              <p>한 팀으로 시작하고, 참여 팀이 늘면 코치를 늘립니다.</p>
            </div>
            <div className="panel" style={{ background: "var(--card)" }}>
              <div className="gantt" data-scene="gantt">
                <div className="grow">
                  <b>스프린트</b>
                  <div className="track">
                    <span style={{ width: "12%" }}>
                      <i />
                      <em>하루</em>
                    </span>
                  </div>
                  <span className="res">팀이 고른 문제의 프로토타입</span>
                </div>
                <div className="grow">
                  <b>해커톤</b>
                  <div className="track">
                    <span style={{ width: "26%" }}>
                      <i />
                      <em>이틀에서 사흘</em>
                    </span>
                  </div>
                  <span className="res">팀별 결과물과 심사</span>
                </div>
                <div className="grow">
                  <b>PBL 인큐베이터</b>
                  <div className="track">
                    <span style={{ width: "100%" }}>
                      <i />
                      <em>4주에서 8주</em>
                    </span>
                  </div>
                  <span className="res">파일럿 수준의 결과물</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="consulting" className="sec alt">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">03 / AX CONSULTING</div>
              <h2 className="h2">
                무엇부터 바꿀지
                <br />
                진단으로 정합니다
              </h2>
              <p>
                대표와 팀장이 함께 앉아 AI로 줄일 일과 사람이 판단할 일을
                가릅니다.
              </p>
            </div>
            <div className="rows" data-scene="rows">
              <div>
                <b>업무 꺼내기</b>
                <span className="soft">
                  팀별 반복 업무와 드는 시간, 사람이 옮기는 구간을 표시합니다
                </span>
                <span className="r">반복 업무 목록</span>
              </div>
              <div>
                <b>가르기</b>
                <span className="soft">
                  AI와 자동화로 넘길 구간과 사람이 판단할 구간을 나눕니다
                </span>
                <span className="r">넘길 구간</span>
              </div>
              <div>
                <b>줄 세우기</b>
                <span className="soft">
                  줄어드는 시간과 만들기 쉬운 정도로 순서를 정합니다
                </span>
                <span className="r">후보 순서</span>
              </div>
              <div>
                <b>보내기</b>
                <span className="soft">
                  강의 실습, 해커톤, 팀장 1:1, 업무환경 구축 가운데 어디로
                  보낼지 정합니다
                </span>
                <span className="r">실행 경로</span>
              </div>
            </div>
            <div className="grid3">
              <div className="metric">
                <span className="tag">형식</span>
                <div className="big" style={{ fontSize: "32px" }}>
                  반나절 워크숍
                </div>
                <p>대표와 팀장급이 함께 참여합니다.</p>
              </div>
              <div className="metric">
                <span className="tag">산출물</span>
                <div className="big" style={{ fontSize: "32px" }}>
                  A4 5장, 후보 10건
                </div>
                <p>진단서와 자동화 후보 목록</p>
              </div>
              <div className="metric" style={{ borderColor: "var(--acc)" }}>
                <span className="tag">이어가기</span>
                <div
                  className="big"
                  style={{ fontSize: "32px", color: "var(--good)" }}
                >
                  대금 전액 차감
                </div>
                <p>AX 진단이나 패키지로 이어가면 차감합니다.</p>
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
                팀장이 바뀌어도 새 담당자가 이전 업무 기록과 결정을 바로
                찾아봅니다.
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
                <div className="tool">엑셀, 그룹웨어 등</div>
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
                  <span className="chip">거래처</span>
                  <span className="chip">제품</span>
                  <span className="chip">부서</span>
                  <span className="chip">결정</span>
                  <span className="chip">정책</span>
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
                    부서별 권한
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="case" className="sec alt">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">CASE / 소비재 브랜드 B사</div>
              <h2 className="h2">
                한 팀에서 시작해
                <br />
                전사로 넓혀 가는 AI 도입
              </h2>
              <p>
                프루퍼 주식회사가 첫 도입 팀에 들어가 AI 중심으로 일하는 방식을
                만들고, 타팀 팀장과 직책자를 거쳐 지금은 전사 배포를 진행하고
                있습니다.
              </p>
            </div>
            <div className="grid3">
              <div className="metric">
                <span className="tag">ROLLOUT</span>
                <div className="big" style={{ fontSize: "40px" }}>
                  전사 배포 중
                </div>
                <p>
                  첫 도입 팀 전원이 Claude를 쓰는 데서 시작해 타팀 팀장 세션과
                  직책자 1:1로 넓혔습니다.
                </p>
              </div>
              <div className="metric" style={{ borderColor: "var(--acc)" }}>
                <span className="tag">AGENT SHARE</span>
                <div className="big" style={{ color: "var(--good)" }}>
                  <span className="cnt" data-to="13" data-dec="0">
                    13
                  </span>
                  <small>%</small>
                </div>
                <p>
                  7월 이후 개발 변경 작업 중 에이전트 수행 비중. 올해 528건,
                  전부 사람이 검토했습니다.
                </p>
              </div>
              <div className="metric">
                <span className="tag">ONE DAY</span>
                <div className="big">
                  <span className="cnt" data-to="23" data-dec="0">
                    23
                  </span>
                  <small>차</small>
                </div>
                <p>
                  운영 데이터를 실측해 사업계획 1차부터 23차까지를 하루에
                  작성했습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="package" className="sec">
          <div className="wrap">
            <div className="head">
              <div className="eyebrow">ROADMAP &amp; PACKAGES</div>
              <h2 className="h2">필요한 단계부터 시작합니다</h2>
              <p>지급은 금액 구간에 따라 나눠서 받습니다.</p>
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
                <div className="layer l2">팀장 1:1 밀착</div>
                <div className="layer l1">리더 세션</div>
                <div className="lab">
                  <b>리더십</b>판단하는 사람부터
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
                <div className="layer l3">트랜스폼</div>
                <div className="lab">
                  <b>AI Native</b>업무툴과 회사 지식을 AI에 연동합니다
                </div>
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
            다음 단계로 커 가는 회사의
            <br />
            AI 파트너를 찾고 계셨다면.
          </h2>
          <p>
            교육, 컨설팅, AI Native 업무환경 구축. 어느 지점부터 시작할지 함께
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
