"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Paper } from "@mantine/core";
import { InferSelectModel } from "drizzle-orm";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { groupBy } from "lodash";
import dayjs, { getDay } from "@/src/utils/dayjs";

const dayOfTheWeekLabels = ["월", "화", "수", "목", "금", "토", "일"];

type tsType = InferSelectModel<typeof ProcessedGitHubTimeSeries>;
export function ApexWeekTimeHeatMap({ timeSeries }: { timeSeries: tsType[] }) {
  const [series, setSeries] = useState<any[]>([]);
  const [options] = useState({
    chart: {
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#4caf50"],
    tooltip: {
      x: {
        formatter: (value: number) => `${value}요일 평균시간`,
      },
      y: {
        title: { formatter: (value: string) => `${value}` },
        formatter: (value: number) => `${value} 일`,
      },
      marker: { show: true },
    },
  });

  useEffect(() => {
    const hoursMap: { [key: number]: tsType[] } = Object.assign(
      Object.fromEntries([...Array(25)].map((_, i) => [i, []])),
      groupBy(timeSeries, (t) => dayjs(t.timestamp).hour()),
    );
    setSeries(
      Object.entries(hoursMap)
        .map(([time, seriesSet]) => {
          let preData = dayOfTheWeekLabels.map((key, idx) => {
            const value = seriesSet.filter((s) => {
              return getDay(s.timestamp) === idx;
            }).length;

            return { x: key, y: value };
          });

          return {
            name: `${time}시`,
            data: preData,
          };
        })
        .reverse(),
    );
  }, [timeSeries]);

  return (
    <Paper shadow="xs" px="lg" py={0}>
      <Chart options={options} series={series} type={"heatmap"} height={600} />
    </Paper>
  );
}
