import { getSession } from "@auth0/nextjs-auth0";
import { Anchor, Button, Center, Image, Stack, Title } from "@mantine/core";
import React from "react";
import WorkspaceChoice from "@/app/subs/app/components/WorkspaceChoice";
import { findUserByEmail } from "@/src/data/user";
import { getUserWorkspaces } from "@/src/data/workspace";
import { generateAppPath } from "@/src/path";
import { WORKSPACE_DEMO_SLUG } from "@/src/constants";
import { generateMetadataFromTitle } from "@/src/manifest";

export const metadata = generateMetadataFromTitle({
  title: "Are your developers doing their jobs well?",
  description:
    "Get a demo of Proofer or sign in to see how your developers are doing.",
});
export default async function Page() {
  const session = await getSession();
  const user = await findUserByEmail(session?.user?.email);
  const workspaces = user ? await getUserWorkspaces(user.id) : [];

  return (
    <Center h={"80vh"}>
      <Stack align={"center"}>
        <Image
          src={"/assets/images/integrations.png"}
          alt={"integration"}
          w={"10em"}
        />
        <Title order={1} ta={"center"}>
          Are your developers doing their jobs well?
        </Title>
        <Stack w={"100%"}>
          {workspaces.length > 0 ? (
            <WorkspaceChoice workspaces={workspaces} />
          ) : (
            <>
              <Anchor
                href={generateAppPath(`/`, WORKSPACE_DEMO_SLUG)}
                w={"100%"}
              >
                <Button variant="light" w={"100%"}>
                  Get Demo
                </Button>
              </Anchor>
              {user ? (
                ""
              ) : (
                <Anchor href={"/auth/login"} w={"100%"}>
                  <Button w={"100%"}>Sign in</Button>
                </Anchor>
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Center>
  );
}
