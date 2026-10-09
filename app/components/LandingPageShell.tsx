import React from "react";

export interface LandingPageShellProps extends React.ComponentProps<"div"> {
  isNavbarOpened: boolean;
  children: React.ReactNode;
}

export default function LandingPageShell({
  isNavbarOpened,
  children,
  ...props
}: LandingPageShellProps) {
  return (
    <div data-navbar-opened={isNavbarOpened} {...props}>
      {children}
    </div>
  );
}
