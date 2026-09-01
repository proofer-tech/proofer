import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import styles from "./Package.module.scss";

const CARDS = [
  {
    title: "스타터",
    desc: (
      <>
        전 직원 리터러시
        <br />+ 리더 과정
      </>
    ),
    foot: "조직 전반의 인식 형성",
  },
  {
    title: "그로스",
    desc: (
      <>
        직무 특화 강의
        <br />+ 해커톤
      </>
    ),
    foot: "실전 전환",
  },
  {
    title: "트랜스폼",
    desc: (
      <>
        해커톤 우승작 배포 스프린트
        <br />+ 컨설팅 진단
      </>
    ),
    foot: "성과 실행 착수",
  },
  {
    title: "엔터프라이즈",
    desc: "전 과정 롤아웃 + 사내 도구 구축 + 컨설팅 실행",
    foot: "전사 전환",
    enterprise: true,
  },
];

export default function Package() {
  return (
    <section id="package" className="ax-section">
      <div className="ax-container">
        <div className={styles.eyebrow}>ROADMAP &amp; PACKAGES</div>
        <Enter index={0}>
          <h2 className={`ax-h2 ${styles.headline}`}>
            필요한 단계부터 시작합니다
          </h2>
        </Enter>
        <div className={styles.grid}>
          {CARDS.map((card, i) => (
            <Enter key={card.title} index={i + 1}>
              <div
                className={
                  card.enterprise
                    ? `${styles.card} ${styles.cardEnterprise}`
                    : styles.card
                }
              >
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardDesc}>{card.desc}</div>
                <div className={styles.cardFoot}>{card.foot}</div>
              </div>
            </Enter>
          ))}
        </div>
        <Enter index={5}>
          <p className={styles.note}>
            강의는 인원과 일수 기준으로, 해커톤은 기간과 코치 규모와 결과물
            수준으로, 컨설팅은 프로젝트 참여와 성과 인센티브로 견적을 잡습니다.
            어느 경우든 교육 예산을 실제 도구 자산과 성과로 잇는 경로를 함께
            제시합니다.
          </p>
        </Enter>
      </div>
    </section>
  );
}
