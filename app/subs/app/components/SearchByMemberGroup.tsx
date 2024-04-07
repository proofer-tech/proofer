"use client";
import { Avatar, Box, Skeleton, Stack, Transition } from "@mantine/core";
import { IconArrowMerge } from "@tabler/icons-react";
import React, { useContext } from "react";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";
import SearchByMemberContext from "@/src/contexts/SearchByMemberContext";
import { InferSelectModel } from "drizzle-orm";
import { WorkspaceMember } from "@/database/schemas/workspace";

interface SearchByMemberGroupProps {
  target?: InferSelectModel<typeof WorkspaceMember>;
  relations?: InferSelectModel<typeof WorkspaceMember>[];
}
export default function SearchByMemberGroup({
  target,
  relations,
}: SearchByMemberGroupProps) {
  const { isMounted } = useContext(ProoferInsightContext);
  return (
    <>
      {isMounted ? (
        ""
      ) : (
        <Box>
          <Skeleton height={"2em"} circle />
        </Box>
      )}
      <Transition
        mounted={isMounted}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Stack style={styles} align={"center"}>
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
        )}
      </Transition>
    </>
  );
}
