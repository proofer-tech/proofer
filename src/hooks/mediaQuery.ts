import { useMediaQuery } from "@mantine/hooks";

export const useIsDesktopMedia = (initialValue: boolean = true) =>
  useMediaQuery(`(min-width: 1200px)`, initialValue);
export const useIsTabletMedia = (initialValue: boolean = true) =>
  useMediaQuery(`(max-width: 1199px) and (min-width: 768px)`, initialValue);
export const useIsMobileMedia = (initialValue: boolean = true) =>
  useMediaQuery(`(max-width: 767px)`, initialValue);
