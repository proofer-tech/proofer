import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import Lines from "@/app/subs/ax/components/Lines";
import type { Problem as ProblemContent } from "@/app/subs/ax/content/types";
import styles from "./Problem.module.scss";
import extra from "./Extra.module.scss";

export default function Problem({ problem }: { problem: ProblemContent }) {
  return (
    <section id="problem" className={styles.problem}>
      <div className={styles.grid}>
        <Enter>
          <div>
            <div className="ax-eyebrow">PROBLEM</div>
            <h2 className={`ax-h2 ${styles.headline}`}>
              <Lines lines={problem.headline} />
            </h2>
          </div>
        </Enter>
        <div className={styles.body}>
          <Enter>
            <p className={styles.lead}>{problem.lead}</p>
          </Enter>
          <div className={styles.cards}>
            {problem.items.map((item, i) => (
              <Enter key={item.title} index={i}>
                <div className={styles.card}>
                  <div className={styles.cardNum}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.cardTitle}>{item.title}</div>
                  <div className={styles.cardDesc}>{item.desc}</div>
                </div>
              </Enter>
            ))}
          </div>
          <Enter>
            <p className={styles.lead}>{problem.closing}</p>
          </Enter>
          {problem.signals && (
            <Enter>
              <div className={extra.signals}>
                <div className={extra.signalsLabel}>
                  {problem.signals.label}
                </div>
                <ul className={extra.signalsList}>
                  {problem.signals.items.map((text, i) => (
                    <li key={text}>
                      <span className={extra.signalsKey}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </Enter>
          )}
        </div>
      </div>
    </section>
  );
}
