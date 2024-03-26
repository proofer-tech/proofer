import { getSession } from "@auth0/nextjs-auth0";
import { Anchor, Button, Center, Image, Stack, Title } from "@mantine/core";
import React from "react";
import WorkspaceChoice from "@/app/subs/app/components/WorkspaceChoice";
import { findUserByEmail } from "@/src/data/user";
import { getUserWorkspaces } from "@/src/data/workspace";

export default async function Page() {
  const session = await getSession();
  const user = await findUserByEmail(session?.user?.email);
  const workspaces = user ? await getUserWorkspaces(user.id) : [];

  return (
    <Center h={"80vh"}>
      <Stack align={"center"}>
        <Image
          src={"/assets/images/integrations.png"}
          alt={"연동"}
          w={"10em"}
        />
        <Title order={1} ta={"center"}>
          우리 개발자의 생산성이 궁금하다면?
        </Title>
        <Stack w={"100%"}>
          {workspaces.length > 0 ? (
            <WorkspaceChoice workspaces={workspaces} />
          ) : (
            <>
              <Button variant="light">데모버전 구경하기</Button>
              {user ? (
                <Anchor href={"/auth/login"} w={"100%"}>
                  <Button w={"100%"}>로그인</Button>
                </Anchor>
              ) : (
                ""
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Center>
  );
}
