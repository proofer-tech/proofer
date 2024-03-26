"use client";
import { createContext } from "react";
import { InferSelectModel } from "drizzle-orm";
import { Workspace, WorkspaceMember } from "@/database/schemas/workspace";
import { UserDto } from "@/app/subs/app/dto/user";

interface WorkspaceProps {
  instance: InferSelectModel<typeof Workspace>;
  member?: InferSelectModel<typeof WorkspaceMember>;
}
interface ProoferInsightProps {
  isMounted: boolean;
  user?: UserDto;
  workspace?: WorkspaceProps;
}

const ProoferInsightContext = createContext<ProoferInsightProps>({
  isMounted: false,
});
export default ProoferInsightContext;
