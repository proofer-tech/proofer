import { getSession } from "@auth0/nextjs-auth0";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  // 세션이 있는데도 로그인페이지로 이동했다면 이메일 인증이 필요할 수 있음
  if (session && !session.user.email_verified) {
    return redirect("/auth/email-verification");
  }

  if (session && session.user) return notFound();

  return redirect("/api/auth/login");
}
