import { AppShell, AppShellProps } from "@mantine/core";
import React from "react";
import { ElementProps } from "@mantine/core/lib/core";

interface LandingPageShellProps extends AppShellProps, ElementProps<"div"> {
  isNavbarOpened: boolean;
  children: React.ReactNode;
}

export default function LandingPageShell({
  isNavbarOpened,
  children,
  ...props
}: LandingPageShellProps) {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !isNavbarOpened },
      }}
      padding="md"
      {...props}
    >
      {children}
    </AppShell>
  );
}
