"use client";
import { Box } from "@mantine/core";
import AnimatedDottedCircle from "@/app/with-cto/6th/components/AnimatedDottedCircle";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";

export default function SecondBackground() {
  const isMobileMedia = useIsMobileMedia();
  return (
    <Box h={isMobileMedia ? "80px" : "140px"}>
      <AnimatedDottedCircle
        size={isMobileMedia ? 80 : 140}
        baseColor={"#51C675"}
        highlightColor={"var(--color-primary)"}
        style={{
          position: "relative",
          bottom: 0,
          left: isMobileMedia ? "calc(100% - 160px)" : "calc(30% - 70px)",
        }}
      />
    </Box>
  );
}
