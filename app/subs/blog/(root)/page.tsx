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
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import styles from "./styles.module.scss";

export default async function Page() {
  const articles = await getArticlesWithTags();
  return (
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
  );
}
