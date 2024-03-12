import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import "dotenv/config";
import { db } from "../engine.js";

async function main() {
  await migrate(db, {
    migrationsFolder: "./database/migrations",
  });
  console.log("Migration completed");
  process.exit(0);
}

main().catch((error) => {
  console.error("Migration failed");
  console.log(error);
  process.exit(1);
});
