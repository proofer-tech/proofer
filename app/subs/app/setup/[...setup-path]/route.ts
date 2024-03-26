import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { notFound, redirect } from "next/navigation";
import { generateAppPath } from "@/src/path";
import { WorkspaceToGitHubInstallation } from "@/database/schemas/github";
import { db } from "@/database/engine";
import { eq } from "drizzle-orm";
import { Workspace } from "@/database/schemas/workspace";
import { NextRequest } from "next/server";

export const GET = withApiAuthRequired(async function GET(req: NextRequest) {
  const installationUUID = req.nextUrl.searchParams.get("state");
  if (!installationUUID) return notFound();

  const installationBridge = (
    await db
      .select()
      .from(WorkspaceToGitHubInstallation)
      .where(eq(WorkspaceToGitHubInstallation.uuid, installationUUID))
      .innerJoin(
        Workspace,
        eq(WorkspaceToGitHubInstallation.workspace_id, Workspace.id),
      )
  )[0];
  if (!installationBridge) return notFound();

  const appPath = generateAppPath(
    `/${installationBridge.workspace.slug}/integrations/github/setup`,
  );
  const setupURL = new URL(
    req.nextUrl.protocol + "//" + req.nextUrl.host + appPath,
  );
  Array.from(req.nextUrl.searchParams.entries()).forEach(
    (kv: [string, string]) => setupURL.searchParams.set(...kv),
  );

  return redirect(setupURL.toString());
});
