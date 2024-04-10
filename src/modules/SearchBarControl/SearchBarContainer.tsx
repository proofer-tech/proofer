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
import SearchByMemberContext from "@/src/modules/SearchBarControl/context";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";

interface SearchGroupProps {
  initialRange?: [Date | null, Date | null];
  onRangeChange?: (value: [Date, Date]) => void;
  onSubmit?: () => void;

  weekCalendar?: boolean;
}
export function SearchBarContainer({
  initialRange,
  onRangeChange,
  weekCalendar,
}: SearchGroupProps) {
  const { workspace } = useContext(ProoferInsightContext);
  const membersSWR = useMembersSWR(workspace?.instance);
  const searchByMemberContext = useContext(SearchByMemberContext);
  const [range, setRange] = useState<[Date | null, Date | null]>(
    initialRange || [null, null],
  );

  useEffect(() => {
    if (range[0] === null || range[1] === null) return;
    onRangeChange && onRangeChange(range as [Date, Date]);
  }, [range]);

  return (
    <Group justify={"space-between"} align={"start"} wrap={"nowrap"}>
      <Tooltip
        label={"You can search by week"}
        disabled={!weekCalendar}
        position={"bottom-start"}
      >
        <DatePickerInput
          type={"range"}
          placeholder="Select the date range"
          value={range}
          onChange={([start, end]) => {
            if (dayjs(end).diff(start, "months") > 3) {
              notifications.show({
                color: "red",
                title: "Setting the date search range failed.",
                message: "You can only search records within 3 months.",
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
              placeholder={"Select the target"}
              rightSection={<IconSearch />}
              readOnly
            />
          </Popover.Target>
          <Popover.Dropdown>
            <Stack>
              <FocusTrap.InitialFocus />
              <Select
                label="Basis for the data"
                placeholder="Choose 1 person"
                data={
                  membersSWR.data?.map((member) => ({
                    label: member.nickname,
                    value: member.id.toString(),
                  })) || []
                }
                searchable
                comboboxProps={{ withinPortal: false }}
                value={searchByMemberContext.target?.id?.toString()}
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
                label="Relations for the data"
                placeholder="Choose many people"
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
