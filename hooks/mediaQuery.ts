import { useMediaQuery } from "@mantine/hooks";
export const useIsDesktop = () => useMediaQuery(`(min-width: 1024px)`);
export const useIsTablet = () =>
  useMediaQuery(`(max-width: 1024px) and (min-width: 512px)`);
export const useIsMobile = () => useMediaQuery(`(max-width: 512px)`);
