import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { InferSelectModel } from "drizzle-orm";
import { IconMoonStars, TablerIconsProps } from "@tabler/icons-react";
import React from "react";
import { Badge, Tooltip } from "@mantine/core";
import dayjs from "dayjs";

function InsightBadge({
  leftSection,
  text,
}: {
  leftSection?: React.JSX.Element;
  text: string;
}) {
  return (
    <Badge
      size={"lg"}
      color={"gray"}
      variant={"light"}
      leftSection={leftSection}
    >
      {text}
    </Badge>
  );
}
export function* analyzeTimeSeries(
  timeSeries: InferSelectModel<typeof ProcessedGitHubTimeSeries>[],
) {
  const weekendWorks = timeSeries.filter((ts) => {
    const day = new Date(ts.timestamp).getDay();
    return day === 0 || day === 6;
  });
  const workingHours = timeSeries.filter((ts) => {
    const hour = new Date(ts.timestamp).getHours();
    return hour >= 9 && hour < 18;
  });
  const midnightWorks = timeSeries.filter((ts) => {
    const hour = new Date(ts.timestamp).getHours();
    return hour >= 0 && hour < 6;
  });

  const analyzeResult = {
    weekendWorkRatio: (weekendWorks.length / timeSeries.length) * 100,
    midnightWorkRatio: (midnightWorks.length / timeSeries.length) * 100,
    workingHoursRatio: (workingHours.length / timeSeries.length) * 100,
  };

  if (analyzeResult.weekendWorkRatio > 0) {
    yield <InsightBadge text={"주말에도 일을 합니다"} />;
  }

  if (analyzeResult.midnightWorkRatio > 10) {
    yield (
      <InsightBadge
        leftSection={<IconMoonStars size={"1em"} />}
        text={"새벽에도 일을 합니다"}
      />
    );
  }

  if (analyzeResult.midnightWorkRatio > 10) {
    yield <InsightBadge text={"업무시간 외에도 일을 합니다"} />;
  }
}
