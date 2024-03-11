import { createContext } from "react";

export interface UserAgent {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}
export interface PageProps {
  userAgent: UserAgent;
}

export const PageContext = createContext<PageProps>({
  userAgent: {
    isDesktop: true,
    isMobile: false,
    isTablet: false,
  },
});
