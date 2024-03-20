import { NextRequest, NextResponse } from "next/server";
import { GitHubApp } from "@/src/integrations/github";

export const GET = async (_: NextRequest, { params }: any) => {
  const octokit = await GitHubApp.getInstallationOctokit(
    parseInt(params["installation-id"]),
  );
  const repos = await octokit.rest.apps.listReposAccessibleToInstallation();

  return NextResponse.json({ repos });
};
