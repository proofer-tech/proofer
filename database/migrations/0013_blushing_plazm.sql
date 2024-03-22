ALTER TABLE "proofer"."github_commit" DROP CONSTRAINT "uidx_ghc_commit_id";--> statement-breakpoint
ALTER TABLE "proofer"."github_commit" DROP COLUMN IF EXISTS "commit_id";