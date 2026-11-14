import { cookies } from "next/headers";
import { and, eq, isNull } from "drizzle-orm";
import { dz } from "@/database/engine";
import { OtelTenant } from "@/database/schemas/otel";
import { generateSubdomainPath } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";
import {
  sessionCookie,
  verify,
  type Session,
} from "@/app/subs/otel/auth/session";

// otel.proofer.tech/{tenant}/{path}. tenant 는 otel_tenant.slug 다.
// "v1" 은 테넌트 없는 수신 경로(/v1/logs)라 slug 로 쓸 수 없다.
export const RESERVED_SLUGS = new Set(["v1", "auth", "api", "health"]);

export async function findTenant(slug: string) {
  if (RESERVED_SLUGS.has(slug)) return null;
  const [tenant] = await dz
    .select({
      id: OtelTenant.id,
      slug: OtelTenant.slug,
      name: OtelTenant.name,
      vercel_client_id: OtelTenant.vercel_client_id,
    })
    .from(OtelTenant)
    .where(and(eq(OtelTenant.slug, slug), isNull(OtelTenant.disabled_at)))
    .limit(1);
  return tenant ?? null;
}

export const tenantPath = (slug: string, path = "") =>
  generateSubdomainPath(`/${slug}${path}`, SUB_DOMAIN.otel);

export function publicOrigin(fallback: string): string {
  return process.env.OTEL_PUBLIC_ORIGIN || fallback;
}

// 세션이 이 테넌트 것인지까지 확인한다. 다른 테넌트 세션은 null.
export async function getSession(tenant: {
  id: number;
  slug: string;
}): Promise<Session | null> {
  const store = await cookies();
  const session = verify<Session>(store.get(sessionCookie(tenant.slug))?.value);
  if (!session || session.tenantId !== tenant.id) return null;
  return session;
}
