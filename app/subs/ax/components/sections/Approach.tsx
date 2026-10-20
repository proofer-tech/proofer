import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import Lines from "@/app/subs/ax/components/Lines";
import type { Approach as ApproachContent } from "@/app/subs/ax/content/types";
import styles from "./Approach.module.scss";
import extra from "./Extra.module.scss";

export default function Approach({ approach }: { approach: ApproachContent }) {
  return (
    <section id="approach" className="ax-section ax-section--alt">
      <div className="ax-container">
        <div className="ax-eyebrow">OUR VIEW</div>
        <Enter>
          <h2 className={`ax-h2 ${styles.heading}`}>
            <Lines lines={approach.headline} />
          </h2>
        </Enter>
        <Enter>
          <p className={styles.lead}>{approach.lead}</p>
        </Enter>
        <div className={styles.grid}>
          {approach.cards.map((card, i) => (
            <Enter key={card.title} index={i}>
              <div className={styles.card}>
                <div className={styles.cardBadge}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.desc}</p>
              </div>
            </Enter>
          ))}
        </div>
        {approach.trio && (
          <div className={extra.trio}>
            {approach.trio.map((t, i) => (
              <Enter key={t.label} index={i}>
                <div className={extra.trioItem}>
                  <div className={extra.label}>{t.label}</div>
                  <div className={extra.trioTitle}>{t.title}</div>
                  <p className={extra.text}>{t.text}</p>
                </div>
              </Enter>
            ))}
          </div>
        )}
        <Enter>
          <div className={styles.quote}>
            <p className={styles.quoteText}>{approach.quote}</p>
          </div>
        </Enter>
      </div>
    </section>
  );
}
