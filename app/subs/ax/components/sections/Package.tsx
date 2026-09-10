import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import styles from "./Package.module.scss";

const CARDS = [
  {
    title: "스타터",
    lines: ["전 직원 리터러시", "리더 세션"],
    foot: "조직 전반의 인식 형성",
  },
  {
    title: "리더십",
    lines: ["리더 세션", "1:1 코칭", "AX 진단"],
    foot: "의사결정 계층부터 바꿉니다",
  },
  {
    title: "그로스",
    lines: ["직무 특화 강의", "해커톤"],
    foot: "실전 전환",
  },
  {
    title: "트랜스폼",
    lines: ["그로스 전 과정", "AX 진단", "우승작 배포 스프린트"],
    foot: "성과 실행 착수",
    included: true,
  },
];

export default function Package() {
  return (
    <section id="package" className="ax-section">
      <div className="ax-container">
        <div className="ax-eyebrow">ROADMAP &amp; PACKAGES</div>
        <Enter index={0}>
          <h2 className={`ax-h2 ${styles.headline}`}>
            필요한 단계부터 시작합니다
          </h2>
        </Enter>
        <div className={styles.grid}>
          {CARDS.map((card, i) => (
            <Enter key={card.title} index={i + 1}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardDesc}>
                  {card.lines.map((line, li) => (
                    <div
                      key={line}
                      className={
                        li === 0 && card.included
                          ? styles.lineIncluded
                          : undefined
                      }
                    >
                      {li > 0 && "+ "}
                      {line}
                      {li === 0 && card.included && (
                        <span className={styles.chip}>포함</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className={styles.cardFoot}>{card.foot}</div>
              </div>
            </Enter>
          ))}
          <Enter index={CARDS.length + 1} className={styles.cardEnterpriseWrap}>
            <div className={`${styles.card} ${styles.cardEnterprise}`}>
              <div className={styles.enterpriseMain}>
                <div className={styles.cardTitle}>엔터프라이즈</div>
                <div className={styles.cardDesc}>
                  전 과정 롤아웃 + 사내 도구 구축 + 컨설팅 실행
                </div>
              </div>
              <div className={styles.cardFoot}>전사 전환</div>
            </div>
          </Enter>
        </div>
        <Enter index={CARDS.length + 2}>
          <p className={styles.note}>
            강의는 인원과 일수 기준으로, 해커톤은 기간과 코치 규모와 결과물
            수준으로, 컨설팅은 진단 범위와 산출물 기준으로 견적을 잡습니다. 어느
            경우든 교육 예산을 실제 도구 자산과 성과로 잇는 경로를 함께
            제시합니다.
          </p>
        </Enter>
      </div>
    </section>
  );
}
