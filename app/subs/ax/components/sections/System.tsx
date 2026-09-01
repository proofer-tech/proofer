import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import styles from "./System.module.scss";

const STEPS = [
  {
    href: "#lecture",
    eyebrow: "STEP 01",
    title: "AX Lecture",
    subtitle: "저변 확대",
    text: "임직원의 AI 활용력을 수준별로 끌어올립니다.",
  },
  {
    href: "#hackathon",
    eyebrow: "STEP 02",
    title: "AX Hackathon",
    subtitle: "실전 전환",
    text: "실제 문제에 붙여 돌아가는 결과물을 만듭니다.",
  },
  {
    href: "#consulting",
    eyebrow: "STEP 03",
    title: "AX Consulting",
    subtitle: "성과 실행",
    text: "결과물을 실제 서비스와 성과로 연결합니다.",
  },
];

export default function System() {
  return (
    <section id="system" className="ax-section">
      <div className="ax-container">
        <div className="ax-eyebrow">CURRICULUM SYSTEM</div>
        <h2 className="ax-h2">기업에 AI를 녹여냅니다</h2>
        <p className={styles.lead}>
          강의로 조직 전반의 AI 활용력을 끌어올리고, 해커톤으로 그 힘을 사내
          실제 문제에 붙여 돌아가는 결과물을 만들고, 컨설팅으로 그 결과물을 실제
          서비스와 성과로 연결합니다. 고객사는 필요한 지점부터 시작하면 됩니다.
        </p>
        <div className={styles.grid}>
          {STEPS.map((step, i) => (
            <React.Fragment key={step.href}>
              {i > 0 && (
                <Enter index={i * 2 - 1}>
                  <div className={styles.arrow}>→</div>
                </Enter>
              )}
              <Enter index={i * 2}>
                <a href={step.href} className={styles.step}>
                  <div className={styles.stepEyebrow}>{step.eyebrow}</div>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepSubtitle}>{step.subtitle}</div>
                  <div className={styles.stepText}>{step.text}</div>
                </a>
              </Enter>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
