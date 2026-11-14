ALTER TABLE "otel_tenant" ADD COLUMN "vercel_client_id" varchar(128);--> statement-breakpoint
ALTER TABLE "otel_tenant" ADD COLUMN "vercel_team_id" varchar(64);--> statement-breakpoint
ALTER TABLE "otel_tenant" ADD CONSTRAINT "otel_tenant_vercel_client_id_unique" UNIQUE("vercel_client_id");