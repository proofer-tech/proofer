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
import { getArticlesWithTags } from "@/src/data/blog";
import { truncateHtml } from "@/src/utils/text";
import { generateSubdomainPath, generateUrl } from "@/src/path";
import { SUB_DOMAIN, SUB_DOMAIN_NAMES } from "@/src/constants";
import styles from "./styles.module.scss";
import organizationSchema from "@/app/subs/blog/schema-organization";

export default async function Page() {
  const articles = await getArticlesWithTags();
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
                    <Text>{truncateHtml(article.contents)}</Text>
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
