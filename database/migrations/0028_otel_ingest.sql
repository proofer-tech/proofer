CREATE TABLE "otel_log_record" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"tenant_id" integer NOT NULL,
	"received_at" timestamp DEFAULT now() NOT NULL,
	"observed_at" timestamp with time zone,
	"service_name" varchar(128),
	"event_name" varchar(128),
	"session_id" varchar(128),
	"prompt_id" varchar(128),
	"user_email" varchar(320),
	"severity" varchar(32),
	"body" text,
	"attributes" jsonb NOT NULL,
	"resource" jsonb NOT NULL,
	"scope" jsonb
);
--> statement-breakpoint
CREATE TABLE "otel_raw_batch" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"tenant_id" integer NOT NULL,
	"signal" varchar(16) NOT NULL,
	"payload" jsonb NOT NULL,
	"received_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "otel_tenant" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(64) NOT NULL,
	"name" text NOT NULL,
	"token_hash" varchar(64) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"disabled_at" timestamp,
	CONSTRAINT "otel_tenant_slug_unique" UNIQUE("slug"),
	CONSTRAINT "otel_tenant_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
ALTER TABLE "otel_log_record" ADD CONSTRAINT "otel_log_record_tenant_id_otel_tenant_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."otel_tenant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "otel_raw_batch" ADD CONSTRAINT "otel_raw_batch_tenant_id_otel_tenant_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."otel_tenant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "otel_log_record_tenant_time_idx" ON "otel_log_record" USING btree ("tenant_id","observed_at");--> statement-breakpoint
CREATE INDEX "otel_log_record_tenant_event_idx" ON "otel_log_record" USING btree ("tenant_id","event_name");--> statement-breakpoint
CREATE INDEX "otel_log_record_session_idx" ON "otel_log_record" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "otel_log_record_prompt_idx" ON "otel_log_record" USING btree ("prompt_id");--> statement-breakpoint
CREATE INDEX "otel_raw_batch_tenant_idx" ON "otel_raw_batch" USING btree ("tenant_id","received_at");