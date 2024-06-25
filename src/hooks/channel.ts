import { useEffect, useState } from "react";
import { useChannelIOEvent } from "react-channel-plugin";

export function useIsChannelIOLoaded() {
  const [isChannelIOLoaded, setIsChannelIOLoaded] = useState<boolean>(true);
  useEffect(() => {
    setIsChannelIOLoaded(false);
  }, []);
  useChannelIOEvent("onBoot", () => setIsChannelIOLoaded(true));

  return isChannelIOLoaded;
}
