"use client";
import { pathTree } from "@/app/subs/app/tree";
import React, { useContext } from "react";
import NotReadyYetLetter from "@/app/components/NotReadyYetLetter";
import { getAppPathBlocks } from "@/src/path";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import NeedToLogin from "@/app/subs/app/components/charts/NeedToLogin";
import { usePathname } from "next/navigation";
import { Box } from "@mantine/core";

export default function SubPathLayout({ children }: { children: any }) {
  const { user, workspace } = useContext(ProoferInsightContext);
  const pathname = usePathname();

  if (!user) {
    return <NeedToLogin />;
  }

  const [_, pathBlock, subPathBlock] = getAppPathBlocks(pathname);
  const path = pathTree[pathBlock];
  const subPath = path?.subTree?.[subPathBlock];

  if (path && !subPath?.isImplemented)
    return (
      <NotReadyYetLetter
        title={"아직 준비중인 기능이에요."}
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
