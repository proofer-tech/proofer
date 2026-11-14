/**
 * @jest-environment node
 */
import { buildReplay } from "./replay";

const ev = (
  id: number,
  event_name: string,
  seq: number,
  attrs: Record<string, unknown> = {},
) => ({
  id,
  at: "2026-11-14T15:00:00.000Z",
  event_name,
  attributes: {
    "event.timestamp": `2026-11-14T15:00:${String(seq).padStart(2, "0")}.000Z`,
    "event.sequence": seq,
    ...attrs,
  },
});

describe("buildReplay", () => {
  it("프롬프트, 툴, 응답을 시간 순서대로 채팅 항목으로 만든다", () => {
    const items = buildReplay([
      ev(4, "assistant_response", 4, { response: "끝났습니다", model: "m" }),
      ev(1, "user_prompt", 1, { prompt: "파일 정리해줘", prompt_length: 7 }),
      ev(2, "tool_decision", 2, {
        tool_use_id: "t1",
        decision: "accept",
        source: "config",
      }),
      ev(3, "tool_result", 3, {
        tool_use_id: "t1",
        tool_name: "Bash",
        success: "true",
        duration_ms: 120,
        tool_input: '{"command":"ls"}',
      }),
    ]);
    expect(items.map((i) => i.kind)).toEqual(["user", "tool", "assistant"]);
    expect(items[0]).toMatchObject({ text: "파일 정리해줘", length: 7 });
    expect(items[1]).toMatchObject({
      name: "Bash",
      success: true,
      decision: "accept",
      decisionSource: "config",
      input: '{"command":"ls"}',
    });
    expect(items[2]).toMatchObject({ text: "끝났습니다" });
  });

  it("<REDACTED> 는 본문 없음(null)으로 바꾸고 길이는 남긴다", () => {
    const [u, a] = buildReplay([
      ev(1, "user_prompt", 1, { prompt: "<REDACTED>", prompt_length: 42 }),
      ev(2, "assistant_response", 2, {
        response: "<REDACTED>",
        response_length: 900,
      }),
    ]);
    expect(u).toMatchObject({ kind: "user", text: null, length: 42 });
    expect(a).toMatchObject({ kind: "assistant", text: null, length: 900 });
  });

  it("연속된 시스템 이벤트는 한 묶음으로 접는다", () => {
    const items = buildReplay([
      ev(1, "plugin_loaded", 1, { "plugin.name": "a" }),
      ev(2, "mcp_server_connection", 2, { status: "connected" }),
      ev(3, "user_prompt", 3, { prompt: "hi" }),
      ev(4, "hook_execution_start", 4, { hook_event: "Stop" }),
    ]);
    expect(items.map((i) => i.kind)).toEqual(["system", "user", "system"]);
    expect(items[0]).toMatchObject({
      events: [
        { name: "plugin_loaded", detail: "a" },
        { name: "mcp_server_connection", detail: "connected" },
      ],
    });
  });

  it("결과 없이 거부된 툴은 거부 항목으로 남긴다", () => {
    const [t] = buildReplay([
      ev(1, "tool_decision", 1, {
        tool_use_id: "t9",
        tool_name: "Write",
        decision: "reject",
        source: "user_reject",
      }),
    ]);
    expect(t).toMatchObject({
      kind: "tool",
      name: "Write",
      decision: "reject",
      success: false,
    });
  });
});
