"use client";
import { Avatar, Box, Skeleton, Stack, Transition } from "@mantine/core";
import { IconArrowMerge } from "@tabler/icons-react";
import React, { useContext } from "react";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";

export default function TargetAvatarGroup() {
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
              style={{
                border: "3px solid var(--color-primary)",
              }}
            />
            <IconArrowMerge size={"1em"} />
            <Avatar.Group
              style={{
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <Avatar />
              <Avatar />
              <Avatar />
              <Avatar>+5</Avatar>
            </Avatar.Group>
          </Stack>
        )}
      </Transition>
    </>
  );
}
