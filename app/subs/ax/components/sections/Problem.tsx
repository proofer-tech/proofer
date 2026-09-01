import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import styles from "./Problem.module.scss";

const ITEMS = [
  {
    num: "01",
    title: "도구 사용법에서 멈춤",
    desc: "시연은 화려하지만 내 업무와 연결되지 않습니다.",
  },
  {
    num: "02",
    title: "남는 자산이 없음",
    desc: "과정이 끝나면 워크시트도 프롬프트도 흩어집니다.",
  },
  {
    num: "03",
    title: "성과로 이어지지 않음",
    desc: "영업이익과 기업가치까지 가는 경로가 없습니다.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className={styles.problem}>
      <div className={styles.grid}>
        <Enter>
          <div>
            <div className="ax-eyebrow">PROBLEM</div>
            <h2 className={`ax-h2 ${styles.headline}`}>
              예산은 이미 집행되었는데,
              <br />
              일하는 방식은 그대로인가요?
            </h2>
          </div>
        </Enter>
        <div className={styles.body}>
          <Enter>
            <p className={styles.lead}>
              시중의 AI 교육 대부분은 도구 사용법을 알려주는 데서 멈춥니다.
              수강생은 강의장에서는 감탄하지만 자리로 돌아오면 자기 업무에
              무엇을 어떻게 붙일지 막막해합니다.
            </p>
          </Enter>
          <div className={styles.cards}>
            {ITEMS.map((item, i) => (
              <Enter key={item.num} index={i}>
                <div className={styles.card}>
                  <div className={styles.cardNum}>{item.num}</div>
                  <div className={styles.cardTitle}>{item.title}</div>
                  <div className={styles.cardDesc}>{item.desc}</div>
                </div>
              </Enter>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
