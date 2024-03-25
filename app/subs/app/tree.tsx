import {
  IconActivity,
  IconAntennaBars5,
  IconBrandDeezer,
  IconBulb,
  IconClockCode,
  IconFocus2,
  IconHeartbeat,
  IconHourglassOff,
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
import { PathTree } from "@/app/subs/app/components/types";
import { Group, Notification } from "@mantine/core";
import React from "react";

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
        component: () => (
          <Notification
            title="히트맵을 어떻게 활용하면 좋을까요?"
            withCloseButton={false}
            w={"100%"}
          >
            각 개발자의 작업 선호 시간과 팀원 간 협업 패턴을 파악할 수 있습니다.
            이는 팀 미팅이나 코드 리뷰 세션 스케줄링을 최적화하고, 개인의
            생산성을 높이는 데 도움이 됩니다.
            <br /> 또한, 프로젝트의 중요 시점에서의 활동 증가를 식별하여 리소스
            배분과 우선순위 설정에 기여, 프로젝트 관리를 효율적으로 개선할 수
            있는 기반을 마련합니다.
          </Notification>
        ),
      },
      timeline: {
        title: "타임라인",
        isImplemented: true,
        tablerIcon: IconTimelineEventText,
        component: () => (
          <Notification
            title="타임라인을 어떻게 활용하면 좋을까요?"
            withCloseButton={false}
            w={"100%"}
          >
            각 개발자가 기여하고 있는 프로젝트의 진행 상황을 한눈에 파악할 수
            있습니다. 프로젝트에 속한 팀원들 간의 작업 협업과 의존성을 명확히
            드러내줍니다.
          </Notification>
        ),
      },
      "cycle-time": {
        title: "사이클타임",
        isImplemented: true,
        tablerIcon: IconClockCode,
        component: () => (
          <Notification
            title="사이클타임을 어떻게 활용하면 좋을까요?"
            withCloseButton={false}
            w={"100%"}
          >
            개발자 마다의 작업의 시작부터 완료까지 걸리는 시간을 정확히 파악할
            수 있습니다. 프로세스의 효율성을 개선하고, 프로젝트의 진행 상태를
            실시간으로 모니터링하여 필요한 조정을 할 수 있습니다. 병목 현상이나
            지연의 원인을 식별하고, 개선 조치를 취할 수 있습니다.
          </Notification>
        ),
      },
      "code-review": {
        title: "코드리뷰",
        isImplemented: true,
        tablerIcon: IconMessageCode,
        component: () => (
          <Notification
            title="코드리뷰를 어떻게 활용하면 좋을까요?"
            withCloseButton={false}
            w={"100%"}
          >
            개발자가 속한 코드리뷰에 대한 통계지표를 제공합니다. 코드리뷰 내
            리뷰어와 제출자 간의 피드백 주고받기가 적절히 이루어지고 있는지를
            확인할 수 있습니다.
          </Notification>
        ),
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
