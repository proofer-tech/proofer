import { createContext } from "react";

interface LandingPageContext {
  appShell: {
    isOpened: boolean;
    toggle: () => void;
  };
  userAgent: {
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
  };
}

export const LandingPageContext = createContext<LandingPageContext>({
  appShell: {
    isOpened: false,
    toggle: () => {},
  },
  userAgent: {
    isDesktop: true,
    isMobile: false,
    isTablet: false,
  },
});
