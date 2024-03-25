"use client";
import { Avatar, Group, TextInput } from "@mantine/core";
import {
  IconArrowMerge,
  IconCalendarMonth,
  IconSearch,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { DatePickerInput } from "@mantine/dates";

export function SearchGroup() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <Group justify={"space-between"}>
      <DatePickerInput
        type="range"
        placeholder="날짜 선택"
        value={value}
        onChange={setValue}
        miw={"10em"}
        leftSection={<IconCalendarMonth size={"1em"} />}
      />
      <Group>
        <TextInput
          placeholder={"대상인원을 검색하여 선택"}
          rightSection={<IconSearch />}
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
