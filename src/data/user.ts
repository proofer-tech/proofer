import { dz } from "@/database/engine";
import { User } from "@/database/schemas/auth";
import { eq, InferSelectModel } from "drizzle-orm";
import { Auth0Client } from "@auth0/nextjs-auth0/server";

const auth0 = new Auth0Client();

export type UserDto = {
  email?: string;
  email_verified?: boolean;
  name?: string;
  nickname?: string;
  picture?: string;
  sub?: string;
  updated_at?: string;
} & InferSelectModel<typeof User>;

export async function findUserByEmail(
  email: string,
): Promise<InferSelectModel<typeof User> | undefined> {
  const userRecords = await dz.select().from(User).where(eq(User.email, email));
  return userRecords[0];
}

export async function findUserFromSession(): Promise<UserDto | undefined> {
  const session = await auth0.getSession();
  if (!session?.user?.email) return;

  const userRecords = await dz
    .select()
    .from(User)
    .where(eq(User.email, session.user.email));
  const dbUser = userRecords[0];
  if (!dbUser) return;

  return Object.assign(dbUser, session.user) as UserDto;
}
