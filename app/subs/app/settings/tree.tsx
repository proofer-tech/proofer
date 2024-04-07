import { Path, PathTree } from "@/app/subs/app/components/types";
import {
  IconApps,
  IconFolder,
  IconUsers,
  TablerIconsProps,
} from "@tabler/icons-react";
import WorkspaceSettingsBody from "@/app/subs/app/settings/workspace/WorkspaceSettingsBody";
import MemberSettingsBody from "@/app/subs/app/settings/member/MemberSettingsBody";
import IntegrationSettingsBody from "@/app/subs/app/settings/integration/IntegrationSettingBody";
import React from "react";

export interface SettingPath extends Path {
  subTree?: SettingTree;
  canSubmit: boolean;
}

export type SettingTree = { [key: string]: SettingPath };
export const settingTree: SettingTree = {
  workspace: {
    title: "워크스페이스 설정",
    isImplemented: true,
    tablerIcon: IconFolder,
    component: WorkspaceSettingsBody,
    canSubmit: true,
  },
  members: {
    title: "멤버 관리",
    isImplemented: true,
    tablerIcon: IconUsers,
    component: MemberSettingsBody,
    canSubmit: false,
  },
  integrations: {
    title: "연결된 앱 관리",
    isImplemented: true,
    tablerIcon: IconApps,
    component: IntegrationSettingsBody,
    canSubmit: false,
  },
};
