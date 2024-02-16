import { useMediaQuery } from "@mantine/hooks";
export const useIsDesktop = (initialValue: boolean = false) =>
  useMediaQuery(`(min-width: 1024px)`, initialValue);
export const useIsTablet = (initialValue: boolean = false) =>
  useMediaQuery(`(max-width: 1024px) and (min-width: 512px)`, initialValue);
export const useIsMobile = (initialValue: boolean = false) =>
  useMediaQuery(`(max-width: 512px)`, initialValue);
