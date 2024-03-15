import { prooferSchema } from "@/database/engine";
import {
  boolean,
  integer,
  serial,
  text,
  char,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { User } from "@/database/schemas/auth";

export const Workspace = prooferSchema.table(
  "workspace",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 64 }).notNull(),
    name: varchar("name", { length: 16 }).default("").notNull(),
    ownerId: integer("owner_id")
      .notNull()
      .references(() => User.id),

    logoUrl: text("logo_url"),
  },
  (table) => {
    return {
      slugIdx: uniqueIndex("idx_slug").on(table.slug),
    };
  },
);

export const WorkspaceMember = prooferSchema.table("workspace_member", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => Workspace.id),
  userId: integer("user_id")
    .notNull()
    .references(() => User.id),
  isManager: boolean("is_manager").default(false).notNull(),
});
