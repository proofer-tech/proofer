import { getSession } from "@auth0/nextjs-auth0";
import { Stack } from "@mantine/core";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session?.user) return redirect("/api/auth/login");

  return (
    <Stack pt={"10vh"} align={"center"}>
      {session.user.email_verified
        ? "이메일 인증을 완료했습니다."
        : "인증에 실패했습니다. 이메일에서 다시 시도해주시거나 채널톡을 통해 문의해주세요."}
    </Stack>
  );
}
