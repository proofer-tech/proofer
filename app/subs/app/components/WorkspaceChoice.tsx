"use client";
import { Select, SelectProps } from "@mantine/core";
import React from "react";
import { InferSelectModel } from "drizzle-orm";
import { Workspace } from "@/database/schemas/workspace";
import { generateAppPath } from "@/src/path";
import { useRouter } from "next/navigation";

interface WorkspaceChoiceProps extends SelectProps {
  workspaces: InferSelectModel<typeof Workspace>[];
}
export default function WorkspaceChoice({
  workspaces,
  ...props
}: WorkspaceChoiceProps) {
  const router = useRouter();
  return (
    <Select
      placeholder="워크스페이스를 선택해주세요"
      data={workspaces.map((workspace) => ({
        label: workspace.title,
        value: workspace.slug,
      }))}
      onChange={(value) => {
        const path = value && generateAppPath(`/${value}`);
        if (path) {
          router.push(path);
          router.refresh();
        }
      }}
      {...props}
    />
  );
}
