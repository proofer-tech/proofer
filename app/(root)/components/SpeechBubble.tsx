// components/SpeechBubble.tsx
import React from "react";

type Direction = "top" | "bottom" | "left" | "right";

interface SpeechBubbleProps {
  children: React.ReactNode;
  color?: string; // HEX 색상 값
  direction?: Direction;
}

export default function SpeechBubble({
  children,
  color = "#ffffff",
  direction = "bottom",
}: SpeechBubbleProps) {
  const tailStyles = {
    top: {
      borderWidth: "0 8px 8px 8px",
      borderColor: `transparent transparent ${color} transparent`,
    },
    bottom: {
      borderWidth: "8px 8px 0 8px",
      borderColor: `${color} transparent transparent transparent`,
    },
    left: {
      borderWidth: "8px 8px 8px 0",
      borderColor: `transparent ${color} transparent transparent`,
    },
    right: {
      borderWidth: "8px 0 8px 8px",
      borderColor: `transparent transparent transparent ${color}`,
    },
  };

  return (
    <div
      className="relative text-gray-700 p-3 rounded-lg shadow-lg"
      style={{ backgroundColor: color }}
    >
      {children}
      <div
        className={`absolute w-0 h-0 ${
          direction === "top"
            ? "left-4 bottom-full"
            : direction === "bottom"
              ? "left-4 top-full"
              : direction === "left"
                ? "right-full top-2"
                : "left-full top-2"
        }`}
        style={{
          borderStyle: "solid",
          ...tailStyles[direction],
        }}
      ></div>
    </div>
  );
}
