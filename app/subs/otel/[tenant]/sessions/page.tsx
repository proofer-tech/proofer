import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { findTenant, getSession, tenantPath } from "@/app/subs/otel/lib/tenant";
import { RANGES, parseRange, sessions } from "@/app/subs/otel/lib/queries";
import { Card, Header, Table, kst, n, usd } from "../ui";

export const dynamic = "force-dynamic";

export default async function Sessions({
  params,
  searchParams,
}: {
  params: Promise<{ tenant: string }>;
  searchParams: Promise<{ days?: string; user?: string }>;
}) {
  const { tenant: slug } = await params;
  const { days: d, user } = await searchParams;
  const tenant = await findTenant(slug);
  if (!tenant) notFound();
  const session = await getSession(tenant);
  if (!session) redirect(tenantPath(slug));

  const days = parseRange(d);
  const list = await sessions(tenant.id, days, user);
  const base = tenantPath(slug, "/sessions");

  return (
    <>
      <Header session={session} />
      <main className="mx-auto max-w-[1160px] space-y-6 px-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            세션{" "}
            {user ? <span className="text-proofer-gray">/ {user}</span> : null}
          </h1>
          <nav className="flex gap-1 text-sm">
            {RANGES.map((r) => (
              <Link
                key={r}
                href={`${base}?days=${r}${user ? `&user=${encodeURIComponent(user)}` : ""}`}
                className={`rounded-proofer-xs px-3 py-1.5 ${r === days ? "bg-proofer-ink text-white" : "bg-white text-proofer-gray"}`}
              >
                {r}일
              </Link>
            ))}
          </nav>
        </div>
        <Card>
          <Table
            head={[
              "시작",
              "사용자",
              "첫 프롬프트",
              "프롬프트",
              "툴",
              "비용",
              "",
            ]}
            align={["left", "left", "left", "right", "right", "right", "right"]}
            rows={list.map((s) => [
              <span key="t" className="whitespace-nowrap">
                {kst(s.started_at)}
              </span>,
              <Link
                key="u"
                href={`${base}?days=${days}&user=${encodeURIComponent(s.user_email ?? "")}`}
                className="hover:underline"
              >
                {s.user_email ?? "(없음)"}
              </Link>,
              <span
                key="p"
                className="line-clamp-1 max-w-[420px] text-proofer-gray"
              >
                {s.first_prompt ?? "(본문 미수집)"}
              </span>,
              n(s.prompts),
              n(s.tool_calls),
              usd(s.cost_usd),
              <Link
                key="r"
                href={tenantPath(
                  slug,
                  `/s/${encodeURIComponent(s.session_id)}`,
                )}
                className="whitespace-nowrap font-bold underline underline-offset-2"
              >
                리플레이
              </Link>,
            ])}
          />
        </Card>
      </main>
    </>
  );
}
