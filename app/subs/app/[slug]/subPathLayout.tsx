import { pathTree } from "@/app/subs/app/tree";
import React from "react";
import { getSession } from "@auth0/nextjs-auth0";
import NotReadyYetLetter from "@/app/components/NotReadyYetLetter";
import { getAppPathBlocks } from "@/src/path";
import { headers } from "next/headers";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";

export default async function SubPathLayout({ children }: { children: any }) {
  const session = await getSession();
  if (session?.user) {
    // 로그인 상태에서만 보이도록
    return <>{children}</>;
  }

  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const [_, pathBlock, subPathBlock] = getAppPathBlocks(pathname);
  const path = pathTree[pathBlock];
  const subPath = path?.subTree?.[subPathBlock];

  if (!subPath?.isImplemented)
    return <NotReadyYetLetter title={true} c={"var(--mantine-color-gray-8)"} />;

  return (
    <NeedToSelectWorkspace title={subPath.title}>
      {subPath.component}
    </NeedToSelectWorkspace>
  );
}
