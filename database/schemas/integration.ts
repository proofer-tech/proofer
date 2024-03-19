import { prooferSchema } from "@/database/engine";
import {
  varchar,
  serial,
  uniqueIndex,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const Integration = prooferSchema.table("integration", {
  id: serial("id").primaryKey(),
  categoryStr: varchar("category_str", { length: 16 }).notNull(),

  slug: varchar("slug", { length: 16 })
    .notNull()
    .unique("integration_uidx_slug"),
  name: varchar("name", { length: 16 }).notNull(),
  description: text("description").default(""),

  iconUrl: text("icon_url"),
  isImplemented: boolean("is_implemented").default(false),
});

export const IntegrationTag = prooferSchema.table("integration_tag", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 16 }).notNull().unique("itt_uidx_name"),
  color: varchar("color", { length: 16 }).default("gray"),
});

export const IntegrationToTag = prooferSchema.table(
  "integration_to_tag",
  {
    id: serial("id").primaryKey(),
    integrationId: integer("integration_id")
      .notNull()
      .references(() => Integration.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => IntegrationTag.id),
  },
  (table) => {
    return {
      nameIdx: uniqueIndex("ittt_uidx_bridge").on(
        table.integrationId,
        table.tagId,
      ),
    };
  },
);
