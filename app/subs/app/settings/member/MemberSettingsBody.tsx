"use client";
import React, { useContext, useEffect } from "react";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import NeedToSelectWorkspace from "@/app/subs/app/components/NeedToSelectWorkspace";
import {
  ActionIcon,
  Avatar,
  Card,
  Center,
  Group,
  LoadingOverlay,
  Menu,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconDots, IconSunset } from "@tabler/icons-react";
import { SettingsModalContext } from "@/app/subs/app/settings/modal";
import { useListState } from "@mantine/hooks";
import useSWR, { mutate } from "swr";
import { InferSelectModel } from "drizzle-orm";
import { WorkspaceMember, WorkspaceRole } from "@/database/schemas/workspace";
import { generateAppPath } from "@/src/path";
import { apiFetcher } from "@/src/swr";
import { useRouter } from "next/navigation";
import { cond, constant, matches } from "lodash";

export default function MemberSettingsBody() {
  const router = useRouter();
  const { workspace } = useContext(ProoferInsightContext);
  const { close, triggered, trigger, opened } =
    useContext(SettingsModalContext);

  const [delayedJobs, delayedJobHandler] = useListState<() => Promise<any>>([]);
  const membersSWR = useSWR<InferSelectModel<typeof WorkspaceMember>[]>(
    generateAppPath(`/${workspace?.instance.slug}/api/workspace/members`),
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
      {membersSWR.isLoading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} height={"2em"} />
          ))}
        </>
      ) : (
        ""
      )}
      {!membersSWR.isLoading
        ? membersSWR.data?.map((member) => (
            <Card key={member.id} withBorder>
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
                  </Menu>
                </Group>
              </Card.Section>
            </Card>
          ))
        : ""}
    </Stack>
  );
}
