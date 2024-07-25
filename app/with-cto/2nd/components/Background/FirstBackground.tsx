"use client";
import { Box, Paper } from "@mantine/core";
import AnimatedDottedCircle from "@/app/with-cto/2nd/components/AnimatedDottedCircle";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";

export default function FirstBackground() {
  const isMobileMedia = useIsMobileMedia();
  return (
    <Box h={0}>
      <Paper
        bg={"#344FE0"}
        radius={100}
        w={isMobileMedia ? "70px" : "200px"}
        h={isMobileMedia ? "70px" : "200px"}
        style={{
          position: "relative",
          top: isMobileMedia
            ? "calc(100vh - 280px)"
            : "calc(var(--app-shell-header-height) * -1 - 40px)",
          left: isMobileMedia ? "calc(100% - 20px)" : "calc(50% + 80px)",
        }}
      />
      <AnimatedDottedCircle
        size={isMobileMedia ? 120 : 200}
        baseColor={"#51C675"}
        highlightColor={"var(--color-primary)"}
        style={{
          position: "relative",
          top: isMobileMedia ? "-100px" : "0px",
          left: isMobileMedia ? "calc(100% - 95px)" : "calc(100% - 160px)",
        }}
      />
      <AnimatedDottedCircle
        size={isMobileMedia ? 120 : 180}
        baseColor={"var(--color-primary)"}
        highlightColor={"#51C675"}
        style={{
          position: "relative",
          top: isMobileMedia
            ? "calc(100vh - 240px)"
            : "calc(100vh - var(--app-shell-header-height) - 310px)",
          left: isMobileMedia ? "-50px" : "-50px",
        }}
      />
    </Box>
  );
}
