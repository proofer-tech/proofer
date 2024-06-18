"use client";
import { IconSearch } from "@tabler/icons-react";
import { Input } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogSearchInputProps {
  query: string;
  queryKey: string;
}
export default function BlogSearchInput({
  query,
  queryKey,
}: BlogSearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [value, setValue] = useState(query);
  const [debouncedValue, setDebouncedValue] = useDebouncedState(value, 1000);

  useEffect(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    params.set(queryKey, debouncedValue);
    router.push("?" + params.toString());
  }, [debouncedValue]);

  return (
    <Input
      placeholder="아티클 제목으로 검색"
      leftSection={<IconSearch size={"1em"} />}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
