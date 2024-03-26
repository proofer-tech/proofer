"use client";

import React, { Suspense, useState } from "react";
import Chart from "react-apexcharts";
import { Paper } from "@mantine/core";

const days = ["월", "화", "수", "목", "금", "토", "일"];

function generateData(count: number, yrange: { min: number; max: number }) {
  let i = 0;
  return days.map((day) => {
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

export function ApexWeekTimeHeatMap() {
  const [series, setSeries] = useState(
    [...Array(24)]
      .map((_, time) => {
        let preData = generateData(24, {
          min: 0,
          max: 30,
        });

        if (time < 8) {
          preData = preData.map((data) => ({
            x: data.x,
            y: Math.min(data.y, Math.floor(Math.random() * 10) + 1),
          }));
        }

        if ((time < 8 && time > 3) || time > 20) {
          preData = preData.map((data) => ({
            x: data.x,
            y: Math.floor(Math.random() * 5),
          }));
        }

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
      <Paper shadow="xs" px="lg" py={0}>
        <Chart
          options={options}
          series={series}
          type={"heatmap"}
          height={600}
        />
      </Paper>
    </Suspense>
  );
}
