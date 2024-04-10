"use client";
import { pathTree } from "@/app/subs/app/tree";
import React, { useContext } from "react";
import NotReadyYetLetter from "@/app/components/NotReadyYetLetter";
import { getPathBlocks } from "@/src/path";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import NeedToLogin from "@/app/subs/app/components/charts/NeedToLogin";
import { usePathname } from "next/navigation";
import { Box } from "@mantine/core";
import { SUB_DOMAIN } from "@/src/constants";

export default function SubPathLayout({ children }: { children: any }) {
  const { user, workspace } = useContext(ProoferInsightContext);
  const pathname = usePathname();

  if (!user) {
    return <NeedToLogin />;
  }

  const [_, pathBlock, subPathBlock] = getPathBlocks(pathname, SUB_DOMAIN.app);
  const path = pathTree[pathBlock];
  const subPath = path?.subTree?.[subPathBlock];

  if (path && !subPath?.isImplemented)
    return (
      <NotReadyYetLetter
        title={"This feature is not ready yet."}
        c={"var(--mantine-color-gray-8)"}
      />
    );
  if (!workspace)
    return (
      <NeedToSelectWorkspace serviceName={subPath?.title}>
        {subPath?.component && <subPath.component />}
      </NeedToSelectWorkspace>
    );

  return <Box py={"1em"}>{children}</Box>;
}
