"use client";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Paper } from "@mantine/core";
import { ApexOptions } from "apexcharts";
import { InferSelectModel } from "drizzle-orm";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { GitHubSegment } from "@/src/modules/SegmentControl/types";
import { flatten, groupBy, keyBy, uniqBy } from "lodash";
import dayjs from "dayjs";

type tsType = InferSelectModel<typeof ProcessedGitHubTimeSeries>;

export function ApexTimeline({
  timeSeries,
  segment,
  range,
}: {
  timeSeries: tsType[];
  range: [string, string];
  segment: GitHubSegment;
}) {
  const userIdMap = keyBy(
    // @ts-ignore
    uniqBy(timeSeries, (ts) => ts.workspace_member),
    (ts) => ts.user_id,
  );
  const tsUserMap = groupBy(timeSeries, (ts) => ts.user_id);

  const [series, setSeries] = useState<any[]>([]);
  const [options, setOptions] = useState<ApexOptions>();

  useEffect(() => {
    const series = Object.entries(tsUserMap).map(
      ([userId, tsList], memberIdx) => {
        // @ts-ignore
        const member = userIdMap[userId].workspace_member;

        let tsSegmentMap;
        if (segment === GitHubSegment.전체)
          tsSegmentMap = groupBy(tsList, (ts) =>
            ts.event?.startsWith("commit")
              ? GitHubSegment.Commit
              : ts.event?.startsWith("pull_request")
                ? GitHubSegment["Pull Request"]
                : ts.event?.startsWith("issue")
                  ? GitHubSegment.Issue
                  : GitHubSegment.전체,
          );
        else tsSegmentMap = { [segment]: tsList };
        const data: { x: string; y: [number | null, number | null] }[] =
          flatten(
            Object.entries(tsSegmentMap).map(([segmentIdx, tsSegList]) => {
              const tsDateMap = groupBy(tsSegList, (ts) =>
                dayjs(ts.timestamp).format("YYYY-MM-DD"),
              );
              return flatten(
                Object.entries(tsDateMap).map(([_, tsDateList]) => {
                  let tsStart = tsDateList[0].timestamp.getTime();
                  let tsEnd =
                    tsDateList[tsDateList.length - 1].timestamp.getTime();

                  if (tsStart === tsEnd) {
                    tsStart = dayjs(tsStart)
                      .set("hour", 0)
                      .set("minute", 0)
                      .set("second", 0)
                      .set("millisecond", 0)
                      .toDate()
                      .getTime();
                    tsEnd = dayjs(tsEnd)
                      .set("hour", 23)
                      .set("minute", 59)
                      .set("second", 59)
                      .set("millisecond", 0)
                      .toDate()
                      .getTime();
                  }

                  return {
                    x: GitHubSegment[parseInt(segmentIdx)],
                    y: [tsStart, tsEnd],
                  };
                }),
              );
            }),
          );

        if (segment === GitHubSegment.전체) {
          Object.keys(GitHubSegment)
            .filter((k) => isNaN(parseInt(k)) && k !== "전체")
            .map((x) => {
              if (!data.find((d) => d.x === x))
                data.push({
                  x: x,
                  y: [null, null],
                });
            });
        }
        return {
          name: member.nickname,
          data: data,
        };
      },
    );

    setSeries(series);
    setOptions({
      chart: {
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "30%",
        },
      },
      xaxis: {
        type: "datetime",
        min: dayjs(range[0]).toDate().getTime(),
        max: dayjs(range[1]).toDate().getTime(),
      },
    });
  }, [timeSeries]);

  return (
    <Paper shadow="xs" px="lg" py={0}>
      {options && (
        <Chart options={options} series={series} type="rangeBar" height={300} />
      )}
    </Paper>
  );
}
