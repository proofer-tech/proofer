"use client";
import { Box, Group, Stack, Text } from "@mantine/core";
import React from "react";
import moment from "moment";
import "moment-duration-format";
import { InferSelectModel } from "drizzle-orm";
import { ProcessedGitHubPullRequest } from "@/database/schemas/github/processed";
import { meanBy } from "lodash";
import { formatDuration } from "@/src/utils/dayjs";

interface CycleTimeColumnItf {
  title: string;
  description: string;
  milliseconds: number;
  score: number | null;
  color: string;
}

interface CycleTimeColumnProps {
  cycleTime: CycleTimeColumnItf;
}
function CycleTimeColumn({ cycleTime }: CycleTimeColumnProps) {
  let bg = "transparent";
  let performance = "보통";
  if (cycleTime.score === null) {
    bg = "black";
    performance = "";
  } else if (cycleTime.score < 30) {
    bg = "red";
    performance = "나쁜";
  } else if (cycleTime.score < 80) {
    bg = "yellow";
    performance = "중간";
  } else {
    bg = "green";
    performance = "높은";
  }

  return (
    <Stack w={"100%"} px={"0.5ex"} gap={"1ex"}>
      <Text size={"sm"} fw={700}>
        {cycleTime.title}
      </Text>
      <Group gap={"0.5ex"}>
        {performance ? (
          <>
            <Text c={bg} fw={700}>
              {performance}
            </Text>
            <Text>퍼포먼스</Text>
          </>
        ) : (
          <Text>데이터 없음</Text>
        )}
      </Group>
      <Text fw={700} c={bg}>
        {formatDuration(cycleTime.milliseconds)}
      </Text>
      <Text size={"xs"} c={"var(--mantine-color-gray-6)"}>
        {cycleTime.description}
      </Text>
    </Stack>
  );
}
interface CycleTimeGraphProps {
  cycleTime: CycleTimeColumnItf;
}
function CycleTimeGraph({ cycleTime }: CycleTimeGraphProps) {
  return <Box h={"0.5em"} bg={cycleTime.color} w={"100%"}></Box>;
}

interface CycleTimeAverageProps {
  pullRequests: InferSelectModel<typeof ProcessedGitHubPullRequest>[];
}
export default function CycleTimeAverage({
  pullRequests,
}: CycleTimeAverageProps) {
  const codingTimeAvg = meanBy(pullRequests, (pr) => pr.coding_time);
  const pickupTimeAvg = meanBy(pullRequests, (pr) => pr.pickup_time);
  const reviewTimeAvg = meanBy(pullRequests, (pr) => pr.review_time);
  const deployTimeAvg = meanBy(pullRequests, (pr) => pr.deploy_time);

  const minMill = 1000 * 60;
  const hourMill = minMill * 60;
  const dayMill = hourMill * 24;
  const cycleTimes: CycleTimeColumnItf[] = [
    {
      title: "코딩에 걸리는 시간",
      description: "첫 번째 커밋부터 PR 생성까지 경과된 시간입니다.",
      milliseconds: codingTimeAvg,
      score:
        pullRequests.length > 0
          ? codingTimeAvg > 7 * dayMill
            ? 20
            : codingTimeAvg > 5 * dayMill
              ? 40
              : codingTimeAvg > 3 * dayMill
                ? 60
                : codingTimeAvg > 2 * dayMill
                  ? 80
                  : 100
          : null,
      color: "#3c98ff",
    },
    {
      title: "리뷰를 픽업하는 시간",
      description:
        "PR이 공개된 시점과 해당 PR을 처음 검토하는 시점 사이의 시간입니다. 리뷰어가 동료의 PR을 얼마나 빨리 픽업하는지를 나타냅니다.",
      milliseconds: pickupTimeAvg,
      score:
        pullRequests.length > 0
          ? pickupTimeAvg > 48 * hourMill
            ? 20
            : pickupTimeAvg > 24 * hourMill
              ? 40
              : pickupTimeAvg > 12 * hourMill
                ? 60
                : pickupTimeAvg > 6 * hourMill
                  ? 80
                  : 100
          : null,
      color: "#287af4",
    },
    {
      title: "리뷰에 걸리는 시간",
      description:
        "PR의 첫 번째 검토부터 해당 PR이 병합될 때까지의 시간입니다. 제출자가 코드리뷰를 얼마나 빨리 통합할 수 있는지를 나타냅니다.",
      milliseconds: reviewTimeAvg,
      score:
        pullRequests.length > 0
          ? reviewTimeAvg > 60 * minMill
            ? 20
            : reviewTimeAvg > 30 * minMill
              ? 40
              : reviewTimeAvg > 20 * minMill
                ? 60
                : reviewTimeAvg > 10 * minMill
                  ? 80
                  : 100
          : null,
      color: "#1452e0",
    },
    {
      title: "배포에 걸리는 시간",
      description:
        "PR이 병합되는 시점부터 프로덕션에 배포되는 시점까지의 시간입니다. 코드를 얼마나 빨리 배포할 수 있는지를 나타냅니다.",
      milliseconds: deployTimeAvg,
      score:
        pullRequests.length > 0
          ? deployTimeAvg > 10 * minMill
            ? 20
            : deployTimeAvg > 5 * minMill
              ? 40
              : deployTimeAvg > 3 * minMill
                ? 60
                : deployTimeAvg > minMill
                  ? 80
                  : 100
          : null,
      color: "#0052cc",
    },
  ];

  return (
    <Stack gap={"0.5em"}>
      <Group
        wrap={"nowrap"}
        gap={"0.5em"}
        style={{ borderRadius: "0.5em", overflow: "hidden" }}
      >
        {cycleTimes.map((cycleTime, idx) => (
          <CycleTimeGraph key={idx} cycleTime={cycleTime} />
        ))}
      </Group>
      <Group wrap={"nowrap"} gap={"0.5em"} align={"start"}>
        {cycleTimes.map((cycleTime, idx) => (
          <CycleTimeColumn key={idx} cycleTime={cycleTime} />
        ))}
      </Group>
    </Stack>
  );
}
