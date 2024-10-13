import { dz } from "@/database/engine";
import { User } from "@/database/schemas/auth";
import { eq, InferSelectModel } from "drizzle-orm";
import { getSession, touchSession } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export type UserDto = UserProfile & InferSelectModel<typeof User>;

export async function findUserByEmail(
  email: string,
): Promise<InferSelectModel<typeof User> | undefined> {
  const userRecords = await dz.select().from(User).where(eq(User.email, email));
  return userRecords[0];
}

export async function findUserFromSession(): Promise<UserDto | undefined> {
  await touchSession();

  const session = await getSession();
  if (!session?.user) return;

  const userRecords = await dz
    .select()
    .from(User)
    .where(eq(User.email, session?.user?.email));
  const dbUser = userRecords[0];
  if (!dbUser) return;

  return Object.assign(dbUser, session.user) as UserDto;
}
