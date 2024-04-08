"use client";
import dayjs from "@/src/utils/dayjs";
import { SearchGroup } from "@/src/modules/SearchByMember/SearchGroup";
import React, { useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InferSelectModel } from "drizzle-orm";
import { Workspace } from "@/database/schemas/workspace";
import SearchByMemberContext, {
  searchByMemberContextTools,
} from "@/src/modules/SearchByMember/context";
import { useDebouncedState } from "@mantine/hooks";
import { isEqual } from "lodash";

export interface SearchControlProps {
  range: [string, string];
  q?: string;
  targetId?: number;
  relationIds?: number[];
}
type SearchByMemberTupleType = [number | undefined, number[]];
export default function SearchControl({
  range,
  q,
  workspace,
  targetId,
  relationIds,
}: SearchControlProps & {
  workspace: InferSelectModel<typeof Workspace>;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [href, setHref] = useState("");
  useEffect(() => {
    setHref(window.location.href);
  }, []);

  const { target, relations, isLoading } = useContext(SearchByMemberContext);
  const [searchByMemberTuple, setSearchByMemberTuple] =
    useDebouncedState<SearchByMemberTupleType>(
      [
        targetId || searchByMemberContextTools.targetId,
        relationIds || searchByMemberContextTools.relationIds || [],
      ],
      500,
    );
  useEffect(() => {
    if (isLoading || !target?.id) return;

    const changedValue = [
      target?.id || searchByMemberContextTools.targetId,
      relations?.map((r) => r.id) ||
        searchByMemberContextTools.relationIds ||
        [],
    ] as SearchByMemberTupleType;
    if (isEqual(searchByMemberTuple, changedValue)) return;
    setSearchByMemberTuple(changedValue);
  }, [target, relations]);

  const [searchByRange, setSearchByRange] = useState<[string, string]>(range);
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (searchByRange && !isEqual(searchByRange, range)) {
      newSearchParams.delete("range");
      for (const r of searchByRange) {
        newSearchParams.append("range", r);
      }
    }

    if (
      searchByMemberTuple[0] &&
      searchByMemberTuple[0].toString() !== newSearchParams.get("target")
    ) {
      newSearchParams.set("target", searchByMemberTuple[0].toString());
    }

    if (
      searchByMemberTuple[1] &&
      !isEqual(
        searchByMemberTuple[1].map((r) => r.toString()),
        newSearchParams.getAll("relations"),
      )
    ) {
      newSearchParams.delete("relations");
      for (const r of searchByMemberTuple[1]) {
        newSearchParams.append("relations", r.toString());
      }
    }

    const newURL = new URL(pathname, window.location.href);
    newURL.search = newSearchParams.toString();
    router.replace(newURL.toString());

    if (!isEqual(searchParams.entries(), newSearchParams.entries()))
      router.refresh();
  }, [searchByRange, searchByMemberTuple]);

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

        setSearchByRange([
          dayjs(start).format("YYYY-MM-DD"),
          dayjs(end).format("YYYY-MM-DD"),
        ]);
      }}
    />
  );
}
