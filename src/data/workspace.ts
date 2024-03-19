import { db } from "@/database/engine";
import { Workspace, WorkspaceMember } from "@/database/schemas/workspace";
import { and, eq, InferSelectModel, isNotNull } from "drizzle-orm";
import { WorkspaceToGitHubInstallation } from "@/database/schemas/github";

export async function findWorkspace(
  slug: string,
): Promise<InferSelectModel<typeof Workspace> | undefined> {
  const records = await db
    .select()
    .from(Workspace)
    .where(eq(Workspace.slug, slug));
  return records[0];
}

export async function findMember(
  workspaceId: number,
  userId: number,
): Promise<InferSelectModel<typeof WorkspaceMember> | undefined> {
  const records = await db
    .select()
    .from(WorkspaceMember)
    .where(
      and(
        eq(WorkspaceMember.workspaceId, workspaceId),
        eq(WorkspaceMember.userId, userId),
      ),
    );
  return records[0];
}

export const getWorkspaceToGitHubInstallationList = async (
  workspaceId: number,
) => {
  return db
    .select()
    .from(WorkspaceToGitHubInstallation)
    .where(
      and(
        eq(WorkspaceToGitHubInstallation.workspace_id, workspaceId),
        isNotNull(WorkspaceToGitHubInstallation.installation_id),
      ),
    );
};
