ALTER TABLE "proofer"."processed_github_time_series" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."processed_github_time_series" ADD CONSTRAINT "processed_github_time_series_user_id_github_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
