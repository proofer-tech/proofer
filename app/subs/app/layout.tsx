import React from "react";
import "@mantine/charts/styles.css";
import WorkspaceAppShell, {
  WorkspaceAppShellDisclosureProvider,
} from "@/app/subs/app/components/WorkspaceAppShell";
import { headers } from "next/headers";
import { getPathBlocks } from "@/src/path";
import {
  findMember,
  findWorkspace,
  getFirstMember,
} from "@/src/data/workspace";
import { findUserFromSession } from "@/src/data/user";
import { SUB_DOMAIN, WORKSPACE_DEMO_SLUG } from "@/src/constants";
import { generateMetadataFromTitle } from "@/src/manifest";

const title = "Proofer Insight";
const shortTitle = "";
const description = "Are your developers doing their jobs well?";
export const metadata = generateMetadataFromTitle(
  title,
  shortTitle,
  description,
);
export default async function AppLayout({ children }: { children: any }) {
  const user = await findUserFromSession();

  const headerList = headers();
  const [workspaceSlug] = getPathBlocks(
    headerList.get("x-pathname") || "",
    SUB_DOMAIN.app,
  );

  let workspace, member;
  if (user) {
    workspace = await findWorkspace(workspaceSlug);
    if (workspace) {
      if (workspaceSlug === WORKSPACE_DEMO_SLUG)
        member = await getFirstMember(workspace.id);
      else member = await findMember(workspace.id, user.id);
    }
  }

  return (
    <WorkspaceAppShellDisclosureProvider>
      <WorkspaceAppShell user={user} workspace={workspace} member={member}>
        {children}
      </WorkspaceAppShell>
    </WorkspaceAppShellDisclosureProvider>
  );
}
