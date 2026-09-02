import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import { FAQS } from "./Faq.data";
import styles from "./Faq.module.scss";

export default function Faq() {
  return (
    <section id="faq" className="ax-section">
      <div className="ax-container">
        <Enter index={0}>
          <div>
            <div className="ax-eyebrow">FAQ</div>
            <h2 className={`ax-h2 ${styles.headline}`}>자주 묻는 질문</h2>
          </div>
        </Enter>
        <div className={styles.list}>
          {FAQS.map((item, i) => (
            <Enter key={item.q} index={i + 1}>
              <details className={styles.item}>
                <summary className={styles.question}>
                  <span className={styles.questionText}>{item.q}</span>
                  <span className={styles.marker} aria-hidden="true" />
                </summary>
                <p className={styles.answer}>{item.a}</p>
              </details>
            </Enter>
          ))}
        </div>
      </div>
    </section>
  );
}
