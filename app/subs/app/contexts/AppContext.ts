"use client";
import { createContext } from "react";
import { InferSelectModel } from "drizzle-orm";
import { Workspace, WorkspaceMember } from "@/database/workspace/schema";
import { UserDto } from "@/app/subs/app/dto/user";

interface Workspace {
  instance: InferSelectModel<typeof Workspace>;
  member?: InferSelectModel<typeof WorkspaceMember>;
}
interface AppProps {
  user?: UserDto;
  workspace?: Workspace;
}

const AppContext = createContext<AppProps>({});
export default AppContext;
