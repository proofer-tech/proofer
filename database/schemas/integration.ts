import { schema } from "@/database/engine";
import {
  boolean,
  integer,
  serial,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const Integration = schema.table("integration", {
  id: serial("id").primaryKey(),
  category_str: varchar("category_str", { length: 16 }).notNull(),

  slug: varchar("slug", { length: 16 })
    .notNull()
    .unique("integration_uidx_slug"),
  name: varchar("name", { length: 16 }).notNull(),
  description: text("description").default(""),

  icon_url: text("icon_url"),
  is_implemented: boolean("is_implemented").default(false),
});

export const IntegrationTag = schema.table("integration_tag", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 16 }).notNull().unique("itt_uidx_name"),
  color: varchar("color", { length: 16 }).default("gray"),
});

export const IntegrationToTag = schema.table(
  "integration_to_tag",
  {
    id: serial("id").primaryKey(),
    integration_id: integer("integration_id")
      .notNull()
      .references(() => Integration.id),
    tag_id: integer("tag_id")
      .notNull()
      .references(() => IntegrationTag.id),
  },
  (table) => {
    return {
      name_idx: uniqueIndex("ittt_uidx_bridge").on(
        table.integration_id,
        table.tag_id,
      ),
    };
  },
);
