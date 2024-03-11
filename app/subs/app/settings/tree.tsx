import { PathTree } from "@/app/subs/app/components/types";
import { IconApps, IconFolder, IconUsers } from "@tabler/icons-react";

export const settingsPathTree: PathTree = {
  workspace: {
    title: "워크스페이스 설정",
    isImplemented: true,
    tablerIcon: IconFolder,
    component: <>1. 구현중입니다.</>,
  },
  members: {
    title: "멤버 관리",
    isImplemented: true,
    tablerIcon: IconUsers,
    component: <>2. 구현중입니다.</>,
  },
  integrations: {
    title: "연결된 앱 관리",
    isImplemented: true,
    tablerIcon: IconApps,
    component: <>3. 구현중입니다.</>,
  },
};
