import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import Lines from "@/app/subs/ax/components/Lines";
import type { CaseBlock } from "@/app/subs/ax/content/types";
import extra from "./Extra.module.scss";
import styles from "./Hackathon.module.scss";

/** 실제로 해 본 과정(사례). 기관명은 마스킹된 값 그대로 쓴다 */
export default function Case({ block }: { block: CaseBlock }) {
  return (
    <section
      id={block.id}
      className={`ax-section${block.alt ? " ax-section--alt" : ""}`}
    >
      <div className="ax-container">
        <div className="ax-eyebrow">{block.eyebrow}</div>
        <h2 className={`ax-h2 ${styles.headline}`}>
          <Lines lines={block.headline} />
        </h2>
        <p className={styles.lead}>{block.lead}</p>

        <div className={extra.stats}>
          {block.stats.map((s, i) => (
            <Enter key={s.label} index={i}>
              <div className={extra.fact}>
                <div className={extra.label}>{s.label}</div>
                <div className={extra.statValue}>{s.value}</div>
                <p className={extra.text}>{s.desc}</p>
              </div>
            </Enter>
          ))}
        </div>

        <Enter>
          <div className={extra.process}>
            <div className={extra.label}>PROCESS</div>
            <ol className={extra.processList}>
              {block.process.map((p, i) => (
                <li key={p.title}>
                  <span className={extra.processNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </Enter>

        <div
          className={extra.facts}
          style={{ "--cols": 2 } as React.CSSProperties}
        >
          <Enter>
            <div className={extra.fact}>
              <div className={extra.label}>LEARNED</div>
              <div className={extra.trioTitle}>{block.learned.title}</div>
              <p className={extra.text}>{block.learned.text}</p>
            </div>
          </Enter>
          <Enter index={1}>
            <div className={extra.fact}>
              <div className={extra.label}>TAKEAWAY</div>
              <div className={extra.trioTitle}>{block.takeaway.title}</div>
              <p className={extra.text}>{block.takeaway.text}</p>
            </div>
          </Enter>
        </div>

        <Enter>
          <p className={extra.note}>{block.note}</p>
        </Enter>
      </div>
    </section>
  );
}
