import { useMediaQuery } from "@mantine/hooks";
import { isBrowser, isMobile } from "react-device-detect";

export const useIsDesktopMedia = (initialValue: boolean = isBrowser) =>
  useMediaQuery(`(min-width: 1024px)`, initialValue);
export const useIsTabletMedia = (initialValue: boolean = isMobile) =>
  useMediaQuery(`(max-width: 1024px) and (min-width: 512px)`, initialValue);
export const useIsMobileMedia = (initialValue: boolean = isMobile) =>
  useMediaQuery(`(max-width: 512px)`, initialValue);
