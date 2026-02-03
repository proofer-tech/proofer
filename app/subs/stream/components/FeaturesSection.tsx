import React from "react";
import {
  Container,
  Box,
  Group,
  Text,
  Title,
  List,
  ListItem,
  SimpleGrid,
} from "@mantine/core";
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
      <Container size="lg">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>FEATURES</span>
          <Title order={2} className={styles.sectionTitle}>
            <span className={styles.gradientText}>강력한 기능</span>으로
            <br />
            인재 관리를 혁신합니다
          </Title>
        </div>
        <div className={styles.featuresContent}>
          {FEATURES.map((item, idx) => (
            <Box
              key={item.number}
              className={styles.featureItem}
              style={{ flexDirection: item.reverse ? "row-reverse" : "row" }}
            >
              <div className={styles.featureText}>
                <Text className={styles.featureNumber}>{item.number}</Text>
                <Title order={3} className={styles.featureTitle}>
                  {item.title}
                </Title>
                <Text className={styles.featureDescription}>
                  {item.description}
                </Text>
                <List className={styles.featureList} spacing="sm">
                  {item.list.map((li) => (
                    <ListItem
                      key={li}
                      icon={<IconCircleCheck size={18} color="#534ee3" />}
                    >
                      {li}
                    </ListItem>
                  ))}
                </List>
              </div>
              <div className={styles.featureVisual}>
                <Box className={styles.featureMockup}>
                  <div className={styles.mockupHeader}>
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                  </div>
                  <div className={styles.mockupContent}>
                    {idx === 0 && (
                      <Box className={styles.integrationPreview}>
                        <SimpleGrid cols={3} spacing="md">
                          <Box className={styles.integrationIcon}>in</Box>
                          <Box className={styles.integrationIcon}>S</Box>
                          <Box className={styles.integrationIcon}>R</Box>
                        </SimpleGrid>
                        <Box className={styles.syncPreview}>
                          <Image
                            src="/assets/images/stream/logo-icon.png"
                            alt="Stream"
                            width={64}
                            height={64}
                          />
                        </Box>
                      </Box>
                    )}
                    {idx === 1 && (
                      <Box className={styles.timelinePreview}>
                        <Box className={styles.timelineItem}>
                          <span className={styles.timelineIconSuccess}>✓</span>
                          <div>
                            <Text size="sm" fw={600}>
                              경력 업데이트 완료
                            </Text>
                            <Text size="xs" c="dimmed">
                              방금 전
                            </Text>
                          </div>
                        </Box>
                        <Box className={styles.timelineItem}>
                          <span className={styles.timelineIconInfo}>↻</span>
                          <div>
                            <Text size="sm" fw={600}>
                              스킬 정보 동기화
                            </Text>
                            <Text size="xs" c="dimmed">
                              2분 전
                            </Text>
                          </div>
                        </Box>
                      </Box>
                    )}
                    {idx === 2 && (
                      <Box className={styles.searchPreview}>
                        <Box className={styles.searchBar}>
                          <Text size="sm" c="dimmed">
                            React, 5년 이상, 서울...
                          </Text>
                        </Box>
                        <Group gap="xs" mb="sm">
                          <span className={styles.chip}>경력 5년+</span>
                          <span className={styles.chip}>React</span>
                          <span className={styles.chip}>서울</span>
                        </Group>
                        <Text size="sm" c="dimmed">
                          매칭 인재 127명
                        </Text>
                      </Box>
                    )}
                    {idx === 3 && (
                      <Box className={styles.dashboardPreview}>
                        <Box className={styles.dashboardStat}>
                          <Text size="xs" c="dimmed">
                            총 인재
                          </Text>
                          <Text fw={700} size="xl">
                            1,247
                          </Text>
                          <Text size="xs" c="green">
                            +12%
                          </Text>
                        </Box>
                        <Box className={styles.chartBars}>
                          {[60, 80, 45, 90, 70].map((h, i) => (
                            <span
                              key={i}
                              className={styles.chartBar}
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </div>
                </Box>
              </div>
            </Box>
          ))}
        </div>
      </Container>
    </section>
  );
}
