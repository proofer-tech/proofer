"use client";
import { Avatar, Group, Stack } from "@mantine/core";
import { IconArrowMerge } from "@tabler/icons-react";
import React, { useContext, useEffect, useState } from "react";
import SearchByMemberContext, {
  searchByMemberContextTools,
} from "@/src/modules/SearchBarControl/context";
import { InferSelectModel } from "drizzle-orm";
import { Workspace, WorkspaceMember } from "@/database/schemas/workspace";
import useSWR from "swr";
import { generateAppPath } from "@/src/path";
import { apiFetcher } from "@/src/swr";

export function useMembersSWR(workspace?: InferSelectModel<typeof Workspace>) {
  return useSWR<InferSelectModel<typeof WorkspaceMember>[]>(
    generateAppPath("/api/workspace/members", workspace?.slug),
    apiFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      isPaused: () => !workspace || typeof window === "undefined",
    },
  );
}
export function generateSearchTargetSWRKey(workspaceSlug?: string) {
  return generateAppPath(
    `/api/workspace/members/${searchByMemberContextTools.targetId}`,
    workspaceSlug,
  );
}
export function generateSearchRelationsSWRKey(workspaceSlug?: string) {
  const url = generateAppPath("/api/workspace/members", workspaceSlug);
  const searchParams = new URLSearchParams(
    searchByMemberContextTools.relationIds?.length
      ? searchByMemberContextTools.relationIds?.map((id) => [
          "member_id",
          id.toString(),
        ])
      : [["member_id", "NaN"]],
  );

  let newURL;
  if (typeof window !== "undefined")
    newURL = new URL(url, window.location.href);
  else newURL = new URL(url, process.env.AUTH0_BASE_URL);
  newURL.search = searchParams.toString();
  return newURL.toString();
}
export function useSearchByMemberSWR(
  workspace?: InferSelectModel<typeof Workspace>,
) {
  "use client";

  const searchTargetSWR = useSWR<InferSelectModel<typeof WorkspaceMember>>(
    generateSearchTargetSWRKey(workspace?.slug),
    apiFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      isPaused: () => !workspace || !searchByMemberContextTools.targetId,
    },
  );

  const searchRelationsSWR = useSWR<InferSelectModel<typeof WorkspaceMember>[]>(
    generateSearchRelationsSWRKey(workspace?.slug),
    apiFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      isPaused: () =>
        !workspace ||
        typeof window === "undefined" ||
        // @ts-ignore
        parseInt(searchByMemberContextTools.relationIds?.length) === 0,
    },
  );

  const [target, setTarget] =
    useState<InferSelectModel<typeof WorkspaceMember>>();
  const [relations, setRelations] = useState<
    InferSelectModel<typeof WorkspaceMember>[]
  >([]);

  useEffect(() => {
    searchTargetSWR.data && setTarget(searchTargetSWR.data);
  }, [searchTargetSWR.data]);
  useEffect(() => {
    searchRelationsSWR.data && setRelations(searchRelationsSWR.data);
  }, [searchRelationsSWR.data]);

  return {
    target,
    setTarget: (value: InferSelectModel<typeof WorkspaceMember>) => {
      if (relations.find((r) => r.id === value.id)) {
        const targetExcludedRelations = relations.filter(
          (r) => r.id !== value.id,
        );
        searchByMemberContextTools.setRelationIds?.(
          targetExcludedRelations.map((r) => r.id),
        );
        setRelations(targetExcludedRelations);
      }

      searchByMemberContextTools.setTargetId?.(value.id);
      setTarget(value);
    },
    relations,
    setRelations: (value: InferSelectModel<typeof WorkspaceMember>[]) => {
      searchByMemberContextTools.setRelationIds?.(value.map((r) => r.id));
      setRelations(value);
    },
    targetSWR: searchTargetSWR,
    relationsSWR: searchRelationsSWR,
    isLoading: searchTargetSWR.isLoading || searchRelationsSWR.isLoading,
  };
}

interface SearchByMemberGroupProps {
  vertical?: boolean;
  horizontal?: boolean;
}
export default function SearchByMemberGroup({
  vertical,
  horizontal,
}: SearchByMemberGroupProps) {
  const { target, relations, isLoading } = useContext(SearchByMemberContext);
  return (
    <>
      {isLoading ? (
        <Avatar
          style={{
            border: "3px solid (--mantine-color-gray-6)",
          }}
        />
      ) : vertical ? (
        <Stack justify={"start"} align={"center"}>
          <Avatar
            src={target?.avatar_url}
            style={{
              border: "3px solid var(--color-primary)",
            }}
          />
          {relations?.length ? (
            <>
              <IconArrowMerge size={"1em"} />
              <Avatar.Group
                style={{
                  alignItems: "center",
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                {relations.slice(0, 3).map((relation) => (
                  <Avatar key={relation.id} src={relation.avatar_url} />
                ))}
                {relations.length > 3 ? (
                  <Avatar>+{relations.length - 3}</Avatar>
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
        <Group gap={0} justify={"end"} align={"center"} wrap={"nowrap"}>
          <Avatar
            src={target?.avatar_url}
            style={{
              border: "3px solid var(--color-primary)",
            }}
          />
          {relations?.length ? (
            <>
              <Group px={"0.5em"} align={"center"}>
                <IconArrowMerge
                  style={{ transform: "rotate(-90deg)" }}
                  size={"1.2em"}
                />
              </Group>
              <Avatar.Group>
                {relations.slice(0, 3).map((relation) => (
                  <Avatar key={relation.id} src={relation.avatar_url} />
                ))}
                {relations.length > 3 ? (
                  <Avatar>+{relations.length - 3}</Avatar>
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
      )}
    </>
  );
}
