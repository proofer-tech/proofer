"use client";
import { useDisclosure } from "@mantine/hooks";
import useTallyInquireForm from "@/hooks/tally";
import LandingPageShell from "@/app/components/LandingPageShell";
import {
  AppShell,
  Badge,
  Center,
  Container,
  Group,
  Loader,
  Skeleton,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  InquireCompletedModal,
  NotReadyYetModal,
} from "@/app/components/Modal";
import Footer from "@/app/components/Footer";
import React from "react";
import Header from "@/app/components/Header";
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconInfoCircleFilled,
} from "@tabler/icons-react";
import useSWR from "swr";
import { apiFetcher } from "@/app/src/swr";
import { Health, HealthState } from "@/app/interfaces";
import { fswitch } from "@/utils";
import { ReactChannelIO } from "react-channel-plugin";

const HealthStateLabel = {
  [HealthState.UP]: "운영중",
  [HealthState.DOWN]: "확인필요",
  [HealthState.MAINTENANCE]: "작업중",
};

const HealthStateColor = {
  [HealthState.UP]: "var(--color-green)",
  [HealthState.DOWN]: "var(--color-red)",
  [HealthState.MAINTENANCE]: "var(--color-primary)",
};

export default function HealthPage() {
  const navbarDisclosure = useDisclosure(false);
  const [isInquireCompletedModalOpened, inquireCompletedModal] =
    useDisclosure(false);
  const [notReadyYetModalOpened, notReadyYetModal] = useDisclosure(false);
  const { openTallyPopup } = useTallyInquireForm({
    onSubmit: () => inquireCompletedModal.open(),
  });

  const { data, error, isLoading } = useSWR<{ [key: string]: Health }>(
    "/api/health",
    apiFetcher,
  );

  const serviceHealth = (data?: { [key: string]: Health }) =>
    data?.[window.location.hostname.split(".")[0]];

  return (
    <ReactChannelIO
      pluginKey={process.env.NEXT_PUBLIC_CHANNEL_ID_PLUGIN_KEY!}
      language="ko"
      autoBoot
    >
      <LandingPageShell isNavbarOpened={navbarDisclosure[0]}>
        <Header
          isNavbarOpened={navbarDisclosure[0]}
          onBurgerClick={navbarDisclosure[1].toggle}
          onLoginClick={() => notReadyYetModal.open()}
          onInquireClick={() => openTallyPopup()}
        />
        <AppShell.Main>
          <Container>
            <Center pt={"5vh"}>
              {isLoading ? (
                <Loader color="rgba(0, 0, 0, 0.1)" size={"9em"} />
              ) : (
                error ||
                fswitch(serviceHealth(data)?.state)
                  .case(HealthState.DOWN, () => (
                    <IconAlertCircleFilled
                      size={"10em"}
                      style={{ color: "var(--color-red)" }}
                    />
                  ))
                  .case(HealthState.MAINTENANCE, () => (
                    <IconInfoCircleFilled
                      size={"10em"}
                      style={{ color: "var(--color-primary)" }}
                    />
                  ))
                  .default(() => (
                    <IconCircleCheckFilled
                      size={"10em"}
                      style={{ color: "var(--color-green)" }}
                    />
                  ))
              )}
            </Center>
            <Stack py={"3em"} align={"center"}>
              {isLoading ? (
                <Skeleton width={"80%"} height={"2em"} radius="xl" />
              ) : (
                error ||
                fswitch(serviceHealth(data)?.state)
                  .case(HealthState.DOWN, () => (
                    <Title order={1} ta={"center"}>
                      {serviceHealth(data)?.name} 서비스에 문제를 발견하여
                      확인중입니다.
                    </Title>
                  ))
                  .case(HealthState.MAINTENANCE, () => (
                    <Title order={1} ta={"center"}>
                      {serviceHealth(data)?.name} 서비스가 점검중입니다.
                    </Title>
                  ))
                  .default(() => (
                    <Title order={1} ta={"center"}>
                      {serviceHealth(data)?.name} 서비스가 정상동작중입니다.
                    </Title>
                  ))
              )}
              {isLoading ? (
                <Skeleton width={"90%"} height={"1em"} radius="xl" />
              ) : (
                fswitch(serviceHealth(data)?.state)
                  .case(HealthState.DOWN, () => (
                    <Text ta={"center"}>
                      최대한 빠르게 복구하겠습니다. 양해해주셔서 감사합니다!
                    </Text>
                  ))
                  .case(HealthState.MAINTENANCE, () => (
                    <Text ta={"center"}>
                      궁금하신 사항은 아래 채널톡을 통해 문의해주시면 최대한
                      빠르게 답변드리겠습니다.
                    </Text>
                  ))
                  .default(() => (
                    <Text ta={"center"}>
                      혹시 문제를 겪고 계시나요? 문제상황을 채널톡으로
                      전달해주시면 빠르게 확인 후 답변해드리겠습니다!
                    </Text>
                  ))
              )}
            </Stack>
            <Group gap={"1em"} justify={"center"} py={"2em"}>
              {isLoading
                ? Array.from({ length: 3 }, () => (
                    <Skeleton
                      key={Math.random()}
                      width={"10em"}
                      height={"2em"}
                      radius="xl"
                    />
                  ))
                : data &&
                  Object.entries(data).map(([k, h]) => (
                    <Tooltip.Floating key={k} label={h.description}>
                      <Badge
                        size="xl"
                        variant="dot"
                        color={(() => {
                          switch (h.state) {
                            case HealthState.UP:
                              return "var(--color-green)";
                            case HealthState.DOWN:
                              return "var(--color-red)";
                            case HealthState.MAINTENANCE:
                              return "var(--color-primary)";
                            default:
                              return "var(--color-darkgray-2)";
                          }
                        })()}
                      >
                        {h.name}
                      </Badge>
                    </Tooltip.Floating>
                  ))}
            </Group>
            {isLoading ? (
              <Stack>
                {Array.from({ length: 5 }, () => (
                  <Skeleton key={Math.random()} width={"100%"} height={"1em"} />
                ))}
              </Stack>
            ) : (
              data &&
              Object.values(data).some((h) => h.description.length > 0) && (
                <Table captionSide="bottom">
                  {Object.entries(data)
                    .filter(([_, h]) => h.description.length > 0)
                    .map(([k, h]) => (
                      <Table.Tbody key={k}>
                        <Table.Tr>
                          <Table.Td>
                            <Badge
                              variant="light"
                              color={HealthStateColor[h.state]}
                            >
                              {HealthStateLabel[h.state]}
                            </Badge>
                          </Table.Td>
                          <Table.Td>{h.name}</Table.Td>
                          <Table.Td>{h.description}</Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    ))}
                </Table>
              )
            )}
          </Container>
        </AppShell.Main>
        <NotReadyYetModal
          isOpened={notReadyYetModalOpened}
          onCloseClick={notReadyYetModal.close}
        />
        <InquireCompletedModal
          isOpened={isInquireCompletedModalOpened}
          onCloseClick={inquireCompletedModal.close}
        />
        <AppShell.Footer pos={"static"} bg={"transparent"} withBorder={false}>
          <Footer />
        </AppShell.Footer>
      </LandingPageShell>
    </ReactChannelIO>
  );
}
