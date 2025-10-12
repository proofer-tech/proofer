"use client";
import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import Image from "next/image";

export default function Page() {
  useEffect(() => {
    // meta refresh 태그 추가
    const meta = document.createElement("meta");
    meta.httpEquiv = "refresh";
    meta.content = "0;url=https://event-us.kr/withcto/event";

    // 클라이언트 사이드 리다이렉트
    const timer = setTimeout(() => {
      document.head.appendChild(meta);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (meta.parentNode) {
        document.head.removeChild(meta);
      }
    };
  }, []);

  return (
    <>
      <Container size="md" py="xl">
        <Stack align="center" gap="xl" mih="80vh" justify="center">
          {/* 로고 이미지 */}
          <Image
            src="/assets/images/with-cto/logo.svg"
            width={300}
            height={300}
            alt="with CTO 로고"
            priority
          />

          {/* 메인 콘텐츠 - SEO용 */}
          <Stack align="center" gap="md" ta="center">
            <Title order={1} size="h1">
              with CTO: the agora of CTO
            </Title>
            <Title order={2} size="h3" c="dimmed">
              CTO들의 위대한 시작, 함께 성장하는 커뮤니티
            </Title>

            <Text size="lg" maw={600} mt="md">
              &apos;with CTO&apos;는 현업에서 겪는 서로의 고충과 노하우를
              나눔으로써, 스스로를 점검하며 동반성장을 지향하는 한국 스타트업
              CTO들의 자생적 비영리 집단입니다.
            </Text>

            <Text size="md" maw={600}>
              DEVIEW, if KAKAO, SLASH 등 현업 개발자들을 타겟팅한 컨퍼런스는
              많지만, CTO 역할을 맡은 분들을 위한 모임은 찾기 어렵습니다.
              기술적인 의사결정, 인사적인 고민, 조직 관리에 대한 사례들을 서로
              나누며 함께 성장합니다.
            </Text>

            {/* 주요 키워드 */}
            <Group gap="xs" mt="md">
              <Text size="sm" c="dimmed">
                #CTO커뮤니티 #기술리더십 #조직관리 #개발자컨퍼런스 #스타트업CTO
              </Text>
            </Group>
          </Stack>

          {/* 수동 리다이렉트 버튼 */}
          <Group gap="md" mt="md">
            <Button
              component="a"
              href="https://event-us.kr/withcto/event"
              size="lg"
              variant="filled"
            >
              행사 페이지로 이동
            </Button>
            <Button
              component="a"
              href="/with-cto/6th"
              size="lg"
              variant="light"
            >
              지난 행사 보기
            </Button>
          </Group>

          {/* 추가 정보 링크 */}
          <Text size="sm" mt="xl" c="dimmed">
            페이지가 자동으로 리다이렉트됩니다.{" "}
            <Anchor
              href="https://event-us.kr/withcto/event"
              target="_blank"
              fw={600}
            >
              수동으로 이동하기
            </Anchor>
          </Text>

          {/* SEO를 위한 추가 콘텐츠 */}
          <Box mt="xl" maw={700} ta="left">
            <Stack gap="md">
              <div>
                <Title order={3} size="h4" mb="xs">
                  with CTO 소개
                </Title>
                <Text size="sm">
                  장기적으로 한국 스타트업의 기술력과 조직관리 수준을
                  상향평준화하는 것을 목표로 합니다. 매달 진행되는 정기 모임과
                  네트워킹을 통해 CTO들의 실질적인 고민을 함께 해결합니다.
                </Text>
              </div>

              <div>
                <Title order={3} size="h4" mb="xs">
                  참여 대상
                </Title>
                <Text size="sm">
                  스타트업 및 테크 기업의 CTO, Tech Lead, VPE, Head of
                  Engineering, 리드 개발자 등 기술 조직을 이끄는 모든 분들을
                  환영합니다.
                </Text>
              </div>

              <div>
                <Title order={3} size="h4" mb="xs">
                  주요 활동
                </Title>
                <Text size="sm">
                  러닝쉐어(연사강연), 테이블 토크, 주제별 네트워킹, 토크쇼 등
                  다양한 프로그램을 통해 실질적인 인사이트를 공유하고 네트워크를
                  확장할 수 있습니다.
                </Text>
              </div>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
