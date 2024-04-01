import type { Config } from "drizzle-kit";
export default {
  schemaFilter: ["proofer"],
  schema: "./database/schemas/**/*.ts",
  out: "./database/migrations",
  driver: "pg",
  dbCredentials: {
    // @ts-ignore
    connectionString: process.env.POSTGRES_URL,
  },
  introspect: {
    casing: "camel",
  },
} satisfies Config;
