import { useEffect, useState } from "react";
import { TallyPopupOptions } from "@/src/types/tally";

const inquireFormId = "wALJdk";

export default function useTallyInquireForm({ ...config }: TallyPopupOptions) {
  const [tallyOptions, setTallyOptions] = useState<TallyPopupOptions>(
    Object.assign(
      {
        layout: "modal",
        width: 425,
        hideTitle: true,
        autoClose: 1,
        emoji: {
          text: "👋",
          animation: "wave",
        },
      },
      config,
    ),
  );
  const [openTallyPopup, setOpenPopup] = useState<() => void>();
  useEffect(() => {
    // @ts-ignore
    setOpenPopup(() => () => Tally.openPopup(inquireFormId, tallyOptions));
  }, []);
  return {
    tallyOptions,
    setTallyOptions: ({ ...options }) => {
      const newOptions = Object.assign(tallyOptions, options);
      setTallyOptions(newOptions);
    },
    openTallyPopup: openTallyPopup || (() => {}),
  };
}
