import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import styles from "./Approach.module.scss";

const CARDS = [
  {
    number: "01",
    title: "강의만 하는 강사가 아닌 전문 FDE",
    text: "실습 예제가 시연용이 아니라 현업에서 쓰던 것이며 강의에서 나온 피드백 또한 기업에 적용해드립니다.",
  },
  {
    number: "02",
    title: "실무를 고려한 솔루션 선택",
    text: "진짜 문제를 다뤄 왔기 때문에 고객사 환경에 맞는 도구 또는 SI 를 중립적으로 권할 수 있습니다.",
  },
  {
    number: "03",
    title: "기업가치를 끌어올리는 지렛대",
    text: 'AI를 영업이익과 기업가치를 올리는 지렛대로 봅니다. 교육의 끝이 "우리 회사에 무엇을 적용할까"로 이어질 수 있도록 만듭니다.',
  },
];

export default function Approach() {
  return (
    <section id="approach" className="ax-section ax-section--alt">
      <div className="ax-container">
        <div className="ax-eyebrow">OUR VIEW</div>
        <Enter>
          <h2 className={`ax-h2 ${styles.heading}`}>
            &quot;기업가치를 증명합니다&quot;를
            <br />
            교육에 그대로 옮겨 드립니다.
          </h2>
        </Enter>
        <Enter>
          <p className={styles.lead}>
            받은 과제만 처리하는 대신 현장에 들어가 진짜 문제를 다시 정의하고,
            필요하면 앱과 서버와 AI까지 직접 만들어 운영효율을 끌어올립니다.
            그래서 세 가지가 다릅니다.
          </p>
        </Enter>
        <div className={styles.grid}>
          {CARDS.map((card, i) => (
            <Enter key={card.number} index={i}>
              <div className={styles.card}>
                <div className={styles.cardBadge}>{card.number}</div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </div>
            </Enter>
          ))}
        </div>
        <Enter>
          <div className={styles.quote}>
            <p className={styles.quoteText}>
              프루퍼는 AI Native 기업입니다. 사내 시스템을 AI에 연결하는 도구를
              직접 만들어 쓰고, 반복 업무를 자동화 워크플로로 돌리며, 흩어진
              사내 지식을 AI가 활용하도록 구조화해 왔습니다.{" "}
              <strong style={{ color: "var(--ink)", fontWeight: 700 }}>
                남이 만든 커리큘럼을 전달하는 것이 아니라, 실제로 그렇게 일하는
                회사의 방식을 공유합니다.
              </strong>
            </p>
          </div>
        </Enter>
      </div>
    </section>
  );
}
