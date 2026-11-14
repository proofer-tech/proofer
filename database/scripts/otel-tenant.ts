// OTLP 수신 테넌트를 만들거나 토큰을 재발급한다. 토큰 원문은 이 출력에서 한 번만 보인다.
//   pnpm tsx database/scripts/otel-tenant.ts <slug> [name]
// 이미 있는 slug 면 토큰만 새로 발급하고 이전 토큰은 즉시 무효가 된다.
//
// 대시보드 로그인용 Vercel 앱을 연결할 때는 토큰을 건드리지 않는다:
//   pnpm tsx database/scripts/otel-tenant.ts <slug> --vercel-client-id cl_xxx [--vercel-team-id team_xxx]
// client secret 은 DB 가 아니라 OTEL_VERCEL_APPS 환경변수에 넣는다.
import "dotenv/config";
import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { dz } from "../engine.js";
import { OtelTenant } from "../schemas/otel";
import { hashToken } from "../../app/subs/otel/ingest";

// app/subs/otel/lib/tenant.ts 의 RESERVED_SLUGS 와 같다. 그 모듈은 next/headers 를 써서 스크립트에서 못 부른다.
const RESERVED_SLUGS = new Set(["v1", "auth", "api", "health"]);

function flag(args: string[], name: string): string | undefined {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

async function main() {
  const args = process.argv.slice(2);
  const [slug, name] = args.filter(
    (a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"),
  );
  const vercelClientId = flag(args, "--vercel-client-id");
  const vercelTeamId = flag(args, "--vercel-team-id");
  if (!slug || !/^[a-z0-9-]{2,64}$/.test(slug) || RESERVED_SLUGS.has(slug)) {
    console.error("usage: otel-tenant.ts <slug: a-z0-9-> [name]");
    process.exit(1);
  }
  if (vercelClientId) {
    const updated = await dz
      .update(OtelTenant)
      .set({
        vercel_client_id: vercelClientId,
        vercel_team_id: vercelTeamId ?? null,
      })
      .where(eq(OtelTenant.slug, slug))
      .returning({ id: OtelTenant.id });
    if (updated.length === 0) {
      console.error(`tenant "${slug}" not found. create it first`);
      process.exit(1);
    }
    console.log(`linked Vercel app ${vercelClientId} to tenant "${slug}"`);
    process.exit(0);
  }

  const token = `otel_${slug}_${randomBytes(24).toString("base64url")}`;
  const token_hash = hashToken(token);

  const [existing] = await dz
    .select({ id: OtelTenant.id })
    .from(OtelTenant)
    .where(eq(OtelTenant.slug, slug));

  if (existing) {
    await dz
      .update(OtelTenant)
      .set({ token_hash, disabled_at: null })
      .where(eq(OtelTenant.id, existing.id));
    console.log(`rotated token for tenant "${slug}"`);
  } else {
    await dz
      .insert(OtelTenant)
      .values({ slug, name: name ?? slug, token_hash });
    console.log(`created tenant "${slug}"`);
  }
  console.log(`OTLP headers: Authorization=Bearer ${token}`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
