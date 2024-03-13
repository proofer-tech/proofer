import { getSession, touchSession } from "@auth0/nextjs-auth0";
import { Anchor, Button, Stack, Text } from "@mantine/core";
import { redirect } from "next/navigation";
import { User } from "@/database/schemas/auth";
import { db } from "@/database/engine";
import { withLock } from "@/src/redis";
import { findUserByEmail } from "@/app/subs/app/data/user";

export default async function Page({ searchParams }: any) {
  const session = await getSession();
  if (!session?.user) return redirect("/auth/login");

  if (
    (searchParams.success === "true" && searchParams.code === "success") ||
    searchParams.email
  ) {
    const user = await findUserByEmail(session.user.email);
    if (!user) {
      await withLock(
        { id: `email-verification(${searchParams.email})` },
        async () => {
          await db.insert(User).values({ email: session.user.email });
        },
        async () => {
          redirect("/404");
        },
      );
    }
  }

  return (
    <Stack pt={"10vh"} align={"center"}>
      {session.user.email_verified ? (
        <Text>이메일 인증을 완료했습니다.</Text>
      ) : (
        <Text ta={"center"}>
          이메일 인증이 필요합니다.
          <br />
          이메일에서 인증링크를 다시 클릭하여 시도해주시거나 채널톡을 통해
          문의해주세요.
        </Text>
      )}
      <Anchor href={"/"}>
        <Button>홈으로 이동하기</Button>
      </Anchor>
    </Stack>
  );
}
