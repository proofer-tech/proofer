/**
 * @jest-environment node
 */
import { anyValue, flattenLogs } from "./otlp";

const sample = {
  resourceLogs: [
    {
      resource: {
        attributes: [
          { key: "service.name", value: { stringValue: "cowork" } },
          { key: "os.type", value: { stringValue: "darwin" } },
        ],
      },
      scopeLogs: [
        {
          scope: { name: "com.anthropic.claude_code.events", version: "1.0" },
          logRecords: [
            {
              timeUnixNano: "1794667127041000000",
              body: { stringValue: "claude_code.api_request" },
              attributes: [
                { key: "event.name", value: { stringValue: "api_request" } },
                { key: "session.id", value: { stringValue: "s-1" } },
                { key: "prompt.id", value: { stringValue: "p-1" } },
                { key: "user.email", value: { stringValue: "a@b.c" } },
                { key: "input_tokens", value: { intValue: "1200" } },
                { key: "cost_usd", value: { doubleValue: 0.0123 } },
                {
                  key: "workspace.host_paths",
                  value: {
                    arrayValue: { values: [{ stringValue: "/Users/x/p" }] },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

describe("flattenLogs", () => {
  it("logRecord 한 건을 한 행으로 펼친다", () => {
    const [row] = flattenLogs(sample);
    expect(row.service_name).toBe("cowork");
    expect(row.event_name).toBe("api_request");
    expect(row.session_id).toBe("s-1");
    expect(row.prompt_id).toBe("p-1");
    expect(row.user_email).toBe("a@b.c");
    expect(row.body).toBe("claude_code.api_request");
    expect(row.attributes.input_tokens).toBe(1200);
    expect(row.attributes.cost_usd).toBe(0.0123);
    expect(row.attributes["workspace.host_paths"]).toEqual(["/Users/x/p"]);
    expect(row.observed_at?.toISOString()).toBe("2026-11-14T14:38:47.041Z");
    expect(row.scope?.name).toBe("com.anthropic.claude_code.events");
  });

  it("timeUnixNano 가 없으면 event.timestamp 를 쓴다", () => {
    const [row] = flattenLogs({
      resourceLogs: [
        {
          scopeLogs: [
            {
              logRecords: [
                {
                  attributes: [
                    {
                      key: "event.timestamp",
                      value: { stringValue: "2026-11-14T00:00:00.000Z" },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    expect(row.observed_at?.toISOString()).toBe("2026-11-14T00:00:00.000Z");
    expect(row.service_name).toBeNull();
  });

  it("빈 요청은 빈 배열", () => {
    expect(flattenLogs({})).toEqual([]);
  });
});

describe("anyValue", () => {
  it("kvlist 를 객체로 바꾼다", () => {
    expect(
      anyValue({
        kvlistValue: { values: [{ key: "a", value: { boolValue: true } }] },
      }),
    ).toEqual({ a: true });
  });
});
