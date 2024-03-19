import { prooferSchema } from "@/database/engine";
import {
  integer,
  varchar,
  serial,
  text,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const WorkspaceToGitHubInstallation = prooferSchema.table(
  "workspace_to_github_installation",
  {
    id: serial("id").primaryKey(),
    uuid: uuid("uuid1").primaryKey().defaultRandom(),
    workspace_id: integer("workspace_id").notNull(),
    installation_id: integer("installation_id"),
  },
  (table) => {
    return {
      bridgeUidx: uniqueIndex("wtgi_uidx_bridge").on(
        table.workspace_id,
        table.installation_id,
      ),
    };
  },
);
export const GitHubInstallation = prooferSchema.table("github_installation", {
  id: serial("id").primaryKey(),
  installation_id: integer("installation_id")
    .notNull()
    .unique("ghi_uidx_installation_id"),
  avatar_url: text("avatar_url"),
  name: varchar("name", { length: 100 }).notNull(),
});

export const GitHubRepository = prooferSchema.table("github_repository", {
  id: serial("id").primaryKey(),
  installation_id: integer("installation_id")
    .notNull()
    .references(() => GitHubInstallation.installation_id),
  full_name: varchar("full_name", { length: 140 }).notNull(),
  html_url: varchar("html_url", { length: 256 }).notNull(),
  description: text("description"),
  visibility: varchar("visibility", { length: 8 }).notNull(),
});
