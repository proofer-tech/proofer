"use client";
import { Suspense, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { ProcessedGitHubPullRequest } from "@/database/schemas/github/processed";
import { InferSelectModel } from "drizzle-orm";
import { formatDuration } from "@/src/utils/dayjs";
import { setSelection } from "@testing-library/user-event/event/selection/setSelection";

interface CycleTimeBreakdownProps {
  pullRequests: InferSelectModel<typeof ProcessedGitHubPullRequest>[];
}
export function CycleTimeBreakdown({ pullRequests }: CycleTimeBreakdownProps) {
  const [series, setSeries] = useState<any[]>([]);
  const [options, setOptions] = useState<ApexOptions>();

  useEffect(() => {
    setSeries([
      {
        name: "코딩에 걸리는 시간",
        data: pullRequests.map((pr) => pr.coding_time),
        color: "#3c98ff",
      },
      {
        name: "리뷰를 픽업하는 시간",
        data: pullRequests.map((pr) => pr.pickup_time),
        color: "#287af4",
      },
      {
        name: "리뷰에 걸리는 시간",
        data: pullRequests.map((pr) => pr.review_time),
        color: "#1452e0",
      },
      {
        name: "배포에 걸리는 시간",
        data: pullRequests.map((pr) => pr.deploy_time),
        color: "#0052cc",
      },
    ]);
    setOptions({
      chart: {
        stacked: true,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        categories: pullRequests.map((pr) => pr.title),
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return formatDuration(val);
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
  }, [pullRequests]);

  return (
    options && (
      <Chart options={options} series={series} type="bar" height={300} />
    )
  );
}
