import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import styles from "./Consulting.module.scss";

const LAYERS = [
  {
    label: "LAYER 01",
    title: "비즈니스와 조직",
    desc: "사업과 수익 구조를 다시 설계하고, 채용과 육성, 역할을 재편합니다. AI 도입을 조직의 관점에서 봅니다.",
  },
  {
    label: "LAYER 02",
    title: "개발과 구축",
    desc: "기획부터 앱, 서버, AI까지 직접 구현하고 검증합니다. 사내 도구와 에이전트를 만들고 데이터를 정비합니다.",
  },
  {
    label: "LAYER 03",
    title: "진단과 전환",
    desc: "현행 프로세스를 진단하고 AI 전환의 우선순위를 세워 파일럿을 설계합니다.",
  },
];

const SERVICES = [
  "프루퍼가 사내에서 쓰는 AI 기반 개발 방식을 고객사 조직에 이식합니다.",
  "고객사의 사내 시스템과 문서, 데이터를 AI에 연결하는 도구를 구축합니다.",
  "사내에 흩어진 지식과 데이터를 AI가 활용하도록 구조화합니다.",
  "반복 업무를 실제 자동화 워크플로로 구현합니다.",
  "규제와 민감 데이터 환경에서도 AI를 도입하도록 설계합니다.",
];

const FLOW = ["진단", "파일럿", "실행·운영", "기업가치 검증"];

export default function Consulting() {
  return (
    <section id="consulting" className={`ax-section ax-section--alt`}>
      <div className="ax-container">
        <div className={styles.eyebrowRow}>
          <div className="ax-eyebrow">03 / AX CONSULTING</div>
          <div className={styles.stage}>성과 실행</div>
        </div>
        <h2 className={`ax-h2 ${styles.headline}`}>
          진단부터 전환, 운영까지 이어집니다
        </h2>
        <p className={styles.lede}>
          진단부터 전환, 운영까지 이어집니다. AI 활용법을 가르치는 데 그치지
          않고, 회사의 일하는 방식과 수익 구조를 AI로 다시 설계해 직접 만들고
          운영합니다.
        </p>

        <div className={styles.layers}>
          {LAYERS.map((layer, i) => (
            <Enter key={layer.label} index={i}>
              <div className={styles.layerCard}>
                <div className={styles.layerLabel}>{layer.label}</div>
                <h3 className={styles.layerTitle}>{layer.title}</h3>
                <p className={styles.layerDesc}>{layer.desc}</p>
              </div>
            </Enter>
          ))}
        </div>

        <div className={styles.split}>
          <div>
            <h3 className={styles.blockTitle}>AX 특화 서비스</h3>
            <ul className={styles.services}>
              {SERVICES.map((text, i) => (
                <li key={text} className={styles.serviceItem}>
                  <Enter index={i}>
                    <span className={styles.serviceBullet}>—</span>
                    <span className={styles.serviceText}>{text}</span>
                  </Enter>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.blockTitle}>참여 방식</h3>
            <p className={styles.engageDesc}>
              진단으로 시작해 파일럿으로 효과를 확인하고, 실행 단계에서 실제로
              만들어 운영하며, 성과를 기업가치 관점에서 검증합니다. 프루퍼는
              실무에 직접 참여하고, 비용은 프로젝트 참여와 성과 인센티브로
              구성합니다. 단순한 컨설턴트가 아닌 협업 대상자로 기능합니다.
            </p>
            <div className={styles.flow}>
              {FLOW.map((step, i) => (
                <React.Fragment key={step}>
                  <Enter index={i * 2}>
                    <span
                      className={
                        i === FLOW.length - 1
                          ? `${styles.flowStep} ${styles["flowStep--final"]}`
                          : styles.flowStep
                      }
                    >
                      {step}
                    </span>
                  </Enter>
                  {i < FLOW.length - 1 && (
                    <Enter index={i * 2 + 1}>
                      <span className={styles.flowArrow}>→</span>
                    </Enter>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className={styles.engageNote}>
              리더 과정에서 나온 우선순위와 해커톤에서 나온 결과물이 그대로 이
              진단의 입력이 됩니다.{" "}
              <strong>
                교육에서 찾은 문제를 컨설팅에서 실제 서비스로 만듭니다.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
