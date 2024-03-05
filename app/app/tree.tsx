import React from "react";
import {
  IconActivity,
  IconAntennaBars5,
  IconBulb,
  IconHeartbeat,
  IconLayoutDashboard,
  IconLayoutKanban,
  IconMessages,
  IconReorder,
  IconReportMoney,
  IconSettingsCode,
  IconTelescope,
  IconTransformPoint,
  TablerIconsProps,
} from "@tabler/icons-react";

interface Path {
  title: string;
  isImplemented?: boolean;
  tablerIcon?: (props: TablerIconsProps) => React.JSX.Element;
  subTree?: PathTree;
}

type PathTree = { [key: string]: Path };

export function renderPathIcon(path: Path, props: { [key: string]: any }) {
  const Component = path.tablerIcon;
  if (Component) return <Component {...props} />;
  return <></>;
}

export const pathTree: PathTree = {
  activity: {
    title: "Activity",
    isImplemented: true,
    tablerIcon: IconActivity,
    subTree: {
      dashboard: {
        title: "대시보드",
        isImplemented: true,
        tablerIcon: IconLayoutDashboard,
      },
      engineering: {
        title: "엔지니어링",
        isImplemented: true,
        tablerIcon: IconSettingsCode,
      },
      project: {
        title: "프로젝트",
        tablerIcon: IconLayoutKanban,
      },
      communication: {
        title: "커뮤니케이션",
        tablerIcon: IconMessages,
      },
    },
  },
  satisfaction: {
    title: "Satisfaction",
    tablerIcon: IconHeartbeat,
    subTree: {
      dashboard: {
        title: "대시보드",
        tablerIcon: IconLayoutDashboard,
      },
    },
  },
  throughput: {
    title: "Throughput",
    tablerIcon: IconAntennaBars5,
    subTree: {
      resources: {
        title: "리소스 현황",
        tablerIcon: IconReorder,
      },
      roi: {
        title: "ROI 계산",
        tablerIcon: IconReportMoney,
      },
    },
  },
  utility: {
    title: "Utility",
    isImplemented: true,
    tablerIcon: IconBulb,
    subTree: {
      "dora-metrics": {
        title: "DORA Metrics",
        isImplemented: true,
        tablerIcon: IconTransformPoint,
      },
      benchmark: {
        title: "업계 벤치마크",
        tablerIcon: IconTelescope,
      },
    },
  },
};
