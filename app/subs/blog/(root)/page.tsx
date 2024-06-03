import {
  Anchor,
  Box,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { getSerializedArticles } from "@/src/data/blog";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN, SUB_DOMAIN_NAMES } from "@/src/constants";
import styles from "./styles.module.scss";
import organizationSchema from "@/app/subs/blog/schema-organization";
import { generateMetadataFromTitle } from "@/src/manifest";
import { merge } from "lodash";

export const metadata = merge(
  {
    alternates: {
      canonical: "https://blog.proofer.tech",
    },
  },
  generateMetadataFromTitle({
    applicationName: SUB_DOMAIN_NAMES[SUB_DOMAIN.blog],
    description:
      "진짜 업무 데이터를 활용하는 성과 측정/평가/관리 통합 솔루션 프루퍼의 블로그입니다.",
  }),
);
export default async function Page() {
  const articles = await getSerializedArticles();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...organizationSchema,
          }),
        }}
      />
      <Box w={"100%"} h={"100%"} bg={"#f5f5f5"}>
        <Container pb={"5em"}>
          <Stack py={"3em"}>
            {articles.map((article) => (
              <Anchor
                key={article.id}
                href={generateSubdomainPath(article.slug, SUB_DOMAIN.blog)}
                underline={"never"}
                c={"var(--mantine-color-gray-8)"}
              >
                <Paper p={"1em 2em"} className={styles.card} shadow={"xs"}>
                  <Group>
                    <Title order={3}>{article.title}</Title>
                    <Text>{article.truncatedContents}</Text>
                  </Group>
                </Paper>
              </Anchor>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
