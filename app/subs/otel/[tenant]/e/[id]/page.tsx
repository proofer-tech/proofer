import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { findTenant, getSession, tenantPath } from "@/app/subs/otel/lib/tenant";
import { eventById } from "@/app/subs/otel/lib/queries";
import { Card, Header, kst } from "../../ui";

export const dynamic = "force-dynamic";

const PRE =
  "max-h-[70vh] overflow-auto whitespace-pre-wrap break-all rounded-proofer-xs bg-proofer-bg-alt p-3 text-xs";

// 이벤트 한 건의 원본(속성, 리소스, 스코프, 본문)을 그대로 보여준다.
export default async function EventDetail({
  params,
}: {
  params: Promise<{ tenant: string; id: string }>;
}) {
  const { tenant: slug, id } = await params;
  const tenant = await findTenant(slug);
  if (!tenant) notFound();
  const session = await getSession(tenant);
  if (!session) redirect(tenantPath(slug));

  const eventId = Number(id);
  if (!Number.isSafeInteger(eventId)) notFound();
  const e = await eventById(tenant.id, eventId);
  if (!e) notFound();

  // 긴 문자열 속성(prompt, response, tool_input)은 따로 펼쳐 읽기 쉽게 한다.
  const longText = Object.entries(e.attributes).filter(
    ([, v]) => typeof v === "string" && (v.length > 200 || v.includes("\n")),
  ) as [string, string][];

  return (
    <>
      <Header session={session} />
      <main className="mx-auto max-w-[1160px] space-y-4 px-6 py-8">
        <Link
          href={tenantPath(slug, "/events")}
          className="text-sm text-proofer-gray"
        >
          이벤트 목록으로
        </Link>
        <h1 className="text-xl font-bold">
          <code>{e.event_name}</code>
        </h1>
        <p className="text-sm text-proofer-gray">
          {kst(e.at)} / {e.service_name} / {e.user_email}
          {e.session_id && (
            <>
              {" / "}
              <Link
                href={tenantPath(
                  slug,
                  `/s/${encodeURIComponent(e.session_id)}`,
                )}
                className="underline underline-offset-2"
              >
                세션 리플레이
              </Link>
            </>
          )}
          {e.prompt_id && (
            <>
              {" / "}
              <Link
                href={tenantPath(slug, `/p/${e.prompt_id}`)}
                className="underline underline-offset-2"
              >
                같은 프롬프트의 이벤트
              </Link>
            </>
          )}
        </p>
        {longText.map(([k, v]) => (
          <Card key={k} title={k}>
            <pre className={PRE}>{v}</pre>
          </Card>
        ))}
        <Card title="attributes">
          <pre className={PRE}>{JSON.stringify(e.attributes, null, 2)}</pre>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="resource">
            <pre className={PRE}>{JSON.stringify(e.resource, null, 2)}</pre>
          </Card>
          <Card title="scope / body">
            <pre className={PRE}>
              {JSON.stringify(
                { scope: e.scope, body: e.body, severity: e.severity },
                null,
                2,
              )}
            </pre>
          </Card>
        </div>
      </main>
    </>
  );
}
