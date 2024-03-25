"use client";
import { Suspense, useState } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { Paper } from "@mantine/core";
import { ApexOptions } from "apexcharts";

function generateData(
  range: [Date, Date],
  count: number,
  yrange: { min: number; max: number },
) {
  const [startDate, endDate] = range;
  let i = 0;
  const series = [];
  while (i < count) {
    const x =
      Math.floor(Math.random() * (endDate.getTime() - startDate.getTime())) +
      startDate.getTime();
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([x, y, z]);
    i++;
  }
  return series;
}
export function SimpleBubbleChart() {
  const [series, setSeries] = useState([
    {
      name: "[임한솔] Commit",
      data: generateData(
        [moment().subtract(30, "days").toDate(), new Date()],
        20,
        {
          min: 10,
          max: 60,
        },
      ),
      color: "#0052cc",
    },
    {
      name: "[임한솔] Pull Request",
      data: generateData(
        [moment().subtract(30, "days").toDate(), new Date()],
        20,
        {
          min: 10,
          max: 60,
        },
      ),
      color: "#00378d",
    },
    {
      name: "[임한솔] Code Review",
      data: generateData(
        [moment().subtract(30, "days").toDate(), new Date()],
        20,
        {
          min: 10,
          max: 60,
        },
      ),
      color: "#002052",
    },
    {
      name: "[홍제형] Commit",
      data: generateData(
        [moment().subtract(30, "days").toDate(), new Date()],
        20,
        {
          min: 10,
          max: 60,
        },
      ),
      color: "#4caf50",
    },
    {
      name: "[홍제형] Pull Request",
      data: generateData(
        [moment().subtract(30, "days").toDate(), new Date()],
        20,
        {
          min: 10,
          max: 60,
        },
      ),
      color: "#39813c",
    },
    {
      name: "[홍제형] Code Review",
      data: generateData(
        [moment().subtract(30, "days").toDate(), new Date()],
        20,
        {
          min: 10,
          max: 60,
        },
      ),
      color: "#1f4921",
    },
  ]);
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      toolbar: { show: false },
    },
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 0.8,
    },
    xaxis: {
      labels: {
        show: true,
        formatter: (value: string) => moment(value).format("MM-DD"),
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Paper shadow="xs" px="lg" py={0}>
        <Chart options={options} series={series} type="bubble" height={300} />
      </Paper>
    </Suspense>
  );
}
