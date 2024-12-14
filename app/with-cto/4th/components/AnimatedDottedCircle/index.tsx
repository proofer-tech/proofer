"use client";
import { useCounter, useInterval } from "@mantine/hooks";
import { useEffect } from "react";
import ChildCircle from "./ChildCircle";
import { Box, BoxProps } from "@mantine/core";

interface AnimatedDottedCircleProps extends BoxProps {
  size: number;
  baseColor: string;
  highlightColor: string;
}
export default function AnimatedDottedCircle({
  size,
  baseColor,
  highlightColor,
  ...props
}: AnimatedDottedCircleProps) {
  const circleCount = 12;
  let [highlightIndex, highlightCounter] = useCounter(0, { min: 0, max: 11 });
  const interval = useInterval(() => {
    highlightCounter.increment();
    highlightIndex += 1;
    if (highlightIndex >= circleCount) {
      highlightCounter.reset();
      highlightIndex = 0;
    }
  }, 300);
  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <Box
      style={{ position: "relative", width: `${size}px`, height: `${size}px` }}
      {...props}
    >
      {Array.from({ length: circleCount }).map((_, index) => (
        <ChildCircle
          key={index}
          size={size}
          color={highlightIndex === index ? highlightColor : baseColor}
          rotateIndex={index}
        />
      ))}
    </Box>
  );
}
