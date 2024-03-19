CREATE TABLE IF NOT EXISTS "proofer"."workspace_to_github_installation" (
	"uuid1" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" integer NOT NULL,
	"installation_id" integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "wtgi_uidx_bridge" ON "proofer"."workspace_to_github_installation" ("workspace_id","installation_id");