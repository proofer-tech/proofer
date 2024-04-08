"use client";
import { Avatar, Group, TextInput, Tooltip } from "@mantine/core";
import {
  IconArrowMerge,
  IconCalendarMonth,
  IconSearch,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { endOfWeek, startOfWeek } from "@/src/utils/dayjs";
import { notifications } from "@mantine/notifications";
import SearchByMemberGroup from "@/app/subs/app/components/SearchByMemberGroup";
import { Workspace } from "@/database/schemas/workspace";
import { InferSelectModel } from "drizzle-orm";

interface SearchGroupProps {
  workspace?: InferSelectModel<typeof Workspace>;
  initialRange?: [Date | null, Date | null];
  onRangeChange?: (value: [Date, Date]) => void;
  initialQuery?: string;
  onQueryChange?: (value: string) => void;
  onSubmit?: () => void;

  weekCalendar?: boolean;
}
export function SearchGroup({
  workspace,
  initialRange,
  onRangeChange,
  initialQuery,
  onQueryChange,
  onSubmit,
  weekCalendar,
}: SearchGroupProps) {
  const [range, setRange] = useState<[Date | null, Date | null]>(
    initialRange || [null, null],
  );
  const [query, setQuery] = useState<string>(initialQuery || "");

  useEffect(() => {
    if (range[0] === null || range[1] === null) return;
    onRangeChange && onRangeChange(range as [Date, Date]);
  }, [range]);

  useEffect(() => {
    if (range[0] === null || range[1] === null) return;
    onQueryChange && onQueryChange(query);
  }, [query]);

  return (
    <Group justify={"space-between"}>
      <Tooltip
        label={"주 단위로 검색할 수 있습니다."}
        disabled={!weekCalendar}
        position={"bottom-start"}
      >
        <DatePickerInput
          type={"range"}
          placeholder="날짜 선택"
          value={range}
          onChange={([start, end]) => {
            if (dayjs(end).diff(start, "months") > 3) {
              notifications.show({
                color: "red",
                title: "날짜 검색범위 설정에 실패했습니다.",
                message: "3달 이내 범위의 기록까지만 검색할 수 있습니다.",
              });
              return;
            }
            setRange([start && startOfWeek(start), end && endOfWeek(end)]);
          }}
          miw={"10em"}
          leftSection={<IconCalendarMonth size={"1em"} />}
          withCellSpacing={false}
        />
      </Tooltip>
      <Group>
        <TextInput
          placeholder={"대상인원을 검색하여 선택"}
          rightSection={<IconSearch />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <SearchByMemberGroup workspace={workspace} horizontal={true} />
      </Group>
    </Group>
  );
}
