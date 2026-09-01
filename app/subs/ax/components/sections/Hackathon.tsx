import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import styles from "./Hackathon.module.scss";

const APPROACH_CARDS = [
  {
    title: "시연에서 끝나지 않습니다",
    desc: "프루퍼는 실제로 배포하고 운영하는 회사라, 쓸 만한 결과물을 실제 서비스로 잇는 길을 압니다.",
  },
  {
    title: "심사 기준은 데모가 아니라 밸류",
    desc: "업무 시간을 얼마나 줄였는지, 실제 데이터로 돌아가는지, 다른 팀으로 넓힐 수 있는지를 봅니다.",
  },
  {
    title: "코치가 실전 빌더",
    desc: "막히는 지점에서 실제 구현을 함께 풉니다.",
  },
];

const FORMAT_ROWS = [
  {
    format: "스프린트",
    duration: "하루",
    outcome: "팀이 고른 문제의 프로토타입",
  },
  {
    format: "해커톤",
    duration: "이틀에서 사흘",
    outcome: "팀별 결과물과 심사",
  },
  {
    format: "PBL 인큐베이터",
    duration: "4주에서 8주",
    outcome: "파일럿 수준의 결과물",
  },
  {
    format: "콘테스트",
    duration: "시즌 단위",
    outcome: "사내 배포 후보 우승작",
  },
];

export default function Hackathon() {
  return (
    <section id="hackathon" className="ax-section">
      <div className="ax-container">
        <div className={styles.eyebrowRow}>
          <div className="ax-eyebrow">02 / AX HACKATHON</div>
          <div className={styles.tag}>실전 전환</div>
        </div>
        <h2 className={`ax-h2 ${styles.headline}`}>
          교육과 컨설팅을 잇는 다리
        </h2>
        <p className={styles.lead}>
          강의에서 배운 것을 사내 실제 문제에 붙여 돌아가는 결과물을 만드는 실전
          과정입니다. 프루퍼가 기업 AI 심화 해커톤을 코치한 경험 위에 섭니다.
        </p>

        <div className={styles.cards}>
          {APPROACH_CARDS.map((card, i) => (
            <Enter key={card.title} index={i}>
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
            </Enter>
          ))}
        </div>

        <Enter index={0}>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <div>포맷</div>
              <div>기간</div>
              <div>결과물</div>
            </div>
            {FORMAT_ROWS.map((row) => (
              <div key={row.format} className={styles.tableRow}>
                <div data-label="포맷" className={styles.tableFormat}>
                  {row.format}
                </div>
                <div data-label="기간">{row.duration}</div>
                <div data-label="결과물">{row.outcome}</div>
              </div>
            ))}
          </div>
        </Enter>

        <Enter index={0}>
          <div className={styles.progress}>
            <div className={styles.progressLabel}>진행</div>
            <div className={styles.progressBody}>
              <p className={styles.progressText}>
                문제 발굴 워크숍으로 시작합니다. 각 팀이 AI로 없앨 반복 업무나
                풀고 싶은 문제를 정하고, 프루퍼가 그 문제의 크기를 함께
                가늠합니다. 킥오프에서 도구를 세팅하고 팀을 짜고 데이터를 준비한
                뒤, 코치가 붙어 빌드를 돕습니다. 심사는 절감 시간, 완성도,
                재사용성, 배포 적합성을 기준으로 하고, 유망한 결과물은 컨설팅
                과정으로 넘겨 실제 서비스로 만듭니다.
              </p>
              <div className={styles.callout}>
                교육 예산을 실제로 쓰는 도구 자산으로 바꾸려는 고객사를 위해,
                우승작을 프루퍼가 짧은 스프린트로 배포 수준까지 끌어올리는
                옵션도 둡니다.
              </div>
            </div>
          </div>
        </Enter>
      </div>
    </section>
  );
}
