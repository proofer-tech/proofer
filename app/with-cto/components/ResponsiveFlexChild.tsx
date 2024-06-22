"use client";
import { Box, BoxProps } from "@mantine/core";
import {
  useIsDesktopMedia,
  useIsMobileMedia,
  useIsTabletMedia,
} from "@/src/hooks/mediaQuery";
import { ReactNode } from "react";

interface ResponsiveFlexChildProps extends BoxProps {
  children: ReactNode;
  desktopSize: string;
  tabletSize: string;
  mobileSize: string;
}
export default function ResponsiveFlexChild({
  children,
  desktopSize,
  tabletSize,
  mobileSize,
  style,
  ...props
}: ResponsiveFlexChildProps) {
  const [isDesktop, isTablet] = [
    useIsDesktopMedia(),
    useIsTabletMedia(),
    useIsMobileMedia(),
  ];
  return (
    <Box
      style={{
        flexBasis: isDesktop ? desktopSize : isTablet ? tabletSize : mobileSize,
        flexShrink: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
