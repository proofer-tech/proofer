import { InferSelectModel } from "drizzle-orm";
import { User } from "@/database/schemas/auth";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export type UserDto = UserProfile & InferSelectModel<typeof User>;
