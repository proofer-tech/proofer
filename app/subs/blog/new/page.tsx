import {
  Container,
  Title,
  Text,
  Group,
  Space,
  TabsTab,
  TabsList,
  Tabs,
  TabsPanel,
  Stack,
} from "@mantine/core";
import React from "react";
import Image from "next/image";
import { IconBrandMedium, IconBrandNotion } from "@tabler/icons-react";
import NotionArticleLoadForm from "@/app/subs/blog/new/component/NotionArticleLoadForm";
import MediumArticleLoadForm from "@/app/subs/blog/new/component/MediumArticleLoadForm";

async function createNewArticle(formData: FormData) {
  "use server";
  const title = formData.get("title");
  const description = formData.get("description");
  const contents = formData.get("contents");
  const imageBase64 = formData.get("image");
  const tags = ((formData.get("tags") as string) || "").split(",");

  console.log(title);
  console.log(description);
  console.log(tags);
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
      <Tabs defaultValue="notion">
        <TabsList>
          <TabsTab
            value="notion"
            leftSection={<IconBrandNotion size={"1em"} />}
          >
            노션에서 불러오기
          </TabsTab>
          <TabsTab
            value="medium"
            leftSection={<IconBrandMedium size={"1em"} />}
          >
            미디엄에서 불러오기
          </TabsTab>
        </TabsList>
        <TabsPanel value="notion" p={"md"}>
          <NotionArticleLoadForm onSubmit={createNewArticle} />
        </TabsPanel>
        <TabsPanel value="medium" p={"md"}>
          <MediumArticleLoadForm />
        </TabsPanel>
      </Tabs>
    </Container>
  );
}
