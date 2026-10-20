import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import Lines from "@/app/subs/ax/components/Lines";
import type { Outcome as OutcomeContent } from "@/app/subs/ax/content/types";
import styles from "./Outcome.module.scss";

export default function Outcome({ outcome }: { outcome: OutcomeContent }) {
  const last = outcome.items.length - 1;
  return (
    <section id="outcome" className="ax-section ax-section--alt">
      <div className={`ax-container ${styles.wrap}`}>
        <div>
          <div className="ax-eyebrow">EXPECTED OUTCOME</div>
          <Enter index={0}>
            <h2 className={styles.headline}>
              <Lines lines={outcome.headline} />
            </h2>
          </Enter>
        </div>
        <div className={styles.list}>
          {outcome.items.map((text, i) => (
            <Enter key={text} index={i + 1}>
              <div className={styles.item}>
                <span className={styles.itemNumber}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={
                    outcome.strongLast && i === last
                      ? `${styles.itemText} ${styles.itemTextStrong}`
                      : styles.itemText
                  }
                >
                  {text}
                </span>
              </div>
            </Enter>
          ))}
        </div>
      </div>
    </section>
  );
}
