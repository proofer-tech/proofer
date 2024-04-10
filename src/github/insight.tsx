import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { InferSelectModel } from "drizzle-orm";
import { IconMoonStars } from "@tabler/icons-react";
import React from "react";
import { Badge } from "@mantine/core";

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
    yield <InsightBadge text={"Works on weekends"} />;
  }

  if (analyzeResult.midnightWorkRatio > 10) {
    yield (
      <InsightBadge
        leftSection={<IconMoonStars size={"1em"} />}
        text={"Works into the early hours"}
      />
    );
  }

  if (analyzeResult.midnightWorkRatio > 10) {
    yield <InsightBadge text={"Works outside of business hours"} />;
  }
}
