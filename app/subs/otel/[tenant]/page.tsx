import Link from "next/link";
import { notFound } from "next/navigation";
import { findTenant, getSession, tenantPath } from "@/app/subs/otel/lib/tenant";
import {
  RANGES,
  byModel,
  bySource,
  byTool,
  byUser,
  daily,
  kpis,
  parseRange,
  recentPrompts,
  textOrNull,
} from "@/app/subs/otel/lib/queries";
import DailyChart from "./DailyChart";
import { Card, Header, Stat, Table, compact, kst, n, usd } from "./ui";

export const dynamic = "force-dynamic";

const ERRORS: Record<string, string> = {
  denied: "이 팀의 Vercel 멤버만 들어올 수 있습니다.",
  state: "로그인 요청이 만료됐습니다. 다시 시도해 주세요.",
  token: "Vercel 인증을 확인하지 못했습니다. 다시 시도해 주세요.",
  oauth: "Vercel 로그인이 취소되었거나 실패했습니다.",
  config: "이 팀의 로그인 설정이 끝나지 않았습니다.",
};

type Props = {
  params: Promise<{ tenant: string }>;
  searchParams: Promise<{ days?: string; error?: string }>;
};

export default async function TenantDashboard({ params, searchParams }: Props) {
  const { tenant: slug } = await params;
  const { days: daysParam, error } = await searchParams;
  const tenant = await findTenant(slug);
  if (!tenant) notFound();

  const session = await getSession(tenant);
  if (!session) {
    return (
      <main className="mx-auto max-w-[480px] px-6 py-24">
        <h1 className="text-2xl font-bold">{tenant.name} OTel</h1>
        <p className="mt-3 text-proofer-gray">
          Claude Cowork 와 Office Agents 활동 대시보드입니다. {tenant.name} 팀의
          Vercel 계정으로 로그인하세요.
        </p>
        {error && (
          <p className="mt-4 rounded-proofer-xs bg-red-50 px-3 py-2 text-sm text-red-700">
            {ERRORS[error] ?? ERRORS.oauth}
          </p>
        )}
        {tenant.vercel_client_id ? (
          <a
            href={tenantPath(slug, "/auth/login")}
            className="mt-6 inline-flex h-11 items-center rounded-proofer-xs bg-black px-5 text-sm font-bold text-white"
          >
            Vercel 로 로그인
          </a>
        ) : (
          <p className="mt-6 text-sm text-proofer-gray">{ERRORS.config}</p>
        )}
      </main>
    );
  }

  const days = parseRange(daysParam);
  const [k, d, users, tools, models, sources, prompts] = await Promise.all([
    kpis(tenant.id, days),
    daily(tenant.id, days),
    byUser(tenant.id, days),
    byTool(tenant.id, days),
    byModel(tenant.id, days),
    bySource(tenant.id, days),
    recentPrompts(tenant.id),
  ]);
  const failRate = k.tool_calls ? (k.tool_failures / k.tool_calls) * 100 : 0;

  return (
    <>
      <Header session={session} />
      <main className="mx-auto max-w-[1160px] space-y-6 px-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">최근 {days}일</h1>
          <nav className="flex gap-1 text-sm">
            {RANGES.map((r) => (
              <Link
                key={r}
                href={`${tenantPath(slug)}?days=${r}`}
                className={`rounded-proofer-xs px-3 py-1.5 ${r === days ? "bg-proofer-ink text-white" : "bg-white text-proofer-gray"}`}
              >
                {r}일
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat
            label="예상 비용"
            value={usd(k.cost_usd)}
            sub={`API 요청 ${n(k.requests)}건`}
          />
          <Stat
            label="프롬프트"
            value={n(k.prompts)}
            sub={`세션 ${n(k.sessions)}개`}
          />
          <Stat label="사용자" value={n(k.users)} />
          <Stat
            label="토큰 (입력 / 출력)"
            value={`${compact(k.input_tokens)} / ${compact(k.output_tokens)}`}
            sub={`캐시 읽기 ${compact(k.cache_read_tokens)}`}
          />
          <Stat
            label="툴 실행"
            value={n(k.tool_calls)}
            sub={`실패율 ${failRate.toFixed(1)}%`}
          />
          <Stat label="API 에러" value={n(k.api_errors)} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card title="일별 예상 비용">
            <DailyChart data={d} metric="cost_usd" label="비용" format="usd" />
          </Card>
          <Card title="일별 프롬프트">
            <DailyChart data={d} metric="prompts" label="프롬프트" />
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card title="사용자별">
            <Table
              head={["사용자", "프롬프트", "세션", "비용", "마지막 활동"]}
              align={["left", "right", "right", "right", "right"]}
              rows={users.map((u) => [
                <Link
                  key="u"
                  href={`${tenantPath(slug, "/sessions")}?days=${days}&user=${encodeURIComponent(u.user_email ?? "")}`}
                  className="hover:underline"
                >
                  {u.user_email ?? "(없음)"}
                </Link>,
                n(u.prompts),
                n(u.sessions),
                usd(u.cost_usd),
                kst(u.last_seen),
              ])}
            />
          </Card>
          <Card title="모델별">
            <Table
              head={["모델", "요청", "비용", "평균 지연"]}
              align={["left", "right", "right", "right"]}
              rows={models.map((m) => [
                m.model,
                n(m.requests),
                usd(m.cost_usd),
                `${(m.avg_ms / 1000).toFixed(1)}s`,
              ])}
            />
          </Card>
        </div>

        <Card title="툴">
          <Table
            head={["툴", "실행", "실패", "거부", "평균 시간"]}
            align={["left", "right", "right", "right", "right"]}
            rows={tools.map((t) => [
              <code key="t" className="text-xs">
                {t.tool_name}
              </code>,
              n(t.calls),
              n(t.failures),
              n(t.rejects),
              `${Math.round(t.avg_ms)}ms`,
            ])}
          />
        </Card>

        <Card title="최근 프롬프트">
          <Table
            head={["시각", "사용자", "출처", "프롬프트", ""]}
            rows={prompts.map((p) => {
              const text =
                textOrNull(p.prompt) ??
                `(본문 미수집, ${p.prompt_length ?? "?"}자)`;
              return [
                <span key="a" className="whitespace-nowrap">
                  {kst(p.at)}
                </span>,
                p.user_email ?? "",
                p.service_name ?? "",
                p.prompt_id ? (
                  <Link
                    key="p"
                    href={tenantPath(slug, `/p/${p.prompt_id}`)}
                    className="line-clamp-2 underline-offset-2 hover:underline"
                  >
                    {text}
                  </Link>
                ) : (
                  text
                ),
                p.session_id ? (
                  <Link
                    key="r"
                    href={tenantPath(
                      slug,
                      `/s/${encodeURIComponent(p.session_id)}`,
                    )}
                    className="whitespace-nowrap font-bold underline underline-offset-2"
                  >
                    리플레이
                  </Link>
                ) : (
                  ""
                ),
              ];
            })}
          />
        </Card>

        <Card title="수신 이벤트 분포">
          <Table
            head={["출처 (service.name)", "이벤트", "건수"]}
            align={["left", "left", "right"]}
            rows={sources.map((s) => [
              s.service_name,
              s.event_name,
              n(s.count),
            ])}
          />
        </Card>
      </main>
    </>
  );
}
