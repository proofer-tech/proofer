"use client";
import {
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
import React from "react";
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconInfoCircleFilled,
} from "@tabler/icons-react";
import useSWR from "swr";
import { apiFetcher } from "@/src/swr";
import { Health, HealthState } from "@/src/types/health";
import { useSearchParams } from "next/navigation";
import { cond, constant, matches, stubTrue } from "lodash";

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
  const searchParams = useSearchParams();

  const { data, error, isLoading } = useSWR<{ [key: string]: Health }>(
    "/api/health",
    apiFetcher,
  );

  const serviceHealth = (data?: { [key: string]: Health }) =>
    data?.[searchParams.get("service") || ""];

  return (
    <Container>
      <Center pt={"5vh"}>
        {isLoading ? (
          <Loader color="rgba(0, 0, 0, 0.1)" size={"9em"} />
        ) : (
          error ||
          cond([
            [
              matches(HealthState.DOWN),
              constant(
                <IconAlertCircleFilled
                  size={"10em"}
                  style={{ color: "var(--color-red)" }}
                />,
              ),
            ],
            [
              matches(HealthState.MAINTENANCE),
              constant(
                <IconInfoCircleFilled
                  size={"10em"}
                  style={{ color: "var(--color-primary)" }}
                />,
              ),
            ],
            [
              stubTrue,
              constant(
                <IconCircleCheckFilled
                  size={"10em"}
                  style={{ color: "var(--color-green)" }}
                />,
              ),
            ],
          ])(serviceHealth(data)?.state)
        )}
      </Center>
      <Stack py={"3em"} align={"center"}>
        {isLoading ? (
          <Skeleton width={"80%"} height={"2em"} radius="xl" />
        ) : (
          error ||
          cond([
            [
              matches(HealthState.DOWN),
              constant(
                <Title order={1} ta={"center"}>
                  {serviceHealth(data)?.name} 서비스에 문제를 발견하여
                  확인중입니다.
                </Title>,
              ),
            ],
            [
              matches(HealthState.MAINTENANCE),
              constant(
                <Title order={1} ta={"center"}>
                  {serviceHealth(data)?.name} 서비스가 점검중입니다.
                </Title>,
              ),
            ],
            [
              stubTrue,
              constant(
                <Title order={1} ta={"center"}>
                  {serviceHealth(data)?.name} 서비스가 정상동작중입니다.
                </Title>,
              ),
            ],
          ])(serviceHealth(data)?.state)
        )}
        {isLoading ? (
          <Skeleton width={"90%"} height={"1em"} radius="xl" />
        ) : (
          cond([
            [
              matches(HealthState.DOWN),
              constant(
                <Text ta={"center"}>
                  최대한 빠르게 복구하겠습니다. 양해해주셔서 감사합니다!
                </Text>,
              ),
            ],
            [
              matches(HealthState.MAINTENANCE),
              constant(
                <Text ta={"center"}>
                  궁금하신 사항은 아래 채널톡을 통해 문의해주시면 최대한 빠르게
                  답변드리겠습니다.
                </Text>,
              ),
            ],
            [
              stubTrue,
              constant(
                <Text ta={"center"}>
                  혹시 문제를 겪고 계시나요? 문제상황을 채널톡으로 전달해주시면
                  빠르게 확인 후 답변해드리겠습니다!
                </Text>,
              ),
            ],
          ])(serviceHealth(data)?.state)
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
              <Tooltip.Floating
                key={k}
                label={h.description}
                disabled={h.description.length > 0}
              >
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
                      <Badge variant="light" color={HealthStateColor[h.state]}>
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
  );
}
