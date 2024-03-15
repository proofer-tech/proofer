"use client";
import { pathTree } from "@/app/subs/app/tree";
import React, { useContext } from "react";
import NotReadyYetLetter from "@/app/components/NotReadyYetLetter";
import { getAppPathBlocks } from "@/src/path";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import WorkspaceContext from "@/app/subs/app/contexts/WorkspaceContext";
import NeedToLogin from "@/app/subs/app/components/charts/NeedToLogin";
import { usePathname } from "next/navigation";

export default function SubPathLayout({ children }: { children: any }) {
  const wContext = useContext(WorkspaceContext);
  const pathname = usePathname();

  if (!wContext?.user) {
    return <NeedToLogin />;
  }

  const [_, pathBlock, subPathBlock] = getAppPathBlocks(pathname);
  const path = pathTree[pathBlock];
  const subPath = path?.subTree?.[subPathBlock];

  if (!subPath?.isImplemented)
    return (
      <NotReadyYetLetter
        title={"아직 준비중인 기능이에요."}
        c={"var(--mantine-color-gray-8)"}
      />
    );
  if (!wContext?.workspace)
    return (
      <NeedToSelectWorkspace serviceName={subPath.title}>
        {subPath.component}
      </NeedToSelectWorkspace>
    );

  return <>{children}</>;
}
