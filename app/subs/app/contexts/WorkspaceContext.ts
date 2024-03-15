"use client";
import { createContext } from "react";
import { InferSelectModel } from "drizzle-orm";
import { Workspace, WorkspaceMember } from "@/database/schemas/workspace";
import { UserDto } from "@/app/subs/app/dto/user";

interface Workspace {
  instance: InferSelectModel<typeof Workspace>;
  member?: InferSelectModel<typeof WorkspaceMember>;
}
interface WorkspaceProps {
  isMounted: boolean;
  user?: UserDto;
  workspace?: Workspace;
}

const WorkspaceContext = createContext<WorkspaceProps>({ isMounted: false });
export default WorkspaceContext;
