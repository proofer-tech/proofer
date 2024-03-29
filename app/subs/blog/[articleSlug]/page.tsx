import { Container, Stack } from "@mantine/core";
import ArticlePage from "@/app/subs/blog/[articleSlug]/ArticlePage";
import { generateMetadataFromTitle } from "@/src/manifest";
import { Metadata, ResolvingMetadata } from "next";
import { getArticlesWithTags } from "@/src/data/blog";
import * as cheerio from "cheerio";
import { truncate } from "lodash";
import { Props } from "@/src/types/next";

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata | ResolvingMetadata> {
  const { articleSlug } = params;
  const articles = await getArticlesWithTags(articleSlug);
  const article = articles[0];
  const parentMetadata = await parent;

  if (article) {
    const root = cheerio.load(article.contents);
    return generateMetadataFromTitle(
      "블로그",
      article.title,
      truncate(
        Array.from(
          root("p").map((_, el) => {
            return root(el).text().toString();
          }),
        ).join(" "),
        { length: 253, separator: "..." },
      ),
      Object.assign({}, parentMetadata || {}, {
        keywords: ["프루퍼 ", ...article.tags.map((tag) => tag.name)],
      }) as Metadata,
    );
  }

  return parentMetadata;
}

export default async function Page({ params }: any) {
  const { articleSlug } = params;
  const articles = await getArticlesWithTags(articleSlug);

  return (
    <Stack>
      {articles.map((article) => (
        <Container key={article.id}>
          <ArticlePage article={article} />
        </Container>
      ))}
    </Stack>
  );
}
