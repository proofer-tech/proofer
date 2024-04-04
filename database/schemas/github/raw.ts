import { schema } from "@/database/engine";
import {
  integer,
  varchar,
  serial,
  text,
  uuid,
  uniqueIndex,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const WorkspaceToGitHubInstallation = schema.table(
  "workspace_to_github_installation",
  {
    id: serial("id").primaryKey(),
    uuid: uuid("uuid1").defaultRandom().notNull(),
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

export const GitHubInstallation = schema.table("github_installation", {
  id: serial("id").primaryKey(),
  installation_id: integer("installation_id")
    .notNull()
    .unique("ghi_uidx_installation_id"),
  avatar_url: varchar("avatar_url", { length: 512 }),
  name: varchar("name", { length: 100 }).notNull(),
  bio: varchar("bio", { length: 128 }),
  blog: varchar("blog", { length: 128 }),

  target_type: varchar("target_type", { length: 32 }),
  repository_selection: varchar("repository_selection", { length: 16 }),

  updated_at: timestamp("updated_at").defaultNow().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const GitHubUser = schema.table("github_user", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().unique("ghu_uidx_user_id"),
  login: varchar("login", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }),
  avatar_url: varchar("avatar_url", { length: 512 }),
  html_url: varchar("html_url", { length: 512 }),
  type: varchar("type", { length: 32 }),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const GitHubRepository = schema.table(
  "github_repository",
  {
    id: serial("id").primaryKey(),
    installation_id: integer("installation_id")
      .notNull()
      .references(() => GitHubInstallation.installation_id, {
        onDelete: "cascade",
      }),
    repository_id: integer("repository_id").notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    full_name: varchar("full_name", { length: 100 }).notNull(),
    html_url: varchar("html_url", { length: 512 }).notNull(),
    description: text("description"),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    language: varchar("language", { length: 32 }),

    visibility: varchar("visibility", { length: 16 }),
  },
  (table) => ({
    bridgeUidx: uniqueIndex("uidx_ghr_bridge").on(
      table.installation_id,
      table.repository_id,
    ),
  }),
);

export const GitHubCommit = schema.table(
  "github_commit",
  {
    id: serial("id").primaryKey(),
    sha: varchar("sha", { length: 100 }).notNull().unique("uidx_ghc_sha"),

    repository_id: integer("repository_id")
      .notNull()
      .references(() => GitHubRepository.id, {
        onDelete: "cascade",
      }),
    author_id: integer("author_id")
      .notNull()
      .references(() => GitHubUser.user_id),
    committer_id: integer("committer_id")
      .notNull()
      .references(() => GitHubUser.user_id),
    message: text("message"),

    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),

    timestamp: timestamp("timestamp").notNull(),
  },
  (table) => ({
    created_at_idx: index("idx_ghc_created_at").on(table.created_at),
    timestamp_idx: index("idx_ghc_timestamp").on(table.timestamp),
  }),
);
export const GitHubIssue = schema.table(
  "github_issue",
  {
    id: serial("id").primaryKey(),
    repository_id: integer("repository_id")
      .notNull()
      .references(() => GitHubRepository.id, {
        onDelete: "cascade",
      }),
    issue_id: varchar("issue_id", { length: 32 })
      .notNull()
      .unique("uidx_ghi_issue_id"),
    number: integer("number").notNull(),
    state: varchar("state", { length: 16 }).notNull(),
    title: varchar("title", { length: 100 }).notNull(),
    body: text("body"),
    html_url: varchar("html_url", { length: 512 }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    closed_at: timestamp("closed_at"),
    user_id: integer("user_id")
      .notNull()
      .references(() => GitHubUser.user_id),
    assignee_id: integer("assignee_id").references(() => GitHubUser.user_id),

    timestamp: timestamp("timestamp").notNull(),
  },
  (table) => ({
    number_idx: index("idx_ghi_number").on(table.number),
    created_at_idx: index("idx_ghi_created_at").on(table.created_at),
    timestamp_idx: index("idx_ghi_timestamp").on(table.timestamp),
  }),
);

export const GitHubIssueComment = schema.table(
  "github_issue_comment",
  {
    id: serial("id").primaryKey(),
    issue_id: varchar("issue_id", { length: 32 })
      .notNull()
      .references(() => GitHubIssue.issue_id, {
        onDelete: "cascade",
      }),
    comment_id: integer("comment_id").notNull().unique("uidx_ghic_comment_id"),
    body: text("body"),
    html_url: varchar("html_url", { length: 512 }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    user_id: integer("user_id")
      .notNull()
      .references(() => GitHubUser.user_id),

    timestamp: timestamp("timestamp").notNull(),
  },
  (table) => ({
    created_at_idx: index("idx_ghic_created_at").on(table.created_at),
    timestamp_idx: index("idx_ghic_timestamp").on(table.timestamp),
  }),
);

export const GitHubPullRequest = schema.table(
  "github_pull_request",
  {
    id: serial("id").primaryKey(),
    repository_id: integer("repository_id")
      .notNull()
      .references(() => GitHubRepository.id, {
        onDelete: "cascade",
      }),
    pull_request_id: integer("pull_request_id")
      .notNull()
      .unique("uidx_ghpr_pull_request_id"),
    number: integer("number").notNull(),
    state: varchar("state", { length: 16 }).notNull(),
    title: varchar("title", { length: 100 }).notNull(),
    body: text("body"),
    html_url: varchar("html_url", { length: 512 }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    closed_at: timestamp("closed_at"),
    merged_at: timestamp("merged_at"),
    merge_commit_sha: varchar("merge_commit_sha", { length: 64 }),
    user_id: integer("user_id")
      .notNull()
      .references(() => GitHubUser.user_id),
    assignee_id: integer("assignee_id").references(() => GitHubUser.user_id),

    timestamp: timestamp("timestamp").notNull(),
  },
  (table) => ({
    number_idx: index("idx_ghpr_number").on(table.number),
    created_at_idx: index("idx_ghpr_created_at").on(table.created_at),
    timestamp_idx: index("idx_ghpr_timestamp").on(table.timestamp),
  }),
);

export const GitHubPullRequestReview = schema.table(
  "github_pull_request_review",
  {
    id: serial("id").primaryKey(),
    pull_request_id: integer("pull_request_id")
      .notNull()
      .references(() => GitHubPullRequest.pull_request_id, {
        onDelete: "cascade",
      }),

    review_id: integer("review_id").notNull().unique("uidx_ghprr_review_id"),
    state: varchar("state", { length: 16 }).notNull(),
    body: text("body"),
    html_url: varchar("html_url", { length: 512 }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    user_id: integer("user_id")
      .notNull()
      .references(() => GitHubUser.user_id),

    timestamp: timestamp("timestamp").notNull(),
  },
  (table) => ({
    created_at_idx: index("idx_ghprr_created_at").on(table.created_at),
    timestamp_idx: index("idx_ghprr_timestamp").on(table.timestamp),
  }),
);
export const GitHubPullRequestReviewComment = schema.table(
  "github_pull_request_review_comment",
  {
    id: serial("id").primaryKey(),
    review_comment_id: integer("review_comment_id")
      .notNull()
      .unique("uidx_ghprrc_review_comment_id"),
    pull_request_review_id: integer("pull_request_review_id")
      .notNull()
      .references(() => GitHubPullRequestReview.review_id, {
        onDelete: "cascade",
      }),
    body: text("body"),
    html_url: varchar("html_url", { length: 512 }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
    user_id: integer("user_id")
      .notNull()
      .references(() => GitHubUser.user_id),

    timestamp: timestamp("timestamp").notNull(),
  },
  (table) => ({
    created_at_idx: index("idx_ghprrc_created_at").on(table.created_at),
    timestamp_idx: index("idx_ghprrc_timestamp").on(table.timestamp),
  }),
);
