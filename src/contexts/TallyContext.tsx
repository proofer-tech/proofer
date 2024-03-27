import { TallyPopupOptions } from "@/src/types/tally";
import { createContext } from "react";

export interface TallyInquireContextProps {
  tallyOptions: TallyPopupOptions;
  setTallyOptions: (options: TallyPopupOptions) => void;
  openTallyPopup: () => void;
}

const TallyContext = createContext<TallyInquireContextProps>({
  tallyOptions: {},
  setTallyOptions: (options: TallyPopupOptions) => {},
  openTallyPopup: () => {},
});
export default TallyContext;
