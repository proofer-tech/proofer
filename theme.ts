"use client";

import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "LINESeedKR",
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(24),
    xl: rem(48),
  },
  primaryColor: "primary",
  colors: {
    primary: [
      "#CCF9E0",
      "#AAF4D9",
      "#88EEDE",
      "#66E1E7",
      "#44BBDF",
      "#228BD6",
      "#0052cc",
      "#0020B6",
      "#00009E",
      "#1B0086",
      "#2D006D",
    ],
    secondary: [
      "#F1EFD9",
      "#E3E7C1",
      "#CDDDA8",
      "#B3D291",
      "#93C779",
      "#6FBB62",
      "#4caf50",
      "#419B58",
      "#36865B",
      "#2C715B",
      "#235B55",
    ],
  },
  white: "var(--color-white)",
  black: "var(--color-black)",

  defaultRadius: "sm",
});
