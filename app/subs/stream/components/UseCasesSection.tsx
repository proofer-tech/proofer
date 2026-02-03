import React from "react";
import { Container, SimpleGrid, Box, Text, Title } from "@mantine/core";
import {
  IconBuilding,
  IconBuildingFactory,
  IconUserCheck,
} from "@tabler/icons-react";
import styles from "./UseCasesSection.module.scss";

const CASES = [
  {
    key: "startup",
    icon: IconBuilding,
    title: "스타트업",
    description:
      "제한된 리소스로 효율적인 채용을 진행하고, 잠재 인재를 지속적으로 관리할 수 있습니다.",
  },
  {
    key: "enterprise",
    icon: IconBuildingFactory,
    title: "중견·대기업",
    description:
      "대규모 인재 DB를 체계적으로 관리하고, 부서별 인재 현황을 실시간으로 파악할 수 있습니다.",
  },
  {
    key: "headhunting",
    icon: IconUserCheck,
    title: "헤드헌팅사",
    description:
      "클라이언트별 인재풀을 관리하고, 시장 인재 동향을 빠르게 파악할 수 있습니다.",
  },
];

export default function UseCasesSection() {
  return (
    <section className={styles.usecasesSection}>
      <Container size="lg">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>USE CASES</span>
          <Title order={2} className={styles.sectionTitle}>
            다양한 조직에서
            <br />
            <span className={styles.gradientText}>
              Stream을 활용할 수 있습니다
            </span>
          </Title>
        </div>
        <SimpleGrid
          cols={{ base: 1, md: 3 }}
          spacing="lg"
          className={styles.usecasesGrid}
        >
          {CASES.map((item) => (
            <Box key={item.key} className={styles.usecaseCard}>
              <div className={styles.usecaseIcon}>
                <item.icon size={36} stroke={2} />
              </div>
              <Title order={3} className={styles.usecaseTitle}>
                {item.title}
              </Title>
              <Text className={styles.usecaseDescription}>
                {item.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
}
