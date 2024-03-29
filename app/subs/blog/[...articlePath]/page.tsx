import { Container, Stack } from "@mantine/core";
import ArticlePage from "@/app/subs/blog/[...articlePath]/ArticlePage";
import { generateMetadataFromTitle } from "@/src/manifest";
import { Metadata, ResolvingMetadata } from "next";
import { getArticlesWithTags } from "@/src/data/blog";
import * as cheerio from "cheerio";
import { truncate } from "lodash";
import { Props } from "@/src/types/next";
import { getURLFromHeaderList } from "@/src/path";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata | ResolvingMetadata> {
  const { articlePath } = params;
  const [slug] = articlePath;
  const articles = await getArticlesWithTags({ slug });
  const article = articles[0];
  const parentMetadata = await parent;

  if (article) {
    const root = cheerio.load(article.contents);
    return generateMetadataFromTitle(
      "프루퍼",
      article.title,
      truncate(
        Array.from(
          root("p").map((_, el) => {
            return root(el).text().toString();
          }),
        ).join(" "),
        { length: 253, separator: "..." },
      ),
      {
        keywords: ["프루퍼 ", ...article.tags.map((tag) => tag.name)],
      },
    );
  }

  return parentMetadata;
}

export default async function Page({ params }: any) {
  const { articlePath } = params;
  const [slug, ...path] = articlePath;
  if (path.length > 0) {
    const headerList = headers();
    const url = getURLFromHeaderList(headerList);

    // sld.tld 로 치환
    url.hostname = url.hostname.split(".").slice(-2).join(".");
    const newURL = new URL("/" + path.join("/"), url.toString()).toString();

    return redirect(newURL);
  }

  const articles = await getArticlesWithTags({ slug });
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
