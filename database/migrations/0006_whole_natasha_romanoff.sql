ALTER TABLE "proofer"."processed_github_time_series" DROP CONSTRAINT "processed_github_time_series_user_id_github_user_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."processed_github_time_series" DROP COLUMN IF EXISTS "user_id";