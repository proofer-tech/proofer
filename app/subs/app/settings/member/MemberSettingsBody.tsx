"use client";
import React, { useContext, useEffect } from "react";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Card,
  Divider,
  Group,
  Menu,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { SettingsModalContext } from "@/app/subs/app/settings/modal";
import { useListState } from "@mantine/hooks";
import useSWR from "swr";
import { InferSelectModel } from "drizzle-orm";
import {
  Workspace,
  WorkspaceMember,
  WorkspaceRole,
} from "@/database/schemas/workspace";
import { generateAppPath } from "@/src/path";
import { apiFetcher } from "@/src/swr";
import { useRouter } from "next/navigation";
import { cond, constant, matches } from "lodash";

function MemberCard({
  workspace,
  member,
}: {
  workspace: InferSelectModel<typeof Workspace>;
  member: InferSelectModel<typeof WorkspaceMember>;
  withChangeRole?: boolean;
}) {
  return (
    <Card withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Group>
            <Avatar src={member.avatar_url} />
            <Text fw={700} size={"sm"}>
              {member.nickname}
            </Text>
            <Text fw={700} size={"sm"}>
              (
              {cond([
                [matches(WorkspaceRole.OWNER), constant("소유자")],
                [matches(WorkspaceRole.MANAGER), constant("관리자")],
                [matches(WorkspaceRole.MEMBER), constant("멤버")],
              ])(member.role)}
              )
            </Text>
          </Group>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots size={"1em"} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Anchor
                href={generateAppPath(`/members/${member.id}`, workspace.slug)}
              >
                <Menu.Item>멤버 정보수정</Menu.Item>
              </Anchor>
              {member.role !== WorkspaceRole.OWNER ? (
                <>
                  <Menu.Divider />
                  <Menu.Item c={"red"} disabled>
                    멤버 제거 (미구현)
                  </Menu.Item>
                </>
              ) : (
                ""
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default function MemberSettingsBody() {
  const router = useRouter();
  const { workspace } = useContext(ProoferInsightContext);
  const { close, triggered, trigger, opened } =
    useContext(SettingsModalContext);

  const [delayedJobs, delayedJobHandler] = useListState<() => Promise<any>>([]);
  const membersSWR = useSWR<InferSelectModel<typeof WorkspaceMember>[]>(
    generateAppPath("/api/workspace/members", workspace?.instance.slug),
    apiFetcher,
    {
      isPaused() {
        return workspace === undefined;
      },
    },
  );

  async function travel() {
    while (delayedJobs.length > 0) {
      const delayedJob = delayedJobs.shift();
      if (delayedJob) await delayedJob().then(() => delayedJobHandler.shift());
    }
  }

  useEffect(() => {
    if (opened) router.refresh();
  }, [opened]);

  useEffect(() => {
    switch (triggered) {
      case "cancel":
        close();
        break;
      case "save":
        travel();
        break;
      case "submit":
        delayedJobHandler.append(async () => close());
        travel();
        break;
    }
    trigger("");
  }, [triggered]);

  if (workspace === undefined) {
    return <NeedToSelectWorkspace serviceName={"워크스페이스 설정"} />;
  }

  return (
    <Stack>
      <Stack pb={"2em"}>
        <Divider label="Owner" labelPosition="left" w={"100%"} />
        {!membersSWR.isLoading ? (
          membersSWR.data
            ?.filter((member) => member.role === WorkspaceRole.OWNER)
            .map((member) => (
              <MemberCard
                key={member.id}
                workspace={workspace.instance}
                member={member}
              />
            ))
        ) : (
          <Skeleton height={"2.5em"} />
        )}
      </Stack>
      <Stack pb={"2em"}>
        <Divider label="Others" labelPosition="left" w={"100%"} />
        {!membersSWR.isLoading
          ? membersSWR.data
              ?.filter((member) => member.role !== WorkspaceRole.OWNER)
              .map((member) => (
                <MemberCard
                  key={member.id}
                  workspace={workspace.instance}
                  member={member}
                  withChangeRole
                />
              ))
          : [...Array(5)].map((_, index) => (
              <Skeleton key={index} height={"2.5em"} />
            ))}
      </Stack>
    </Stack>
  );
}
