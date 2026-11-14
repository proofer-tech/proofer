import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { dz } from "@/database/engine";

export const runtime = "nodejs";
export const maxDuration = 60;

// otel.proofer.tech 수신 데이터를 보관 기간(기본 90일)만 남기고 지운다.
// Vercel Cron 이 매일 부른다(vercel.json). CRON_SECRET 이 Authorization 헤더로 온다.
const DEFAULT_DAYS = 90;
const CHUNK = 5000;
const MAX_ROUNDS = 40;

function retentionDays(): number {
  const n = Number(process.env.OTEL_RETENTION_DAYS);
  return Number.isInteger(n) && n >= 7 ? n : DEFAULT_DAYS;
}

async function purge(
  table: "otel_log_record" | "otel_raw_batch",
  days: number,
) {
  let total = 0;
  for (let i = 0; i < MAX_ROUNDS; i++) {
    const res = await dz.execute(sql`
      delete from ${sql.identifier(table)}
      where id in (
        select id from ${sql.identifier(table)}
        where received_at < now() - make_interval(days => ${days})
        limit ${CHUNK}
      )
    `);
    const n = res.rowCount ?? 0;
    total += n;
    if (n < CHUNK) break;
  }
  return total;
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new NextResponse(null, { status: 401 });
  }
  const days = retentionDays();
  const logs = await purge("otel_log_record", days);
  const raw = await purge("otel_raw_batch", days);
  console.log(`otel retention: ${days}d, deleted log=${logs} raw=${raw}`);
  return NextResponse.json({
    days,
    deleted: { otel_log_record: logs, otel_raw_batch: raw },
  });
}
