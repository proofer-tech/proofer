import { InferSelectModel } from "drizzle-orm";
import { Integration, IntegrationTag } from "@/database/schemas/integration";
import React from "react";
import { Anchor, Button } from "@mantine/core";
import {
  GitHubInstallationDetailCardSection,
  GitHubInstallationListCardSection,
} from "@/app/subs/app/[workspaceSlug]/integrations/components/GitHub/client";
import { WorkspaceToGitHubInstallation } from "@/database/schemas/github/raw";
import { dz } from "@/database/engine";
import {
  findMember,
  findWorkspace,
  getFirstMember,
} from "@/src/data/workspace";
import { findUserFromSession } from "@/src/data/user";
import { redirect } from "next/navigation";
import { generateAppPath } from "@/src/path";
import { headers } from "next/headers";
import IntegrationPage from "@/app/subs/app/[workspaceSlug]/integrations/components/IntegrationPage";
import { WORKSPACE_DEMO_SLUG } from "@/src/constants";
import { canManageWorkspace } from "@/src/services/role";

async function generateInstallation(formData: FormData) {
  "use server";

  const user = await findUserFromSession();
  if (user === undefined) return;

  const workspaceSlug = formData.get("workspace-slug") as string;
  if (workspaceSlug === null) return;

  const workspace = await findWorkspace(workspaceSlug);
  if (workspace === undefined) return;

  let member;
  if (workspaceSlug === WORKSPACE_DEMO_SLUG)
    member = await getFirstMember(workspace.id);
  else member = await findMember(workspace.id, user.id);
  if (!(member && canManageWorkspace(member.role))) return;

  const installation = (
    await dz
      .insert(WorkspaceToGitHubInstallation)
      .values({ workspace_id: workspace.id })
      .returning()
  )[0];

  const headerList = headers();
  const setupUrl =
    headerList.get("X-Forwarded-Proto") +
    "://" +
    headerList.get("host") +
    generateAppPath("/integrations/github/setup", workspaceSlug);
  redirect(
    `https://github.com/apps/proofer-tech/installations/select_target?state=${installation.uuid}&redirect_url=${setupUrl}`,
  );
}

interface GitHubPageProps {
  workspaceSlug: string;
  integration: InferSelectModel<typeof Integration>;
  integrationTags: InferSelectModel<typeof IntegrationTag>[];
  pathBlocks: string[];
}
export default function GitHubPage({
  workspaceSlug,
  integration,
  integrationTags,
  pathBlocks,
}: GitHubPageProps) {
  const [installationId] = pathBlocks;

  return (
    <IntegrationPage
      integration={integration}
      integrationTags={integrationTags}
      integrateButton={
        installationId ? (
          <Anchor
            href={generateAppPath(
              `/integrations/${integration.slug}`,
              workspaceSlug,
            )}
            underline={"never"}
          >
            <Button w={"100%"} variant={"light"}>
              Back
            </Button>
          </Anchor>
        ) : (
          <form action={generateInstallation}>
            <input
              type={"hidden"}
              name={"workspace-slug"}
              value={workspaceSlug}
            />
            <Button type={"submit"} w={"100%"}>
              Connect
            </Button>
          </form>
        )
      }
    >
      {installationId ? (
        <GitHubInstallationDetailCardSection
          installationId={parseInt(installationId)}
        />
      ) : (
        <GitHubInstallationListCardSection />
      )}
    </IntegrationPage>
  );
}
