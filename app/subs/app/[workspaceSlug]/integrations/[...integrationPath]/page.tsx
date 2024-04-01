import React from "react";
import { Center } from "@mantine/core";
import { fswitch } from "@/utils";
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

export default async function Page({ params, ...props }: any) {
  const { workspaceSlug, integrationPath } = params;
  const [appName, ...pathBlocks] = integrationPath;
  if (pathBlocks[0] === "setup")
    return <GitHubSetupPage params={params} {...props} />;

  const querySet = await dz
    .select()
    .from(Integration)
    .where(eq(Integration.slug, appName))
    .innerJoin(
      IntegrationToTag,
      eq(IntegrationToTag.integrationId, Integration.id),
    )
    .innerJoin(IntegrationTag, eq(IntegrationToTag.tagId, IntegrationTag.id));
  const integration = querySet[0].integration;
  const integrationTags = querySet.map((qs) => qs.integration_tag);

  return fswitch(appName)
    .case("github", () => (
      <GitHubPage
        workspaceSlug={workspaceSlug}
        integration={integration}
        integrationTags={integrationTags}
        pathBlocks={pathBlocks}
      />
    ))
    .default(() => (
      <IntegrationPage
        integration={integration}
        integrationTags={integrationTags}
      >
        <Center h={"100%"} py={"3em"}>
          <NotReadyYetLetter title={"아직 구현되지 않은 앱입니다."} />
        </Center>
      </IntegrationPage>
    ));
}
