import { pathTree } from "@/app/subs/app/tree";
import { Center, Space, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { IconFolderX } from "@tabler/icons-react";
import NotReadyYetLetter from "@/app/components/NotReadyYetLetter";
import { getAppPathBlocks } from "@/src/path";
import { headers } from "next/headers";

export default async function SubPathLayout({ children }: { children: any }) {
  const session = await getSession();
  if (session?.user) {
    // 로그인 상태에서만 보이도록
    return <>{children}</>;
  }

  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const [_, pathBlock, subPathBlock] = getAppPathBlocks(pathname);
  const path = pathTree[pathBlock];
  const subPath = path?.subTree?.[subPathBlock];

  if (!subPath?.isImplemented)
    return <NotReadyYetLetter title={true} c={"var(--mantine-color-gray-8)"} />;

  return (
    <Center>
      <Stack align={"center"} c={"var(--mantine-color-gray-6"}>
        <Space h={"10vh"} />
        <IconFolderX size={"5em"} />
        <Stack w={"100%"} align={"center"}>
          <Title order={1} ta={"center"}>
            워크스페이스를 먼저 생성해주세요.
          </Title>
          <Text ta={"center"}>
            {subPath?.title} 내용을 확인하려면, 먼저 워크스페이스를 생성해주신
            후 업무에 사용되는 앱을 연동해야 합니다.
          </Text>
          <>{subPath?.component}</>
        </Stack>
      </Stack>
    </Center>
  );
}
