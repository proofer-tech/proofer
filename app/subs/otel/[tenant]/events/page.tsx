import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { findTenant, getSession, tenantPath } from "@/app/subs/otel/lib/tenant";
import {
  EVENT_PAGE,
  RANGES,
  eventFacets,
  listEvents,
  parseRange,
} from "@/app/subs/otel/lib/queries";
import { Card, Header, Table, kst, n } from "../ui";

export const dynamic = "force-dynamic";

type Search = {
  days?: string;
  event?: string;
  user?: string;
  session?: string;
  prompt?: string;
  before?: string;
};

const SELECT =
  "h-9 rounded-proofer-xs border border-proofer-line bg-white px-2 text-sm";

// 모든 이벤트를 종류, 사용자, 세션, 프롬프트로 걸러 본다. 행을 누르면 원본 전체가 보인다.
export default async function Events({
  params,
  searchParams,
}: {
  params: Promise<{ tenant: string }>;
  searchParams: Promise<Search>;
}) {
  const { tenant: slug } = await params;
  const q = await searchParams;
  const tenant = await findTenant(slug);
  if (!tenant) notFound();
  const session = await getSession(tenant);
  if (!session) redirect(tenantPath(slug));

  const days = parseRange(q.days);
  const before = Number(q.before) || undefined;
  const [facets, list] = await Promise.all([
    eventFacets(tenant.id, days),
    listEvents(tenant.id, {
      days,
      event: q.event || undefined,
      user: q.user || undefined,
      session: q.session || undefined,
      prompt: q.prompt || undefined,
      before,
    }),
  ]);

  const base = tenantPath(slug, "/events");
  const keep = new URLSearchParams(
    Object.entries({ ...q, before: undefined }).filter(
      (e): e is [string, string] => typeof e[1] === "string" && e[1] !== "",
    ),
  );
  const nextHref =
    list.length === EVENT_PAGE
      ? `${base}?${new URLSearchParams({ ...Object.fromEntries(keep), before: String(list[list.length - 1].id) })}`
      : null;

  return (
    <>
      <Header session={session} />
      <main className="mx-auto max-w-[1160px] space-y-6 px-6 py-8">
        <h1 className="text-xl font-bold">이벤트</h1>
        <form
          method="get"
          action={base}
          className="flex flex-wrap items-end gap-2"
        >
          <select name="days" defaultValue={String(days)} className={SELECT}>
            {RANGES.map((r) => (
              <option key={r} value={r}>
                최근 {r}일
              </option>
            ))}
          </select>
          <select name="event" defaultValue={q.event ?? ""} className={SELECT}>
            <option value="">모든 이벤트</option>
            {facets.events.map((f) => (
              <option key={f.v} value={f.v}>
                {f.v} ({n(f.n)})
              </option>
            ))}
          </select>
          <select name="user" defaultValue={q.user ?? ""} className={SELECT}>
            <option value="">모든 사용자</option>
            {facets.users.map((f) => (
              <option key={f.v} value={f.v}>
                {f.v} ({n(f.n)})
              </option>
            ))}
          </select>
          <input
            name="session"
            defaultValue={q.session ?? ""}
            placeholder="session.id"
            className={`${SELECT} w-56`}
          />
          <input
            name="prompt"
            defaultValue={q.prompt ?? ""}
            placeholder="prompt.id"
            className={`${SELECT} w-56`}
          />
          <button className="h-9 rounded-proofer-xs bg-proofer-ink px-4 text-sm font-bold text-white">
            적용
          </button>
          <Link
            href={base}
            className="h-9 px-2 text-sm leading-9 text-proofer-gray"
          >
            초기화
          </Link>
        </form>

        <Card>
          <Table
            head={["시각", "이벤트", "요약", "사용자", "세션", ""]}
            rows={list.map((e) => [
              <span key="t" className="whitespace-nowrap">
                {kst(e.at)}
              </span>,
              <code key="e" className="text-xs">
                {e.event_name}
              </code>,
              <span
                key="s"
                className="line-clamp-1 max-w-[320px] text-proofer-gray"
              >
                {e.summary}
              </span>,
              e.user_email ?? "",
              e.session_id ? (
                <Link
                  key="sid"
                  href={tenantPath(
                    slug,
                    `/s/${encodeURIComponent(e.session_id)}`,
                  )}
                  className="font-mono text-xs hover:underline"
                >
                  {e.session_id.slice(0, 8)}
                </Link>
              ) : (
                ""
              ),
              <Link
                key="d"
                href={tenantPath(slug, `/e/${e.id}`)}
                className="whitespace-nowrap font-bold underline underline-offset-2"
              >
                원본
              </Link>,
            ])}
          />
          {nextHref && (
            <div className="mt-4 text-right">
              <Link
                href={nextHref}
                className="text-sm underline underline-offset-2"
              >
                다음 {EVENT_PAGE}건
              </Link>
            </div>
          )}
        </Card>
      </main>
    </>
  );
}
