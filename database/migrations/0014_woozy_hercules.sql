ALTER TABLE "proofer"."github_commit" DROP CONSTRAINT "github_commit_author_id_github_user_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_commit" DROP CONSTRAINT "github_commit_committer_id_github_user_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_issue" DROP CONSTRAINT "github_issue_user_id_github_user_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_issue" DROP CONSTRAINT "github_issue_assignee_id_github_user_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_issue" DROP CONSTRAINT "github_issue_updated_by_id_github_user_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_pull_request" DROP CONSTRAINT "github_pull_request_user_id_github_user_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_pull_request" DROP CONSTRAINT "github_pull_request_assignee_id_github_user_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_pull_request" DROP CONSTRAINT "github_pull_request_updated_by_id_github_user_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_pull_request_review" DROP CONSTRAINT "github_pull_request_review_user_id_github_user_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_pull_request_review_comment" DROP CONSTRAINT "github_pull_request_review_comment_user_id_github_user_id_fk";
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghc_created_at" ON "proofer"."github_commit" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghc_timestamp" ON "proofer"."github_commit" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghi_created_at" ON "proofer"."github_issue" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghi_timestamp" ON "proofer"."github_issue" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghpr_created_at" ON "proofer"."github_pull_request" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghpr_timestamp" ON "proofer"."github_pull_request" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghprr_created_at" ON "proofer"."github_pull_request_review" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghprr_timestamp" ON "proofer"."github_pull_request_review" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghprrc_created_at" ON "proofer"."github_pull_request_review_comment" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghprrc_timestamp" ON "proofer"."github_pull_request_review_comment" ("timestamp");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_commit" ADD CONSTRAINT "github_commit_author_id_github_user_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_commit" ADD CONSTRAINT "github_commit_committer_id_github_user_user_id_fk" FOREIGN KEY ("committer_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue" ADD CONSTRAINT "github_issue_user_id_github_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue" ADD CONSTRAINT "github_issue_assignee_id_github_user_user_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue" ADD CONSTRAINT "github_issue_updated_by_id_github_user_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request" ADD CONSTRAINT "github_pull_request_user_id_github_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request" ADD CONSTRAINT "github_pull_request_assignee_id_github_user_user_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request_review" ADD CONSTRAINT "github_pull_request_review_user_id_github_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request_review_comment" ADD CONSTRAINT "github_pull_request_review_comment_user_id_github_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "proofer"."github_pull_request" DROP COLUMN IF EXISTS "updated_by_id";