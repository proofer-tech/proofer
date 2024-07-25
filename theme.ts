"use client";

import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  defaultRadius: "xs",
  breakpoints: {
    xs: "576px",
    sm: "768px",
    md: "992px",
    lg: "1200px",
    xl: "1408px",
  },
  fontFamily: "LINESeedKR",
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },
  headings: {
    fontFamily: "LINESeedKR",
    fontWeight: "bold",
    textWrap: "pretty",
    sizes: {
      h1: {
        fontSize: "2.8em",
        lineHeight: "1.3",
      },
      h2: {
        fontSize: "2.4em",
        lineHeight: "1.3",
      },
      h3: {
        fontSize: "2.2em",
        lineHeight: "1.2",
      },
      h4: {
        fontSize: "1.8em",
        lineHeight: "1.2",
      },
      h5: {
        fontSize: "1.5em",
        lineHeight: "1.1",
      },
      h6: {
        fontSize: "1em",
        lineHeight: "1.1",
      },
    },
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
      "#344FE0",
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
      "#45AF66",
      "#419B58",
      "#36865B",
      "#2C715B",
      "#235B55",
    ],
  },
  white: "var(--color-white)",
  black: "var(--color-black)",
});
