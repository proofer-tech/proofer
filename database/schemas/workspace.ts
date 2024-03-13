import { prooferSchema } from "@/database/engine";
import {
  boolean,
  integer,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { User } from "@/database/schemas/auth";

export const Workspace = prooferSchema.table(
  "workspace",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
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
