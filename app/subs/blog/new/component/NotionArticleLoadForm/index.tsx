"use client";
import {
  Blockquote,
  Box,
  Button,
  Container,
  Divider,
  Group,
  Input,
  Skeleton,
  Space,
  Stack,
  Stepper,
  TagsInput,
  Textarea,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import {
  IconChevronLeft,
  IconChevronRight,
  IconExclamationCircle,
  IconFileUpload,
  IconInfoCircle,
  IconLink,
} from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { NotionPage } from "notion-page-to-html/dist/main/protocols/notion-page";
import { isValidHttpUrl } from "@/src/utils/text";
import { notifications } from "@mantine/notifications";
import { getTextOf, truncateDescription } from "@/src/manifest";
import { useIsDesktopMedia } from "@/src/hooks/mediaQuery";

interface NotionArticleLoadFormProps {
  onSubmit: (formData: FormData) => void;
}
export default function NotionArticleLoadForm({
  onSubmit,
}: NotionArticleLoadFormProps) {
  const [notionURL, setNotionURL] = useInputState<string>("");
  const [articleTitle, setArticleTitle] = useInputState<string>("");
  const [articleDescription, setArticleDescription] = useInputState<string>("");
  const [articleTags, setArticleTags] = useState<string[]>([]);

  const [step, setStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const goNextStep = () => setStep((current) => current + 1);
  const [notionPage, setNotionPage] = useState<NotionPage>();
  const isDesktopMedia = useIsDesktopMedia();

  const loadNotionPage = async (notionPageURL: string) => {
    if (!notionPageURL) return;

    if (!isValidHttpUrl(notionPageURL)) {
      throw Error(
        "URL 의 형식이 잘못되었을 수 있습니다. 프로토콜까지 완전하게 입력해주세요.",
      );
    }

    let response;
    try {
      response = await fetch(
        `/api/notion/fetch?notion_page_url=${notionPageURL}`,
      );
    } catch (e) {
      console.error(e);
      throw Error(
        "페이지 공개가 제대로 되지 않았을 수 있습니다. 노션 페이지의 공개 설정을 확인해주세요.",
      );
    }

    try {
      return response.json();
    } catch (e) {
      throw Error(
        "노션 페이지를 변환하는데에 실패했습니다. 개발자에게 문의해주세요.",
      );
    }
  };

  useEffect(() => {
    if (!notionPage) return;
    if (!articleTitle) setArticleTitle(notionPage.title);
    if (!articleDescription)
      setArticleDescription(
        truncateDescription(getTextOf(notionPage.html), {
          length: 77,
          separator: "",
        }),
      );
  }, [notionPage]);

  return (
    <>
      <Stepper
        active={step}
        onStepClick={setStep}
        iconSize={"2em"}
        orientation={"vertical"}
        allowNextStepsSelect={false}
        py={isDesktopMedia ? 0 : "md"}
        px={isDesktopMedia ? "xl" : 0}
        style={
          isDesktopMedia ? { position: "fixed", right: 0, zIndex: 30 } : {}
        }
      >
        <Stepper.Step label="노션에서 공개&게시 설정해주세요.">
          <Group justify={"end"}>
            <Button
              onClick={() => {
                setNotionURL("");
                setNotionPage(undefined);
                goNextStep();
              }}
              size={"md"}
              color={"var(--color-primary)"}
              rightSection={<IconChevronRight size={"1em"} />}
              loading={isLoading}
            >
              설정했습니다
            </Button>
          </Group>
        </Stepper.Step>
        <Stepper.Step label="게시된 링크를 복사하여 붙여넣어주세요.">
          <Group justify={"end"}>
            <Button
              onClick={goNextStep}
              size={"md"}
              color={"var(--color-primary)"}
              rightSection={<IconChevronRight size={"1em"} />}
              loading={isLoading}
              disabled={!notionPage}
            >
              {notionPage ? "이 내용이 맞습니다" : "URL 을 입력해주세요"}
            </Button>
          </Group>
        </Stepper.Step>
        <Stepper.Completed>
          {notionPage ? (
            <form action={onSubmit} method={"POST"}>
              <input type="hidden" name="title" value={articleTitle} />
              <input
                type="hidden"
                name="description"
                value={articleDescription}
              />
              <input type="hidden" name="contents" value={notionPage.html} />
              <input type="hidden" name="image" value={notionPage.cover} />
              <input type="hidden" name="tags" value={articleTags.join(",")} />

              <Stack>
                <Blockquote icon={<IconInfoCircle size={"1em"} />}>
                  아티클을 저장 후 아티클 수정 페이지로 이동합니다. 이동하여
                  아티클을 최종 발행할 수 있습니다.
                </Blockquote>
                <Group justify={"space-between"}>
                  <Button
                    size={"md"}
                    variant={"default"}
                    leftSection={<IconChevronLeft size={"1em"} />}
                    loading={isLoading}
                    disabled={!notionPage}
                    onClick={() => setStep((current) => current - 1)}
                  >
                    {notionPage ? "뒤로가기" : "URL 을 먼저 입력해주세요"}
                  </Button>
                  <Button
                    type={"submit"}
                    size={"md"}
                    color={"var(--color-secondary)"}
                    rightSection={<IconFileUpload size={"1em"} />}
                    loading={isLoading}
                    disabled={!notionPage}
                  >
                    {notionPage ? "저장하기" : "URL 을 먼저 입력해주세요"}
                  </Button>
                </Group>
              </Stack>
            </form>
          ) : (
            <Blockquote
              color={"red"}
              icon={<IconExclamationCircle size={"1em"} />}
            >
              잘못된 접근입니다!
            </Blockquote>
          )}
        </Stepper.Completed>
      </Stepper>
      {step === 0 ? (
        <Image
          src={
            "https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/assets/blog/%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2&%E1%84%80%E1%85%A6%E1%84%89%E1%85%B5-F5z7gjwcbsX37N41YQTNHuaXRCoCfB.webp"
          }
          width={600}
          height={408}
          alt={"노션에서 공개&게시 설정해주세요"}
          style={{ width: "100%", height: "auto" }}
        />
      ) : step === 1 ? (
        <Stack>
          <Input.Wrapper
            w={"100%"}
            description={"URL을 입력 후 포커스를 해제하면 내용을 불러옵니다."}
          >
            <Input
              placeholder="https://proofer-tech.notion.site/d9127501250a4a3bb1002f6792593d3e?pvs=4"
              value={notionURL}
              onChange={(e) => setNotionURL(e.target.value)}
              leftSection={<IconLink size={"1em"} />}
              onBlur={async (event) => {
                const notionPageURL = event.target.value;
                setIsLoading(true);
                try {
                  const notionPage = await loadNotionPage(notionPageURL);
                  setNotionPage(notionPage);
                } catch (e) {
                  notifications.show({
                    title: "노션 페이지를 불러오는데 실패했습니다.",
                    message: e.message,
                  });
                }
                setIsLoading(false);
              }}
            />
          </Input.Wrapper>
          {notionPage ? (
            <Stack>
              <Input.Wrapper
                label={"커버 이미지"}
                description={"노션 커버이미지를 자동으로 사용합니다"}
                w={"100%"}
              >
                {notionPage?.cover ? (
                  <>
                    <Space h={"xs"} />
                    <Image
                      src={notionPage?.cover}
                      alt={"커버 이미지"}
                      width={1200}
                      height={630}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </>
                ) : (
                  <></>
                )}
              </Input.Wrapper>
              <Input.Wrapper
                label={"아티클 제목"}
                description={"최대 32자"}
                w={"100%"}
              >
                <Space h={"xs"} />
                <Input
                  placeholder={"McKinsey 에 대한 반박과 그에 대한 분석"}
                  value={articleTitle}
                  onChange={setArticleTitle}
                  maxLength={32}
                />
              </Input.Wrapper>
              <Input.Wrapper
                label={"아티클 설명"}
                description={"최대 77자"}
                w={"100%"}
              >
                <Space h={"xs"} />
                <Textarea
                  maxLength={77}
                  placeholder={
                    "이 글은 Kent Beck 의 Measuring developer productivity? A response to McKinsey 1, 2 에 기반하여 작성되었습니다. 개발자 성과 ..."
                  }
                  value={articleDescription}
                  onChange={setArticleDescription}
                />
              </Input.Wrapper>
              <TagsInput
                w={"100%"}
                label={"아티클 카테고리"}
                description={"게시글의 분류에 사용됩니다."}
                placeholder="입력 후 콤마(,) 또는 엔터키로 추가해주세요"
                maxTags={5}
                value={articleTags}
                onChange={(tags) => {
                  setArticleTags(
                    tags.map((tag) => tag.trim().replace(/\s+/g, "-")),
                  );
                }}
              />
              <Space py={"xl"}>
                <Divider />
              </Space>
            </Stack>
          ) : isLoading ? (
            <Skeleton w={"100%"} h={"10em"} />
          ) : (
            <></>
          )}
        </Stack>
      ) : (
        <></>
      )}
      {notionPage && step >= 1 ? (
        <Stack py={"lg"}>
          <Title order={1} fz={"xl"}>
            {articleTitle}
          </Title>
          <TypographyStylesProvider>
            <div
              dangerouslySetInnerHTML={{
                __html: notionPage.html,
              }}
            />
          </TypographyStylesProvider>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
}
