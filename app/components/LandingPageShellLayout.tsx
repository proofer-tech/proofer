"use client";
import LandingPageShell, {
  LandingPageShellProps,
} from "@/app/components/LandingPageShell";

import useTallyInquireForm from "@/src/hooks/tally";
import {
  InquireCompletedModal,
  NotReadyYetModal,
} from "@/app/components/Modal";
import React, { useEffect } from "react";
import { useDisclosure, useHash, useWindowScroll } from "@mantine/hooks";
import { Anchor, AppShell, Box, Text } from "@mantine/core";
import Footer from "@/app/components/Footer";
import Header, { HeaderPortal } from "@/app/components/Header";
import { ReactChannelIO } from "react-channel-plugin";
import TallyContext from "@/src/contexts/TallyContext";
import { useIsMounted } from "@react-pdf-viewer/core";

interface LandingPageShellLayoutProps
  extends Omit<LandingPageShellProps, "isNavbarOpened"> {
  portals: readonly HeaderPortal[];
  logoSrc?: string;
  channelIO?: {
    hideChannelButtonOnBoot: boolean;
    customLauncherSelector?: string;
  };
}
export default function LandingPageShellLayout({
  portals,
  children,
  logoSrc = "/assets/images/branding.svg",
  channelIO,
  ...props
}: LandingPageShellLayoutProps) {
  const navbarDisclosure = useDisclosure(false);

  const [notReadyYetModalOpened, notReadyYetModal] = useDisclosure(false);
  const [isInquireCompletedModalOpened, inquireCompletedModal] =
    useDisclosure(false);

  const tallyInquireForm = useTallyInquireForm({
    onSubmit: () => inquireCompletedModal.open(),
  });
  const isMounted = useIsMounted();
  const [_, scrollTo] = useWindowScroll();
  const [hash] = useHash();
  useEffect(() => {
    if (isMounted && hash) {
      setTimeout(() => {
        const hashAnchor = document.getElementById(hash.replace("#", ""));
        if (hashAnchor !== null) {
          const y = hashAnchor.getBoundingClientRect().top + window.scrollY;
          scrollTo({ y: y });
        }
      }, 600);
    }
  }, [isMounted, hash]);
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
        <AppShell.Main px={0} pt={"var(--app-shell-header-height)"}>
          <TallyContext.Provider value={tallyInquireForm}>
            <Box w={"100%"} h={"100%"}>
              {children}
            </Box>
          </TallyContext.Provider>
        </AppShell.Main>
        <AppShell.Footer pos={"static"} bg={"transparent"} withBorder={false}>
          <Footer
            linkGroups={{
              프루퍼: [
                <Anchor
                  key={2}
                  href="https://proofer.tech"
                  underline="never"
                  c={"black"}
                >
                  About 프루퍼
                </Anchor>,
                <Text key={1} onClick={() => tallyInquireForm.openTallyPopup()}>
                  문의 & 지원
                </Text>,
                <Anchor key={2} href="/health" underline="never" c={"black"}>
                  서비스 상태보기
                </Anchor>,
              ],
              바로가기: portals.map((portal) => (
                <Anchor
                  key={portal.title}
                  href={portal.href}
                  underline="never"
                  c={"black"}
                >
                  {portal.title}
                </Anchor>
              )),
            }}
          />
        </AppShell.Footer>
      </LandingPageShell>
      <InquireCompletedModal
        isOpened={isInquireCompletedModalOpened}
        onCloseClick={inquireCompletedModal.close}
      />
      <NotReadyYetModal
        isOpened={notReadyYetModalOpened}
        onCloseClick={notReadyYetModal.close}
      />
    </ReactChannelIO>
  );
}
