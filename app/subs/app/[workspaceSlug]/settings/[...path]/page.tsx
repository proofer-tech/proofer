"use client";

import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import { useContext, useEffect } from "react";
import { SettingsModalContext } from "@/app/subs/app/settings/modal";
import { Box, LoadingOverlay } from "@mantine/core";
import { digTree } from "@/app/subs/app/components/types";
import { settingsPathTree } from "@/app/subs/app/settings/tree";
import { notFound } from "next/navigation";
import { WorkspacePageProps } from "@/app/subs/app/[workspaceSlug]/types";

interface SettingPageProps extends WorkspacePageProps {
  params: WorkspacePageProps["params"] & {
    path: string[];
  };
}
export default function Page({ params }: SettingPageProps) {
  const { isMounted } = useContext(ProoferInsightContext);
  const settingsModalContext = useContext(SettingsModalContext);

  useEffect(() => {
    const path = digTree(settingsPathTree, params.path);
    if (path) {
      settingsModalContext.setPath?.(path);
      settingsModalContext.open();
    } else {
      return notFound();
    }
  }, []);
  return (
    <Box>
      <LoadingOverlay
        visible={!isMounted}
        zIndex={100}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
}
