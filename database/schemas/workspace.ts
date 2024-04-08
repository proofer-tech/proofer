import { schema } from "@/database/engine";
import {
  boolean,
  index,
  integer,
  serial,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { User } from "@/database/schemas/auth";
import { createEnumType } from "@/src/utils/drizzle";
export enum WorkspaceRole {
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  MEMBER = "MEMBER",
}
export const WorkspaceRoleEnum = createEnumType(
  "enum_workspace_role",
  WorkspaceRole,
);

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
  user_id: integer("user_id").references(() => User.id),
  role: WorkspaceRoleEnum("role").default(WorkspaceRole.MEMBER),

  nickname: varchar("nickname", { length: 32 }).notNull().default(""),
  avatar_url: text("avatar_url"),
  // deprecated
  is_manager: boolean("is_manager").default(false).notNull(),
});

export const WorkspaceMemberEmail = schema.table(
  "workspace_member_email",
  {
    id: serial("id").primaryKey(),
    workspace_id: integer("workspace_id")
      .notNull()
      .references(() => Workspace.id),
    workspace_member_id: integer("workspace_member_id")
      .notNull()
      .references(() => WorkspaceMember.id),
    email: varchar("email", { length: 128 }).notNull(),
  },
  (table) => ({
    workspace_email_uidx: uniqueIndex("uidx_wme_workspace_id_email").on(
      table.workspace_id,
      table.email,
    ),
  }),
);
