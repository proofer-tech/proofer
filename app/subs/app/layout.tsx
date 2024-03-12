import React from "react";
import { Viewport } from "next";
import "@mantine/charts/styles.css";
import WorkspaceAppShell from "@/app/subs/app/components/WorkspaceAppShell";
import { headers } from "next/headers";
import { getAppPathBlocks } from "@/src/path";
import { findMember, findWorkspace } from "@/app/subs/app/data/workspace";
import { findUserFromSession } from "@/app/subs/app/data/user";

export const viewport: Viewport = {
  themeColor: "#0052cc",
  initialScale: 1,
  minimumScale: 1,
  width: "device-width",
  userScalable: false,
};

export default async function AppLayout({ children }: { children: any }) {
  const user = await findUserFromSession();

  const headerList = headers();
  const [workspaceSlug] = getAppPathBlocks(headerList.get("x-pathname") || "");
  console.log("hello");

  let workspace, member;
  if (user) {
    workspace = await findWorkspace(workspaceSlug);

    if (workspace) {
      if (workspace.ownerId !== user.id) {
        workspace = undefined;
      } else {
        member = await findMember(workspace, user);
      }
    }
  }

  return (
    <WorkspaceAppShell user={user} workspace={workspace} member={member}>
      {children}
    </WorkspaceAppShell>
  );
}
