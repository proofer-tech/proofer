import { InferSelectModel } from "drizzle-orm";
import { User } from "@/database/auth/schema";
import { UserProfile } from "@auth0/nextjs-auth0/src/client/use-user";

export type UserDto = UserProfile & InferSelectModel<typeof User>;
