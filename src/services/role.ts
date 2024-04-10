import { WorkspaceRole } from "@/database/schemas/workspace";

export function canManageWorkspace(role?: string | null) {
  return role === WorkspaceRole.OWNER || role === WorkspaceRole.MANAGER;
}
