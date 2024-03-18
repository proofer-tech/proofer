"use client";
import React, { useContext, useEffect } from "react";
import { WorkspaceAppShellContext } from "@/app/subs/app/components/WorkspaceAppShell";
import GitHubPage from "@/app/subs/app/[workspace-slug]/integrations/components/GitHubPage";
import {
  Anchor,
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { fswitch } from "@/utils";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import { GlobalAlertContext } from "@/app/components/GlobalAlert";

export default function Page({ params }: any) {
  const alertContext = useContext(GlobalAlertContext);
  const [appName, ...pathBlocks] = params["integration-path"];
  const context = useContext(ProoferInsightContext);
  const appShellContext = useContext(WorkspaceAppShellContext);
  useEffect(() => {
    appShellContext.close();
  }, []);

  const integration = {
    name: "GitHub",
    slug: "github",
    categoryStr: "생산성",
    description:
      "코드를 저장하고 협업하는 플랫폼입니다. 버전 관리를 통해 프로젝트를 추적하고, 코드 리뷰와 피드백을 주고 받으며, 오픈 소스 프로젝트에 기여할 수 있습니다.",
    iconUrl:
      "https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/uploads/integrations/1/25231-TnjPtwgBVvRquVRJpKfY61iPU9oHoi.png",
  };
  const integrationTags = [
    { id: 1, name: "VCS", color: "gray" },
    { id: 2, name: "Activity", color: "gray" },
    { id: 3, name: "self-hosted", color: "primary" },
  ];

  return (
    <Group wrap={"nowrap"} align={"top"}>
      <Card withBorder radius="md" w={"20em"}>
        <Card.Section withBorder inheritPadding py="xs">
          <Group bg={"white"}>
            <Avatar src={integration.iconUrl} />
            <Text fw={700}>{integration.name}</Text>
          </Group>
        </Card.Section>
        <Card.Section withBorder inheritPadding py="lg" h={"100%"}>
          <Stack gap={"2em"}>
            <Stack gap={"1ex"}>
              <Text fw={700} size={"xs"}>
                태그:
              </Text>
              <Group gap={"1ex"}>
                {integrationTags.map((t) => (
                  <Badge key={t.id} variant="light" color={t.color} size={"sm"}>
                    {t.name}
                  </Badge>
                ))}
              </Group>
            </Stack>
            <Stack gap={"1ex"}>
              <Text fw={700} size={"xs"}>
                카테고리:
              </Text>
              <Text size={"sm"}>{integration.categoryStr}</Text>
            </Stack>
            <Stack gap={"1ex"}>
              <Text fw={700} size={"xs"}>
                한줄소개:
              </Text>
              <Text size={"sm"} c={"var(--mantine-color-gray-8)"}>
                {integration.description}
              </Text>
            </Stack>
          </Stack>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Anchor
            href={
              "https://github.com/apps/proofer-tech/installations/select_target"
            }
            underline={"never"}
          >
            <Button w={"100%"}>앱 연동하기</Button>
          </Anchor>
        </Card.Section>
      </Card>
      <Card withBorder radius="md" w={"100%"}>
        {fswitch(appName).case("github", () => (
          <GitHubPage
            workspace={context.workspace?.instance!}
            pathBlocks={pathBlocks}
          />
        ))}
      </Card>
    </Group>
  );
}
