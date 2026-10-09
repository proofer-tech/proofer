import React from "react";
import { IconCircleCheck } from "@tabler/icons-react";
import Image from "next/image";
import styles from "./FeaturesSection.module.scss";

const FEATURES = [
  {
    number: "01",
    title: "외부 인재 DB 통합",
    description:
      "LinkedIn, 사람인, 리멤버 등 주요 플랫폼의 인재 정보를 자동으로 수집하고 통합 관리합니다. 지원 전 단계의 잠재 인재부터 과거 지원자까지 모든 인재 데이터를 한 곳에서 관리하세요.",
    list: [
      "LinkedIn 프로필 자동 동기화",
      "사람인/잡코리아 이력서 통합",
      "리멤버 네트워크 연동",
      "CSV/Excel 대량 업로드",
    ],
    reverse: false,
  },
  {
    number: "02",
    title: "실시간 데이터 자동 업데이트",
    description:
      "수동으로 인재 정보를 업데이트할 필요가 없습니다. Stream의 지능형 크롤러가 24시간 자동으로 경력 변동, 소속 변경, 신규 스킬을 감지하고 업데이트합니다.",
    list: [
      "경력 이동 자동 감지",
      "기술 스택 변화 추적",
      "소속 변경 알림",
      "변경 이력 자동 기록",
    ],
    reverse: true,
  },
  {
    number: "03",
    title: "고급 검색 & 필터링",
    description:
      "강력한 검색 엔진과 다양한 필터로 원하는 인재를 빠르게 찾아보세요. 키워드, 경력, 기술 스택, 학력, 근무지 등 다양한 조건으로 정확한 검색이 가능합니다.",
    list: [
      "AI 기반 자연어 검색",
      "다중 조건 필터링",
      "저장된 검색 조건",
      "인재풀 세그먼테이션",
    ],
    reverse: false,
  },
  {
    number: "04",
    title: "데이터 인사이트 & 리포팅",
    description:
      "인재풀의 현황을 한눈에 파악하고, 데이터 기반의 의사결정을 내리세요. 실시간 대시보드와 상세 리포트로 채용 전략을 최적화할 수 있습니다.",
    list: [
      "실시간 인재풀 대시보드",
      "기술 스택 분포 분석",
      "경력 레벨 현황 리포트",
      "커스텀 리포트 생성",
    ],
    reverse: true,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className={styles.featuresSection}>
      <div className="mx-auto w-full max-w-[1184px] px-4">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>FEATURES</span>
          <h2 className={styles.sectionTitle}>
            <span className={styles.gradientText}>강력한 기능</span>으로
            <br />
            인재 관리를 혁신합니다
          </h2>
        </div>
        <div className={styles.featuresContent}>
          {FEATURES.map((item, idx) => (
            <div
              key={item.number}
              className={styles.featureItem}
              style={{ flexDirection: item.reverse ? "row-reverse" : "row" }}
            >
              <div className={styles.featureText}>
                <p className={styles.featureNumber}>{item.number}</p>
                <h3 className={styles.featureTitle}>{item.title}</h3>
                <p className={styles.featureDescription}>{item.description}</p>
                <ul className={styles.featureList}>
                  {item.list.map((li) => (
                    <li key={li} className="flex items-center gap-2">
                      <IconCircleCheck size={18} color="#534ee3" />
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.featureVisual}>
                <div className={styles.featureMockup}>
                  <div className={styles.mockupHeader}>
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                  </div>
                  <div className={styles.mockupContent}>
                    {idx === 0 && (
                      <div className={styles.integrationPreview}>
                        <div className="grid grid-cols-3 gap-4">
                          <div className={styles.integrationIcon}>in</div>
                          <div className={styles.integrationIcon}>S</div>
                          <div className={styles.integrationIcon}>R</div>
                        </div>
                        <div className={styles.syncPreview}>
                          <Image
                            src="/assets/images/stream/logo-icon.png"
                            alt="Stream"
                            width={64}
                            height={64}
                          />
                        </div>
                      </div>
                    )}
                    {idx === 1 && (
                      <div className={styles.timelinePreview}>
                        <div className={styles.timelineItem}>
                          <span className={styles.timelineIconSuccess}>✓</span>
                          <div>
                            <p className="text-sm font-semibold">
                              경력 업데이트 완료
                            </p>
                            <p className="text-xs text-[#868e96]">방금 전</p>
                          </div>
                        </div>
                        <div className={styles.timelineItem}>
                          <span className={styles.timelineIconInfo}>↻</span>
                          <div>
                            <p className="text-sm font-semibold">
                              스킬 정보 동기화
                            </p>
                            <p className="text-xs text-[#868e96]">2분 전</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {idx === 2 && (
                      <div className={styles.searchPreview}>
                        <div className={styles.searchBar}>
                          <p className="text-sm text-[#868e96]">
                            React, 5년 이상, 서울...
                          </p>
                        </div>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className={styles.chip}>경력 5년+</span>
                          <span className={styles.chip}>React</span>
                          <span className={styles.chip}>서울</span>
                        </div>
                        <p className="text-sm text-[#868e96]">
                          매칭 인재 127명
                        </p>
                      </div>
                    )}
                    {idx === 3 && (
                      <div className={styles.dashboardPreview}>
                        <div className={styles.dashboardStat}>
                          <p className="text-xs text-[#868e96]">총 인재</p>
                          <p className="text-xl font-bold">1,247</p>
                          <p className="text-xs text-green-500">+12%</p>
                        </div>
                        <div className={styles.chartBars}>
                          {[60, 80, 45, 90, 70].map((h, i) => (
                            <span
                              key={i}
                              className={styles.chartBar}
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
