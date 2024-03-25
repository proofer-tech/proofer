import React from "react";
import { SegmentedControl, Stack } from "@mantine/core";
import { SearchGroup } from "@/app/subs/app/[workspaceSlug]/activity/SearchGroup";
import { SimpleBubbleChart } from "@/app/subs/app/[workspaceSlug]/activity/timeline/SimpleBubbleChart";
import { ActivityTable } from "@/app/subs/app/[workspaceSlug]/activity/ActivityTable";

export default function Page() {
  return (
    <Stack>
      <SearchGroup />
      <SimpleBubbleChart />
      <SegmentedControl
        fullWidth
        data={["전체", "Commit", "Pull Request", "Code Review"]}
      />
      <ActivityTable />
    </Stack>
  );
}
