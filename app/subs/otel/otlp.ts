// OTLP/HTTP JSON 해석. 스펙: https://opentelemetry.io/docs/specs/otlp/#json-protobuf-encoding
// int64 는 JSON 에서 문자열로 온다.

type AnyValue = {
  stringValue?: string;
  boolValue?: boolean;
  intValue?: string | number;
  doubleValue?: number;
  bytesValue?: string;
  arrayValue?: { values?: AnyValue[] };
  kvlistValue?: { values?: KeyValue[] };
};
type KeyValue = { key: string; value?: AnyValue };

type LogRecord = {
  timeUnixNano?: string | number;
  observedTimeUnixNano?: string | number;
  severityText?: string;
  body?: AnyValue;
  attributes?: KeyValue[];
  eventName?: string;
};

type ExportLogsRequest = {
  resourceLogs?: {
    resource?: { attributes?: KeyValue[] };
    scopeLogs?: {
      scope?: { name?: string; version?: string; attributes?: KeyValue[] };
      logRecords?: LogRecord[];
    }[];
  }[];
};

export type FlatLogRecord = {
  observed_at: Date | null;
  service_name: string | null;
  event_name: string | null;
  session_id: string | null;
  prompt_id: string | null;
  user_email: string | null;
  severity: string | null;
  body: string | null;
  attributes: Record<string, unknown>;
  resource: Record<string, unknown>;
  scope: Record<string, unknown> | null;
};

export function anyValue(v: AnyValue | undefined): unknown {
  if (!v) return null;
  if (v.stringValue !== undefined) return v.stringValue;
  if (v.boolValue !== undefined) return v.boolValue;
  if (v.intValue !== undefined) return Number(v.intValue);
  if (v.doubleValue !== undefined) return v.doubleValue;
  if (v.bytesValue !== undefined) return v.bytesValue;
  if (v.arrayValue) return (v.arrayValue.values ?? []).map(anyValue);
  if (v.kvlistValue) return keyValues(v.kvlistValue.values);
  return null;
}

export function keyValues(
  kvs: KeyValue[] | undefined,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const kv of kvs ?? []) out[kv.key] = anyValue(kv.value);
  return out;
}

function str(v: unknown): string | null {
  if (v === null || v === undefined || v === "") return null;
  return typeof v === "string" ? v : JSON.stringify(v);
}

function nanosToDate(n: string | number | undefined): Date | null {
  if (n === undefined || n === null || n === "" || n === "0" || n === 0) {
    return null;
  }
  const ms = Number(BigInt(n) / BigInt(1_000_000));
  return Number.isFinite(ms) ? new Date(ms) : null;
}

export function flattenLogs(req: ExportLogsRequest): FlatLogRecord[] {
  const rows: FlatLogRecord[] = [];
  for (const rl of req.resourceLogs ?? []) {
    const resource = keyValues(rl.resource?.attributes);
    for (const sl of rl.scopeLogs ?? []) {
      const scope = sl.scope
        ? {
            name: sl.scope.name ?? null,
            version: sl.scope.version ?? null,
            ...keyValues(sl.scope.attributes),
          }
        : null;
      for (const lr of sl.logRecords ?? []) {
        const attributes = keyValues(lr.attributes);
        const body = anyValue(lr.body);
        const eventTs = attributes["event.timestamp"];
        rows.push({
          observed_at:
            nanosToDate(lr.timeUnixNano) ??
            (typeof eventTs === "string" && !isNaN(Date.parse(eventTs))
              ? new Date(eventTs)
              : null) ??
            nanosToDate(lr.observedTimeUnixNano),
          service_name: str(resource["service.name"]),
          event_name: str(
            lr.eventName ||
              attributes["event.name"] ||
              attributes["event_name"],
          ),
          session_id: str(attributes["session.id"]),
          prompt_id: str(attributes["prompt.id"]),
          user_email: str(attributes["user.email"]),
          severity: lr.severityText || null,
          body: str(body),
          attributes,
          resource,
          scope,
        });
      }
    }
  }
  return rows;
}
