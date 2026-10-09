"use client";
import LandingPageShell, {
  LandingPageShellProps,
} from "@/app/components/LandingPageShell";

import useTallyInquireForm from "@/src/hooks/tally";
import {
  InquireCompletedModal,
  NotReadyYetModal,
  ServiceEndedModal,
} from "@/app/components/Modal";
import React, { useCallback, useEffect, useState } from "react";
import Footer from "@/app/components/Footer";
import Header, { HeaderPortal } from "@/app/components/Header";
import { ReactChannelIO } from "react-channel-plugin";
import TallyContext from "@/src/contexts/TallyContext";

function useDisclosure(initial: boolean) {
  const [opened, setOpened] = useState(initial);
  return [
    opened,
    {
      open: useCallback(() => setOpened(true), []),
      close: useCallback(() => setOpened(false), []),
      toggle: useCallback(() => setOpened((o) => !o), []),
    },
  ] as const;
}

function useHash() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return hash;
}

const linkClass = "text-black no-underline";

interface LandingPageShellLayoutProps extends Omit<
  LandingPageShellProps,
  "isNavbarOpened"
> {
  portals: readonly HeaderPortal[];
  logoSrc?: string;
  channelIO?: {
    hideChannelButtonOnBoot: boolean;
    customLauncherSelector?: string;
  };
  isServiceEnded?: boolean;
}
export default function LandingPageShellLayout({
  portals,
  children,
  logoSrc = "/assets/images/branding.svg",
  channelIO,
  isServiceEnded = false,
  ...props
}: LandingPageShellLayoutProps) {
  const navbarDisclosure = useDisclosure(false);

  const [serviceEndedModalOpened, serviceEndedModal] =
    useDisclosure(isServiceEnded);
  const [notReadyYetModalOpened, notReadyYetModal] = useDisclosure(false);
  const [isInquireCompletedModalOpened, inquireCompletedModal] =
    useDisclosure(false);

  const tallyInquireForm = useTallyInquireForm({
    onSubmit: () => inquireCompletedModal.open(),
  });
  const hash = useHash();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const hashAnchor = document.getElementById(hash.replace("#", ""));
        if (hashAnchor !== null) {
          const y = hashAnchor.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: y });
        }
      }, 600);
    }
  }, [hash]);
  return (
    <ReactChannelIO
      pluginKey={process.env.NEXT_PUBLIC_CHANNEL_ID_PLUGIN_KEY!}
      language="ko"
      autoBoot
      {...channelIO}
    >
      <LandingPageShell isNavbarOpened={navbarDisclosure[0]} {...props}>
        <Header
          isNavbarOpened={navbarDisclosure[0]}
          portals={portals}
          onBurgerClick={navbarDisclosure[1].toggle}
          onInquireClick={() => tallyInquireForm.openTallyPopup()}
          logoSrc={logoSrc}
        />
        <main className="w-full pt-[60px]">
          <TallyContext.Provider value={tallyInquireForm}>
            <div className="h-full w-full">{children}</div>
          </TallyContext.Provider>
        </main>
        <footer className="bg-transparent">
          <Footer
            linkGroups={{
              프루퍼: [
                <a key={2} href="https://proofer.tech" className={linkClass}>
                  About 프루퍼
                </a>,
                <span key={1} onClick={() => tallyInquireForm.openTallyPopup()}>
                  문의 & 지원
                </span>,
                <a key={3} href="/health" className={linkClass}>
                  서비스 상태보기
                </a>,
              ],
              바로가기: portals.map((portal) => (
                <a key={portal.title} href={portal.href} className={linkClass}>
                  {portal.title}
                </a>
              )),
            }}
          />
        </footer>
      </LandingPageShell>
      <InquireCompletedModal
        isOpened={isInquireCompletedModalOpened}
        onCloseClick={inquireCompletedModal.close}
      />
      <NotReadyYetModal
        isOpened={notReadyYetModalOpened}
        onCloseClick={notReadyYetModal.close}
      />
      <ServiceEndedModal
        isOpened={serviceEndedModalOpened}
        onCloseClick={serviceEndedModal.close}
      />
    </ReactChannelIO>
  );
}
