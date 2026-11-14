import { sql } from "drizzle-orm";
import { dz } from "@/database/engine";

// 모든 쿼리는 tenant_id 로 먼저 거른다. 시각은 observed_at, 없으면 received_at.
const TS = sql.raw("coalesce(observed_at, received_at)");

export const RANGES = [7, 30, 90] as const;
export type Range = (typeof RANGES)[number];
export const parseRange = (v: string | undefined): Range =>
  (RANGES as readonly number[]).includes(Number(v)) ? (Number(v) as Range) : 30;

async function rows<T>(q: ReturnType<typeof sql>): Promise<T[]> {
  const res = await dz.execute(q);
  return res.rows as T[];
}

const since = (days: number) =>
  sql`${TS} >= now() - make_interval(days => ${days})`;
const num = (key: string) =>
  sql.raw(`coalesce((attributes->>'${key}')::numeric, 0)`);

export type Kpis = {
  prompts: number;
  sessions: number;
  users: number;
  requests: number;
  cost_usd: number;
  input_tokens: number;
  output_tokens: number;
  cache_read_tokens: number;
  tool_calls: number;
  tool_failures: number;
  api_errors: number;
};

export async function kpis(tenantId: number, days: number): Promise<Kpis> {
  const [r] = await rows<Record<keyof Kpis, string>>(sql`
    select
      count(*) filter (where event_name = 'user_prompt') as prompts,
      count(distinct session_id) as sessions,
      count(distinct user_email) as users,
      count(*) filter (where event_name = 'api_request') as requests,
      coalesce(sum(${num("cost_usd")}) filter (where event_name = 'api_request'), 0) as cost_usd,
      coalesce(sum(${num("input_tokens")}) filter (where event_name = 'api_request'), 0) as input_tokens,
      coalesce(sum(${num("output_tokens")}) filter (where event_name = 'api_request'), 0) as output_tokens,
      coalesce(sum(${num("cache_read_tokens")}) filter (where event_name = 'api_request'), 0) as cache_read_tokens,
      count(*) filter (where event_name = 'tool_result') as tool_calls,
      count(*) filter (where event_name = 'tool_result' and attributes->>'success' = 'false') as tool_failures,
      count(*) filter (where event_name = 'api_error') as api_errors
    from otel_log_record
    where tenant_id = ${tenantId} and ${since(days)}
  `);
  return Object.fromEntries(
    Object.entries(r).map(([k, v]) => [k, Number(v)]),
  ) as Kpis;
}

export type DailyRow = {
  day: string;
  prompts: number;
  requests: number;
  cost_usd: number;
  users: number;
};

export async function daily(
  tenantId: number,
  days: number,
): Promise<DailyRow[]> {
  const r = await rows<Record<keyof DailyRow, string>>(sql`
    with d as (
      select generate_series(
        (now() at time zone 'Asia/Seoul')::date - (${days} - 1),
        (now() at time zone 'Asia/Seoul')::date,
        interval '1 day'
      )::date as day
    ), e as (
      select (${TS} at time zone 'Asia/Seoul')::date as day, *
      from otel_log_record
      where tenant_id = ${tenantId} and ${since(days)}
    )
    select to_char(d.day, 'MM-DD') as day,
      count(e.*) filter (where e.event_name = 'user_prompt') as prompts,
      count(e.*) filter (where e.event_name = 'api_request') as requests,
      coalesce(sum(coalesce((e.attributes->>'cost_usd')::numeric, 0)) filter (where e.event_name = 'api_request'), 0) as cost_usd,
      count(distinct e.user_email) as users
    from d left join e on e.day = d.day
    group by d.day order by d.day
  `);
  return r.map((x) => ({
    day: x.day,
    prompts: Number(x.prompts),
    requests: Number(x.requests),
    cost_usd: Number(x.cost_usd),
    users: Number(x.users),
  }));
}

export type UserRow = {
  user_email: string | null;
  prompts: number;
  sessions: number;
  cost_usd: number;
  last_seen: string;
};

export async function byUser(
  tenantId: number,
  days: number,
): Promise<UserRow[]> {
  const r = await rows<Record<keyof UserRow, string>>(sql`
    select user_email,
      count(*) filter (where event_name = 'user_prompt') as prompts,
      count(distinct session_id) as sessions,
      coalesce(sum(${num("cost_usd")}) filter (where event_name = 'api_request'), 0) as cost_usd,
      max(${TS}) as last_seen
    from otel_log_record
    where tenant_id = ${tenantId} and ${since(days)}
    group by user_email order by cost_usd desc limit 50
  `);
  return r.map((x) => ({
    user_email: x.user_email,
    prompts: Number(x.prompts),
    sessions: Number(x.sessions),
    cost_usd: Number(x.cost_usd),
    last_seen: String(x.last_seen),
  }));
}

export type ToolRow = {
  tool_name: string;
  calls: number;
  failures: number;
  avg_ms: number;
  rejects: number;
};

export async function byTool(
  tenantId: number,
  days: number,
): Promise<ToolRow[]> {
  const r = await rows<Record<keyof ToolRow, string>>(sql`
    select coalesce(attributes->>'tool_name', '(unknown)') as tool_name,
      count(*) as calls,
      count(*) filter (where attributes->>'success' = 'false') as failures,
      coalesce(avg(${num("duration_ms")}), 0) as avg_ms,
      count(*) filter (where attributes->>'decision_type' = 'reject') as rejects
    from otel_log_record
    where tenant_id = ${tenantId} and ${since(days)} and event_name = 'tool_result'
    group by 1 order by calls desc limit 30
  `);
  return r.map((x) => ({
    tool_name: x.tool_name,
    calls: Number(x.calls),
    failures: Number(x.failures),
    avg_ms: Number(x.avg_ms),
    rejects: Number(x.rejects),
  }));
}

export type ModelRow = {
  model: string;
  requests: number;
  cost_usd: number;
  avg_ms: number;
};

export async function byModel(
  tenantId: number,
  days: number,
): Promise<ModelRow[]> {
  const r = await rows<Record<keyof ModelRow, string>>(sql`
    select coalesce(attributes->>'model', '(unknown)') as model,
      count(*) as requests,
      coalesce(sum(${num("cost_usd")}), 0) as cost_usd,
      coalesce(avg(${num("duration_ms")}), 0) as avg_ms
    from otel_log_record
    where tenant_id = ${tenantId} and ${since(days)} and event_name = 'api_request'
    group by 1 order by cost_usd desc
  `);
  return r.map((x) => ({
    model: x.model,
    requests: Number(x.requests),
    cost_usd: Number(x.cost_usd),
    avg_ms: Number(x.avg_ms),
  }));
}

export type SourceRow = {
  service_name: string;
  event_name: string;
  count: number;
};

// Office Agents 처럼 이벤트 이름을 미리 모르는 출처도 보이도록 전체 분포를 같이 낸다.
export async function bySource(
  tenantId: number,
  days: number,
): Promise<SourceRow[]> {
  const r = await rows<Record<keyof SourceRow, string>>(sql`
    select coalesce(service_name, '(unknown)') as service_name,
      coalesce(event_name, '(none)') as event_name,
      count(*) as count
    from otel_log_record
    where tenant_id = ${tenantId} and ${since(days)}
    group by 1, 2 order by 1, count desc
  `);
  return r.map((x) => ({ ...x, count: Number(x.count) }));
}

export type PromptRow = {
  prompt_id: string | null;
  at: string;
  user_email: string | null;
  service_name: string | null;
  prompt: string | null;
  prompt_length: number | null;
};

export async function recentPrompts(
  tenantId: number,
  limit = 30,
): Promise<PromptRow[]> {
  const r = await rows<PromptRow>(sql`
    select prompt_id, ${TS} as at, user_email, service_name,
      left(attributes->>'prompt', 300) as prompt,
      (attributes->>'prompt_length')::int as prompt_length
    from otel_log_record
    where tenant_id = ${tenantId} and event_name = 'user_prompt'
    order by ${TS} desc limit ${limit}
  `);
  return r;
}

export type EventRow = {
  id: number;
  at: string;
  event_name: string | null;
  service_name: string | null;
  user_email: string | null;
  session_id: string | null;
  attributes: Record<string, unknown>;
};

export async function promptEvents(
  tenantId: number,
  promptId: string,
): Promise<EventRow[]> {
  return rows<EventRow>(sql`
    select id, ${TS} as at, event_name, service_name, user_email, session_id, attributes
    from otel_log_record
    where tenant_id = ${tenantId} and prompt_id = ${promptId}
    order by coalesce((attributes->>'event.sequence')::bigint, 0), ${TS}, id
    limit 500
  `);
}
