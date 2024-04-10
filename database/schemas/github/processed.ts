import { schema } from "@/database/engine";
import {
  index,
  integer,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
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
      .references(() => GitHubInstallation.installation_id, {
        onDelete: "cascade",
      }),
    repository_id: serial("repository_id")
      .notNull()
      .references(() => GitHubRepository.id, {
        onDelete: "cascade",
      }),

    user_id: integer("user_id")
      .notNull()
      .references(() => GitHubUser.user_id, {}),
    timestamp: timestamp("timestamp").notNull(),
  },
  (table) => ({
    uidx_reference: uniqueIndex("uidx_reference").on(
      table.workspace_id,
      table.event,
      table.reference_id,
    ),
  }),
);

export const ProcessedGitHubPullRequest = schema.table(
  "processed_github_pull_request",
  {
    id: serial("id").primaryKey(),
    installation_id: integer("installation_id").notNull(),
    repository_id: integer("repository_id").notNull(),

    pull_request_id: integer("pull_request_id").unique(
      "uidx_pghpr_pull_request_id",
    ),
    pull_number: integer("number").notNull(),

    title: varchar("title", { length: 100 }).notNull(),
    html_url: varchar("html_url", { length: 512 }).notNull(),

    coding_time: integer("coding_time"),
    pickup_time: integer("pickup_time"),
    review_time: integer("review_time"),
    deploy_time: integer("deploy_time"),
  },
  (table) => ({
    idx_pull_number: index("idx_pghpr_pull_number").on(table.pull_number),
  }),
);
