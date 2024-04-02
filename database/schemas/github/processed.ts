import { schema } from "@/database/engine";
import { varchar, serial, timestamp, index } from "drizzle-orm/pg-core";
import { Workspace } from "@/database/schemas/workspace";
import {
  GitHubInstallation,
  GitHubRepository,
  GitHubUser,
} from "@/database/schemas/github/raw";
import { GitHubEvent } from "@/src/github/types";
import { createEnumType } from "@/src/utils/drizzle";

export const GitHubEventEnum = createEnumType(
  "enum_github_event_type",
  GitHubEvent,
);
export const ProcessedGitHubTimeSeries = schema.table(
  "processed_github_time_series",
  {
    id: serial("id").primaryKey(),
    event: GitHubEventEnum("event"),
    reference_id: varchar("reference_id", { length: 64 }).notNull(),

    workspace_id: serial("workspace_id")
      .notNull()
      .references(() => Workspace.id, { onDelete: "cascade" }),
    installation_id: serial("installation_id")
      .notNull()
      .references(() => GitHubInstallation.id, { onDelete: "cascade" }),
    repository_id: serial("repository_id")
      .notNull()
      .references(() => GitHubRepository.id, { onDelete: "cascade" }),
    user_id: serial("user_id")
      .notNull()
      .references(() => GitHubUser.id),
    timestamp: timestamp("timestamp").notNull(),
  },
  (table) => ({
    idx_pgts_reference_id: index("reference_id_idx").on(table.reference_id),
  }),
);
