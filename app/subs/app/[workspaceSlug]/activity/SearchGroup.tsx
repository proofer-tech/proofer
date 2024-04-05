"use client";
import { Avatar, Group, TextInput, Tooltip } from "@mantine/core";
import {
  IconArrowMerge,
  IconCalendarMonth,
  IconSearch,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Calendar, DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { endOfWeek, startOfWeek } from "@/src/utils/dayjs";
import { notifications } from "@mantine/notifications";

interface SearchGroupProps {
  initialRange?: [Date | null, Date | null];
  onRangeChange?: (value: [Date, Date]) => void;
  initialQuery?: string;
  onQueryChange?: (value: string) => void;
  onSubmit?: () => void;

  weekCalendar?: boolean;
}
export function SearchGroup({
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

  const [hovered, setHovered] = useState<Date | null>(null);

  function isInWeekRange(date: Date, value: Date | null) {
    return value
      ? dayjs(date).isBefore(endOfWeek(value)) &&
          dayjs(date).isAfter(dayjs(startOfWeek(value)).subtract(1, "day"))
      : false;
  }

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
          // @ts-ignore
          getDayProps={
            weekCalendar
              ? (date) => {
                  return {
                    onMouseEnter: () => setHovered(date),
                    onMouseLeave: () => setHovered(null),
                  };
                }
              : () => {}
          }
        />
      </Tooltip>
      <Group>
        <TextInput
          placeholder={"대상인원을 검색하여 선택"}
          rightSection={<IconSearch />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <Group gap={0}>
          <Avatar
            src={"/assets/images/sample/avatar/1.jpg"}
            style={{
              border: "3px solid var(--color-primary)",
            }}
          />
          <Group px={"0.5em"} align={"center"}>
            <IconArrowMerge
              style={{ transform: "rotate(-90deg)" }}
              size={"1.2em"}
            />
          </Group>
          <Avatar.Group>
            <Avatar src="/assets/images/sample/avatar/2.jpg" />
            <Avatar src="/assets/images/sample/avatar/3.jpg" />
            <Avatar src="/assets/images/sample/avatar/4.jpg" />
            <Avatar>+2</Avatar>
          </Avatar.Group>
        </Group>
      </Group>
    </Group>
  );
}
