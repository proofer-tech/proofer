import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import styles from "./Lecture.module.scss";

const LEVELS = [
  {
    level: "L1",
    duration: "8시간 ~ 1일",
    title: "AI 리터러시",
    target: "전 직원",
    desc: "생성형 AI의 기본기, 프롬프트 작성법, 업무 적용 감각, 보안과 윤리 기준을 다룹니다. 무엇이 되고 무엇이 안 되는지를 실패 사례로 짚어, 민감한 데이터나 규제 업무에서 선을 긋는 법까지 전달 드립니다.",
    outcome: "자기 업무 세 가지를 AI로 다시 설계한 워크시트",
  },
  {
    level: "L2",
    duration: "1일 ~ 2일",
    title: "도구 실무",
    target: "Claude · Copilot · Gemini 중 선택",
    desc: "사무직 실무자가 선택한 도구로 문서와 데이터와 보고서 업무를 자동화합니다. 고객사의 도구 환경에 맞춰 트랙을 고르고, 도구 사용법이 아니라 업무를 도구에 맞게 다시 설계하는 법에 초점을 둡니다.",
    outcome: "자기 반복 업무 하나를 실제로 자동화한 워크플로",
  },
  {
    level: "L3",
    duration: "직무 조직 단위",
    title: "직무 특화",
    target: "연구 · 기획 · 영업 · 인사 · 재무 · 안전 · 품질 · 물류",
    desc: "타사의 사례가 아니라 현업의 실제 데이터와 문서로 실습합니다. 프루퍼가 사내 데이터를 구조화해 온 방식을 직무 맥락 설계에 적용해, 단발성 프롬프트가 아니라 조직에 남는 자산을 만듭니다.",
    outcome: "직무 표준 프롬프트와 재사용 워크플로",
  },
  {
    level: "L4",
    duration: "2일 ~ 3일",
    title: "파워유저와 에이전트",
    target: "개발 인접 직무 · 사내 AI 챔피언",
    desc: "Claude Code나 Cursor로 직접 만들고, 여러 에이전트를 엮어 설계하며, 사내 시스템을 AI에 연결합니다. 프루퍼가 실제로 구축해 운영하는 사내 도구를 교보재로 삼아, 시연에서 끝나지 않고 배포까지 가는 것을 목표로 합니다.",
    outcome: "팀에 배포하는 작은 도구 또는 에이전트 하나",
  },
];

export default function Lecture() {
  return (
    <section id="lecture" className="ax-section ax-section--alt">
      <div className="ax-container">
        <div className={styles.eyebrowRow}>
          <div className="ax-eyebrow">01 / AX LECTURE</div>
          <div className={styles.eyebrowSub}>저변 확대</div>
        </div>
        <Enter index={0}>
          <h2 className={`ax-h2 ${styles.headline}`}>
            전 직원 리터러시부터
            <br />
            파워유저 양성까지
          </h2>
        </Enter>
        <p className={styles.desc}>
          임직원의 AI 활용력을 수준별로 끌어올리는 강의형 과정입니다. 조직의 AI
          저변을 넓히는 가장 빠른 경로입니다.
        </p>

        <div className={styles.grid}>
          {LEVELS.map((lv, i) => (
            <Enter key={lv.level} index={i}>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.cardLevel}>{lv.level}</div>
                  <div className={styles.cardDuration}>{lv.duration}</div>
                </div>
                <h3 className={styles.cardTitle}>{lv.title}</h3>
                <div className={styles.cardTarget}>{lv.target}</div>
                <p className={styles.cardDesc}>{lv.desc}</p>
                <div className={styles.cardFoot}>
                  <span className={styles.cardFootLabel}>산출물 · </span>
                  {lv.outcome}
                </div>
              </div>
            </Enter>
          ))}
        </div>

        <Enter index={0}>
          <div className={styles.leader}>
            <div className={styles.leaderLeft}>
              <div className={styles.leaderLabel}>LEADERSHIP</div>
              <h3 className={styles.leaderTitle}>리더 과정</h3>
              <div className={styles.leaderMeta}>임원과 직책자 · 2~3시간</div>
            </div>
            <div className={styles.leaderRight}>
              <p className={styles.leaderDesc}>
                의사결정권자를 대상으로 AX 전략 판단, 투자 결정, 조직 도입
                로드맵을 다룹니다. AI 도입을 비용이 아니라 영업이익과 기업가치의
                지렛대로 보는 관점을 심고, 조직의 진짜 문제를 발굴합니다.
              </p>
              <div className={styles.leaderOutcome}>
                <span className={styles.leaderOutcomeLabel}>산출물 · </span>
                자사의 AX 우선순위 한 장
              </div>
            </div>
          </div>
        </Enter>

        <Enter index={0}>
          <div className={styles.ops}>
            <div className={styles.opsLabel}>운영 방식</div>
            <p className={styles.opsDesc}>
              당사에서의 집합 강의와 실습을 기본으로 하고, 필요하면 온라인
              송출을 병행합니다. 주강사 한 명에 분반별 기술튜터를 붙여 실습
              밀도를 확보하고, 실습 결과물은 공유 보드로 모으며 사전과 사후
              설문을 표준화합니다. 과정이 끝나면 각 조직이 뽑은 적용 후보를
              회수해 다음 단계로 이어갑니다.
            </p>
          </div>
        </Enter>
      </div>
    </section>
  );
}
