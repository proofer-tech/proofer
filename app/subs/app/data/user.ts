import { db } from "@/database/engine";
import { User } from "@/database/auth/schema";
import { eq, InferSelectModel } from "drizzle-orm";
import { getSession } from "@auth0/nextjs-auth0";
import { UserDto } from "@/app/subs/app/dto/user";

export async function findUserByEmail(
  email: string,
): Promise<InferSelectModel<typeof User> | undefined> {
  const userRecords = await db.select().from(User).where(eq(User.email, email));
  return userRecords[0];
}

export async function findUserFromSession(): Promise<UserDto | undefined> {
  const session = await getSession();
  if (!session?.user) return;

  const userRecords = await db
    .select()
    .from(User)
    .where(eq(User.email, session?.user?.email));
  const dbUser = userRecords[0];
  if (!dbUser) return;

  return Object.assign(dbUser, session.user) as UserDto;
}
