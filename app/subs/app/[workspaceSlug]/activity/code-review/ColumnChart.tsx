"use client";
import { Suspense, useState } from "react";
import Chart from "react-apexcharts";

export default function ColumnChart() {
  const [series, setSeries] = useState([
    {
      name: "PR 제출",
      data: [1, 0, 2, 1, 0, 0, 2, 1, 0],
    },
    {
      name: "코드리뷰",
      data: [3, 4, 4, 5, 1, 2, 7, 3, 2],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "03/19",
        "03/20",
        "03/21",
        "03/22",
        "03/23",
        "03/24",
        "03/25",
        "03/26",
        "03/27",
      ],
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return `${val} 회`;
        },
      },
    },
  });
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Chart options={options} series={series} type="bar" height={350} />
    </Suspense>
  );
}
