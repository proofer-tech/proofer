import React from "react";
import { Center } from "@mantine/core";
import { dz } from "@/database/engine";
import {
  Integration,
  IntegrationTag,
  IntegrationToTag,
} from "@/database/schemas/integration";
import { eq } from "drizzle-orm";
import GitHubPage from "@/app/subs/app/[workspaceSlug]/integrations/components/GitHub/GitHubPage";
import GitHubSetupPage from "@/app/subs/app/[workspaceSlug]/integrations/components/GitHub/GitHubSetupPage";
import IntegrationPage from "@/app/subs/app/[workspaceSlug]/integrations/components/IntegrationPage";
import NotReadyYetLetter from "@/app/components/NotReadyYetLetter";
import { WorkspacePageProps } from "@/app/subs/app/[workspaceSlug]/types";
import { cond, constant, matches, stubTrue } from "lodash";

interface IntegrationPageProps extends WorkspacePageProps {
  params: WorkspacePageProps["params"] & {
    integrationPath: string[];
  };
}
export default async function Page({
  params,
  searchParams,
}: IntegrationPageProps) {
  const { workspaceSlug, integrationPath } = params;
  const [appName, ...pathBlocks] = integrationPath;
  if (pathBlocks[0] === "setup")
    return <GitHubSetupPage params={params} searchParams={searchParams} />;

  const querySet = await dz
    .select()
    .from(Integration)
    .where(eq(Integration.slug, appName))
    .innerJoin(
      IntegrationToTag,
      eq(IntegrationToTag.integration_id, Integration.id),
    )
    .innerJoin(IntegrationTag, eq(IntegrationToTag.tag_id, IntegrationTag.id));
  const integration = querySet[0].integration;
  const integrationTags = querySet.map((qs) => qs.integration_tag);

  return cond([
    [
      matches("github"),
      constant(
        <GitHubPage
          workspaceSlug={workspaceSlug}
          integration={integration}
          integrationTags={integrationTags}
          pathBlocks={pathBlocks}
        />,
      ),
    ],
    [
      stubTrue,
      constant(
        <IntegrationPage
          integration={integration}
          integrationTags={integrationTags}
        >
          <Center h={"100%"} py={"3em"}>
            <NotReadyYetLetter title={"This App is not ready yet."} />
          </Center>
        </IntegrationPage>,
      ),
    ],
  ])(appName);
}
