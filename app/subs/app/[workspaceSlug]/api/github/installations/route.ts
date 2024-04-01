import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import {
  GitHubInstallation,
  WorkspaceToGitHubInstallation,
} from "@/database/schemas/github";
import { db } from "@/database/engine";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { withApiWorkspaceUserRequired } from "@/src/api-decorators";

export const GET = withApiAuthRequired(
  withApiWorkspaceUserRequired(async (_: any, { workspace }: any) => {
    const querySet = await db
      .select()
      .from(WorkspaceToGitHubInstallation)
      .innerJoin(
        GitHubInstallation,
        eq(
          WorkspaceToGitHubInstallation.installation_id,
          GitHubInstallation.installation_id,
        ),
      )
      .where(eq(WorkspaceToGitHubInstallation.workspace_id, workspace.id));
    return NextResponse.json(querySet.map((qs) => qs.github_installation));
  }),
);
