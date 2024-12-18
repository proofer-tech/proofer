"use client";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  Paper,
  Space,
  Stack,
  StackProps,
  Text,
  Title,
  Image,
} from "@mantine/core";
import SecondBackground from "@/app/with-cto/(root)/components/Background/SecondBackground";
import AnimatedDottedCircle from "@/app/with-cto/(root)/components/AnimatedDottedCircle";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

interface GraphicProps extends StackProps {}
function Graphic(props: GraphicProps) {
  return (
    <Stack gap={0} align={"center"} {...props} py={"1em"}>
      <Group gap={"32px"} wrap={"nowrap"}>
        <AnimatedDottedCircle
          size={67}
          baseColor={"var(--color-primary)"}
          highlightColor={"#51C675"}
        />
        <Paper
          radius={100}
          bg={"var(--color-primary)"}
          py={"0.3em"}
          px={"0.8em"}
          fz={"3em"}
          fw={900}
          c={"white"}
          style={{
            fontFamily: "Avenir",
            transform: "rotate(-6deg)",
            position: "relative",
            top: "-0.1em",
          }}
        >
          CTO
        </Paper>
      </Group>
      <Group
        style={{ transform: "rotate(8deg)" }}
        align={"center"}
        wrap={"nowrap"}
      >
        <Text
          fw={900}
          fz={"2.8em"}
          c={"var(--color-primary)"}
          style={{ fontFamily: "Avenir" }}
        >
          Communication
        </Text>
        <Stack gap={"6.25px"}>
          <Paper
            w={"12px"}
            h={"12px"}
            bg={"var(--color-primary)"}
            radius={100}
          ></Paper>
          <Paper
            w={"12px"}
            h={"12px"}
            bg={"var(--color-secondary)"}
            radius={100}
          ></Paper>
        </Stack>
      </Group>
      <Group py={"1em"} wrap={"nowrap"}>
        <Paper
          radius={"100px 100px 0px 100px"}
          bg={"var(--color-secondary)"}
          py={"1em"}
          px={"2em"}
        >
          <Text
            c={"white"}
            fz={"3em"}
            fw={900}
            style={{ fontFamily: "Avenir" }}
          >
            Conference
          </Text>
        </Paper>
        <AnimatedDottedCircle
          size={78}
          baseColor={"#51C675"}
          highlightColor={"white"}
          style={{ position: "relative", left: "-48px" }}
        />
      </Group>
    </Stack>
  );
}

export default function SecondSection() {
  const isMobileMedia = useIsMobileMedia();
  return (
    <Box
      w={"100%"}
      mih={"calc(100vh - var(--app-shell-header-height))"}
      maw={"1040px"}
      mx={"auto"}
    >
      <Container h={"100%"} py={isMobileMedia ? 0 : "xl"}>
        <Stack gap={"10em"}>
          <Stack gap={"xl"}>
            <Group wrap={"nowrap"} px={"xl"}>
              <Stack>
                <Title ta={"center"} order={1} fz={"2em"} c={"#151410"}>
                  with CTO: 가 뭐에요?
                </Title>
                <Text ta={"center"}>
                  &#39;with CTO&#39;는 현업에서 겪는 서로의 고충과 노하우를
                  나눔으로써, 스스로를 점검하며 동반성장을 지향하는 한국
                  스타트업 CTO들의 자생적 비영리 집단입니다. 장기적으로 한국
                  스타트업의 기술력과 조직관리 수준을 상향평준화하는 것을 그
                  목표로 합니다.
                </Text>
              </Stack>
            </Group>
            <Group>
              <Swiper
                spaceBetween={16}
                modules={[Navigation, Pagination, A11y]}
                navigation
                pagination={{ clickable: true }}
                slidesPerView={isMobileMedia ? 1 : 2.5}
              >
                <SwiperSlide>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                      <Image
                        src="https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/assets/with-cto/4st/1_zW5VcB9lVvjd78EBb7dQ3w-7EIQYyQrJ7GrIYde7du3QQEqZi2mEN.webp"
                        alt="4st meet"
                        fit={"cover"}
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>
                        with CTO: 4st meet, 성장과 네트워킹의 밤
                      </Text>
                      <Badge color="grey">2024.12.13</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                      스타트업과 테크 기업의 CTO, Tech Lead, Head of
                      Engineering, 리드 프로그래머 등 다양한 40여명의 분들이
                      모여 현업의 고민과 실 사례를 통해 인사이트를 나누는 뜻
                      깊은 자리였습니다.
                    </Text>

                    <Button
                      color="secondary"
                      fullWidth
                      mt="md"
                      radius="md"
                      component={"a"}
                      href={
                        "https://medium.com/proofer-blog/%ED%86%A0%ED%81%AC%EC%87%BC%EB%B6%80%ED%84%B0-%EC%97%B0%EB%A7%90-%ED%9A%8C%EA%B3%A0%EA%B9%8C%EC%A7%80-with-cto-4%ED%9A%8C%EC%B0%A8-40%EC%97%AC%EB%AA%85%EC%9D%98-cto%EC%99%80-%ED%95%A8%EA%BB%98%ED%95%9C-%EC%84%B1%EC%9E%A5%EA%B3%BC-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%82%B9%EC%9D%98-%EB%B0%A4-393f1dbbbf64"
                      }
                      target={"_blank"}
                    >
                      보러가기
                    </Button>
                  </Card>
                </SwiperSlide>
                <SwiperSlide>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                      <Image
                        src="https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/assets/with-cto/3rd/thumbnail-VM16aGyGx1tVIjG0XqCBRMMkPFxqnh.webp"
                        alt="3rd meet"
                        fit={"cover"}
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>with CTO: 3rd meet, 세번째 행사</Text>
                      <Badge color="grey">2024.08.09</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                      스타트업 얼라이언스 앤스페이스에서 with CTO: 3rd meet이
                      열렸습니다. 서로의 경험과 도전을 공유하고, 기술적인
                      의사결정과 인사적인 고민을 해결할 수 있는 인사이트를
                      나누는 자리였습니다.
                    </Text>

                    <Button
                      color="secondary"
                      fullWidth
                      mt="md"
                      radius="md"
                      component={"a"}
                      href={
                        "https://medium.com/proofer-blog/27%EB%85%84-%EA%B2%BD%EB%A0%A5-%EC%8B%A4%EB%A6%AC%EC%BD%98%EB%B0%B8%EB%A6%AC-1%EC%84%B8%EB%8C%80-%ED%95%9C%EC%9D%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90-%ED%95%9C%EA%B8%B0%EC%9A%A9%EB%8B%98%EA%B3%BC-%ED%95%A8%EA%BB%98%ED%95%9C-with-cto-%EA%B7%B8-%EC%84%B8%EB%B2%88%EC%A7%B8-%EB%AA%A8%EC%9E%84-666822fdcb50"
                      }
                      target={"_blank"}
                    >
                      보러가기
                    </Button>
                  </Card>
                </SwiperSlide>
                <SwiperSlide>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                      <Image
                        src="https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/assets/with-cto/2nd/thumbnail-RrWVZ9uxkqsMFmDiHGuxuerEpADAOy.webp"
                        alt="2nd meet"
                        fit={"cover"}
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>with CTO: 2nd meet, 두번째 만남</Text>
                      <Badge color="grey">2024.07.12</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                      with CTO:는 국내 테크 리드들이 한 곳에 모여 네트워킹할 수
                      있는 화합의 장으로 지난 6월 첫 모임을 시작했습니다.
                      월간으로 진행되는 with CTO:는 6월에 이어 7월에도 모임이
                      이어졌습니다!
                    </Text>

                    <Button
                      color="secondary"
                      fullWidth
                      mt="md"
                      radius="md"
                      component={"a"}
                      href={
                        "https://medium.com/proofer-blog/with-cto-2nd-meet-%EB%AA%A8%EC%9E%84-%ED%9B%84%EA%B8%B0-da45be89affd"
                      }
                      target={"_blank"}
                    >
                      보러가기
                    </Button>
                  </Card>
                </SwiperSlide>
                <SwiperSlide>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                      <Image
                        src="https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/assets/with-cto/1st/thumbnail-Mrea4XSVJuYaM1dcxbTiTFQSXgEsCV.webp"
                        fit={"cover"}
                        alt="1st meet"
                      />
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={500}>with CTO: 1st meet, 첫번째 만남</Text>
                      <Badge color="grey">2024.06.08</Badge>
                    </Group>

                    <Text size="sm" c="dimmed">
                      with CTO: 의 첫 번째 모임은 32명의 등록인원 중 24명이 참여
                      해주셨으며 다양한 회사의 CTO, ex-CTO, VPE, Tech Lead
                      분들이 7시반부터 10시반까지 장장 3시간 동안 행사를 즐기고
                      가 주셨습니다.
                    </Text>

                    <Button
                      color="secondary"
                      fullWidth
                      mt="md"
                      radius="md"
                      component="a"
                      href="https://medium.com/proofer-blog/cto-%EB%93%A4%EC%9D%98-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0-with-cto-%EC%9D%98-%EC%B2%AB%EB%B2%88%EC%A7%B8-%ED%96%89%EC%82%AC%EB%A5%BC-%EC%84%B1%EA%B3%B5%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%B9%98%EB%A4%98%EC%8A%B5%EB%8B%88%EB%8B%A4-5a172b849bdf"
                      target={"_blank"}
                    >
                      보러가기
                    </Button>
                  </Card>
                </SwiperSlide>
              </Swiper>
            </Group>
          </Stack>

          <Group
            w={"100%"}
            h={"100%"}
            align={isMobileMedia ? "start" : "center"}
            py={"xl"}
          >
            <Stack
              p={"lg"}
              style={{ position: "relative" }}
              w={isMobileMedia ? "100%" : "50%"}
            >
              <Title order={1} fz={"2em"} c={"#151410"}>
                2024년 03월 07일 금요일
                <br />
                오후 6시 30분
                <br />
                장소가 확정되면 알려드려요!
              </Title>
              <Space h={"lg"} />
              <Graphic
                style={
                  isMobileMedia ? {} : { position: "absolute", right: "-90%" }
                }
              />
              <Space h={"lg"} hiddenFrom={"md"} />
              <Stack>
                <Text>
                  DEVIEW, if KAKAO, SLASH 등 현업 개발자들을 타겟팅한 컨퍼런스,
                  커뮤니티는 많습니다.
                </Text>
                <Text>
                  하지만 조직 내에서 CTO 역할을 맡게 된 분들을 위한 컨퍼런스나
                  모임은 굉장히 찾기 힘든 것 같습니다(기술적인 의사결정,
                  인사적인 고민들도 매번 어렵다고요!)
                </Text>
                <Text>
                  회사의 CTO로서 여러분들이 겪고 있는 고민과 도전, 그리고 그
                  사례들을 서로 나눌 수 있는 자리를 찾다 찾다가 없어서, 안되겠다
                  우리가 만들어야겠다! 싶어 자리를 만들어보려고 합니다.
                </Text>
                <Text>
                  이번 자리가 바쁜 CTO 여러분들에게 시간이 아깝지 않은 유익한
                  자리가 되기를 바라며, 한번의 이벤트로 끝날 게 아니라 앞으로도
                  계속 이어져 함께 성장을 도모할 수 있는 자리가 될 수 있도록
                  꾸준히 함께하겠습니다!
                </Text>
                <Text ta={"right"}>운영진 일동 드림</Text>
              </Stack>
            </Stack>
          </Group>
        </Stack>
      </Container>
      <SecondBackground />
    </Box>
  );
}
