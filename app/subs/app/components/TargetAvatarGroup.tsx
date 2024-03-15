"use client";
import { Avatar, Stack, Transition } from "@mantine/core";
import { IconArrowMerge } from "@tabler/icons-react";
import React, { useContext, useEffect, useState } from "react";
import ProoferInsightContext from "@/app/subs/app/contexts/ProoferInsightContext";

export default function TargetAvatarGroup() {
  const { isMounted } = useContext(ProoferInsightContext);
  return (
    <Transition
      mounted={isMounted}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Stack style={styles} align={"center"}>
          <Avatar
            src={`https://randomuser.me/api/portraits/men/${Math.round(Math.random() * 50 + 1)}.jpg`}
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
            <Avatar
              src={`https://randomuser.me/api/portraits/men/${Math.round(Math.random() * 50 + 1)}.jpg`}
            />
            <Avatar
              src={`https://randomuser.me/api/portraits/men/${Math.round(Math.random() * 50 + 1)}.jpg`}
            />
            <Avatar
              src={`https://randomuser.me/api/portraits/men/${Math.round(Math.random() * 50 + 1)}.jpg`}
            />
            <Avatar>+5</Avatar>
          </Avatar.Group>
        </Stack>
      )}
    </Transition>
  );
}
