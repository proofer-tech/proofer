"use client";

import React from "react";
import { ReactChannelIO } from "react-channel-plugin";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactChannelIO
      pluginKey={process.env.NEXT_PUBLIC_CHANNEL_ID_PLUGIN_KEY!}
      language="ko"
      autoBoot
    >
      {children}
    </ReactChannelIO>
  );
}
