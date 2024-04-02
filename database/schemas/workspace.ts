import { schema } from "@/database/engine";
import { boolean, integer, serial, text, varchar } from "drizzle-orm/pg-core";
import { User } from "@/database/schemas/auth";

export const Workspace = schema.table("workspace", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique("workspace_uidx_slug"),
  name: varchar("name", { length: 16 }).default("").notNull(),
  owner_id: integer("owner_id")
    .notNull()
    .references(() => User.id),

  logo_url: text("logo_url"),
});

export const WorkspaceMember = schema.table("workspace_member", {
  id: serial("id").primaryKey(),
  workspace_id: integer("workspace_id")
    .notNull()
    .references(() => Workspace.id),
  user_id: integer("user_id")
    .notNull()
    .references(() => User.id),
  is_manager: boolean("is_manager").default(false).notNull(),
});
