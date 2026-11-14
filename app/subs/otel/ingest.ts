import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";
import { NextRequest, NextResponse } from "next/server";
import { and, eq, isNull } from "drizzle-orm";
import { dz } from "@/database/engine";
import {
  OtelLogRecord,
  OtelRawBatch,
  OtelTenant,
} from "@/database/schemas/otel";
import { flattenLogs } from "@/app/subs/otel/otlp";

// Vercel 함수 요청 본문 한도(4.5MB) 안쪽으로 잡는다.
export const MAX_BODY_BYTES = 4 * 1024 * 1024;
const INSERT_CHUNK = 200;

export type Signal = "logs" | "traces" | "metrics";

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function bearerToken(req: Request): string | null {
  const header = req.headers.get("authorization") ?? "";
  const m = header.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : null;
}

async function findTenant(token: string) {
  const [tenant] = await dz
    .select({ id: OtelTenant.id, slug: OtelTenant.slug })
    .from(OtelTenant)
    .where(
      and(
        eq(OtelTenant.token_hash, hashToken(token)),
        isNull(OtelTenant.disabled_at),
      ),
    )
    .limit(1);
  return tenant ?? null;
}

async function readJson(req: NextRequest): Promise<unknown> {
  const buf = Buffer.from(await req.arrayBuffer());
  if (buf.byteLength > MAX_BODY_BYTES) throw new RangeError("too large");
  const encoding = req.headers.get("content-encoding") ?? "";
  const raw = encoding.includes("gzip") ? gunzipSync(buf) : buf;
  if (raw.byteLength > MAX_BODY_BYTES * 4) throw new RangeError("too large");
  return JSON.parse(raw.toString("utf8"));
}

// OTLP/HTTP 응답 규약: 성공은 200 + Export*ServiceResponse(JSON 빈 객체 허용),
// 503 은 익스포터가 재시도한다. 400/401/413/415 는 재시도하지 않는다.
// expectedSlug 가 있으면(/{tenant}/v1/...) 토큰의 테넌트와 경로의 테넌트가 같아야 한다.
export async function ingest(
  req: NextRequest,
  signal: Signal,
  expectedSlug?: string,
): Promise<NextResponse> {
  const token = bearerToken(req);
  if (!token) return new NextResponse(null, { status: 401 });

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("json")) {
    // protobuf 는 받지 않는다. 관리자 설정에서 OTLP 프로토콜을 http/json 으로 둔다.
    return NextResponse.json({ error: "use http/json" }, { status: 415 });
  }

  let tenant;
  try {
    tenant = await findTenant(token);
  } catch (error) {
    console.error("otel tenant lookup failed", error);
    return new NextResponse(null, { status: 503 });
  }
  if (!tenant) return new NextResponse(null, { status: 401 });
  if (expectedSlug && tenant.slug !== expectedSlug) {
    return new NextResponse(null, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await readJson(req);
  } catch (error) {
    const status = error instanceof RangeError ? 413 : 400;
    return new NextResponse(null, { status });
  }

  try {
    if (signal === "logs") {
      const rows = flattenLogs(payload as Parameters<typeof flattenLogs>[0]);
      if (rows.length === 0) {
        await dz
          .insert(OtelRawBatch)
          .values({ tenant_id: tenant.id, signal, payload });
      }
      for (let i = 0; i < rows.length; i += INSERT_CHUNK) {
        await dz
          .insert(OtelLogRecord)
          .values(
            rows
              .slice(i, i + INSERT_CHUNK)
              .map((r) => ({ ...r, tenant_id: tenant.id })),
          );
      }
    } else {
      await dz
        .insert(OtelRawBatch)
        .values({ tenant_id: tenant.id, signal, payload });
    }
  } catch (error) {
    console.error(`otel ${signal} insert failed`, error);
    return new NextResponse(null, { status: 503 });
  }

  return NextResponse.json({}, { status: 200 });
}
