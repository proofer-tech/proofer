ALTER TABLE "proofer"."github_issue" DROP CONSTRAINT "github_issue_updated_by_id_github_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_issue" ALTER COLUMN "issue_id" SET DATA TYPE varchar(32);--> statement-breakpoint
ALTER TABLE "proofer"."github_issue" DROP COLUMN IF EXISTS "updated_by_id";