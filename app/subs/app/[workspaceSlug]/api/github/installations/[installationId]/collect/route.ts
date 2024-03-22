import { NextRequest, NextResponse } from "next/server";
import { extractAllCommits } from "@/src/github";
import { GitHubApp } from "@/src/integrations/github";
import { getAllRepositories } from "@/src/data/github";
import moment from "moment";

export const GET = async (_: NextRequest, { params }: any) => {
  const responseList = [];
  const { installationId } = params;
  const octokit = await GitHubApp.getInstallationOctokit(installationId);
  for await (const d of extractAllCommits(octokit, {
    since: moment("2024-02-14").toDate(),
    repositories: await getAllRepositories(installationId),
  })) {
    responseList.push(d);
  }
  return NextResponse.json(responseList);
};
