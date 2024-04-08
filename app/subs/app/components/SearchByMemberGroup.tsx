"use client";
import { Avatar, Box, Group, Skeleton, Stack, Transition } from "@mantine/core";
import { IconArrowMerge } from "@tabler/icons-react";
import React from "react";
import { searchByMemberContextTools } from "@/src/contexts/SearchByMemberContext";
import { InferSelectModel } from "drizzle-orm";
import { Workspace, WorkspaceMember } from "@/database/schemas/workspace";
import useSWR from "swr";
import { generateAppPath } from "@/src/path";
import { apiFetcher } from "@/src/swr";

interface SearchByMemberGroupProps {
  workspace?: InferSelectModel<typeof Workspace>;
  vertical?: boolean;
  horizontal?: boolean;
}
export default function SearchByMemberGroup({
  workspace,
  vertical = true,
  horizontal,
}: SearchByMemberGroupProps) {
  const searchTargetSWR = useSWR<InferSelectModel<typeof WorkspaceMember>>(
    generateAppPath(
      `/api/workspace/members/${searchByMemberContextTools.targetId}`,
      workspace?.slug,
    ),
    apiFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      isPaused: () => !workspace || !searchByMemberContextTools.targetId,
    },
  );

  const searchRelationsSWR = useSWR<InferSelectModel<typeof WorkspaceMember>[]>(
    (() => {
      const url = generateAppPath(
        `/api/workspace/members/${searchByMemberContextTools.targetId}`,
        workspace?.slug,
      );
      const searchParams = new URLSearchParams(
        searchByMemberContextTools.relationIds?.map((id) => [
          "member_id",
          id.toString(),
        ]),
      );
      if (typeof window !== "undefined")
        return (
          new URL(url, window.location.href).toString() +
          searchParams.toString()
        );
      return url;
    })(),
    apiFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      isPaused: () =>
        !workspace ||
        typeof window === "undefined" ||
        !searchByMemberContextTools.targetId,
    },
  );

  return (
    <>
      {searchTargetSWR.isLoading || searchRelationsSWR.isLoading ? (
        <Box>
          <Skeleton height={"2em"} circle />
        </Box>
      ) : (
        ""
      )}
      <Transition
        mounted={!searchTargetSWR.isLoading && !searchRelationsSWR.isLoading}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) =>
          vertical ? (
            <Stack style={styles} align={"center"}>
              <Avatar
                src={searchTargetSWR.data?.avatar_url}
                style={{
                  border: "3px solid var(--color-primary)",
                }}
              />
              {searchRelationsSWR.data?.length ? (
                <>
                  <IconArrowMerge size={"1em"} />
                  <Avatar.Group
                    style={{
                      alignItems: "center",
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    {searchRelationsSWR.data.slice(0, 3).map((relation) => (
                      <Avatar key={relation.id} src={relation.avatar_url} />
                    ))}
                    {searchRelationsSWR.data.length > 3 ? (
                      <Avatar>+{searchRelationsSWR.data.length - 3}</Avatar>
                    ) : (
                      ""
                    )}
                  </Avatar.Group>
                </>
              ) : (
                ""
              )}
            </Stack>
          ) : horizontal ? (
            <Group style={styles} gap={0}>
              <Avatar
                src={searchTargetSWR.data?.avatar_url}
                style={{
                  border: "3px solid var(--color-primary)",
                }}
              />
              {searchRelationsSWR.data?.length ? (
                <>
                  <Group px={"0.5em"} align={"center"}>
                    <IconArrowMerge
                      style={{ transform: "rotate(-90deg)" }}
                      size={"1.2em"}
                    />
                  </Group>
                  <Avatar.Group
                    style={{
                      alignItems: "center",
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    {searchRelationsSWR.data.slice(0, 3).map((relation) => (
                      <Avatar key={relation.id} src={relation.avatar_url} />
                    ))}
                    {searchRelationsSWR.data.length > 3 ? (
                      <Avatar>+{searchRelationsSWR.data.length - 3}</Avatar>
                    ) : (
                      ""
                    )}
                  </Avatar.Group>
                </>
              ) : (
                ""
              )}
            </Group>
          ) : (
            <></>
          )
        }
      </Transition>
    </>
  );
}
