import { schema } from "@/database/engine";
import {
  bigserial,
  index,
  integer,
  jsonb,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// OTLP 수신 테넌트. 테넌트마다 수집 토큰이 하나 있고 원문 대신 sha256 해시만 둔다.
// 토큰 발급은 database/scripts/otel-tenant.ts 로 한다.
export const OtelTenant = schema.table("otel_tenant", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  name: text("name").notNull(),
  token_hash: varchar("token_hash", { length: 64 }).notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  disabled_at: timestamp("disabled_at"),
});

// OTLP logs 의 logRecord 한 건이 한 행이다. Cowork 와 Office Agents 의 이벤트가 여기 쌓인다.
// 자주 거르는 값만 컬럼으로 뽑고 나머지는 attributes / resource 에 그대로 둔다.
export const OtelLogRecord = schema.table(
  "otel_log_record",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    tenant_id: integer("tenant_id")
      .notNull()
      .references(() => OtelTenant.id),
    received_at: timestamp("received_at").defaultNow().notNull(),
    observed_at: timestamp("observed_at", { withTimezone: true }),
    service_name: varchar("service_name", { length: 128 }),
    event_name: varchar("event_name", { length: 128 }),
    session_id: varchar("session_id", { length: 128 }),
    prompt_id: varchar("prompt_id", { length: 128 }),
    user_email: varchar("user_email", { length: 320 }),
    severity: varchar("severity", { length: 32 }),
    body: text("body"),
    attributes: jsonb("attributes").notNull(),
    resource: jsonb("resource").notNull(),
    scope: jsonb("scope"),
  },
  (t) => [
    index("otel_log_record_tenant_time_idx").on(t.tenant_id, t.observed_at),
    index("otel_log_record_tenant_event_idx").on(t.tenant_id, t.event_name),
    index("otel_log_record_session_idx").on(t.session_id),
    index("otel_log_record_prompt_idx").on(t.prompt_id),
  ],
);

// logs 가 아닌 신호(traces, metrics)와 해석하지 못한 배치는 원문 그대로 남긴다.
// 무엇이 오는지 확인한 뒤 전용 테이블로 펼친다.
export const OtelRawBatch = schema.table(
  "otel_raw_batch",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    tenant_id: integer("tenant_id")
      .notNull()
      .references(() => OtelTenant.id),
    signal: varchar("signal", { length: 16 }).notNull(),
    payload: jsonb("payload").notNull(),
    received_at: timestamp("received_at").defaultNow().notNull(),
  },
  (t) => [index("otel_raw_batch_tenant_idx").on(t.tenant_id, t.received_at)],
);
