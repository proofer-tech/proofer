import { pathTree } from "@/app/subs/app/tree";
import {
  Box,
  Breadcrumbs,
  Center,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { getAppPathBlocks } from "@/src/path";
import { headers } from "next/headers";
import { findWorkspace } from "@/app/subs/app/data/workspace";
import { findUserFromSession } from "@/app/subs/app/data/user";

export default async function WorkspaceLayout({ children }: { children: any }) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const [slug, pathBlock, subPathBlock] = getAppPathBlocks(pathname);
  const path = pathTree[pathBlock];
  const subPath = path?.subTree?.[subPathBlock];

  const user = await findUserFromSession();
  if (!user) return redirect("/auth/login");
  if (!user?.email_verified) return redirect("/auth/email-verification");

  const workspace = await findWorkspace(slug);
  if (!workspace) return redirect("/404");
  if (workspace.ownerId !== user.id) return redirect("/403");

  if (subPath !== undefined)
    return (
      <Stack>
        <Stack>
          <Breadcrumbs separator={"-"}>
            <Group gap={"1ex"} wrap={"nowrap"}>
              {path.tablerIcon && (
                <Center
                  p={"0.3em"}
                  bg={"var(--mantine-color-gray-2)"}
                  style={{ borderRadius: "4px" }}
                >
                  <path.tablerIcon
                    size={"1em"}
                    color={"var(--mantine-color-gray-8)"}
                  />
                </Center>
              )}
              <Text>{path.title}</Text>
            </Group>
          </Breadcrumbs>
          <Title order={1} style={{ whiteSpace: "nowrap" }}>
            {subPath.title}
          </Title>
        </Stack>
        <Divider w={"100%"} />
        {subPath.component}
        <Box>{children}</Box>
      </Stack>
    );

  return <>{children}</>;
}
