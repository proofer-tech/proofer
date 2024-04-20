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
import {
  SUB_DOMAIN,
  SUB_DOMAIN_NAMES,
  WORKSPACE_DEMO_SLUG,
} from "@/src/constants";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle({
  applicationName: SUB_DOMAIN_NAMES[SUB_DOMAIN.app],
  description: "정확한 개발자 성과측정을 위한 엔지니어링 매니징 파트너 프루퍼",
});
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
