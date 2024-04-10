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
import { Notification } from "@mantine/core";
import React from "react";

export const pathTree: PathTree = {
  activity: {
    title: "Activity",
    isImplemented: true,
    tablerIcon: IconActivity,
    subTree: {
      heatmap: {
        title: "Heatmap",
        isImplemented: true,
        tablerIcon: IconBrandDeezer,
        component: () => (
          <Notification
            title="How can I use heatmaps?"
            withCloseButton={false}
            w={"100%"}
          >
            You can learn about each developer’s work preference and
            collaboration patterns among team members. This helps optimize
            scheduling of team meetings or code review sessions and increases
            individual productivity. It also identifies activity increases at
            project milestones, contributes to resource allocation and priority
            setting, and lays the foundation for efficient project management.
          </Notification>
        ),
      },
      timeline: {
        title: "Timeline",
        isImplemented: true,
        tablerIcon: IconTimelineEventText,
        component: () => (
          <Notification
            title="How can I utilize the timeline?"
            withCloseButton={false}
            w={"100%"}
          >
            You can quickly understand the progress of projects each developer
            is contributing to. It clearly reveals the work collaboration and
            dependencies among team members involved in the project.
          </Notification>
        ),
      },
      "cycle-time": {
        title: "Cycle Time",
        isImplemented: true,
        tablerIcon: IconClockCode,
        component: () => (
          <Notification
            title="How can cycle time be utilized?"
            withCloseButton={false}
            w={"100%"}
          >
            It allows for the precise measurement of the time each developer
            takes from starting a task to completing it. This enhances process
            efficiency and enables real-time monitoring of the project&apos;s
            progress for necessary adjustments. It identifies the causes of
            bottlenecks or delays, and allows for taking corrective actions.
          </Notification>
        ),
      },
      "code-review": {
        title: "Code Review",
        isImplemented: true,
        tablerIcon: IconMessageCode,
        component: () => (
          <Notification
            title="How can code reviews be utilized?"
            withCloseButton={false}
            w={"100%"}
          >
            It provides statistical metrics about the code reviews a developer
            is involved in. You can check if feedback exchange between reviewers
            and submitters is appropriately happening in code reviews.
          </Notification>
        ),
      },
      project: {
        title: "Project",
        tablerIcon: IconLayoutKanban,
      },
      communication: {
        title: "Communication",
        tablerIcon: IconMessages,
      },
    },
  },
  satisfaction: {
    title: "Satisfaction",
    tablerIcon: IconHeartbeat,
    subTree: {
      engagement: {
        title: "Developer Engagement",
        tablerIcon: IconFocus2,
      },
      enps: {
        title: "Developer Satisfaction",
        tablerIcon: IconMoodSearch,
      },
      workload: {
        title: "Workload Analysis",
        tablerIcon: IconHourglassOff,
      },
    },
  },
  throughput: {
    title: "Throughput",
    tablerIcon: IconAntennaBars5,
    subTree: {
      resources: {
        title: "Resource Status",
        tablerIcon: IconReorder,
      },
      roi: {
        title: "ROI Calculation",
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
        title: "Industry Benchmark",
        tablerIcon: IconTelescope,
      },
    },
  },
};
