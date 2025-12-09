import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { notFound, redirect } from "next/navigation";

const auth0 = new Auth0Client();

export default async function Page() {
  const session = await auth0.getSession();

  // 세션이 있는데도 로그인페이지로 이동했다면 이메일 인증이 필요할 수 있음
  if (session && !session.user.email_verified) {
    return redirect("/auth/email-verification");
  }

  if (session && session.user) return notFound();

  return redirect("/api/auth/login");
}
