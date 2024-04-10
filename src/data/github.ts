import { dz } from "@/database/engine";
import { WorkspaceToGitHubInstallation } from "@/database/schemas/github/raw";
import { eq } from "drizzle-orm";

export async function getWorkspaceIdFromInstallationId(
  installation_id: number,
) {
  return (
    await dz
      .select({ workspace_id: WorkspaceToGitHubInstallation.workspace_id })
      .from(WorkspaceToGitHubInstallation)
      .where(eq(WorkspaceToGitHubInstallation.installation_id, installation_id))
  )[0]?.workspace_id;
}
