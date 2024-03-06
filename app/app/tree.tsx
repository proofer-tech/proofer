import {
  IconActivity,
  IconAntennaBars5,
  IconBrandDeezer,
  IconBulb,
  IconClockCode,
  IconFocus2,
  IconHeartbeat,
  IconHourglassOff,
  IconInfoCircle,
  IconLayoutKanban,
  IconMessageCode,
  IconMessages,
  IconMoodSearch,
  IconReorder,
  IconReportMoney,
  IconTelescope,
  IconTimelineEventText,
  IconTransformPoint,
} from "@tabler/icons-react";
import { PathTree } from "@/app/app/components/types";
import { Alert } from "@mantine/core";

export const pathTree: PathTree = {
  activity: {
    title: "Activity",
    isImplemented: true,
    tablerIcon: IconActivity,
    subTree: {
      heatmap: {
        title: "히트맵",
        isImplemented: true,
        tablerIcon: IconBrandDeezer,
      },
      timeline: {
        title: "타임라인",
        isImplemented: true,
        tablerIcon: IconTimelineEventText,
      },
      "cycle-time": {
        title: "사이클타임",
        isImplemented: true,
        tablerIcon: IconClockCode,
      },
      "code-review": {
        title: "코드리뷰",
        isImplemented: true,
        tablerIcon: IconMessageCode,
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
      engagement: {
        title: "개발 몰입도",
        tablerIcon: IconFocus2,
      },
      enps: {
        title: "개발자 만족도",
        tablerIcon: IconMoodSearch,
      },
      workload: {
        title: "업무로드 분석",
        tablerIcon: IconHourglassOff,
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
    tablerIcon: IconBulb,
    subTree: {
      "dora-metrics": {
        title: "DORA Metrics",
        tablerIcon: IconTransformPoint,
      },
      benchmark: {
        title: "업계 벤치마크",
        tablerIcon: IconTelescope,
      },
    },
  },
};
