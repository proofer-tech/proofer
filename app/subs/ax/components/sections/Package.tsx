import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import type { Package as PackageContent } from "@/app/subs/ax/content/types";
import styles from "./Package.module.scss";
import extra from "./Extra.module.scss";

export default function Package({ pkg }: { pkg: PackageContent }) {
  return (
    <section id="package" className="ax-section">
      <div className="ax-container">
        <div className="ax-eyebrow">{pkg.eyebrow}</div>
        <Enter index={0}>
          <h2 className={`ax-h2 ${styles.headline}`}>{pkg.headline}</h2>
        </Enter>
        <div className={styles.grid}>
          {pkg.cards.map((card, i) => (
            <Enter key={card.title} index={i + 1}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardDesc}>
                  {card.lines.map((line, li) => (
                    <div
                      key={line}
                      className={
                        li === 0 && card.included
                          ? styles.lineIncluded
                          : undefined
                      }
                    >
                      {li > 0 && "+ "}
                      {line}
                      {li === 0 && card.included && (
                        <span className={styles.chip}>포함</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className={styles.cardFoot}>{card.foot}</div>
              </div>
            </Enter>
          ))}
          <Enter
            index={pkg.cards.length + 1}
            className={styles.cardEnterpriseWrap}
          >
            <div className={`${styles.card} ${styles.cardEnterprise}`}>
              <div className={styles.enterpriseMain}>
                <div className={styles.cardTitle}>{pkg.final.title}</div>
                <div className={styles.cardDesc}>
                  {pkg.final.lines.join(" + ")}
                </div>
              </div>
              <div className={styles.cardFoot}>{pkg.final.foot}</div>
            </div>
          </Enter>
        </div>
        <Enter index={pkg.cards.length + 2}>
          <p className={styles.note}>{pkg.note}</p>
        </Enter>
        {pkg.aside && (
          <Enter>
            <div className={extra.handover}>
              <div className={extra.label}>{pkg.aside.label}</div>
              {pkg.aside.title && (
                <div className={extra.handoverTitle}>{pkg.aside.title}</div>
              )}
              {pkg.aside.items && (
                <ul className={extra.insideList}>
                  {pkg.aside.items.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
              <p className={extra.text}>{pkg.aside.text}</p>
            </div>
          </Enter>
        )}
      </div>
    </section>
  );
}
