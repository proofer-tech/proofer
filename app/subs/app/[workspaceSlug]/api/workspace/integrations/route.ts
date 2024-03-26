import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getIntegrationDtoList } from "@/src/data/integration";
import { InferSelectModel } from "drizzle-orm";
import { getWorkspaceToGitHubInstallationList } from "@/src/data/workspace";
import { withApiWorkspaceUserRequired } from "@/app/subs/app/[workspaceSlug]/api/base";
import { NextResponse } from "next/server";
import { Integration } from "@/database/schemas/integration";

export const GET = withApiAuthRequired(
  withApiWorkspaceUserRequired(async (_: any, { workspace }: any) => {
    const integrationList = await getIntegrationDtoList();
    const integrationOptInGroup = await integrationList.reduce(
      async (group: any, integration: InferSelectModel<typeof Integration>) => {
        group = await group;
        switch (integration.slug) {
          case "github":
            const bridgeList = await getWorkspaceToGitHubInstallationList(
              workspace.id,
            );
            if (bridgeList.length > 0) {
              group.optIn.push(integration);
              break;
            }
          default:
            group.others.push(integration);
            break;
        }
        return group;
      },
      { optIn: [], others: [] },
    );
    return NextResponse.json(integrationOptInGroup);
  }),
);
