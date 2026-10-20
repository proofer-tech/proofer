import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import Enter from "@/app/subs/ax/components/Enter";
import type { SegmentMeta } from "@/app/subs/ax/segments";
import type { Hero as HeroContent } from "@/app/subs/ax/content/types";
import styles from "./Hero.module.scss";

const MARQUEE_ITEMS = [
  "AI 리터러시",
  "도구 실무",
  "직무 특화",
  "에이전트",
  "리더 세션",
  "해커톤",
  "PBL 인큐베이터",
  "AI Native 업무환경",
  "업무 자동화",
  "기업가치",
];

// 축당 도구는 셋까지. 넷째는 Hero가 아니라 L2/L4 카드 desc에 적는다 (docs/ax-tool-axis-spec.md 4.4)
const TOOL_AXES = [
  {
    id: "ax-tools-chat",
    label: "대화형 도구",
    tools: ["Claude", "ChatGPT", "Gemini"],
  },
  {
    id: "ax-tools-coding",
    label: "코딩 에이전트",
    tools: ["Claude Code", "Antigravity", "Codex"],
  },
];

function MarqueeList() {
  return (
    <div className={styles.marqueeList}>
      {MARQUEE_ITEMS.map((item) => (
        <React.Fragment key={item}>
          <span>{item}</span>
          <span className={styles.marqueeDot} aria-hidden="true" />
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Hero({
  segment,
  hero,
}: {
  segment: SegmentMeta;
  hero: HeroContent;
}) {
  return (
    <>
      <section id="top" className={styles.hero}>
        <div className={styles.grid}>
          <div>
            <Enter index={0} immediate>
              <div className="ax-eyebrow">{hero.eyebrow}</div>
            </Enter>
            <Enter index={1} immediate>
              <h1 className={styles.headline}>
                {hero.headline.map((line, i) => (
                  <React.Fragment key={line}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </h1>
            </Enter>
            <Enter index={2} immediate>
              <p className={styles.lead}>{hero.lead}</p>
            </Enter>
            <div className={styles.actions}>
              <Enter index={3} immediate>
                <AxInquireButton className="ax-btn">
                  AX 도입 상담
                </AxInquireButton>
              </Enter>
              <Enter index={4} immediate>
                <a href={segment.pdf} className="ax-btn ax-btn--ghost">
                  커리큘럼 다운로드
                </a>
              </Enter>
            </div>
          </div>
          <div className={styles.tiles}>
            <Enter index={5} immediate>
              <div className={styles.tile}>
                <div className={styles.tileLabel}>FLAGSHIP RECORD</div>
                <div className={styles.tileValue}>약 1,400억</div>
                <div className={styles.tileDesc}>
                  어려운 시기에 합류해 1년 만에 팔리는 회사로 만들고 이끈 매각
                  규모
                </div>
              </div>
            </Enter>
            <Enter index={6} immediate>
              <div className={styles.tile}>
                <div className={styles.tileLabel}>TOOLS</div>
                <div className={styles.tileToolsGroup}>
                  {TOOL_AXES.filter((axis) => axis.tools.length > 0).map(
                    (axis) => (
                      <div key={axis.id} className={styles.tileToolsRow}>
                        <span className={styles.tileToolsAxis} id={axis.id}>
                          {axis.label}
                        </span>
                        <ul
                          className={styles.tileToolsList}
                          role="list"
                          aria-labelledby={axis.id}
                        >
                          {axis.tools.map((tool) => (
                            <li key={tool}>{tool}</li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </div>
                <div className={styles.tileDesc}>{hero.toolsNote}</div>
              </div>
            </Enter>
          </div>
        </div>
      </section>

      <div className={styles.marqueeOuter}>
        <div className={styles.marqueeTrack}>
          <MarqueeList />
          <MarqueeList />
        </div>
      </div>
    </>
  );
}
