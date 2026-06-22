"use client";

import React from "react";
import { ReactChannelIO } from "react-channel-plugin";
import TallyContext from "@/src/contexts/TallyContext";
import useTallyInquireForm from "@/src/hooks/tally";

export default function Providers({ children }: { children: React.ReactNode }) {
  const tallyInquireForm = useTallyInquireForm({});

  return (
    <ReactChannelIO
      pluginKey={process.env.NEXT_PUBLIC_CHANNEL_ID_PLUGIN_KEY!}
      language="ko"
      autoBoot
    >
      <TallyContext.Provider value={tallyInquireForm}>
        {children}
      </TallyContext.Provider>
    </ReactChannelIO>
  );
}
