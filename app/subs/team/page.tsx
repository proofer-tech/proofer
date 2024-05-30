import {
  Container,
  Stack,
  Title,
  Text,
  Space,
  Box,
  SimpleGrid,
  Group,
  Anchor,
  Divider,
  Card,
} from "@mantine/core";
import React from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import { InquireWidget } from "@/app/components/Inquire";

export default function Page() {
  return (
    <Box py={"xl"}>
      <Stack gap={"10vh"}>
        <Container py={"xl"}>
          <Title order={1}>HR팀 업무의 어려움을 덜어드리겠습니다.</Title>
          <Space h={"lg"} />
          <Text size={"lg"} c={"var(--mantine-color-gray-6)"}>
            인사업무에서 어렵고 힘든 부분들에 대해 진심으로 공감하는 사람들이
            모였습니다.
          </Text>
          <Space h={"5vh"} />
          <SimpleGrid className={styles.responsiveGridColumns}>
            <Stack align={"center"}>
              <Image
                src={"/assets/images/team/jay.png"}
                alt={"jay"}
                width={800}
                height={800}
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "320px",
                  borderRadius: "16px",
                }}
              />
              <Title order={3}>CEO 홍제형</Title>
              <Stack align={"center"} gap={"xs"}>
                <Text>토론토 대학교 경제학&환경경영 복수전공</Text>
                <Text>와인수입사, 캠핑플랫폼 등 다양한 사업 경험</Text>
                <Text>두 번의 투자유치 경험</Text>
                <Text>AUX 일본 키친웨어 국내 총판사 운영</Text>
                <Text>그외 다수의 B2B 협업 경험</Text>
              </Stack>
              <Space h={"xl"} />
            </Stack>
            <Stack align={"center"}>
              <Image
                src={"/assets/images/team/hsol.png"}
                alt={"hsol"}
                width={800}
                height={800}
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "320px",
                  borderRadius: "16px",
                }}
              />
              <Title order={3}>CTO 임한솔</Title>
              <Stack align={"center"} gap={"xs"}>
                <Text>건국대학교 산업융합학부 경영공학 전공</Text>
                <Text>토스 재직중 사내직원관리 및 통합서비스</Text>
                <Text>사내 HR 솔루션 ‘토스인터널’ 개발</Text>
                <Text>9년간의 올라운더 개발경험</Text>
                <Text>인프라, 개발은 물론 디자인까지 하는 서비스 전문가</Text>
              </Stack>
              <Space h={"xl"} />
            </Stack>
          </SimpleGrid>
          <Space py={"xl"}>
            <Image
              src={"/assets/images/team/proofer.tech.png"}
              width={1600}
              height={311}
              style={{ width: "100%", height: "auto" }}
              alt={"프루퍼 테크"}
            />
          </Space>
        </Container>
        <Container>
          <Title order={1} ta={"center"}>
            프루퍼팀은 지금 이런 서비스들을 만들고 있습니다.
          </Title>
          <Group py={"lg"} justify={"center"}>
            <Divider w={"5em"} />
          </Group>
          <Space py={"lg"}></Space>
          <SimpleGrid
            className={styles.responsiveGridColumns}
            p={"xl"}
            bg={"var(--mantine-color-gray-1)"}
            style={{ borderRadius: "1em" }}
          >
            <Anchor
              className={styles.responsiveGridColumn}
              href={"https://proofer.tech/"}
              underline={"never"}
              c={"black"}
              target="_blank"
            >
              <Card py={"lg"} px={"xl"} shadow="xs" radius={"lg"}>
                <Stack gap={"xl"}>
                  <Stack gap={"sm"}>
                    <Group>
                      <Image
                        src={"/assets/images/branding.svg"}
                        width={100}
                        height={100}
                        alt={"프루퍼 성과관리"}
                        style={{ width: "auto", height: "1.5em" }}
                      />
                      <Stack gap={0}>
                        <Text size={"xs"}>
                          진짜 업무 데이터를 활용하는 성과 측정/평가/관리 통합
                          솔루션
                        </Text>
                        <Title order={5}>프루퍼 성과관리</Title>
                      </Stack>
                    </Group>
                  </Stack>
                  <Stack gap={0}>
                    <Text>
                      성과관리 컨설팅을 통해 정의된 성과지표의 산식에 들어가는
                      변수를 실제 업무 중 생산되는 데이터를 자동으로 추출하고
                      수집·가공하여 채워넣음으로써 조직의 성과평가가 실무를
                      제대로 반영할 수 있도록 하는 솔루션입니다.
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </Anchor>
            <Anchor
              className={styles.responsiveGridColumn}
              href={"https://proofer.tech/with-cto"}
              underline={"never"}
              c={"black"}
              target="_blank"
            >
              <Card py={"lg"} px={"xl"} shadow="xs" radius={"lg"}>
                <Stack gap={"xl"}>
                  <Stack gap={"sm"}>
                    <Group>
                      <Image
                        src={"/assets/images/with-cto/logo.png"}
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
            <Anchor
              className={styles.responsiveGridColumn}
              href={"https://medium.com/proofer-blog/newsletter"}
              underline={"never"}
              c={"black"}
              target="_blank"
            >
              <Card py={"lg"} px={"xl"} shadow="xs" radius={"lg"}>
                <Stack gap={"xl"}>
                  <Stack gap={"sm"}>
                    <Group>
                      <Image
                        src={"/assets/images/team/measurable-developer.png"}
                        width={100}
                        height={100}
                        alt={"Measurable Developer"}
                        style={{ width: "auto", height: "1.5em" }}
                      />
                      <Stack gap={0}>
                        <Text size={"xs"}>
                          개발자의 생산성은 분명히 측정할 수 있습니다.
                        </Text>
                        <Title order={5}>Measurable Developer</Title>
                      </Stack>
                    </Group>
                  </Stack>
                  <Stack gap={0}>
                    <Text>
                      개발자의 성과 측정 및 평가의 글로벌 트렌드와 더불어 관련된
                      지표나 방법론과 같은 것들을 누구보다 빠르고 자세하게
                      분석하여 소개합니다.
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </Anchor>
          </SimpleGrid>
        </Container>
        <Container>
          <Title order={1} ta={"center"}>
            프루퍼팀은 이렇게 일하고 있습니다.
          </Title>
          <Group py={"lg"} justify={"center"}>
            <Divider w={"5em"} />
          </Group>
          <Space py={"lg"}></Space>
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
                  HR 은 긴 역사와 어려운 전문지식들을 지닌 분야입니다.
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
              제휴제안, 입사지원, 기타 문의사항 어떤 것이든
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
