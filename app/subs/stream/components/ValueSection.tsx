import React from "react";
import { Container, SimpleGrid, Box, Text, Title } from "@mantine/core";
import {
  IconLink,
  IconRefresh,
  IconSearch,
  IconShieldCheck,
} from "@tabler/icons-react";
import styles from "./ValueSection.module.scss";

const VALUES = [
  {
    key: "integration",
    icon: IconLink,
    title: "데이터 통합성",
    subtitle: "Integration",
    description:
      "LinkedIn·사람인·리멤버 등 외부 인재 DB와 사내 인재 데이터를 연결하여 단일 데이터 허브를 구축합니다.",
    tags: ["다중 플랫폼 연동", "실시간 동기화", "단일 허브 관리"],
  },
  {
    key: "automation",
    icon: IconRefresh,
    title: "자동 최신화",
    subtitle: "Automation",
    description:
      "크롤러·API를 통해 후보자의 경력/소속/기술 정보를 지속적으로 자동 업데이트합니다.",
    tags: ["24/7 모니터링", "자동 크롤링", "변경사항 알림"],
  },
  {
    key: "search",
    icon: IconSearch,
    title: "검색과 인사이트",
    subtitle: "Search & Insight",
    description:
      "키워드, 태그, 경력 필터 기반의 고급 검색 및 인재풀 현황 리포트를 제공합니다.",
    tags: ["고급 필터링", "AI 검색", "데이터 분석"],
  },
  {
    key: "security",
    icon: IconShieldCheck,
    title: "보안과 신뢰성",
    subtitle: "Security & Trust",
    description:
      "온프레미스 지원 및 기업별 테넌트 구조로 개인정보보호법·ISMS를 준수합니다.",
    tags: ["ISMS 인증", "온프레미스 지원", "암호화 저장"],
  },
];

export default function ValueSection() {
  return (
    <section id="value" className={styles.valueSection}>
      <Container size="lg">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>CORE VALUES</span>
          <Title order={2} className={styles.sectionTitle}>
            Stream이 제공하는
            <br />
            <span className={styles.gradientText}>핵심 가치</span>
          </Title>
          <Text className={styles.sectionDescription}>
            흩어진 인재 데이터를 통합하고, 자동으로 최신화하며,
            <br />
            검색과 인사이트를 제공하는 인재 관리 솔루션
          </Text>
        </div>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing="lg"
          className={styles.valueGrid}
        >
          {VALUES.map((item) => (
            <Box key={item.key} className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <item.icon size={28} stroke={2} />
              </div>
              <Title order={3} className={styles.valueTitle}>
                {item.title}
              </Title>
              <Text className={styles.valueSubtitle}>{item.subtitle}</Text>
              <Text className={styles.valueDescription}>
                {item.description}
              </Text>
              <div className={styles.valueFeatures}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.featureTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
}
