import { dz } from "@/database/engine";
import {
  Integration,
  IntegrationTag,
  IntegrationToTag,
} from "@/database/schemas/integration";
import { eq, InferSelectModel } from "drizzle-orm";

export interface IntegrationDto extends InferSelectModel<typeof Integration> {
  tags: InferSelectModel<typeof IntegrationTag>[];
}
export async function getIntegrationDtoList(): Promise<IntegrationDto[]> {
  const querySet = await dz
    .select()
    .from(Integration)
    .leftJoin(
      IntegrationToTag,
      eq(IntegrationToTag.integration_id, Integration.id),
    )
    .leftJoin(IntegrationTag, eq(IntegrationTag.id, IntegrationToTag.tag_id));
  if (querySet.length === 0) return [];

  return Object.values(
    querySet.reduce<Record<number, IntegrationDto>>((integrationGroup, r) => {
      integrationGroup[r.integration.id] =
        integrationGroup[r.integration.id] ||
        Object.assign(r.integration, { tags: [] });

      if (r["integration_tag"])
        integrationGroup[r.integration.id].tags.push(r["integration_tag"]);

      return integrationGroup;
    }, {}),
  );
}
