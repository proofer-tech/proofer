import type { Config } from "drizzle-kit";
export default {
  schema: "./database/schemas/**/*.ts",
  out: "./database/migrations",
  driver: "pg",
  dbCredentials: {
    // @ts-ignore
    connectionString: process.env.POSTGRES_URL,
  },
} satisfies Config;
