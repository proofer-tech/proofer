import { InferSelectModel } from "drizzle-orm";
import { Article, Tag } from "@/database/schemas/blog";
import {
  Badge,
  Group,
  Paper,
  Space,
  Stack,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import styles from "./styles.module.scss";
import React from "react";

interface ArticleProps {
  article: InferSelectModel<typeof Article> & {
    tags: InferSelectModel<typeof Tag>[];
  };
}

export default function ArticlePage({ article }: ArticleProps) {
  return (
    <Paper p={"xl"} withBorder>
      <Stack>
        <Title order={1} fz={"xl"}>
          {article.title}
        </Title>
        {article.tags.length > 0 ? (
          <>
            <Group gap={"xs"}>
              {article.tags.map((tag) => (
                <Badge key={tag.id} color="gray">
                  {tag.name}
                </Badge>
              ))}
            </Group>
            <Space h={"lg"} />
          </>
        ) : (
          <></>
        )}
        <TypographyStylesProvider>
          <div
            className={styles.article}
            // @ts-ignore
            dangerouslySetInnerHTML={{ __html: article.contents }}
          />
        </TypographyStylesProvider>
      </Stack>
    </Paper>
  );
}
