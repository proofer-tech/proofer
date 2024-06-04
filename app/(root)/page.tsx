import React from "react";
import Background from "@/app/components/Background";
import {
  Badge,
  Card,
  CardSection,
  Container,
  Divider,
  Flex,
  Group,
  MantineSize,
  rem,
  SimpleGrid,
  Space,
  Stack,
  Stepper,
  StepperStep,
  Text,
  Title,
} from "@mantine/core";
import style from "./style.module.scss";
import { Done, Down } from "@/app/components/Divider";
import { IconCheck } from "@tabler/icons-react";
import { InquireForm, InquireWidget } from "../components/Inquire";

export default function Page() {
  return (
    <>
      <Background />
      <Container className={style.hero} h={"calc(100vh - 8em)"}>
        <Stack gap={"xs"}>
          <Space h={"xl"} />
          <Text size={"md"} ta={"center"} c={"var(--mantine-color-gray-8)"}>
            프루퍼, S.M.A.R.T 한 데이터 기반 성과관리
          </Text>
          <Text
            component={"h1"}
            fw={700}
            size={rem(54)}
            ta="center"
            lh={1.3}
            variant="gradient"
            gradient={{
              from: "var(--color-primary)",
              to: "var(--color-secondary)",
              deg: 80,
            }}
          >
            진짜 업무 데이터를 활용하는
            <br />
            성과 측정/평가/관리 통합 솔루션
          </Text>
          <Space h={"1em"} />
          <Text size={"md"} ta={"center"} c={"var(--mantine-color-gray-6)"}>
            1on1, 설문조사, 다면평가와 같은 기존의 정성적인 방법으로만 측정한
            성과만으로는
            <br />
            평가자마다 제각각인 기준으로 주관적이고 편견이 들어있을 수 있어
            업무성과를 정확히 추적하기에는 부족합니다.
            <br />
            이제는 프루퍼와 함께 실제 업무에 대한 풍부하고 다양한 신뢰성 높은
            업무 데이터를 더하여 &quot;진짜&quot; 성과를 알아보세요!
          </Text>
          <Group justify={"center"} mt={"xl"}>
            <InquireForm btnText={"무료상담 신청"} withEmail={true} />
          </Group>
        </Stack>
      </Container>
      <Space pb={"4em"}>
        <Down />
      </Space>
      <Container>
        <Title order={4} ta={"center"} c={"var(--mantine-color-gray-7)"}>
          프루퍼의 미션
        </Title>
        <Group pt={"lg"} pb={"xl"} justify={"center"}>
          <Divider w={"5em"} />
        </Group>
        <Title order={4} c={"var(--mantine-color-gray-8)"} fw={400}>
          인재밀도 == 기업가치
        </Title>
        <Title order={3}>데이터를 통해 비즈니스 가치를 더합니다.</Title>
        <Space h={"1em"} />
        <Text size={"md"} maw={"60em"}>
          이제는 성과관리에도 데이터 기반의 의사결정이 필요합니다. 프루퍼를 통해
          실제 업무 데이터에 기반한 평가로 임직원들이 느끼는 업무와 평가의
          괴리를 해소하여 명확한 피드백과 목표를 바탕으로 자신의 역량을
          객관적으로 이해하여 성장하는데 도움을 주고, 더 나아가 조직 전체의
          인재밀도를 향상시켜 비즈니스에 가치를 더해보세요.
        </Text>
        <Space h={"2em"} />
        <Stepper
          size={"1.1em" as MantineSize}
          orientation="vertical"
          active={4}
          color={"var(--color-darkgray)"}
          completedIcon={
            <IconCheck style={{ width: rem(18), height: rem(18) }} />
          }
        >
          <StepperStep
            label="업무데이터 기반의 성과평가"
            description="실제 업무과정에서 생산되는 데이터에 기반하여 객관적이고 정확한 성과평가를 수행합니다. 단 한번의 연동만으로 이 모든 과정이 이루어집니다."
          />
          <StepperStep
            label="인재밀도 향상"
            description="PDCA 사이클에서 정확한 업무 성과를 측정하고 가시화된 성과를 통해 전사적 전략목표에 일치된 명확한 방향성과 적시성 높은 성과지표를 성장에 활용하여 인재밀도를 높여줍니다."
          />
          <StepperStep
            label="비즈니스 성공"
            description="데이터 기반 성과관리를 통한 성장 사이클로 향상된 인재밀도는 조직이 더 많은 작업을 처리하고 오류를 줄이며 생산성을 극대화 시킬 수 있도록 하여 비즈니스의 성공을 이끌어냅니다."
          />
        </Stepper>
      </Container>
      <Space h={"8em"} id={"price"} />
      <Container py={"1em"}>
        <Title order={4} ta={"center"} c={"var(--mantine-color-gray-7)"}>
          프루퍼 기능
        </Title>
        <Group pt={"lg"} pb={"xl"} justify={"center"}>
          <Divider w={"5em"} />
        </Group>
        <Flex className={style.services} columnGap={"1em"} rowGap={"3em"}>
          <Stack className={style.service} gap={"2em"}>
            <Title order={5} ta={"center"} c={"var(--mantine-color-gray-8)"}>
              프루퍼 성과관리 플랫폼 (SaaS & On-premise)
            </Title>
            <Card
              shadow="sm"
              radius="md"
              padding={"md"}
              withBorder
              bg={"white"}
            >
              <CardSection p={"md"} withBorder>
                <Text fw={500}>어떤 서비스인가요?</Text>
                <Space h={"1em"} />
                <Text size="sm" c="var(--mantine-color-gray-8)">
                  시스템에 업무에 사용되는 툴들을 최초 1회 연동만 해놓으면,
                  성과지표 산식에 관련 데이터들을 대입해볼 수 있으며 설정 후
                  실시간으로 자동 계산되는 지표를 모니터링 및 평가에 사용할 수
                  있습니다.
                </Text>
              </CardSection>
              <CardSection px={"md"} py={"sm"}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>업무 툴 연동</Text>
                  <Badge color="grey" size={"sm"}>
                    무료
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  단 한번의 연동으로 끝! 업무툴들을 프루퍼에 연동하면,
                  성과지표가 업무툴에서 생산되는 데이터로부터 자동으로
                  계산됩니다.
                </Text>
              </CardSection>
              <CardSection px={"md"} py={"sm"}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>성과지표 설정</Text>
                  <Badge color="grey" size={"sm"}>
                    무료
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  조직에서 사용되는 성과지표와 이를 산출해내는 산식을 프루퍼에서
                  손쉽게 등록해보세요. 한번 등록한 지표는 매일 자동으로 계산되어
                  반영되며 산식을 수정하면 그 데이터까지 알맞게 적용됩니다.
                </Text>
              </CardSection>
              <CardSection px={"md"} py={"sm"}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>정기 성과평가</Text>
                  <Badge color="grey" size={"sm"}>
                    무료
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  업무 데이터 기반으로 계산된 성과지표들을 모아 각 대상에 맞는
                  성과평가 양식을 만들 수 있습니다. 평가 담당자는 이것을 통해 더
                  쉽고 빠르게 평가를 수행할 수 있으며 취합된 평가 결과를 한눈에
                  볼 수 있는 개인별 대시보드 기능을 제공해드리고 있습니다.
                </Text>
              </CardSection>
              <CardSection px={"md"} py={"sm"}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>상시 성과평가</Text>
                  <Badge color="grey" size={"sm"}>
                    무료
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  정기적인 평가 시즌이 아니더라도 언제든 업무 데이터로부터
                  자동으로 계산되고 있는 성과지표들을 통해 평가를 수행하거나,
                  평가 이후 성과의 개선 방향을 지속해서 추적해볼 수 있습니다.
                </Text>
              </CardSection>
              <CardSection px={"md"} py={"sm"}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>비계량지표 평가</Text>
                  <Badge color="cyan" size={"sm"}>
                    준비중
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  프루퍼는 기존 방식에 데이터 기반의 계량평가를 더해 성과를 더
                  정확하게 측정하는 것을 목표로 하고 있습니다. 다음으로는 기존의
                  1on1 미팅, 설문조사, 다면평가 기능까지 제공할 예정입니다. 이를
                  통해 통합된 환경에서 포괄적이고 균형 잡힌 성과평가를 할 수
                  있게되고, 직원들의 다양한 의견과 피드백을 반영하여 전반적인
                  평가의 신뢰성을 높일 수 있습니다.
                </Text>
              </CardSection>
              <CardSection px={"md"} py={"sm"}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>성과 히스토리</Text>
                  <Badge color="grey" size={"sm"}>
                    무료
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  이미 지나간 평가 기록도 프루퍼에서 확인해볼 수 있습니다. 이를
                  통해 과거 성과평가로부터 개선된 모습을 확인하고, 액션 플랜을
                  설계해볼 수 있습니다.
                </Text>
              </CardSection>
              <CardSection px={"md"} py={"sm"}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>시스템 도입 컨설팅</Text>
                  <Badge color="teal" size={"sm"}>
                    도입 시 무료
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  프루퍼 시스템에서는 조직마다 다른 성과의 기준에 따라 조직에 꼭
                  맞는 서비스를 제공해드립니다. 프루퍼를 처음 도입할 경우
                  컨설팅을 통해 이 과정을 진행해드리고, 이후에도 필요할 경우
                  언제든지 수정하실 수 있도록 가이드 해드리고 있습니다.
                </Text>
              </CardSection>
              <CardSection px={"md"} py={"sm"}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>성과관리 컨설팅</Text>
                  <Badge color="teal" size={"sm"}>
                    도입 시 무료
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  업무 데이터를 활용한 성과관리가 비즈니스의 성공으로 연결될 수
                  있도록 핵심성공요소를 도출하고, 이를 측정하기 위한
                  핵심성과지표들을 설계하여, 이행과제를 도출하는 과정을
                  전반적으로 함께 해드립니다.
                </Text>
              </CardSection>
              <InquireForm
                btnText={"무료상담 신청"}
                btnProps={{ fullWidth: true, mt: "md" }}
              />
            </Card>
          </Stack>
          <Stack className={style.service} gap={"2em"}>
            <Title order={5} ta={"center"} c={"var(--mantine-color-gray-8)"}>
              프루퍼 성과추출 솔루션
            </Title>
            <Card shadow="sm" padding="lg" radius="md" withBorder bg={"white"}>
              <CardSection p={"md"} withBorder>
                <Text fw={500}>어떤 서비스인가요?</Text>
                <Space h={"1em"} />
                <Text size="sm" c="var(--mantine-color-gray-8)">
                  일회성으로 실제 업무 데이터를 추출해서 확인해보고 싶거나, 기존
                  성과평가 과정에서 업무 데이터만 추가로 적용해보고 싶으시다면,
                  프루퍼팀과의 협업을 통해 성과추출 솔루션을 제공 받아보실 수
                  있습니다.
                </Text>
              </CardSection>
              <CardSection px={"md"} py={"sm"}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>업무 데이터 추출</Text>
                  <Badge color="grey" size={"sm"}>
                    무료
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  미팅을 통해 협의된 지표들을 수치화하기 위한 업무 데이터를
                  원하는 기간과 대상에 맞추어 추출해드립니다.
                </Text>
              </CardSection>
              <CardSection px={"md"} py={"sm"}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>성과관리 컨설팅</Text>
                  <Badge color="grey" size={"sm"}>
                    무료
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  업무 데이터를 활용한 성과관리가 비즈니스의 성공으로 연결될 수
                  있도록 핵심성공요소를 도출하고, 이를 측정하기 위한
                  핵심성과지표들을 설계하여, 이행과제를 도출하는 과정을
                  전반적으로 함께 해드립니다.
                </Text>
              </CardSection>
              <CardSection px={"md"} py={"sm"}>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>성과관리 플랫폼 도입연계</Text>
                  <Badge color="grey" size={"sm"}>
                    무료
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  성과추출 솔루션을 도입하면, 성과관리 플랫폼을 도입할 때에 해당
                  데이터를 활용하여 더 효율적으로 도입을 연계해드릴 수 있습니다.
                  시스템 도입이 망설여지신다면 성과추출 솔루션을 먼저 도입하여
                  효과를 확인 해보시는 것도 괜찮습니다.
                </Text>
              </CardSection>
              <InquireForm
                btnText={"무료상담 신청"}
                btnProps={{ fullWidth: true, mt: "md" }}
              />
            </Card>
          </Stack>
        </Flex>
      </Container>
      <Space py={"6em"}>
        <Down />
      </Space>
      <Container>
        <Title order={4} ta={"center"} c={"var(--mantine-color-gray-7)"}>
          프루퍼 FAQ
        </Title>
        <Group pt={"lg"} pb={"xl"} justify={"center"}>
          <Divider w={"5em"} />
        </Group>
        <SimpleGrid className={style.faqCards}>
          <Stack className={style.faqCard}>
            <Title order={5} c={"var(--mantine-color-gray-8)"} fw={400}>
              새로운 툴을 도입하는게 망설여지신다고요?
            </Title>
            <Title order={4}>
              단 한 번의 도입으로
              <br />
              지속적인 효과를 누리세요.
            </Title>
            <Space h={"sm"} />
            <Text size={"md"} maw={"60em"}>
              프루퍼 성과관리 플랫폼은 단 한번 업무 툴 연동 및 성과지표를
              설정하면 매번 데이터를 넣어주거나 조정할 필요 없이 자동으로
              계산되어 반영됩니다. 기존의 방식과 비교했을 때 시간이 지날수록
              평가를 위한 운영비용은 줄어들고, 기존보다 더 정확하게 성과를
              추적할 수 있게 됩니다. 도입과정 또한 프루퍼팀의 시스템 도입
              컨설팅과 함께라면 전혀 복잡하지 않습니다.
            </Text>
          </Stack>
          <Stack className={style.faqCard}>
            <Title order={5} c={"var(--mantine-color-gray-8)"} fw={400}>
              외부 위협에 어떻게 대비하고 있나요?
            </Title>
            <Title order={4}>
              철저한 보안과
              <br />
              데이터 보호를 원칙으로 합니다.
            </Title>
            <Space h={"sm"} />
            <Text size={"md"} maw={"60em"}>
              모든 네트워크 통신 및 사용자 데이터는 암호화되어 처리되며, CI
              단계에서 SAST(정적 애플리케이션 보안 테스트) 방식으로 코드를
              검증하고, CD 단계에서 DAST(동적 애플리케이션 보안 테스트) 방식으로
              추가 검증을 진행합니다. 또한, OWASP Top 10과 SANS Top 25 원칙에
              따라 개발되며, 클라우드 보안을 준수하여 배포됩니다. 원본 데이터는
              분리된 망에 저장되며 가공된 데이터는 암호화되어 저장됩니다. 모든
              데이터들은 언제든 고객의 요청에 따라 폐기합니다.
            </Text>
          </Stack>
          <Stack className={style.faqCard}>
            <Title order={5} c={"var(--mantine-color-gray-8)"} fw={400}>
              인재밀도가 진짜 높아질까요?
            </Title>
            <Title order={4}>
              자기주도적인 성장과
              <br />
              업무 생산성을 지원합니다.
            </Title>
            <Space h={"sm"} />
            <Text size={"md"} maw={"60em"}>
              프루퍼 성과관리 플랫폼은 임직원의 성장과 효율성을 지원하기 위해
              설계된 도구입니다. 이 시스템은 성과평가에 그치지 않고, 임직원들이
              스스로의 성장을 도모할 수 있도록 돕는 업무 파트너로서의 역할을
              합니다. 뿐만 아니라 개인화된 데이터를 활용하여 어느 정도의 역량을
              가지고, 개인의 성장을 위해 조직에서 어떤 도움을 주어야 하는지에
              대한 인사이트를 제공합니다.
            </Text>
          </Stack>
          <Stack className={style.faqCard}>
            <Title order={5} c={"var(--mantine-color-gray-8)"} fw={400}>
              어디에 먼저 도입하면 좋을까요?
            </Title>
            <Title order={4}>
              비즈니스를 위해 일한다면,
              <br />
              모두 가능합니다.
            </Title>
            <Space h={"sm"} />
            <Text size={"md"} maw={"60em"}>
              프루퍼 시스템은 직군이나 도메인에 상관없이 어디든 폭넓게 적용할 수
              있습니다. 특히, 현재는 서비스 개발자의 성과를 평가하는 데 주로
              활용되고 있으며, 개발자들의 성장지원과 객관적인 성과평가를 도입할
              수 있습니다. 이를 통해 개발자들의 업무 효율성을 극대화하고, 조직
              전체의 생산성을 향상시키는 데 기여하고 있습니다. 프루퍼 시스템은
              작은 팀단위로도 도입이 가능하니 작게 실험해보시고 전체 조직에
              적용하셔도 좋습니다.
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
      <Space py={"8em"}>
        <Done />
      </Space>
      <Container>
        <Title order={4} c={"var(--mantine-color-gray-8)"} fw={400}>
          아직도 고민하고 계신가요?
        </Title>
        <Space h={"sm"} />
        <Title order={3}>도입 상담 후 고민해도 늦지 않습니다.</Title>
        <Space h={"lg"} />
        <Text>
          프루퍼팀의 도입 상담을 통해 성과관리 플랫폼을 혁신하세요. 저희
          전문가들은 요구와 환경을 철저히 분석하여 최적의 성과관리 솔루션을
          제안해드립니다. 도입 여부에 상관없이, 상담 과정에서 얻은 인사이트는
          조직의 성과 향상에 큰 도움이 될 것입니다. 지금 상담을 신청하시고,
          데이터 기반의 정확한 성과 평가와 맞춤형 솔루션을 경험해보세요.
        </Text>
        <Space h={"lg"} />
        <InquireWidget btnText={"무료상담 신청"}>
          <Text size={"sm"} c={"var(--color-white)"}>
            상담을 통한 온보딩과 함께
          </Text>
          <Text size={"lg"} fw={700} c={"var(--color-white)"}>
            무료로 체험해보기
          </Text>
        </InquireWidget>
      </Container>
      <Space h={"10vh"} />
    </>
  );
}
