import { createContext } from "react";

export interface AgentContextProps {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const AgentContext = createContext<AgentContextProps>({
  isDesktop: true,
  isMobile: false,
  isTablet: false,
});

export default AgentContext;
