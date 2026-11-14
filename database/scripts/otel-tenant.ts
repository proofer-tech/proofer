// OTLP 수신 테넌트를 만들거나 토큰을 재발급한다. 토큰 원문은 이 출력에서 한 번만 보인다.
//   pnpm tsx database/scripts/otel-tenant.ts <slug> [name]
// 이미 있는 slug 면 토큰만 새로 발급하고 이전 토큰은 즉시 무효가 된다.
import "dotenv/config";
import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { dz } from "../engine.js";
import { OtelTenant } from "../schemas/otel";
import { hashToken } from "../../app/subs/otel/ingest";

async function main() {
  const [slug, name] = process.argv.slice(2);
  if (!slug || !/^[a-z0-9-]{2,64}$/.test(slug)) {
    console.error("usage: otel-tenant.ts <slug: a-z0-9-> [name]");
    process.exit(1);
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
