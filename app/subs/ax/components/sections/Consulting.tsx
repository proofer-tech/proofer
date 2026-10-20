import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import Arrow from "@/app/subs/ax/components/Arrow";
import Lines from "@/app/subs/ax/components/Lines";
import type { ConsultingBlock } from "@/app/subs/ax/content/types";
import styles from "./Consulting.module.scss";

export default function Consulting({ block }: { block: ConsultingBlock }) {
  return (
    <section
      id={block.id}
      className={`ax-section${block.alt ? " ax-section--alt" : ""}`}
    >
      <div className="ax-container">
        <div className={styles.eyebrowRow}>
          <div className="ax-eyebrow">{block.eyebrow}</div>
          <div className={styles.stage}>{block.tag}</div>
        </div>
        <h2 className={`ax-h2 ${styles.headline}`}>
          <Lines lines={block.headline} />
        </h2>
        <p className={styles.lede}>{block.lead}</p>

        <div className={styles.layers}>
          {block.layers.map((layer, i) => (
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
            <h3 className={styles.blockTitle}>{block.servicesTitle}</h3>
            <ul className={styles.services}>
              {block.services.map((text, i) => (
                <li key={text} className={styles.serviceItem}>
                  <Enter index={i}>
                    <span className={styles.serviceBullet} aria-hidden="true" />
                    <span className={styles.serviceText}>{text}</span>
                  </Enter>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.blockTitle}>{block.engageTitle}</h3>
            <p className={styles.engageDesc}>{block.engage}</p>
            <div className={styles.flow}>
              {block.flow.map((step, i) => (
                <React.Fragment key={step}>
                  <Enter index={i * 2}>
                    <span
                      className={
                        i === block.flow.length - 1
                          ? `${styles.flowStep} ${styles["flowStep--final"]}`
                          : styles.flowStep
                      }
                    >
                      {step}
                    </span>
                  </Enter>
                  {i < block.flow.length - 1 && (
                    <Enter index={i * 2 + 1}>
                      <span className={styles.flowArrow}>
                        <Arrow size={16} />
                      </span>
                    </Enter>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className={styles.engageNote}>{block.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
