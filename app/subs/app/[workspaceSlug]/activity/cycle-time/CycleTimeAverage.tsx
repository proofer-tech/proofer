"use client";
import { Box, Group, Stack, Text, Title } from "@mantine/core";
import React from "react";
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
  let performance = "Medium";
  if (cycleTime.score === null) {
    bg = "black";
    performance = "";
  } else if (cycleTime.score < 30) {
    bg = "red";
    performance = "Low";
  } else if (cycleTime.score < 80) {
    bg = "yellow";
    performance = "Medium";
  } else {
    bg = "green";
    performance = "High";
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
            <Text>Performance</Text>
          </>
        ) : (
          <Text>No data</Text>
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
      title: "Time Spent Coding",
      description: "The time elapsed from the first commit to PR creation.",
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
      title: "Time to Pick Up Review",
      description:
        "The time between when a PR is opened and when it first gets reviewed. Indicates how quickly a reviewer picks up a colleague's PR.",
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
      title: "Review Time",
      description:
        "The time from the first review of a PR to its merge. Reflects how quickly a submitter can integrate code reviews.",
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
      title: "Deployment Time",
      description:
        "The time from PR merge to deployment in production. Shows how quickly code can be deployed.",
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
      color: "#344FE0",
    },
  ];

  return (
    <Stack gap={"0.5em"}>
      <Title order={5}>
        Total:{" "}
        {formatDuration(
          codingTimeAvg + pickupTimeAvg + reviewTimeAvg + deployTimeAvg,
        )}{" "}
      </Title>
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
