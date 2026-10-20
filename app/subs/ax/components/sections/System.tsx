import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import Arrow from "@/app/subs/ax/components/Arrow";
import Lines from "@/app/subs/ax/components/Lines";
import type { System as SystemContent } from "@/app/subs/ax/content/types";
import styles from "./System.module.scss";
import extra from "./Extra.module.scss";

export default function System({ system }: { system: SystemContent }) {
  const cols = system.steps.map(() => "1fr").join(" auto ");
  return (
    <section id="system" className="ax-section">
      <div className="ax-container">
        <div className="ax-eyebrow">{system.eyebrow}</div>
        <h2 className="ax-h2">
          <Lines lines={system.headline} />
        </h2>
        <p className={styles.lead}>{system.lead}</p>
        <div
          className={styles.grid}
          style={{ "--cols": cols } as React.CSSProperties}
        >
          {system.steps.map((step, i) => (
            <React.Fragment key={step.href + step.title}>
              {i > 0 && (
                <Enter index={i * 2 - 1}>
                  <div className={styles.arrow}>
                    <Arrow />
                  </div>
                </Enter>
              )}
              <Enter index={i * 2}>
                <a href={step.href} className={styles.step}>
                  <div className={styles.stepEyebrow}>
                    STEP {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepSubtitle}>{step.subtitle}</div>
                  <div className={styles.stepText}>{step.text}</div>
                </a>
              </Enter>
            </React.Fragment>
          ))}
        </div>
        {system.inside && (
          <Enter>
            <div className={extra.inside}>
              <div className={extra.label}>{system.inside.label}</div>
              <ul className={extra.insideList}>
                {system.inside.items.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </Enter>
        )}
        <Enter>
          <div className={extra.handover}>
            <div className={extra.label}>HANDOVER</div>
            <div className={extra.handoverTitle}>단계가 서로를 물고 갑니다</div>
            <p className={extra.text}>{system.handover}</p>
          </div>
        </Enter>
        {system.entry && (
          <Enter>
            <div className={extra.handover}>
              <div className={extra.label}>{system.entry.label}</div>
              <div className={extra.handoverTitle}>{system.entry.title}</div>
              <p className={extra.text}>{system.entry.text}</p>
            </div>
          </Enter>
        )}
      </div>
    </section>
  );
}
