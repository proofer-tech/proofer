import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { findTenant, getSession, tenantPath } from "@/app/subs/otel/lib/tenant";
import { sessionEvents } from "@/app/subs/otel/lib/queries";
import { buildReplay } from "@/app/subs/otel/lib/replay";
import { Header, kst, n, usd } from "../../ui";
import Replay from "./Replay";

export const dynamic = "force-dynamic";

// 세션 하나를 채팅 화면처럼 다시 본다.
export default async function SessionReplay({
  params,
}: {
  params: Promise<{ tenant: string; sessionId: string }>;
}) {
  const { tenant: slug, sessionId } = await params;
  const tenant = await findTenant(slug);
  if (!tenant) notFound();
  const session = await getSession(tenant);
  if (!session) redirect(tenantPath(slug));

  const events = await sessionEvents(tenant.id, decodeURIComponent(sessionId));
  if (events.length === 0) notFound();
  const items = buildReplay(events);

  const user = events.find((e) => e.user_email)?.user_email;
  const cost = items.reduce(
    (s, i) => s + (i.kind === "api" ? i.costUsd : 0),
    0,
  );
  const prompts = items.filter((i) => i.kind === "user").length;
  const tools = items.filter((i) => i.kind === "tool").length;
  const contentMissing = items.some(
    (i) => (i.kind === "user" || i.kind === "assistant") && i.text === null,
  );

  return (
    <>
      <Header session={session} />
      <main className="mx-auto max-w-[860px] px-6 py-8">
        <Link
          href={tenantPath(slug, "/sessions")}
          className="text-sm text-proofer-gray"
        >
          세션 목록으로
        </Link>
        <h1 className="mt-2 text-xl font-bold">세션 리플레이</h1>
        <p className="mt-1 break-all text-sm text-proofer-gray">
          {user} / {kst(items[0]?.at ?? events[0].at)} 시작 / 프롬프트{" "}
          {n(prompts)} / 툴 {n(tools)} / {usd(cost)} /{" "}
          <Link
            href={`${tenantPath(slug, "/events")}?session=${encodeURIComponent(sessionId)}`}
            className="underline underline-offset-2"
          >
            원본 이벤트 {n(events.length)}건
          </Link>
        </p>
        {contentMissing && (
          <p className="mt-3 rounded-proofer-xs bg-amber-50 px-3 py-2 text-xs text-amber-800">
            이 세션은 본문 수집(otlpContentCapture)이 꺼진 기기에서 왔습니다.
            프롬프트와 응답은 글자 수만 보입니다.
          </p>
        )}
        <div className="mt-6">
          <Replay items={items} />
        </div>
      </main>
    </>
  );
}
