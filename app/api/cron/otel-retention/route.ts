import { gzipSync } from "node:zlib";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { put } from "@vercel/blob";
import { dz } from "@/database/engine";

export const runtime = "nodejs";
export const maxDuration = 300;

// otel.proofer.tech 수신 데이터 중 보관 기간(기본 90일)이 지난 행을 지우지 않고
// Vercel Blob(private 스토어 proofer-otel-archive)으로 옮긴다. 올라간 것을 확인한 행만 DB 에서 뺀다.
//   otel/{tenant}/{yyyy}/{mm}/{dd}/{table}-{첫 id}-{끝 id}.ndjson.gz
// Vercel Cron 이 매일 부른다(vercel.json). CRON_SECRET 이 Authorization 헤더로 온다.
const DEFAULT_DAYS = 90;
const CHUNK = 5000;
const MAX_ROUNDS = 20;

type Table = "otel_log_record" | "otel_raw_batch";
type Row = {
  id: number;
  tenant_id: number;
  slug: string;
  day: string;
} & Record<string, unknown>;

function retentionDays(): number {
  const n = Number(process.env.OTEL_RETENTION_DAYS);
  return Number.isInteger(n) && n >= 7 ? n : DEFAULT_DAYS;
}

async function archiveChunk(table: Table, days: number, token: string) {
  const res = await dz.execute(sql`
    select r.*, t.slug, to_char(r.received_at, 'YYYY/MM/DD') as day
    from ${sql.identifier(table)} r
    join otel_tenant t on t.id = r.tenant_id
    where r.received_at < now() - make_interval(days => ${days})
    order by r.id
    limit ${CHUNK}
  `);
  const rows = res.rows as Row[];
  if (rows.length === 0) return { rows: 0, files: 0 };

  const groups = new Map<string, Row[]>();
  for (const r of rows) {
    const key = `${r.slug}/${r.day}`;
    const g = groups.get(key);
    if (g) g.push(r);
    else groups.set(key, [r]);
  }

  let files = 0;
  for (const [key, group] of groups) {
    const first = group[0].id;
    const last = group[group.length - 1].id;
    const body = gzipSync(
      group
        .map(({ slug: _slug, day: _day, ...row }) => JSON.stringify(row))
        .join("\n") + "\n",
    );
    // 같은 행 묶음을 다시 올리면 같은 이름이라 덮어쓴다. 재시도해도 중복 파일이 생기지 않는다.
    await put(`otel/${key}/${table}-${first}-${last}.ndjson.gz`, body, {
      access: "private",
      token,
      contentType: "application/gzip",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    const ids = group.map((r) => r.id);
    await dz.execute(sql`
      delete from ${sql.identifier(table)}
      where id in (${sql.join(
        ids.map((id) => sql`${id}`),
        sql`, `,
      )})
    `);
    files++;
  }
  return { rows: rows.length, files };
}

async function archive(table: Table, days: number, token: string) {
  let rows = 0;
  let files = 0;
  for (let i = 0; i < MAX_ROUNDS; i++) {
    const r = await archiveChunk(table, days, token);
    rows += r.rows;
    files += r.files;
    if (r.rows < CHUNK) break;
  }
  return { rows, files };
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new NextResponse(null, { status: 401 });
  }
  const token = process.env.OTEL_ARCHIVE_READ_WRITE_TOKEN;
  if (!token) {
    console.error("otel archive: OTEL_ARCHIVE_READ_WRITE_TOKEN is not set");
    return NextResponse.json(
      { error: "archive store not configured" },
      { status: 500 },
    );
  }

  const days = retentionDays();
  try {
    const logs = await archive("otel_log_record", days, token);
    const raw = await archive("otel_raw_batch", days, token);
    console.log(
      `otel archive: ${days}d, log=${logs.rows} rows/${logs.files} files, raw=${raw.rows} rows/${raw.files} files`,
    );
    return NextResponse.json({
      days,
      otel_log_record: logs,
      otel_raw_batch: raw,
    });
  } catch (error) {
    // 업로드가 실패한 묶음은 지우지 않았으므로 다음 실행에서 다시 옮긴다.
    console.error("otel archive failed", error);
    return NextResponse.json({ error: "archive failed" }, { status: 500 });
  }
}
