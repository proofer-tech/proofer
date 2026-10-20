import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import Lines from "@/app/subs/ax/components/Lines";
import type { TableBlock } from "@/app/subs/ax/content/types";
import styles from "./Hackathon.module.scss";
import extra from "./Extra.module.scss";

/** 카드, 표, 진행 설명으로 이루어진 블록. 해커톤, Founder Session, Build Sprint, 진단이 쓴다 */
export default function Hackathon({ block }: { block: TableBlock }) {
  // 가운데 칸이 더 긴 표(하는 일)는 가운데를 넓히고, 아니면 끝 칸(결과물)을 넓힌다
  const avg = (c: number) =>
    block.rows.reduce((n, r) => n + r[c].length, 0) / block.rows.length;
  const tableCols =
    block.head.length === 2
      ? "1fr 3fr"
      : avg(1) > avg(2)
        ? "1.1fr 1.6fr 1fr"
        : "1.1fr 1fr 1.6fr";
  return (
    <section
      id={block.id}
      className={`ax-section${block.alt ? " ax-section--alt" : ""}`}
    >
      <div className="ax-container">
        <div className={styles.eyebrowRow}>
          <div className="ax-eyebrow">{block.eyebrow}</div>
          <div className={styles.tag}>{block.tag}</div>
        </div>
        <h2 className={`ax-h2 ${styles.headline}`}>
          <Lines lines={block.headline} />
        </h2>
        <p className={styles.lead}>{block.lead}</p>

        {block.cards && (
          <div
            className={styles.cards}
            style={{ "--cols": block.cards.length } as React.CSSProperties}
          >
            {block.cards.map((card, i) => (
              <Enter key={card.title} index={i}>
                <div className={styles.card}>
                  {card.label && (
                    <div className={extra.label}>{card.label}</div>
                  )}
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.desc}</p>
                </div>
              </Enter>
            ))}
          </div>
        )}

        <Enter index={0}>
          <div
            className={styles.table}
            style={{ "--tcols": tableCols } as React.CSSProperties}
          >
            <div className={styles.tableHead}>
              {block.head.map((h) => (
                <div key={h}>{h}</div>
              ))}
            </div>
            {block.rows.map((row) => (
              <div key={row[0]} className={styles.tableRow}>
                {row.map((cell, ci) => (
                  <div
                    key={cell}
                    data-label={block.head[ci]}
                    className={ci === 0 ? styles.tableFormat : undefined}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Enter>

        {block.facts && (
          <div
            className={extra.facts}
            style={{ "--cols": block.facts.length } as React.CSSProperties}
          >
            {block.facts.map((f, i) => (
              <Enter key={f.label} index={i}>
                <div className={extra.fact}>
                  <div className={extra.label}>{f.label}</div>
                  <div className={extra.trioTitle}>{f.title}</div>
                  <p className={extra.text}>{f.text}</p>
                </div>
              </Enter>
            ))}
          </div>
        )}

        {block.progress && (
          <Enter index={0}>
            <div className={styles.progress}>
              <div className={styles.progressLabel}>{block.progress.label}</div>
              <div className={styles.progressBody}>
                <p className={styles.progressText}>{block.progress.text}</p>
                {block.progress.callout && (
                  <div className={styles.callout}>{block.progress.callout}</div>
                )}
              </div>
            </div>
          </Enter>
        )}

        {block.note && (
          <Enter index={0}>
            <p className={extra.note}>{block.note}</p>
          </Enter>
        )}
      </div>
    </section>
  );
}
