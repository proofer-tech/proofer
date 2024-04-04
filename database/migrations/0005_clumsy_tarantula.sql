DROP INDEX IF EXISTS "reference_id_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uidx_reference" ON "proofer"."processed_github_time_series" ("workspace_id","event","reference_id");