"use client";
import { Suspense, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export function CycleTimeBreakdown() {
  const [series] = useState([
    {
      name: "코딩에 걸리는 시간",
      data: [44, 55, 41, 37, 22],
    },
    {
      name: "리뷰를 픽업하는 시간",
      data: [53, 32, 33, 52, 13],
    },
    {
      name: "리뷰에 걸리는 시간",
      data: [12, 17, 11, 9, 15],
    },
    {
      name: "배포에 걸리는 시간",
      data: [9, 7, 5, 8, 6],
    },
  ]);

  const [options] = useState<ApexOptions>({
    chart: {
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      categories: ["PR 이름 1", "PR 이름 2", "PR 이름 3", "PR 이름 4"],
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return "평균 " + val + "분";
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
    dataLabels: {
      enabled: false,
    },
  });
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chart options={options} series={series} type="bar" height={300} />
    </Suspense>
  );
}
