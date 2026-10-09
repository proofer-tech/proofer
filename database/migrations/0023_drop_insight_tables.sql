DROP TABLE IF EXISTS "proofer"."user" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."processed_github_pull_request" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."processed_github_time_series" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."github_commit" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."github_installation" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."github_issue" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."github_issue_comment" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."github_pull_request" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."github_pull_request_review" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."github_pull_request_review_comment" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."github_repository" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."github_user" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."workspace_to_github_installation" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."integration" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."integration_tag" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."integration_to_tag" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."workspace" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."workspace_member" CASCADE;
--> statement-breakpoint
DROP TABLE IF EXISTS "proofer"."workspace_member_email" CASCADE;
--> statement-breakpoint
DROP TYPE IF EXISTS "proofer"."enum_github_event_type";
--> statement-breakpoint
DROP TYPE IF EXISTS "proofer"."enum_workspace_role";
