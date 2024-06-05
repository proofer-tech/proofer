import { useMediaQuery } from "@mantine/hooks";
import { isBrowser, isMobile } from "react-device-detect";

export const useIsDesktopMedia = (initialValue: boolean = isBrowser) =>
  useMediaQuery(`(min-width: 1200px)`, initialValue);
export const useIsTabletMedia = (initialValue: boolean = isMobile) =>
  useMediaQuery(`(max-width: 1119px) and (min-width: 768px)`, initialValue);
export const useIsMobileMedia = (initialValue: boolean = isMobile) =>
  useMediaQuery(`(max-width: 767px)`, initialValue);
