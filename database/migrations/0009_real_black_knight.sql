DO $$ BEGIN
 CREATE TYPE "enum_workspace_role" AS ENUM('OWNER', 'MANAGER', 'MEMBER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "proofer"."workspace_member" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."workspace_member" ADD COLUMN "role" "enum_workspace_role" DEFAULT 'MEMBER';