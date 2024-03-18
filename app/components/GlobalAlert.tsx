import { Affix, Alert, Overlay, Transition } from "@mantine/core";
import React, { createContext, useContext, useEffect } from "react";
import { AlertProps } from "@mantine/core/lib/components/Alert/Alert";
import { AffixBaseProps } from "@mantine/core/lib/components/Affix/Affix";

export interface GlobalAlertConfig extends AlertProps, AffixBaseProps {
  closeOnSeconds?: number;
}
interface GlobalAlertProps {
  options: GlobalAlertConfig;
  open: (config: GlobalAlertConfig) => void;
  close: () => void;
}
export const GlobalAlertContext = createContext<GlobalAlertProps>({
  options: {},
  open: () => {},
  close: () => {},
});

interface GlobalAlertMoldProps {
  mounted: boolean;
}
export function GlobalAlertMold({ mounted }: GlobalAlertMoldProps) {
  const alertContext = useContext(GlobalAlertContext);

  useEffect(() => {
    if (!alertContext.options.closeOnSeconds) return;
    const timeoutFunc = setTimeout(
      () => alertContext.close(),
      alertContext.options.closeOnSeconds * 1000,
    );

    return () => clearTimeout(timeoutFunc);
  }, [mounted]);

  return (
    <>
      {mounted && <Overlay color="#000" backgroundOpacity={0.3} />}
      <Affix
        zIndex={2000}
        position={alertContext.options.position || { bottom: 16, left: 16 }}
      >
        <Transition transition={"slide-up"} mounted={mounted}>
          {(transitionStyles) => (
            <Alert
              variant={alertContext.options.variant}
              color={alertContext.options.color}
              title={alertContext.options.title}
              icon={alertContext.options.icon}
              style={transitionStyles}
              onClose={alertContext.options.onClose}
              withCloseButton={alertContext.options.withCloseButton}
            >
              {alertContext.options.children}
            </Alert>
          )}
        </Transition>
      </Affix>
    </>
  );
}
