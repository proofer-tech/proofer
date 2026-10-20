import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import Lines from "@/app/subs/ax/components/Lines";
import type { CourseBlock } from "@/app/subs/ax/content/types";
import styles from "./Lecture.module.scss";

export default function Lecture({ block }: { block: CourseBlock }) {
  return (
    <section
      id={block.id}
      className={`ax-section${block.alt ? " ax-section--alt" : ""}`}
    >
      <div className="ax-container">
        <div className={styles.eyebrowRow}>
          <div className="ax-eyebrow">{block.eyebrow}</div>
          <div className={styles.eyebrowSub}>{block.tag}</div>
        </div>
        <Enter index={0}>
          <h2 className={`ax-h2 ${styles.headline}`}>
            <Lines lines={block.headline} />
          </h2>
        </Enter>
        <p className={styles.desc}>{block.desc}</p>

        {block.cards && (
          <div className={styles.grid}>
            {block.cards.map((lv, i) => (
              <Enter key={lv.level} index={i}>
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardLevel}>{lv.level}</div>
                    <div className={styles.cardDuration}>{lv.duration}</div>
                  </div>
                  <h3 className={styles.cardTitle}>{lv.title}</h3>
                  <div className={styles.cardTarget}>{lv.target}</div>
                  <p className={styles.cardDesc}>{lv.desc}</p>
                  <div className={styles.cardFoot}>
                    <span className={styles.cardFootLabel}>산출물: </span>
                    {lv.outcome}
                  </div>
                </div>
              </Enter>
            ))}
          </div>
        )}

        {block.panels?.map((panel) => (
          <Enter key={panel.title} index={0}>
            <div className={styles.leader}>
              <div className={styles.leaderLeft}>
                <div className={styles.leaderLabel}>{panel.label}</div>
                <h3 className={styles.leaderTitle}>{panel.title}</h3>
                <div className={styles.leaderMeta}>{panel.meta}</div>
              </div>
              <div className={styles.leaderRight}>
                <p className={styles.leaderDesc}>{panel.desc}</p>
                {panel.outcome && (
                  <div className={styles.leaderOutcome}>
                    <span className={styles.leaderOutcomeLabel}>산출물: </span>
                    {panel.outcome}
                  </div>
                )}
              </div>
            </div>
          </Enter>
        ))}

        {block.ops && (
          <Enter index={0}>
            <div className={styles.ops}>
              <div className={styles.opsLabel}>{block.ops.label}</div>
              <div>
                <p className={styles.opsDesc}>{block.ops.desc}</p>
                {block.ops.items && (
                  <div className={styles.opsItems}>
                    {block.ops.items.map((item) => (
                      <div key={item.label} className={styles.opsItem}>
                        <div className={styles.opsItemLabel}>{item.label}</div>
                        <div className={styles.opsItemTitle}>{item.title}</div>
                        <div className={styles.opsItemText}>{item.text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Enter>
        )}
      </div>
    </section>
  );
}
