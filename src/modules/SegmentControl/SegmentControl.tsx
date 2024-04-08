"use client";
import { SegmentedControl } from "@mantine/core";
import React from "react";
import { useRouter } from "next/navigation";
import { GitHubSegment } from "@/src/modules/SegmentControl/types";

interface SegmentControlProps {
  segment?: number;
}
export default function SegmentControl({ segment }: SegmentControlProps) {
  const router = useRouter();
  const labels = Object.keys(GitHubSegment).filter((key) => isNaN(Number(key)));

  return (
    <SegmentedControl
      fullWidth
      data={labels}
      value={labels[segment ?? 0]}
      onChange={(value) => {
        const segmentIndex = parseInt(GitHubSegment[parseInt(value)]);
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
