"use client";

import React, { Suspense, useState } from "react";
import Chart from "react-apexcharts";
import { Paper } from "@mantine/core";
import { InferSelectModel } from "drizzle-orm";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { groupBy } from "lodash";
import dayjs from "dayjs";

const dayOfTheWeekLabels = ["월", "화", "수", "목", "금", "토", "일"];

function generateData(count: number, yrange: { min: number; max: number }) {
  let i = 0;
  return dayOfTheWeekLabels.map((day) => {
    let y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    if (["토", "일"].includes(day)) {
      y = parseInt((y * 0.1).toString());
    }
    return {
      x: day,
      y: y,
    };
  });
}

type tsType = InferSelectModel<typeof ProcessedGitHubTimeSeries>;
export function ApexWeekTimeHeatMap({ timeSeries }: { timeSeries: tsType[] }) {
  const hoursMap: { [key: number]: tsType[] } = Object.assign(
    Object.fromEntries([...Array(25)].map((_, i) => [i, []])),
    groupBy(timeSeries, (t) => dayjs(t.timestamp).hour()),
  );
  const [series, setSeries] = useState(
    Object.entries(hoursMap)
      .map(([time, seriesSet]) => {
        let preData = dayOfTheWeekLabels.map((key, idx) => {
          const value = seriesSet.filter(
            (s) => dayjs(s.timestamp).get("d") == idx,
          ).length;

          return { x: key, y: value };
        });

        return {
          name: `${time}시`,
          data: preData,
        };
      })
      .reverse(),
  );

  const [options, setOptions] = useState({
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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {window && (
        <Paper shadow="xs" px="lg" py={0}>
          <Chart
            options={options}
            series={series}
            type={"heatmap"}
            height={600}
          />
        </Paper>
      )}
    </Suspense>
  );
}
