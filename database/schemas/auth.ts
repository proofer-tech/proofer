import { prooferSchema } from "@/database/engine";
import { varchar, serial } from "drizzle-orm/pg-core";

export const User = prooferSchema.table("user", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 64 }).notNull().unique("user_uidx_email"),
});
