import { db } from "@/database/engine";
import { User } from "@/database/auth/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  const users = await db.select().from(User).where(eq(User.email, email));
  return users[0];
}
