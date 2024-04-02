import { prooferSchema } from "@/database/engine";
import {
  integer,
  varchar,
  serial,
  text,
  uuid,
  uniqueIndex,
  timestamp,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";
import { Workspace } from "@/database/schemas/workspace";
import {
  GitHubInstallation,
  GitHubRepository,
  GitHubUser,
} from "@/database/schemas/github/raw";
import { GitHubEvent } from "@/src/github/types";
import { pgEnumFrom } from "@/src/utils/drizzle";

const EventType = pgEnumFrom("series_type", Object.values(GitHubEvent));
export const ProcessedGitHubTimeSeries = prooferSchema.table(
  "processed_github_time_series",
  {
    id: serial("id").primaryKey(),
    event_type: EventType("event_type").notNull(),
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
