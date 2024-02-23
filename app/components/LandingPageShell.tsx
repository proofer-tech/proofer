import { AppShell, AppShellProps } from "@mantine/core";
import React from "react";
import { ElementProps } from "@mantine/core/lib/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "@/app/components/Header";

interface LandingPageShellProps extends AppShellProps, ElementProps<"div"> {
  onMenuClick?: (index: number) => void;
  onLoginClick?: () => void;
  onInquireClick?: () => void;
  children: React.ReactNode;
}

export default function LandingPageShell({
  onMenuClick,
  onLoginClick,
  onInquireClick,
  children,
  ...props
}: LandingPageShellProps) {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
      {...props}
    >
      <Header
        isNavbarOpened={opened}
        onBurgerClick={toggle}
        onMenuClick={onMenuClick}
        onLoginClick={onLoginClick}
        onInquireClick={onInquireClick}
      />
      {children}
    </AppShell>
  );
}
