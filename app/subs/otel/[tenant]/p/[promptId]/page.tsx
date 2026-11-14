import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { findTenant, getSession, tenantPath } from "@/app/subs/otel/lib/tenant";
import { promptEvents } from "@/app/subs/otel/lib/queries";
import { Card, Header, kst } from "../../ui";

export const dynamic = "force-dynamic";

// 프롬프트 하나가 일으킨 이벤트(API 호출, 툴 실행, 응답)를 순서대로 보여준다.
export default async function PromptTimeline({
  params,
}: {
  params: Promise<{ tenant: string; promptId: string }>;
}) {
  const { tenant: slug, promptId } = await params;
  const tenant = await findTenant(slug);
  if (!tenant) notFound();
  const session = await getSession(tenant);
  if (!session) redirect(tenantPath(slug));

  const events = await promptEvents(tenant.id, promptId);
  if (events.length === 0) notFound();

  return (
    <>
      <Header session={session} />
      <main className="mx-auto max-w-[1160px] space-y-4 px-6 py-8">
        <Link href={tenantPath(slug)} className="text-sm text-proofer-gray">
          대시보드로
        </Link>
        <h1 className="text-xl font-bold">
          프롬프트 <code className="text-base">{promptId}</code>
        </h1>
        <p className="text-sm text-proofer-gray">
          {events[0].user_email} / 세션 {events[0].session_id} / 이벤트{" "}
          {events.length}건
        </p>
        {events.map((e) => (
          <Card key={e.id}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-bold">{e.event_name}</span>
              <span className="text-proofer-gray">{kst(e.at)}</span>
            </div>
            <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-all rounded-proofer-xs bg-proofer-bg-alt p-3 text-xs">
              {JSON.stringify(e.attributes, null, 2)}
            </pre>
          </Card>
        ))}
      </main>
    </>
  );
}
