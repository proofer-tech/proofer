import { InferSelectModel } from "drizzle-orm";
import { Article, Tag } from "@/database/schemas/blog";
import {
  Anchor,
  Badge,
  Button,
  Group,
  Space,
  Stack,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import styles from "./styles.module.scss";

interface ArticleProps {
  article: InferSelectModel<typeof Article> & {
    tags: InferSelectModel<typeof Tag>[];
  };
}

export default function ArticlePage({ article }: ArticleProps) {
  return (
    <Stack py={"xl"}>
      <Group justify={"space-between"} align={"end"}>
        <Title>{article.title}</Title>
        <Anchor href={article.origin} target="_blank">
          <Button size={"xs"} variant="white">
            원문 보기
          </Button>
        </Anchor>
      </Group>
      <Group gap={"xs"}>
        {article.tags.map((tag) => (
          <Badge key={tag.id} color="gray">
            {tag.name}
          </Badge>
        ))}
      </Group>
      <Space h={"lg"} />
      <TypographyStylesProvider>
        <div
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: article.contents }}
        />
      </TypographyStylesProvider>
    </Stack>
  );
}
