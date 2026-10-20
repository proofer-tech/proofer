import React from "react";
import Enter from "@/app/subs/ax/components/Enter";
import Arrow from "@/app/subs/ax/components/Arrow";
import Lines from "@/app/subs/ax/components/Lines";
import type { WorkspaceBlock } from "@/app/subs/ax/content/types";
import extra from "./Extra.module.scss";
import styles from "./Hackathon.module.scss";

/** AI Native Workspace(업무환경 구축). 업무툴 -> 기업 온톨로지 -> Claude와 임직원 */
export default function Workspace({ block }: { block: WorkspaceBlock }) {
  return (
    <section id={block.id} className="ax-section">
      <div className="ax-container">
        <div className={styles.eyebrowRow}>
          <div className="ax-eyebrow">{block.eyebrow}</div>
          <div className={styles.tag}>{block.tag}</div>
        </div>
        <h2 className={`ax-h2 ${styles.headline}`}>
          <Lines lines={block.headline} />
        </h2>
        <p className={styles.lead}>{block.lead}</p>

        <Enter>
          <div className={extra.diagram}>
            <div className={extra.diagramCol}>
              <div className={extra.label}>HOW IT CONNECTS</div>
              <ul className={extra.toolList}>
                {block.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className={extra.diagramLinks} aria-hidden="true">
              <span>기여</span>
              <Arrow />
              <Arrow />
              <span>활용</span>
            </div>
            <div className={`${extra.diagramCol} ${extra.ontology}`}>
              <div className={extra.trioTitle}>기업 온톨로지</div>
              <p className={extra.text}>{block.ontologyDesc}</p>
              <ul className={extra.chips}>
                {block.concepts.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className={extra.diagramLinks} aria-hidden="true">
              <Arrow />
            </div>
            <div className={extra.diagramCol}>
              <div className={extra.actor}>
                <div className={extra.trioTitle}>Claude</div>
                <p className={extra.text}>온톨로지를 읽고 답하고 만듭니다</p>
              </div>
              <div className={extra.actor}>
                <div className={extra.trioTitle}>{block.actorName}</div>
                <p className={extra.text}>{block.actorText}</p>
              </div>
            </div>
          </div>
        </Enter>

        <div className={extra.steps}>
          {block.steps.map((step, i) => (
            <Enter key={step.title} index={i}>
              <div className={extra.step}>
                <div className={extra.label}>
                  {String(i + 1).padStart(2, "0")} {step.title}
                </div>
                <p className={extra.text}>{step.text}</p>
              </div>
            </Enter>
          ))}
        </div>

        <Enter>
          <div className={styles.progress}>
            <div className={styles.progressLabel}>EXAMPLE</div>
            <div className={styles.progressBody}>
              <div className={extra.trioTitle}>{block.exampleTitle}</div>
              <p className={styles.progressText}>{block.exampleText}</p>
              <div className={styles.callout}>{block.closing}</div>
            </div>
          </div>
        </Enter>
      </div>
    </section>
  );
}
