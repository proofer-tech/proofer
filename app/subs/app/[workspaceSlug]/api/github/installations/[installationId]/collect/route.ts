import { NextRequest, NextResponse } from "next/server";
import { GitHubApp } from "@/src/integrations/github";
import { getAllRepositories } from "@/src/data/github";
import { extractAllPullRequests } from "@/src/github/pulls";

export const GET = async (_: NextRequest, { params }: any) => {
  const { installationId } = params;
  const octokit = await GitHubApp.getInstallationOctokit(installationId);

  const responseList = [];
  for await (const d of extractAllPullRequests(octokit, {
    repositories: await getAllRepositories(installationId),
  })) {
    responseList.push(d);
  }
  return NextResponse.json(responseList);
};
