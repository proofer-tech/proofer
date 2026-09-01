import React from "react";
import styles from "./Outcome.module.scss";

const ITEMS = [
  { n: "01", text: "임직원이 수준별로 AI 활용력을 갖춥니다." },
  {
    n: "02",
    text: "강의가 실습 산출물과 사내 도구로 남아 교육 이후에도 자산이 됩니다.",
  },
  {
    n: "03",
    text: "현업의 진짜 문제가 발굴되고, 그중 일부를 실제 서비스로 전환합니다.",
  },
  {
    n: "04",
    text: "AI 도입을 영업이익과 기업가치로 잇는 경로를 만듭니다.",
    strong: true,
  },
];

export default function Outcome() {
  return (
    <section id="outcome" className="ax-section ax-section--alt">
      <div className={`ax-container ${styles.wrap}`}>
        <div>
          <div className={styles.eyebrow}>EXPECTED OUTCOME</div>
          <h2 className={styles.headline}>
            교육 이후에
            <br />
            기업에 남는 것
          </h2>
        </div>
        <div className={styles.list}>
          {ITEMS.map((item) => (
            <div key={item.n} className={styles.item}>
              <span className={styles.itemNumber}>{item.n}</span>
              <span
                className={
                  item.strong
                    ? `${styles.itemText} ${styles.itemTextStrong}`
                    : styles.itemText
                }
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
