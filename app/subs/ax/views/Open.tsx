import React from "react";
import Image from "next/image";
import Link from "next/link";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import Arrow from "@/app/subs/ax/components/Arrow";
import Faq from "@/app/subs/ax/components/Faq";
import { OPEN } from "@/app/subs/ax/segments";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

const PDF = OPEN.pdf;
const OTHER_HREF = generateSubdomainPath("/", SUB_DOMAIN.ax);

export const FAQ: { q: string; a: string }[] = [
  {
    q: "모집이 미달되면 어떻게 하나요?",
    a: "설명회로 관심 있는 신청자를 먼저 모으고, 대기자 명단과 일정 두 안을 둡니다. 모집 미달 가능성이 보이면 D-14 전에 기관과 일정을 다시 정합니다.",
  },
  {
    q: "당일 불참이 많으면요?",
    a: "교육 전 안내를 세 번 보내고, 빈 곳은 대기자로 채웁니다.",
  },
  {
    q: "회사 자료 보안이 걱정됩니다",
    a: "재직자 과정은 가상 업무자료로 실습하고, 회사 자료는 적용 설계서 단계에서만 다룹니다. AI에 넣지 않을 자료의 기준도 수업에서 함께 정합니다.",
  },
  {
    q: "수강생 수준이 섞여 있어도 되나요?",
    a: "사전 진단으로 직무와 수준별 반을 나누고, 실습 강사 1명이 10명 이하를 맡아 자리에서 지원합니다.",
  },
  {
    q: "실습 환경은 어떻게 준비하나요?",
    a: "신청 단계에서 수강생의 실습 환경을 미리 점검하고, 실습에 쓰는 AI 도구 계정은 프루퍼 주식회사가 지원하고 회수합니다.",
  },
  {
    q: "교육 뒤에 실제로 쓰는지 어떻게 확인하나요?",
    a: "수료 2주 뒤 적용 과제를 점검하고, 결과보고 자료에 결과물 목록과 함께 정리합니다.",
  },
];

export default function OpenView() {
  return (
    <>
      <section id="top" className="hero">
        <div className="hero-in">
          <div>
            <div className="eyebrow">공개 AI 교육</div>
            <h1 className="h1">
              배운 그날부터 활용하는
              <br />
              <em>AI 리터러시 교육</em>
            </h1>
            <p className="lead">
              대학 사업단, 창업지원기관, 지자체와 공공기관이 여는 AI 교육을
              맡습니다. 수강 대상이 누구든 각자의 자료로 실습하고 자기 결과물을
              들고 갑니다.
            </p>
            <div className="cta">
              <AxInquireButton className="btn">도입 문의</AxInquireButton>
              <a className="btn ghost" href={PDF}>
                커리큘럼 다운로드
              </a>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                aspectRatio: "5 / 4",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 40px 80px -40px rgba(20, 30, 80, 0.45)",
              }}
            >
              <Image
                src="/assets/images/ax/open/room.jpg"
                alt="노트북을 펴고 각자의 자료로 실습하는 수강생들"
                fill
                sizes="(max-width: 960px) 100vw, 640px"
              />
            </div>
            <div
              className="panel"
              style={{
                position: "absolute",
                left: "-32px",
                bottom: "-28px",
                padding: "16px 22px",
                display: "flex",
                gap: "14px",
                alignItems: "center",
              }}
            >
              <svg
                className="donut"
                width="56"
                height="56"
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
              <div
                className="big"
                style={{ fontSize: "40px", color: "#45af66" }}
              >
                <span className="cnt" data-to="32" data-dec="0">
                  32
                </span>
                <small>/ 33</small>
              </div>
              <div>
                <span className="tag" style={{ color: "#23793f" }}>
                  Case Record
                </span>
                <b style={{ display: "block", fontSize: "16px" }}>
                  33명 중 32명이 결과물 완성
                </b>
                <span className="muted" style={{ fontSize: "13px" }}>
                  대학 앵커사업단 창업실무 과정, 3.5시간
                </span>
              </div>
            </div>
            <span
              className="chip"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255, 255, 255, 0.92)",
                color: "#0f1424",
                fontWeight: "700",
              }}
            >
              자기 자료로 실습
            </span>
          </div>
        </div>
        <div className="strip">
          <div className="strip-in">
            <b>나라장터 경쟁입찰참가자격 등록</b>
            <b>소프트웨어사업자 신고</b>
            <b>벤처기업 확인</b>
            <span style={{ marginLeft: "auto" }}>
              Claude, ChatGPT, Gemini, 웍스AI, Claude Code, Antigravity, Codex
            </span>
          </div>
        </div>
      </section>

      <section id="problem" className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Problem</div>
            <h2 className="h2">
              AI 교육은 늘었는데
              <br />
              수료 뒤에 쓰는{" "}
              <span className="hl" data-scene="hl">
                <i />
                사람은 적습니다
              </span>
            </h2>
            <p>
              도구 소개와 따라 하기 시연으로 채운 과정은 모집이 쉬운 대신,
              수강생이 다음 주에 다시 열어 보는 일은 드뭅니다.
            </p>
          </div>
          <div className="grid2">
            <div className="card" style={{ background: "#f2f4f8" }}>
              <span className="tag">흔한 AI 교육</span>
              <h3 style={{ fontSize: "22px" }}>강사 예제로 따라 하는 과정</h3>
              <p>1. 강사 예제 파일, 모두 같은 파일로 따라 합니다</p>
              <p>2. 수료, 출석과 만족도가 기록됩니다</p>
              <p className="struck" data-scene="strike">
                3. 다음 주, 자기 일에 옮기지 못하고 멈춥니다
                <i />
              </p>
            </div>
            <div
              className="card"
              style={{
                background: "#344fe0",
                borderColor: "#344fe0",
                color: "#fff",
              }}
            >
              <span className="tag" style={{ color: "#c9d2ff" }}>
                프루퍼 주식회사의 과정
              </span>
              <h3 style={{ fontSize: "22px" }}>자기 자료로 실습하는 과정</h3>
              <p style={{ color: "#dbe1ff" }}>
                1. 내 자료 연결, 사업계획서, 직무 문서, 과제
              </p>
              <p style={{ color: "#dbe1ff" }}>
                2. 내 결과물, 그날 완성해 들고 갑니다
              </p>
              <p style={{ color: "#dbe1ff" }}>
                3. 다음 주, 같은 방법으로 이어 씁니다
              </p>
            </div>
          </div>
          <div className="grid3">
            <div className="card">
              <h3>남의 예제로 하는 실습</h3>
              <p>
                자기 업무에 옮기는 방법을 배우지 못해 수료 뒤 다시 쓰지
                않습니다.
              </p>
            </div>
            <div className="card">
              <h3>한 반에 섞인 수준</h3>
              <p>처음 쓰는 사람과 이미 쓰는 사람이 같은 진도를 따라갑니다.</p>
            </div>
            <div className="card">
              <h3>보여줄 성과가 없음</h3>
              <p>
                출석과 만족도 외에 수강생이 무엇을 만들었는지 보여줄 자료가
                없습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="view" className="sec alt">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Our View</div>
            <h2 className="h2">
              수강생이 가져온 자료로
              <br />
              자기 결과물을 만듭니다
            </h2>
            <p>모든 대상이 자료 연결, 기준 입력, 결과물 순서로 실습합니다.</p>
          </div>
          <div className="journey" data-scene="chain">
            <span className="chip acc token" aria-hidden="true" />
            <div className="jstep">
              <span className="num">Input</span>
              <b>수강생의 자료</b>
              <span className="t">
                사업계획서, 직무 문서와 업무 양식, 수업 과제와 활동 기록
              </span>
            </div>
            <span className="arrow">
              <Arrow size={22} />
            </span>
            <div className="jstep">
              <span className="num">Rules</span>
              <b>문서에 없는 기준</b>
              <span className="t">
                최신 수치, 쓰는 용어와 버린 용어, 표현 기준, AI에 넣지 않을 자료
              </span>
            </div>
            <span className="arrow">
              <Arrow size={22} />
            </span>
            <div className="jstep key" style={{ borderColor: "#45af66" }}>
              <span className="num">Output</span>
              <b>들고 가는 결과물</b>
              <span className="t">
                소개 페이지, 업무 자동화, 포트폴리오, 기획서와 시제품 화면
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="formats" className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Program Formats</div>
            <h2 className="h2">
              기관 일정과 예산에 맞춰
              <br />
              과정 형식을 고릅니다
            </h2>
          </div>
          <div className="grid4" data-scene="mods">
            <div className="mod">
              <span className="num">F1</span>
              <h3>AI Talk</h3>
              <div className="dur">1 ~ 2시간</div>
              <div className="bar">
                <span style={{ width: "16%" }}></span>
              </div>
              <div className="who">특강, 대상 무관</div>
              <div className="outc">
                <span className="tag">산출물</span>
                <b>AI 사용 기준과 다음 실습 안내</b>
              </div>
            </div>
            <div className="mod" style={{ border: "2px solid #344fe0" }}>
              <span className="num">F2 / 대표 과정</span>
              <h3>Hands-on Lab</h3>
              <div className="dur">반일, 3 ~ 4시간</div>
              <div className="bar">
                <span style={{ width: "38%" }}></span>
              </div>
              <div className="who">개인 실습</div>
              <div className="outc">
                <span className="tag">산출물</span>
                <b>개인 AI 업무환경과 결과물</b>
              </div>
            </div>
            <div className="mod">
              <span className="num">F3</span>
              <h3>Project Course</h3>
              <div className="dur">2 ~ 4회차</div>
              <div className="bar">
                <span style={{ width: "100%" }}></span>
              </div>
              <div className="who">개인 또는 팀</div>
              <div className="outc">
                <span className="tag">산출물</span>
                <b>실사용 결과물과 발표</b>
              </div>
            </div>
            <div className="mod">
              <span className="num">F4</span>
              <h3>AI Hackathon</h3>
              <div className="dur">1 ~ 2일</div>
              <div className="bar">
                <span style={{ width: "66%" }}></span>
              </div>
              <div className="who">팀</div>
              <div className="outc">
                <span className="tag">산출물</span>
                <b>돌아가는 프로토타입과 시연</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="audience" className="sec alt">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Audience Examples</div>
            <h2 className="h2">
              수강 대상은 가리지 않습니다
              <br />
              자료와 결과물을 수강생에 맞춥니다
            </h2>
          </div>
          <div className="rows">
            <div>
              <b>예비창업자, 초기창업기업 대표</b>
              <span className="soft">사업계획서, 회사소개서, IR 자료</span>
              <span className="r">자사 소개 페이지, 지원사업 서류 초안</span>
            </div>
            <div>
              <b>지역 재직자</b>
              <span className="soft">
                직무 문서, 업무 양식, 더미로 바꾼 업무 데이터
              </span>
              <span className="r">직무 반복 업무를 줄이는 워크플로</span>
            </div>
            <div>
              <b>대학생</b>
              <span className="soft">수업 과제, 활동 기록, 이력</span>
              <span className="r">포트폴리오 페이지, 팀 프로젝트 결과물</span>
            </div>
            <div>
              <b>고등학생, 직업계고</b>
              <span className="soft">팀 프로젝트 자료, 전공 실습 기록</span>
              <span className="r">팀 기획서와 시제품 화면</span>
            </div>
            <div>
              <b>일반 시민, 소상공인</b>
              <span className="soft">가게나 활동 소개 자료, 반복하는 문서</span>
              <span className="r">소개 페이지, 반복 문서 자동화</span>
            </div>
          </div>
        </div>
      </section>

      <section id="employee" className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Example / 재직자 과정</div>
            <h2 className="h2">
              재직자 과정은
              <br />
              출발점부터 다르게 설계합니다
            </h2>
            <p>
              여러 회사 직원이 한 반에 모이고, 회사 자료는 밖으로 가져올 수
              없고, 업무를 오래 비우기 어렵습니다.
            </p>
          </div>
          <div className="grid3">
            <div className="card">
              <span className="tag">회사 자료는 가져올 수 없습니다</span>
              <h3>
                가상 업무자료로 실습하고
                <br />
                회사에는 적용 설계서로 가져갑니다
              </h3>
            </div>
            <div className="card">
              <span className="tag">여러 회사 직원이 한 반에 모입니다</span>
              <h3>
                공통 과정으로 맞춘 뒤<br />
                직무별로 나눠 실습합니다
              </h3>
            </div>
            <div className="card">
              <span className="tag">업무를 오래 비우기 어렵습니다</span>
              <h3>
                하루 집중 대신
                <br />
                3시간씩 나눠 운영합니다
              </h3>
            </div>
          </div>
          <div className="grid4">
            <div className="metric">
              <span className="tag">총 시간</span>
              <div className="big" style={{ fontSize: "40px" }}>
                <span className="cnt" data-to="9" data-dec="0">
                  9
                </span>
                <small>시간</small>
              </div>
              <p>3회, 주 1회</p>
            </div>
            <div className="metric">
              <span className="tag">반 규모</span>
              <div className="big" style={{ fontSize: "40px" }}>
                <span className="cnt" data-to="25" data-dec="0">
                  25
                </span>
                <small>명 내외</small>
              </div>
              <p>생산, 품질, 구매, 영업, 관리 직무별 분반</p>
            </div>
            <div className="metric">
              <span className="tag">실습 지원</span>
              <div className="big" style={{ fontSize: "40px" }}>
                1:10
              </div>
              <p>실습 강사 1명이 10명 이하를 맡습니다</p>
            </div>
            <div className="metric">
              <span className="tag">실습 비중</span>
              <div className="big" style={{ fontSize: "40px" }}>
                절반<small>이상</small>
              </div>
              <p>수업 시간의 절반 이상을 직접 만드는 데 씁니다</p>
            </div>
          </div>
          <div className="rows">
            <div>
              <b>1회차 / 공통</b>
              <span className="soft">
                AI로 문서, 메일, 회의록을 처리하고 내 업무자료를 정리해 AI에
                연결합니다
              </span>
              <span className="r">개인 AI 업무환경</span>
            </div>
            <div>
              <b>2회차 / 직무별 실습</b>
              <span className="soft">
                직무마다 반복 업무를 골라 가상 업무자료로 자동화를 완성합니다
              </span>
              <span className="r">업무 자동화 결과물</span>
            </div>
            <div>
              <b>3회차 / 적용 설계</b>
              <span className="soft">
                우리 회사에 옮길 업무와 순서를 정하고 컨설턴트 피드백을 받습니다
              </span>
              <span className="r">우리 회사 AI 적용 설계서</span>
            </div>
          </div>
          <div className="handoff">
            <span className="tag">실습 예시</span>
            <span className="chip">생산일보 정리</span>
            <span className="chip">품질 성적서 작성</span>
            <span className="chip">구매 견적 비교</span>
            <span className="chip">영업 견적서</span>
            <span className="chip">사내 규정 문의</span>
            <span className="muted" style={{ fontSize: "13px" }}>
              대상 업종에 맞춰 바꿉니다
            </span>
          </div>
        </div>
      </section>

      <section id="lab" className="sec alt">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">F2 / Hands-on Lab</div>
            <h2 className="h2">
              반나절 안에 나한테 특화된
              <br />
              결과물까지 가져갈 수 있습니다
            </h2>
          </div>
          <div
            className="grid4"
            style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}
          >
            <div className="card" style={{ padding: "20px" }}>
              <span className="num">01</span>
              <h3>시연</h3>
              <p>완성된 모습</p>
            </div>
            <div className="card" style={{ padding: "20px" }}>
              <span className="num">02</span>
              <h3>개념</h3>
              <p>실습 기준</p>
            </div>
            <div className="card" style={{ padding: "20px" }}>
              <span className="num">03</span>
              <h3>자료 연결</h3>
              <p>개인 AI 업무환경</p>
            </div>
            <div className="card" style={{ padding: "20px" }}>
              <span className="num">04</span>
              <h3>기준 입력</h3>
              <p>기준 문서</p>
            </div>
            <div
              className="card"
              style={{ padding: "20px", borderColor: "#45af66" }}
            >
              <span className="num">05</span>
              <h3>적용 실습</h3>
              <p>자기 결과물</p>
            </div>
            <div className="card" style={{ padding: "20px" }}>
              <span className="num">06</span>
              <h3>공유</h3>
              <p>다음 할 일</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="case"
        className="sec"
        style={{ background: "#1e2a66", color: "#fff" }}
      >
        <div className="wrap">
          <div className="head">
            <div className="eyebrow" style={{ color: "#9fb0ff" }}>
              Case / OO대학교 앵커사업단
            </div>
            <h2 className="h2" style={{ color: "#fff" }}>
              초기창업기업 대표들이
              <br />
              자기 사업자료로 만든 업무환경
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "0",
                alignItems: "center",
                padding: "32px",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.06)",
                textAlign: "center",
              }}
            >
              <div>
                <span className="tag" style={{ color: "#9fb0ff" }}>
                  참여
                </span>
                <div
                  className="big"
                  style={{ color: "#fff", fontSize: "36px" }}
                >
                  <span className="cnt" data-to="33" data-dec="0">
                    33
                  </span>
                  명
                </div>
              </div>
              <div>
                <span className="tag" style={{ color: "#9fb0ff" }}>
                  완성
                </span>
                <div
                  className="big"
                  style={{ color: "#9be3b4", fontSize: "36px" }}
                >
                  <span className="cnt" data-to="32" data-dec="0">
                    32
                  </span>
                  명
                </div>
              </div>
              <div>
                <span className="tag" style={{ color: "#9fb0ff" }}>
                  시간
                </span>
                <div
                  className="big"
                  style={{ color: "#fff", fontSize: "36px" }}
                >
                  <span className="cnt" data-to="3.5" data-dec="1">
                    3.5
                  </span>
                  시간
                </div>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                minHeight: "300px",
                borderRadius: "20px",
                overflow: "hidden",
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
        </div>
      </section>

      <section id="record" className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Track Record</div>
            <h2 className="h2">
              사람을 모으고
              <br />
              현장을 운영해 왔습니다
            </h2>
            <p>
              프루퍼 주식회사와 운영진이 직접 모집하고 운영한 행사와 교육입니다.
            </p>
          </div>
          <div className="grid3">
            <div className="metric">
              <span className="tag">with CTO</span>
              <div className="big">
                <span className="cnt" data-to="215" data-dec="0">
                  215
                </span>
                <small>명</small>
              </div>
              <p>
                프루퍼 주식회사가 2024년부터 운영하는 CTO 커뮤니티. 9회, 누적
                42개사
              </p>
            </div>
            <div className="metric">
              <span className="tag">UNITHON</span>
              <div className="big">
                <span className="cnt" data-to="1082" data-dec="0">
                  1,082
                </span>
                <small>명</small>
              </div>
              <p>
                운영총괄이 2015년부터 11회 치른 IT 해커톤. 지원 경쟁률 4.3배
              </p>
            </div>
            <div className="metric">
              <span className="tag">2023 ABB 해커톤</span>
              <div className="big">
                <span className="cnt" data-to="168" data-dec="0">
                  168
                </span>
                <small>명</small>
              </div>
              <p>
                대구광역시 주최. 운영총괄의 팀이 접수, 홍보, 본선, 사후 정리까지
                통합 운영. 본선 60팀
              </p>
            </div>
          </div>
          <div className="card" style={{ background: "var(--bg2)" }}>
            <span className="tag">강연, 심사, 코치 이력 중 일부</span>
            <div className="handoff">
              <span className="chip">삼성청년SW아카데미 SSAFY</span>
              <span className="chip">대학 앵커사업단 창업실무 과정</span>
              <span className="chip">엘리스그룹 QA 자동화 엔지니어 트랙</span>
              <span className="chip">NIPA, AWS 부트캠프 심사위원</span>
              <span className="chip">팀스파르타 기업 AI 교육</span>
              <span className="chip">기업 AI 심화 해커톤 코치</span>
              <span className="chip">JA Korea</span>
              <span className="chip">부산대학교 창업캠프</span>
              <span className="chip">한양대학교 ERICA 아이디어톤</span>
              <span className="chip">데이원컴퍼니 제로베이스</span>
              <span className="chip">오즈코딩스쿨</span>
              <span className="chip">소프트웨어의 날</span>
              <span className="chip">네이버웹툰 세미나</span>
              <span className="chip">토스 SLASH 21</span>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="sec alt">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Core Team</div>
            <h2 className="h2">
              현업 경험을 갖춘 운영진이
              <br />
              직접 맡습니다
            </h2>
            <p>
              운영진 아래 실습 보조강사와 운영 스태프를 과정 규모에 맞춰
              배치합니다.
            </p>
          </div>
          <div className="grid4">
            <div className="card">
              <span className="tag">주강사, 과정 설계</span>
              <h3>임한솔</h3>
              <p>
                프루퍼 주식회사 대표이사. 대학 사업단과 기업 대상 AX 교육 수행
              </p>
              <p className="muted" style={{ fontSize: "13px" }}>
                SSAFY, 엘리스, NIPA, KDT, JA Korea, 팀스파르타, AX LABS
              </p>
            </div>
            <div className="card">
              <span className="tag">실습 강사, 현업 컨설팅</span>
              <h3>최ㅇㅇ</h3>
              <p>
                11년차 엔지니어. 가맹점 발주, 재고, 정산을 디지털화해 운영 인력
                증원 없이 사업 확장
              </p>
              <p className="muted" style={{ fontSize: "13px" }}>
                토스, 크래프톤
              </p>
            </div>
            <div className="card">
              <span className="tag">실습 강사, 현업 컨설팅</span>
              <h3>한ㅇㅇ</h3>
              <p>
                10년차 엔지니어. 월 정산 준비를 2주에서 1일로 줄인 업무 자동화
              </p>
              <p className="muted" style={{ fontSize: "13px" }}>
                토스, 빗썸, 코인원
              </p>
            </div>
            <div className="card">
              <span className="tag">모집, 운영 총괄</span>
              <h3>김ㅇㅇ</h3>
              <p>
                IT 커뮤니티 운영사 대표. UNITHON 11회 운영총괄, 누적 참가
                1,082명
              </p>
              <p className="muted" style={{ fontSize: "13px" }}>
                UNITHON, ABB 해커톤, with CTO
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="operation" className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Operation</div>
            <h2 className="h2">
              기획부터 결과보고까지
              <br />
              필요한 만큼 맡기세요
            </h2>
            <p>
              기관은 공신력과 공식 채널을 내주시고, 알리고 모으고 챙기는 실무는
              프루퍼 주식회사가 맡습니다. 기수마다 정원의 두 배 이상 신청을
              목표로 모집하고, 남는 신청은 다음 기수 대기 명단으로 잇습니다.
            </p>
          </div>
          <div className="grid2">
            <div className="card" style={{ background: "var(--bg2)" }}>
              <span className="tag">기관</span>
              <h3>공신력과 공식 채널</h3>
              <div className="handoff">
                <span className="chip">모집 공문</span>
                <span className="chip">기관 채널 게재</span>
                <span className="chip">지역 지원기관 협조 요청</span>
              </div>
            </div>
            <div className="card" style={{ borderColor: "#344fe0" }}>
              <span className="tag" style={{ color: "#344fe0" }}>
                프루퍼 주식회사
              </span>
              <h3>홍보와 모집 실무 전반</h3>
              <div className="handoff">
                <span className="chip">신청 페이지와 신청서</span>
                <span className="chip">30분 온라인 설명회</span>
                <span className="chip">사례 카드뉴스</span>
                <span className="chip">문자, 카카오 안내</span>
                <span className="chip">대기자 명단</span>
                <span className="chip">개별 상담 전화</span>
              </div>
            </div>
          </div>
          <div
            className="grid4"
            style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}
          >
            <div className="card" style={{ padding: "20px" }}>
              <span className="num">D-30</span>
              <p>공문 발송, 신청 페이지 오픈</p>
            </div>
            <div className="card" style={{ padding: "20px" }}>
              <span className="num">D-21</span>
              <p>온라인 설명회, 사례 카드뉴스</p>
            </div>
            <div className="card" style={{ padding: "20px" }}>
              <span className="num">D-14</span>
              <p>개별 상담, 참가자 확정</p>
            </div>
            <div className="card" style={{ padding: "20px" }}>
              <span className="num">D-7</span>
              <p>사전 진단, 반 편성 안내</p>
            </div>
            <div
              className="card"
              style={{ padding: "20px", borderColor: "#45af66" }}
            >
              <span className="num">D-DAY</span>
              <p>출석 확인, 실습 강사 자리 지원</p>
            </div>
            <div className="card" style={{ padding: "20px" }}>
              <span className="num">+2주</span>
              <p>기관 양식 결과보고 제출</p>
            </div>
          </div>
          <div className="grid4">
            <div
              className="card"
              style={{ background: "#f2f4f8", borderTop: "3px solid #344fe0" }}
            >
              <h3>01 기획</h3>
              <p>
                사업 목적에 맞춘 커리큘럼, 대상별 트랙과 분반 설계, 대상에 맞춘
                예시 자료
              </p>
            </div>
            <div
              className="card"
              style={{ background: "#f2f4f8", borderTop: "3px solid #344fe0" }}
            >
              <h3>02 모집</h3>
              <p>
                신청서와 사전 진단 설문, 직무와 수준별 반 편성, 안내 3회와 빈 곳
                대기자 충원
              </p>
            </div>
            <div
              className="card"
              style={{ background: "#f2f4f8", borderTop: "3px solid #344fe0" }}
            >
              <h3>03 운영</h3>
              <p>
                주강사와 실습 강사 배치, 실습용 AI 도구 계정 지원과 회수, 실습
                환경 점검, 출결 관리, 만족도 현장 수집
              </p>
            </div>
            <div
              className="card"
              style={{ background: "#f2f4f8", borderTop: "3px solid #344fe0" }}
            >
              <h3>04 결과보고</h3>
              <p>
                참가 통계, 사전과 사후 설문, 수강생 결과물 목록, 집행 내역. 기수
                종료 2주 안에 기관 양식으로 제출
              </p>
            </div>
          </div>
          <div
            className="strip-in"
            style={{
              width: "100%",
              maxWidth: "none",
              padding: "18px 22px",
              border: "1px solid var(--line)",
              borderRadius: "14px",
            }}
          >
            <span className="tag">25명 반 현장 인력</span>
            <b>주강사 1</b>
            <b>실습 강사 2</b>
            <b>운영 1</b>
            <span style={{ marginLeft: "auto" }}>
              실습 강사 1명이 10명 이하를 맡습니다
            </span>
          </div>
        </div>
      </section>

      <section id="kpi" className="sec alt">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Outcome Metrics</div>
            <h2 className="h2">
              기관이 보고하는 성과지표에 맞춰
              <br />
              측정하고 정리합니다
            </h2>
            <p>목표치는 기관이 쓰는 지표와 기준을 받은 뒤 확정합니다.</p>
          </div>
          <div className="rows">
            <div>
              <b>신청 경쟁률</b>
              <span className="soft">정원의 2배 이상 / 신청 명단</span>
              <span className="r">UNITHON 지원 4.3배</span>
            </div>
            <div>
              <b>수료율</b>
              <span className="soft">90% 이상 / 회차별 출석 기록</span>
              <span className="r">전 회차 출석 기준</span>
            </div>
            <div>
              <b>결과물 완성률</b>
              <span className="soft">90% 이상 / 수강생 제출물</span>
              <span className="r">앵커사업단 33명 중 32명</span>
            </div>
            <div>
              <b>역량 변화</b>
              <span className="soft">사전 대비 향상 / 사전, 사후 진단</span>
              <span className="r">진단 문항 사전 공유</span>
            </div>
            <div>
              <b>현업 적용</b>
              <span className="soft">
                재직자 과정 기업당 2건 이상 / 적용 설계서
              </span>
              <span className="r">수료 2주 뒤 점검</span>
            </div>
          </div>
        </div>
      </section>

      <section id="cred" className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Credentials</div>
            <h2 className="h2">
              공공 사업 계약에 필요한 자격을
              <br />
              갖추고 있습니다
            </h2>
          </div>
          <div className="rows">
            <div>
              <b>나라장터</b>
              <span className="soft">경쟁입찰참가자격 등록, 물품과 용역</span>
              <span className="r">2026.10.19</span>
            </div>
            <div>
              <b>소프트웨어사업자</b>
              <span className="soft">일반현황 관리확인서</span>
              <span className="r">2026.10.16</span>
            </div>
            <div>
              <b>벤처기업확인</b>
              <span className="soft">제20260722010048호</span>
              <span className="r">2026.07.22 ~ 2029.07.21</span>
            </div>
            <div>
              <b>중소기업확인</b>
              <span className="soft">중소기업 확인서</span>
              <span className="r">보유</span>
            </div>
            <div>
              <b>산학협력</b>
              <span className="soft">
                연세대학교 원주산학협력단 가족회사와 산학협력 MOU, 고려대학교
                세종산학협력단 가족회사 협약
              </span>
              <span className="r">2025</span>
            </div>
          </div>
        </div>
      </section>

      <section id="package" className="sec alt">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Packages</div>
            <h2 className="h2">
              필요한 범위만 골라
              <br />
              견적을 받습니다
            </h2>
            <p>
              견적은 인원, 회차, 운영 범위를 기준으로 잡습니다. 같은 과정을 다시
              여는 경우 두 번째부터는 기획 비용이 빠집니다.
            </p>
          </div>
          <div
            data-scene="pkgs"
            className="pkgs"
            style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
          >
            <div className="pkg">
              <div className="layer l1">AI Talk</div>
              <div className="lab">
                <b>특강</b>수강생이 방향을 잡습니다
              </div>
            </div>
            <div className="pkg">
              <div className="layer l2">Hands-on Lab</div>
              <div className="layer l1">AI Talk</div>
              <div className="lab">
                <b>실습 과정</b>각자 결과물을 만듭니다
              </div>
            </div>
            <div className="pkg">
              <div className="layer l3">Project 또는 Hackathon</div>
              <div className="layer l2">Hands-on Lab</div>
              <div className="layer l1">AI Talk</div>
              <div className="lab">
                <b>프로젝트 과정</b>결과물을 실제로 씁니다
              </div>
            </div>
            <div className="pkg final">
              <div className="layer l4">기획, 모집, 운영, 결과보고</div>
              <div className="layer l3">Project 또는 Hackathon</div>
              <div className="layer l2">Hands-on Lab</div>
              <div className="layer l1">AI Talk</div>
              <div className="lab">
                <b>운영 일괄</b>사업 전체를 맡깁니다
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="sec">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">FAQ</div>
            <h2 className="h2">자주 묻는 질문</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="in">
          <div className="eyebrow" style={{ color: "#c9d2ff" }}>
            Proof of Value
          </div>
          <h2>
            강의만 듣고 끝나지 않는 AI 교육,
            <br />
            함께 만들어 가 봅시다!
          </h2>
          <p>
            특강, 실습 과정, 프로젝트 과정, 모집, 운영 일괄 모두 가능합니다.
          </p>
          <div className="cta">
            <AxInquireButton className="btn">도입 문의하기</AxInquireButton>
            <a className="btn ghost" href={PDF}>
              커리큘럼 다운로드
            </a>
            <Link className="btn ghost" href={OTHER_HREF}>
              기업 교육 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
