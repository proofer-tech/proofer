CREATE TABLE IF NOT EXISTS "proofer"."workspace_member_email" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_id" integer NOT NULL,
	"workspace_member_id" integer NOT NULL,
	"email" varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uidx_wme_workspace_id_email" ON "proofer"."workspace_member_email" ("workspace_id","email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."workspace_member_email" ADD CONSTRAINT "workspace_member_email_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "proofer"."workspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."workspace_member_email" ADD CONSTRAINT "workspace_member_email_workspace_member_id_workspace_member_id_fk" FOREIGN KEY ("workspace_member_id") REFERENCES "proofer"."workspace_member"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
