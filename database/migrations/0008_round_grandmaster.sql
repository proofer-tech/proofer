ALTER TABLE "proofer"."github_pull_request_review" RENAME COLUMN "created_at" TO "submitted_at";--> statement-breakpoint
DROP INDEX IF EXISTS "idx_ghprr_created_at";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghprr_submitted_at" ON "proofer"."github_pull_request_review" ("submitted_at");--> statement-breakpoint
ALTER TABLE "proofer"."github_pull_request_review" DROP COLUMN IF EXISTS "updated_at";