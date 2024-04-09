"use client";
import dayjs, { endOfWeek, startOfWeek } from "@/src/utils/dayjs";
import { SearchBarContainer } from "@/src/modules/SearchBarControl/SearchBarContainer";
import React, { useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchByMemberContext, {
  searchByMemberContextTools,
} from "@/src/modules/SearchBarControl/context";
import { useDebouncedState } from "@mantine/hooks";
import { isEqual } from "lodash";

export interface SearchBarControlProps {
  range?: [string, string];
  target?: string;
  relations?: string[];
}
type SearchByMemberTupleType = [number | undefined, number[]];
export default function SearchBarControl(props: SearchBarControlProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const targetId = props.target ? parseInt(props.target) : undefined;
  const relationIds = props.relations ? props.relations.map(parseInt) : [];

  const [href, setHref] = useState("");
  useEffect(() => {
    setHref(window.location.href);
  }, []);

  const { target, relations, isLoading } = useContext(SearchByMemberContext);
  const [searchByMemberTuple, setSearchByMemberTuple] =
    useState<SearchByMemberTupleType>([
      targetId || searchByMemberContextTools.targetId,
      relationIds || searchByMemberContextTools.relationIds || [],
    ]);
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
  const [searchByRange, setSearchByRange] = useState<[string, string]>(
    props.range
      ? props.range
      : [
          startOfWeek(
            dayjs(new Date()).subtract(4, "weeks").toDate(),
          ).toISOString(),
          endOfWeek(new Date()).toISOString(),
        ],
  );
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.delete("range");
    for (const r of searchByRange) {
      newSearchParams.append("range", dayjs(r).format("YYYY-MM-DD"));
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
    <SearchBarContainer
      initialRange={
        searchByRange && [
          dayjs(searchByRange[0]).toDate(),
          dayjs(searchByRange[1]).toDate(),
        ]
      }
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
