import { getSession } from "@auth0/nextjs-auth0";
import {
  Anchor,
  Button,
  Center,
  Image,
  NativeSelect,
  Stack,
  Title,
} from "@mantine/core";
import { IconSquareRoundedPlus } from "@tabler/icons-react";
import React from "react";
import { Workspace } from "@/database/workspace/schema";
import { db } from "@/database/engine";
import { eq } from "drizzle-orm";
import { getUserByEmail } from "@/src/data/users";
import { redirect } from "next/navigation";
import { generateAppPath } from "@/src/path";
import WorkspaceChoice from "@/app/subs/app/components/WorkspaceChoice";

export default async function Page() {
  const session = await getSession();
  const user = await getUserByEmail(session?.user?.email);
  const workspaces = user
    ? await db.select().from(Workspace).where(eq(Workspace.ownerId, user.id))
    : [];

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
          {user ? (
            <>
              {workspaces.length > 0 ? (
                <WorkspaceChoice workspaces={workspaces} />
              ) : (
                ""
              )}
              <Button
                color={"var(--color-secondary)"}
                leftSection={<IconSquareRoundedPlus size={"1.3em"} />}
              >
                워크스페이스 만들기
              </Button>
            </>
          ) : (
            <>
              <Button variant="light">데모버전 구경하기</Button>
              <Anchor href={"/api/auth/login"} w={"100%"}>
                <Button w={"100%"}>로그인</Button>
              </Anchor>
            </>
          )}
        </Stack>
      </Stack>
    </Center>
  );
}
