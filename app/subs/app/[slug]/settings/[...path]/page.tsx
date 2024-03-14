"use client";

import AppContext from "@/app/subs/app/contexts/AppContext";
import { useContext, useEffect } from "react";
import { SettingsModalContext } from "@/app/subs/app/settings/modal";
import { Box, LoadingOverlay } from "@mantine/core";
import { digTree } from "@/app/subs/app/components/types";
import { settingsPathTree } from "@/app/subs/app/settings/tree";
import { notFound } from "next/navigation";

export default function Page({ params }: any) {
  const appContext = useContext(AppContext);
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
        visible={!appContext.isMounted}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
}
