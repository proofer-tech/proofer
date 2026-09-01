import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import Enter from "@/app/subs/ax/components/Enter";
import styles from "./Hero.module.scss";

const MARQUEE_ITEMS = [
  "AI 리터러시",
  "도구 실무",
  "직무 특화",
  "에이전트",
  "리더 과정",
  "해커톤",
  "PBL 인큐베이터",
  "사내 도구 구축",
  "업무 자동화",
  "기업가치",
];

function MarqueeList() {
  return (
    <div className={styles.marqueeList}>
      {MARQUEE_ITEMS.map((item) => (
        <React.Fragment key={item}>
          <span>{item}</span>
          <span className={styles.marqueeDot}>·</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <>
      <section id="top" className={styles.hero}>
        <div className={styles.glow} />
        <div className={styles.grid}>
          <div>
            <Enter index={0} immediate>
              <div className="ax-eyebrow">AX CURRICULUM · PROOF OF VALUE</div>
            </Enter>
            <Enter index={1} immediate>
              <h1 className={styles.headline}>
                교육만으로
                <br />
                끝내지 않습니다
              </h1>
            </Enter>
            <Enter index={2} immediate>
              <p className={styles.lead}>
                기업의 AI 도입은 도입 여부를 고민하는 단계를 지났습니다. 남은
                질문은 도입한 AI를 어떻게 실제 성과로 바꾸느냐입니다. 프루퍼는
                교육회사가 아니라 그로스 컨설팅 회사입니다. 현장에 들어가 직접
                만들고 운영해 온 방식을 그대로 가르칩니다.
              </p>
            </Enter>
            <div className={styles.actions}>
              <Enter index={3} immediate>
                <AxInquireButton className="ax-btn">
                  AX 도입 상담
                </AxInquireButton>
              </Enter>
              <Enter index={4} immediate>
                <a href="#system" className="ax-btn ax-btn--ghost">
                  커리큘럼 보기
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
                <div className={styles.tileTools}>
                  Claude · ChatGPT · Gemini · Cursor
                </div>
                <div className={styles.tileDesc}>
                  특정 도구에 얽매이지 않고 고객사 환경에 맞는 도구를 중립적으로
                  권합니다
                </div>
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
