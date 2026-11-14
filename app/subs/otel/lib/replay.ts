// 세션의 이벤트를 채팅 화면처럼 보여줄 항목으로 바꾼다. DB 를 모르는 순수 함수라 테스트한다.

const REDACTED = "<REDACTED>";
const text = (v: unknown): string | null =>
  typeof v === "string" && v !== "" && v !== REDACTED ? v : null;
const num = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
};

export type ReplayEventInput = {
  id: number;
  at: string | Date;
  event_name: string | null;
  attributes: Record<string, unknown>;
};

export type ReplayItem =
  | {
      kind: "user";
      key: string;
      at: string;
      text: string | null;
      length: number | null;
      promptId: string | null;
    }
  | {
      kind: "assistant";
      key: string;
      at: string;
      text: string | null;
      length: number | null;
      model: string | null;
    }
  | {
      kind: "tool";
      key: string;
      at: string;
      name: string;
      success: boolean | null;
      durationMs: number | null;
      input: string | null;
      error: string | null;
      decision: string | null;
      decisionSource: string | null;
    }
  | {
      kind: "api";
      key: string;
      at: string;
      model: string | null;
      inputTokens: number;
      outputTokens: number;
      cacheReadTokens: number;
      costUsd: number;
      durationMs: number | null;
    }
  | {
      kind: "error";
      key: string;
      at: string;
      message: string | null;
      status: string | null;
      model: string | null;
    }
  | {
      kind: "system";
      key: string;
      at: string;
      events: { id: number; name: string; detail: string | null }[];
    };

const iso = (v: string | Date) => new Date(v).toISOString();

function eventTime(e: ReplayEventInput): number {
  const ts = e.attributes["event.timestamp"];
  const t = typeof ts === "string" ? Date.parse(ts) : NaN;
  return Number.isFinite(t) ? t : new Date(e.at).getTime();
}

export function sortEvents<T extends ReplayEventInput>(events: T[]): T[] {
  return [...events].sort((a, b) => {
    const dt = eventTime(a) - eventTime(b);
    if (dt !== 0) return dt;
    const sa = num(a.attributes["event.sequence"]) ?? 0;
    const sb = num(b.attributes["event.sequence"]) ?? 0;
    return sa - sb || a.id - b.id;
  });
}

function systemDetail(e: ReplayEventInput): string | null {
  const a = e.attributes;
  return (
    text(a["plugin.name"]) ??
    text(a["hook_event"]) ??
    text(a["status"]) ??
    text(a["managed_settings.trigger"]) ??
    null
  );
}

export function buildReplay(input: ReplayEventInput[]): ReplayItem[] {
  const events = sortEvents(input);
  const items: ReplayItem[] = [];
  // tool_use_id 별 권한 결정. tool_result 에 붙이고, 결과 없이 거부된 것만 따로 보인다.
  const decisions = new Map<string, ReplayEventInput>();
  const resulted = new Set<string>();
  for (const e of events) {
    const id = text(e.attributes["tool_use_id"]);
    if (e.event_name === "tool_decision" && id) decisions.set(id, e);
    if (e.event_name === "tool_result" && id) resulted.add(id);
  }

  let system: Extract<ReplayItem, { kind: "system" }> | null = null;
  const flushSystem = () => {
    if (system) items.push(system);
    system = null;
  };

  for (const e of events) {
    const a = e.attributes;
    const at = iso(new Date(eventTime(e)));
    const key = String(e.id);
    switch (e.event_name) {
      case "user_prompt":
        flushSystem();
        items.push({
          kind: "user",
          key,
          at,
          text: text(a["prompt"]) ?? text(a["prompt_text"]),
          length: num(a["prompt_length"]),
          promptId: text(a["prompt.id"]),
        });
        break;
      case "assistant_response":
        flushSystem();
        items.push({
          kind: "assistant",
          key,
          at,
          text: text(a["response"]),
          length: num(a["response_length"]),
          model: text(a["model"]),
        });
        break;
      case "tool_result": {
        flushSystem();
        const id = text(a["tool_use_id"]);
        const d = id ? decisions.get(id) : undefined;
        const success = a["success"];
        items.push({
          kind: "tool",
          key,
          at,
          name: text(a["tool_name"]) ?? "(unknown)",
          success:
            success === "true" || success === true
              ? true
              : success === "false" || success === false
                ? false
                : null,
          durationMs: num(a["duration_ms"]),
          input: text(a["tool_input"]) ?? text(a["tool_parameters"]),
          error: text(a["error"]),
          decision: text(d?.attributes["decision"]) ?? text(a["decision_type"]),
          decisionSource:
            text(d?.attributes["source"]) ?? text(a["decision_source"]),
        });
        break;
      }
      case "tool_decision": {
        const id = text(a["tool_use_id"]);
        if (id && resulted.has(id)) break;
        if (text(a["decision"]) !== "reject") break;
        flushSystem();
        items.push({
          kind: "tool",
          key,
          at,
          name: text(a["tool_name"]) ?? "(unknown)",
          success: false,
          durationMs: null,
          input: null,
          error: null,
          decision: "reject",
          decisionSource: text(a["source"]),
        });
        break;
      }
      case "api_request":
        flushSystem();
        items.push({
          kind: "api",
          key,
          at,
          model: text(a["model"]),
          inputTokens: num(a["input_tokens"]) ?? 0,
          outputTokens: num(a["output_tokens"]) ?? 0,
          cacheReadTokens: num(a["cache_read_tokens"]) ?? 0,
          costUsd: num(a["cost_usd"]) ?? 0,
          durationMs: num(a["duration_ms"]),
        });
        break;
      case "api_error":
        flushSystem();
        items.push({
          kind: "error",
          key,
          at,
          message: text(a["error"]),
          status: text(a["status_code"]),
          model: text(a["model"]),
        });
        break;
      default:
        if (!system) system = { kind: "system", key, at, events: [] };
        system.events.push({
          id: e.id,
          name: e.event_name ?? "(none)",
          detail: systemDetail(e),
        });
    }
  }
  flushSystem();
  return items;
}
