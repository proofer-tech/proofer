"use client";
import {
  Divider,
  FocusTrap,
  Group,
  MultiSelect,
  Popover,
  Select,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconCalendarMonth, IconSearch } from "@tabler/icons-react";
import React, { useContext, useEffect, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import { endOfWeek, startOfWeek } from "@/src/utils/dayjs";
import { notifications } from "@mantine/notifications";
import SearchByMemberGroup, {
  useMembersSWR,
} from "@/app/subs/app/components/SearchByMemberGroup";
import { Workspace } from "@/database/schemas/workspace";
import { InferSelectModel } from "drizzle-orm";
import SearchByMemberContext from "@/src/modules/SearchByMember/context";

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
  weekCalendar,
}: SearchGroupProps) {
  const membersSWR = useMembersSWR(workspace);
  const searchByMemberContext = useContext(SearchByMemberContext);
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
    <Group justify={"space-between"} align={"start"} wrap={"nowrap"}>
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
          style={{ whiteSpace: "nowrap" }}
        />
      </Tooltip>
      <Group>
        <SearchByMemberGroup horizontal={true} />
        <Popover width={300} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <TextInput
              placeholder={"대상인원을 검색하여 선택"}
              rightSection={<IconSearch />}
              readOnly
            />
          </Popover.Target>
          <Popover.Dropdown>
            <Stack>
              <FocusTrap.InitialFocus />
              <Select
                label="데이터의 기준이 될 인원을 선택해주세요"
                placeholder="1명을 선택"
                data={
                  membersSWR.data?.map((member) => ({
                    label: member.nickname,
                    value: member.id.toString(),
                  })) || []
                }
                searchable
                comboboxProps={{ withinPortal: false }}
                value={searchByMemberContext.target?.id.toString()}
                onChange={(value) => {
                  if (value === null || membersSWR.data === undefined) return;
                  const target = membersSWR.data.find(
                    (member) => member.id === parseInt(value),
                  );
                  if (!target) return;
                  searchByMemberContext.setTarget?.(target);
                }}
              />
              <Divider />

              <MultiSelect
                label="데이터에 참고할 인원을 선택해주세요"
                placeholder="여러명 선택"
                data={
                  membersSWR.data
                    ?.filter(
                      (member) =>
                        member.id !== searchByMemberContext.target?.id,
                    )
                    .map((member) => ({
                      label: member.nickname,
                      value: member.id.toString(),
                    })) || []
                }
                searchable
                comboboxProps={{ withinPortal: false }}
                value={searchByMemberContext.relations?.map((member) =>
                  member.id.toString(),
                )}
                onChange={(value) => {
                  if (value === null || membersSWR.data === undefined) return;
                  const relations = membersSWR.data.filter((member) =>
                    value.includes(member.id.toString()),
                  );
                  if (!relations) return;
                  searchByMemberContext.setRelations?.(relations);
                }}
              />
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Group>
    </Group>
  );
}
