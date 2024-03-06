import { PathTree } from "@/app/app/components/types";
import { IconApps, IconChalkboard, IconUsers } from "@tabler/icons-react";

export const settingsPathTree: PathTree = {
  workspace: {
    title: "워크스페이스 설정",
    isImplemented: true,
    tablerIcon: IconChalkboard,
    component: <>구현중입니다.</>,
  },
  members: {
    title: "멤버 관리",
    isImplemented: true,
    tablerIcon: IconUsers,
    component: <>구현중입니다.</>,
  },
  integrations: {
    title: "연결된 앱 관리",
    isImplemented: true,
    tablerIcon: IconApps,
    component: <>구현중입니다.</>,
  },
};
