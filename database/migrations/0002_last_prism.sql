CREATE TABLE IF NOT EXISTS "proofer"."workspace_member" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"is_manager" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "email_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "slug_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_email" ON "proofer"."user" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_slug" ON "proofer"."workspace" ("slug");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."workspace_member" ADD CONSTRAINT "workspace_member_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "proofer"."workspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."workspace_member" ADD CONSTRAINT "workspace_member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
