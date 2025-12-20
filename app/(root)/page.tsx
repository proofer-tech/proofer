import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Anchor,
  Box,
  Card,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import { InquireWidget } from "@/app/components/Inquire";
import { Down } from "@/app/components/Divider";
import SpeechBubble from "@/app/(root)/components/SpeechBubble";
import Background from "@/app/components/Background";

export default function Page() {
  return (
    <Box py={"xl"}>
      <Background />
      <Stack gap={"10vh"}>
        <Container py={"xl"}>
          <Stack>
            <Space py={"xl"} />
            <Text size={"xl"} ta={"center"} c={"var(--mantine-color-gray-8)"}>
              일하면서 이런 불편함, 다들 있으셨죠?
            </Text>
            <Stack py={"xl"} gap={"6vh"}>
              <Group justify={"start"}>
                <SpeechBubble color="#FFFFFF" direction="left">
                  <Text size={"lg"} fw={"bold"} px={"lg"}>
                    나는 유독 이 일만 하면 왜 이렇게까지 짜증이 나는지 모르겠네!
                  </Text>
                </SpeechBubble>
              </Group>
              <Group justify={"end"}>
                <SpeechBubble color="#FFFFFF" direction="right">
                  <Text size={"lg"} fw={"bold"} px={"lg"}>
                    누가 이 일은 좀 나 대신 해줬으면 좋겠다 ...
                  </Text>
                </SpeechBubble>
              </Group>
              <Group justify={"start"}>
                <SpeechBubble color="#FFFFFF" direction="left">
                  <Text size={"lg"} fw={"bold"} px={"lg"}>
                    분명 저번에 한 것 같은데 왜 똑같은 일을 또 해야 하지?
                  </Text>
                </SpeechBubble>
              </Group>
            </Stack>
            <Space py={"6vh"}>
              <Down />
            </Space>
            <Stack gap={0}>
              <Text size={"xl"} ta={"center"} c={"var(--mantine-color-gray-8)"}>
                이제는 달라질 수 있습니다
              </Text>
              <Title order={1} ta={"center"}>
                프루퍼팀에 말씀만 해주세요!
              </Title>
            </Stack>
            <Group py={"sm"} justify={"center"}>
              <Divider w={"5em"} />
            </Group>
            <Text ta={"center"} size={"lg"} c={"var(--mantine-color-gray-6)"}>
              고객을 직접 만나 업무 프로세스를 듣고 관찰하여 고통스럽거나
              골치아픈 문제를 해결하고, 비효율적인 과정을 찾아 효율적으로 개선할
              수 있는 방법을 함께 고민하여 제공합니다.
            </Text>
          </Stack>
          <Group py={"8vh"} justify={"center"}>
            <Divider w={"1em"} />
          </Group>
          <Stack>
            <Stack>
              <Stack gap={0}>
                <Text
                  size={"md"}
                  ta={"center"}
                  c={"var(--mantine-color-gray-6)"}
                >
                  그게 어떻게 가능한가요?
                </Text>
                <Title
                  order={3}
                  ta={"center"}
                  c={"var(--mantine-color-gray-8)"}
                >
                  업무 자동화와 효율화의 전문가입니다.
                </Title>
              </Stack>
              <Group py={"sm"} justify={"center"}>
                <Divider w={"5em"} />
              </Group>
              <Text ta={"center"} size={"lg"} c={"var(--mantine-color-gray-6)"}>
                문제해결에 꼭 개발이 필요하지 않을 수 있습니다. 언제 정말 개발이
                필요한지 정확한 진단을 내려드릴 수 있으며 그 상황이 온다면 미리
                문제를 알고있기에 가장 빠르게 움직일 수 있는 팀입니다.
              </Text>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                <Anchor
                  href="https://www.linkedin.com/in/hsolim/"
                  target="_blank"
                >
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Stack gap={"xs"} style={{ flex: 1, zIndex: 1 }}>
                      <Group align="end">
                        <Title order={3}>임한솔</Title>
                        <Text>대표</Text>
                      </Group>
                      <Stack gap={0}>
                        <Text size="sm">건국대학교 경영공학 전공</Text>
                        <Text size="sm">토스 등 10년 이상의 현업 개발경력</Text>
                        <Text size="sm">2025년 예비창업패키지 선정</Text>
                        <Text size="sm">
                          기획, 개발, 디자인까지 능통한 진짜 서비스 전문가
                        </Text>
                      </Stack>
                    </Stack>
                    <Image
                      src={"/assets/images/team/hansol.png"}
                      alt={"임한솔"}
                      width={150}
                      height={150}
                      objectFit="contain"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        zIndex: 0,
                      }}
                    />
                  </Card>
                </Anchor>
                <Anchor
                  href="https://www.linkedin.com/in/dukman-lim-54b291101/"
                  target="_blank"
                >
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Stack gap={"xs"} style={{ flex: 1, zIndex: 1 }}>
                      <Group align="end">
                        <Title order={3}>임덕만</Title>
                        <Text>이사</Text>
                      </Group>
                      <Stack gap={0}>
                        <Text size="sm">연세대학교 MBA</Text>
                        <Text size="sm">쿠팡 등 20년 이상의 HR 전문가</Text>
                        <Text size="sm">HR 벤처기업 가디언즈랩 CEO</Text>
                        <Text size="sm">
                          오랜 사업 운영으로 다져진 사업 전문성
                        </Text>
                      </Stack>
                    </Stack>
                    <Image
                      src={"/assets/images/team/dukman.png"}
                      alt={"임덕만"}
                      width={150}
                      height={150}
                      objectFit="contain"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        zIndex: 0,
                      }}
                    />
                  </Card>
                </Anchor>
              </SimpleGrid>
            </Stack>
          </Stack>
        </Container>
        <Container>
          <Title order={1} ta={"center"}>
            프루퍼팀은 지금 이런 서비스들을 만들고 있습니다.
          </Title>
          <Group py={"lg"} justify={"center"}>
            <Divider w={"5em"} />
          </Group>
          <SimpleGrid
            className={styles.responsiveGridColumns}
            p={"xl"}
            bg={"var(--mantine-color-gray-1)"}
            style={{ borderRadius: "1em" }}
          >
            <Anchor
              className={styles.responsiveGridColumn}
              href={"https://with-cto.proofer.tech"}
              underline={"never"}
              c={"black"}
              target="_blank"
            >
              <Card py={"lg"} px={"xl"} shadow="xs" radius={"lg"}>
                <Stack gap={"xl"}>
                  <Stack gap={"sm"}>
                    <Group>
                      <Image
                        src={"/assets/images/with-cto/logo.svg"}
                        width={100}
                        height={100}
                        alt={"with CTO:"}
                        style={{ width: "auto", height: "2.5em" }}
                      />
                      <Stack gap={0}>
                        <Text size={"xs"}>
                          CTO들의 위대한 시작, 함께 성장하는 커뮤니티
                        </Text>
                        <Title order={5}>with CTO:</Title>
                      </Stack>
                    </Group>
                  </Stack>
                  <Stack gap={0}>
                    <Text>
                      각 회사들의 CTO로 겪고 있는 고민과 도전, 그리고 그
                      사례들을 서로 나눌 수 있는 자리가 없다고 느끼게 되어
                      프루퍼팀에서 with CTO: 라는 커뮤니티를 만들게 되었습니다.
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </Anchor>
          </SimpleGrid>
          <Accordion
            variant="separated"
            radius="md"
            styles={{
              item: {
                border: "1px solid var(--mantine-color-gray-3)",
              },
            }}
          >
            <AccordionItem value="archive">
              <AccordionControl>
                <Text size={"sm"} c={"var(--mantine-color-gray-6)"}>
                  예전에 만들었던 서비스들 보기
                </Text>
              </AccordionControl>
              <AccordionPanel>
                <Stack gap={"xl"}>
                  <Anchor
                    href={"https://medium.com/proofer-blog/newsletter"}
                    underline={"never"}
                    c={"black"}
                    target="_blank"
                  >
                    <Group gap={"md"} align={"flex-start"} wrap="nowrap">
                      <Image
                        src={"/assets/images/team/measurable-developer.webp"}
                        width={40}
                        height={40}
                        alt={"Measurable Developer"}
                        style={{
                          width: "auto",
                          height: "1.5em",
                          flexShrink: 0,
                        }}
                      />
                      <Stack gap={4}>
                        <Title order={5}>Measurable Developer</Title>
                        <Text size={"sm"} c={"var(--mantine-color-gray-6)"}>
                          개발자의 성과 측정 및 평가의 글로벌 트렌드와 더불어
                          관련된 지표나 방법론과 같은 것들을 자세하게 분석하여
                          소개합니다.
                        </Text>
                      </Stack>
                    </Group>
                  </Anchor>
                  <Anchor
                    href={"https://insight.proofer.tech/"}
                    underline={"never"}
                    c={"black"}
                    target="_blank"
                  >
                    <Group gap={"md"} align={"flex-start"} wrap="nowrap">
                      <Image
                        src={"/assets/images/branding.svg"}
                        width={40}
                        height={40}
                        alt={"프루퍼 인사이트"}
                        style={{
                          width: "auto",
                          height: "1.5em",
                          flexShrink: 0,
                        }}
                      />
                      <Stack gap={4}>
                        <Title order={5}>프루퍼 인사이트</Title>
                        <Text size={"sm"} c={"var(--mantine-color-gray-6)"}>
                          쉽고 빠른 노코드 대시보드 빌더. 기존에는 입맛에
                          맞추려면 개발자들을 통해 큰 유지보수 비용을 지불
                          해야만 했던 대시보드 제작 난이도를 낮추고 속도는 높여
                          필요한 시점에 필요한 팀에게 업무 데이터 가시성을
                          제공할 수 있게 됩니다.
                        </Text>
                      </Stack>
                    </Group>
                  </Anchor>
                  <Anchor
                    href={"https://devm.proofer.tech/"}
                    underline={"never"}
                    c={"black"}
                    target="_blank"
                  >
                    <Group gap={"md"} align={"flex-start"} wrap="nowrap">
                      <Image
                        src={"/assets/images/branding.svg"}
                        width={40}
                        height={40}
                        alt={"프루퍼 데브엠"}
                        style={{
                          width: "auto",
                          height: "1.5em",
                          flexShrink: 0,
                        }}
                      />
                      <Stack gap={4}>
                        <Title order={5}>프루퍼 데브엠</Title>
                        <Text size={"sm"} c={"var(--mantine-color-gray-6)"}>
                          우리 회사만을 위한 개발자 성과추적 대시보드.
                          개발자들이 어떻게 일하고 있는지 볼수있고, 앞으로
                          개발자들을 어떻게 관리해야 할지 알수있습니다.
                        </Text>
                      </Stack>
                    </Group>
                  </Anchor>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
        <Container>
          <Title order={1} ta={"center"}>
            프루퍼팀은 이렇게 일하고 있습니다.
          </Title>
          <Group py={"lg"} justify={"center"}>
            <Divider w={"5em"} />
          </Group>
          <SimpleGrid
            className={styles.responsiveGridColumns}
            p={"xl"}
            bg={"var(--mantine-color-gray-1)"}
            style={{ borderRadius: "1em" }}
          >
            <Card shadow={"xs"} p={"xl"}>
              <Stack>
                <Title order={5}>고객, 고객, 고객</Title>
                <Text>
                  편한 사무실 의자 보다 불편한 고객의 옆 보조의자를 더
                  좋아합니다.
                </Text>
                <Text>
                  우리가 하고 싶은 일이 있더라도, 고객에게 진짜 필요한 일을 먼저
                  합니다.
                </Text>
                <Text>
                  고객의 성공이 곧 우리의 성공입니다. 프루퍼팀은 고객의 비즈니스
                  성공을 위해 일합니다.
                </Text>
              </Stack>
            </Card>
            <Card shadow={"xs"} p={"xl"}>
              <Stack>
                <Title order={5}>존중하되, 부딪힙니다.</Title>
                <Text>
                  같은 목표를 가지고 있다면 어떤 의견이라도 의심하기에 앞서 먼저
                  존중합니다.
                </Text>
                <Text>
                  만약 다른 의견이라도 앞으로 나아가기 위해 부딪히는 것을
                  두려워하지 않습니다.
                </Text>
                <Text>
                  투명한 커뮤니케이션으로 부딪히고 깨부수는 시간들을 쌓아 올려
                  공동의 성공으로 향합니다.
                </Text>
              </Stack>
            </Card>
            <Card shadow={"xs"} p={"xl"}>
              <Stack>
                <Title order={5}>기존 것을 배우고, 새 것을 발견합니다.</Title>
                <Text>
                  기존에 해오던 행동들에 기반하여, 더 효과적인 방법을 함께
                  찾아갑니다.
                </Text>
                <Text>
                  전문가들이 지금까지 해오던 기존의 방법을 옛 것으로 치부하지
                  않고 먼저 손을 내밀어 배우고자 하며
                </Text>
                <Text>
                  그 절차와 과정 속에서 조금 더 나은 방법을 찾아 건넬 수 있는
                  것이 프루퍼팀의 힘입니다.
                </Text>
              </Stack>
            </Card>
            <Card shadow={"xs"} p={"xl"}>
              <Stack>
                <Title order={5}>진짜를 추구합니다.</Title>
                <Text>표면적인 성과가 아닌, 실질적인 변화를 추구합니다.</Text>
                <Text>
                  프루퍼팀의 목표는 단기적인 이익이 아닌, 업계의 지속 가능한
                  발전과 그 행보를 함께하는 것입니다.
                </Text>
                <Text>
                  우리는 진정성 있는 노력으로 지속적인 혁신과 성장을 이끌어
                  나갑니다.
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Container>
        <Container>
          <Title order={1} ta={"center"}>
            프루퍼팀과 이야기를 나눠보세요.
          </Title>
          <Group py={"lg"} justify={"center"}>
            <Divider w={"5em"} />
          </Group>
          <Space py={"lg"}></Space>
          <InquireWidget btnText={"대화하기"}>
            <Text size={"sm"} c={"var(--color-white)"}>
              컨설팅, 업무상담, 외주문의, 제휴문의, 어떤 것이든
            </Text>
            <Text size={"lg"} fw={700} c={"var(--color-white)"}>
              프루퍼팀과 대화 해보기
            </Text>
          </InquireWidget>
        </Container>
      </Stack>
    </Box>
  );
}
