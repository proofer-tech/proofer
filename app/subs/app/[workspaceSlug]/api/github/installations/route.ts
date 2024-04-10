import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  GitHubInstallation,
  WorkspaceToGitHubInstallation,
} from "@/database/schemas/github/raw";
import { dz } from "@/database/engine";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { withApiWorkspaceUserRequired } from "@/src/decorators/api";
import { canManageWorkspace } from "@/src/services/role";
import { Forbidden } from "http-errors";

export const GET = withApiAuthRequired(
  withApiWorkspaceUserRequired(async (_: any, { workspace, member }: any) => {
    if (!canManageWorkspace(member.role)) {
      throw Forbidden("You don't have permission to access this page.");
    }

    const querySet = await dz
      .select({ installation: GitHubInstallation })
      .from(WorkspaceToGitHubInstallation)
      .innerJoin(
        GitHubInstallation,
        eq(
          WorkspaceToGitHubInstallation.installation_id,
          GitHubInstallation.installation_id,
        ),
      )
      .where(eq(WorkspaceToGitHubInstallation.workspace_id, workspace.id));
    return NextResponse.json(querySet.map((qs) => qs.installation));
  }),
);
