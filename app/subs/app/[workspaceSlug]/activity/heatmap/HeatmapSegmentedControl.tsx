"use client";
import { SegmentedControl } from "@mantine/core";
import React from "react";
import { useRouter } from "next/navigation";
import { HeatmapSegment } from "@/src/types/heatmap";

interface HeatmapSegmentedControlProps {
  segment?: number;
}
export default function HeatmapSegmentedControl({
  segment,
}: HeatmapSegmentedControlProps) {
  const router = useRouter();
  const labels = Object.keys(HeatmapSegment).filter((key) =>
    isNaN(Number(key)),
  );

  return (
    <SegmentedControl
      fullWidth
      data={labels}
      value={labels[segment ?? 0]}
      onChange={(value) => {
        const segmentIndex = parseInt(HeatmapSegment[parseInt(value)]);
        const newURL = new URL(window.location.href);
        newURL.searchParams.delete("segment");

        if (segmentIndex !== 0) {
          newURL.searchParams.set("segment", labels.indexOf(value).toString());
        }
        router.replace(newURL.toString());
        router.refresh();
      }}
    />
  );
}
