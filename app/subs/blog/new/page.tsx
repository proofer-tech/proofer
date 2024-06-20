import { Container, Group, Space, Stack, Text } from "@mantine/core";
import React from "react";
import Image from "next/image";
import NotionArticleLoadForm from "@/app/subs/blog/new/component/NotionArticleLoadForm";
import { dz } from "@/database/engine";
import { Article, ArticleToTag, Tag } from "@/database/schemas/blog";
import { put } from "@vercel/blob";
import { redirect } from "next/navigation";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import { base64ToFile } from "@/src/file";
import { conflictUpdateSetAllColumns } from "@/src/utils/drizzle";

async function createNewArticle(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const contents = formData.get("contents") as string;
  const imageBase64 = formData.get("image") as string;
  const tags = ((formData.get("tags") as string) || "").split(",");

  const sluggedTitle = title.trim().replace(/\s+/g, "-");
  const slug = encodeURIComponent(sluggedTitle);

  const imageFile = base64ToFile(imageBase64);
  const ext = imageFile.name.split(".").pop();
  const blob = await put(`/blog/articles/${slug}.${ext}`, imageFile, {
    access: "public",
  });

  await dz.transaction(async (db) => {
    await db
      .insert(Tag)
      .values(
        tags.map((name) => ({
          name: name,
        })),
      )
      .onConflictDoNothing();
    const articles = await db
      .insert(Article)
      .values({
        slug,
        title,
        description,
        contents,
        author: "프루퍼",
        image: blob.url,
        is_published: false,
      })
      .onConflictDoUpdate({
        target: [Article.slug],
        set: conflictUpdateSetAllColumns(Article),
      })
      .returning();
    for (const article of articles) {
      await db
        .insert(ArticleToTag)
        .values(
          tags.map((name: string) => ({
            article_id: article.id,
            tag_name: name,
          })),
        )
        .onConflictDoNothing();
    }
  });
  redirect(generateSubdomainPath(`${slug}`, SUB_DOMAIN.blog));
}

export default function Page() {
  return (
    <Container py={"xl"}>
      <Group align={"center"}>
        <Image
          src={"/assets/images/ic_launcher.webp"}
          width={64}
          height={64}
          alt={"프루퍼 블로그 로고"}
          style={{
            border: "1px solid var(--color-grayscale-2)",
            borderRadius: "8px",
          }}
        />
        <Stack gap={0}>
          <Text fw={"bold"} size={"lg"}>
            아티클 발행하기
          </Text>
          <Text>프루퍼 블로그에 새로운 아티클을 발행합니다.</Text>
        </Stack>
      </Group>
      <Space h={"md"} />
      <NotionArticleLoadForm onSubmit={createNewArticle} />
    </Container>
  );
}
