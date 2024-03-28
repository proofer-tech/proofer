"use client";
import "@react-pdf-viewer/core/lib/styles/index.css";
import LandingPageShell from "@/app/components/LandingPageShell";

import useTallyInquireForm from "@/src/hooks/tally";
import {
  InquireCompletedModal,
  NotReadyYetModal,
} from "@/app/components/Modal";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Anchor, AppShell, Box, Text, Transition } from "@mantine/core";
import Footer from "@/app/components/Footer";
import Header, { HeaderPortal } from "@/app/components/Header";
import { ReactChannelIO } from "react-channel-plugin";
import {
  useIsDesktopMedia,
  useIsMobileMedia,
  useIsTabletMedia,
} from "@/src/hooks/mediaQuery";
import TallyContext from "@/src/contexts/TallyContext";
import AgentContext from "@/src/contexts/AgentContext";
interface LandingPageShellLayoutProps {
  portals: readonly HeaderPortal[];
  children: React.ReactNode;
  userAgent?: {
    isDesktop?: boolean;
    isTablet?: boolean;
    isMobile?: boolean;
  };
}
export default function LandingPageShellLayout({
  portals,
  children,
  userAgent,
}: LandingPageShellLayoutProps) {
  const isDesktopMedia = useIsDesktopMedia(userAgent?.isDesktop ?? true);
  const isTabletMedia = useIsTabletMedia(userAgent?.isTablet ?? false);
  const isMobileMedia = useIsMobileMedia(userAgent?.isMobile ?? false);

  const navbarDisclosure = useDisclosure(false);

  const [notReadyYetModalOpened, notReadyYetModal] = useDisclosure(false);
  const [isInquireCompletedModalOpened, inquireCompletedModal] =
    useDisclosure(false);

  const tallyInquireForm = useTallyInquireForm({
    onSubmit: () => inquireCompletedModal.open(),
  });

  useEffect(() => {
    if (window.location.hash) {
      const hashAnchor = document.getElementById(
        window.location.hash.replace("#", ""),
      );
      if (hashAnchor !== null) {
        const y = hashAnchor.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, []);

  return (
    <ReactChannelIO
      pluginKey={process.env.NEXT_PUBLIC_CHANNEL_ID_PLUGIN_KEY!}
      language="ko"
      autoBoot
    >
      <AgentContext.Provider
        value={{
          isDesktop: isDesktopMedia ?? true,
          isTablet: isTabletMedia ?? false,
          isMobile: isMobileMedia ?? false,
        }}
      >
        <LandingPageShell isNavbarOpened={navbarDisclosure[0]}>
          <Header
            isNavbarOpened={navbarDisclosure[0]}
            portals={portals}
            onBurgerClick={navbarDisclosure[1].toggle}
            onInquireClick={() => tallyInquireForm.openTallyPopup()}
          />
          <AppShell.Main>
            <TallyContext.Provider value={tallyInquireForm}>
              <Box>{children}</Box>
            </TallyContext.Provider>
          </AppShell.Main>
          <AppShell.Footer pos={"static"} bg={"transparent"} withBorder={false}>
            <Footer
              linkGroups={{
                프루퍼: [
                  <Text key={0} onClick={() => notReadyYetModal.open()}>
                    About 프루퍼
                  </Text>,
                  <Text
                    key={1}
                    onClick={() => tallyInquireForm.openTallyPopup()}
                  >
                    문의 & 지원
                  </Text>,
                  <Anchor key={2} href="/health" underline="never" c={"black"}>
                    서비스 상태보기
                  </Anchor>,
                  <Anchor
                    key={2}
                    href="/docs/terms-of-service"
                    underline="never"
                    c={"black"}
                  >
                    서비스이용약관
                  </Anchor>,
                  <Anchor
                    key={3}
                    href="/docs/privacy"
                    underline="never"
                    c={"black"}
                  >
                    개인정보처리방침
                  </Anchor>,
                ],
                바로가기: [
                  <Text
                    key={0}
                    onClick={() => tallyInquireForm.openTallyPopup()}
                  >
                    무료로 체험해보기
                  </Text>,
                  <Anchor key={1} href="/#price" underline="never" c={"black"}>
                    가격
                  </Anchor>,
                  <Anchor
                    key={2}
                    href="/docs/introduction-of-proofer"
                    underline="never"
                    c={"black"}
                  >
                    서비스 소개
                  </Anchor>,
                ],
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
      </AgentContext.Provider>
    </ReactChannelIO>
  );
}
