import { PathTree } from "@/app/subs/app/components/types";
import { IconApps, IconFolder, IconUsers } from "@tabler/icons-react";
import WorkspaceSettingsBody from "@/app/subs/app/settings/workspace/WorkspaceSettingsBody";
import MemberSettingsBody from "@/app/subs/app/settings/member/MemberSettingsBody";
import IntegrationSettingsBody from "@/app/subs/app/settings/integration/IntegrationSettingBody";

export const settingsPathTree: PathTree = {
  workspace: {
    title: "워크스페이스 설정",
    isImplemented: true,
    tablerIcon: IconFolder,
    component: <WorkspaceSettingsBody />,
  },
  members: {
    title: "멤버 관리",
    isImplemented: true,
    tablerIcon: IconUsers,
    component: <MemberSettingsBody />,
  },
  integrations: {
    title: "연결된 앱 관리",
    isImplemented: true,
    tablerIcon: IconApps,
    component: <IntegrationSettingsBody />,
  },
};
