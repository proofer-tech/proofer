import { Path } from "@/app/subs/app/components/types";
import { IconApps, IconFolder, IconUsers } from "@tabler/icons-react";
import WorkspaceSettingsBody from "@/app/subs/app/settings/workspace/WorkspaceSettingsBody";
import MemberSettingsBody from "@/app/subs/app/settings/member/MemberSettingsBody";
import IntegrationSettingsBody from "@/app/subs/app/settings/integration/IntegrationSettingBody";

export interface SettingPath extends Path {
  subTree?: SettingTree;
  canSubmit: boolean;
}

export type SettingTree = { [key: string]: SettingPath };
export const settingTree: SettingTree = {
  workspace: {
    title: "Workspace",
    isImplemented: true,
    tablerIcon: IconFolder,
    component: WorkspaceSettingsBody,
    canSubmit: true,
  },
  members: {
    title: "Members",
    isImplemented: true,
    tablerIcon: IconUsers,
    component: MemberSettingsBody,
    canSubmit: false,
  },
  integrations: {
    title: "Integrations",
    isImplemented: true,
    tablerIcon: IconApps,
    component: IntegrationSettingsBody,
    canSubmit: false,
  },
};
