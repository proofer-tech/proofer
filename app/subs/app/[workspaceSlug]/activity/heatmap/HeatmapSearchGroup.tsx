"use client";
import dayjs from "@/src/utils/dayjs";
import { SearchGroup } from "@/app/subs/app/[workspaceSlug]/activity/SearchGroup";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InferSelectModel } from "drizzle-orm";
import { GitHubUser } from "@/database/schemas/github/raw";
import { Workspace } from "@/database/schemas/workspace";

export interface HeatmapSearchGroupProps {
  range?: string[];
  q?: string;
}
export default function HeatmapSearchGroup({
  range,
  q,
  workspace,
}: HeatmapSearchGroupProps & {
  workspace: InferSelectModel<typeof Workspace>;
}) {
  const router = useRouter();
  const [href, setHref] = useState("");

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  return (
    <SearchGroup
      workspace={workspace}
      initialRange={
        range && [dayjs(range[0]).toDate(), dayjs(range[1]).toDate()]
      }
      initialQuery={q}
      weekCalendar={true}
      onRangeChange={([start, end]) => {
        if (!href) return;

        const newURL = new URL(href);
        newURL.searchParams.delete("range");
        [start, end].forEach((d) =>
          newURL.searchParams.append("range", dayjs(d).format("YYYY-MM-DD")),
        );
        router.push(newURL.toString());
        router.refresh();
      }}
    />
  );
}
