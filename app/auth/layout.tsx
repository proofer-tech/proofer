"use client";
import "@react-pdf-viewer/core/lib/styles/index.css";
import LandingPageShell from "@/app/_components/LandingPageShell";

import useTallyInquireForm from "@/src/hooks/tally";
import { InquireCompletedModal } from "@/app/_components/Modal";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import { ReactChannelIO } from "react-channel-plugin";

export default function DocsLayout({ children }: any) {
  const navbarDisclosure = useDisclosure(false);

  const [isInquireCompletedModalOpened, inquireCompletedModal] =
    useDisclosure(false);

  const { openTallyPopup } = useTallyInquireForm({
    onSubmit: () => inquireCompletedModal.open(),
  });

  return (
    <ReactChannelIO
      pluginKey={process.env.NEXT_PUBLIC_CHANNEL_ID_PLUGIN_KEY!}
      language="ko"
      autoBoot
    >
      <LandingPageShell isNavbarOpened={navbarDisclosure[0]}>
        <Header
          isNavbarOpened={navbarDisclosure[0]}
          portals={[
            { title: "가격", href: "/#price" },
            { title: "서비스소개", href: "/docs/introduction-of-proofer" },
          ]}
          onBurgerClick={navbarDisclosure[1].toggle}
          onInquireClick={() => openTallyPopup()}
        />
        <AppShell.Main>{children}</AppShell.Main>
        <InquireCompletedModal
          isOpened={isInquireCompletedModalOpened}
          onCloseClick={inquireCompletedModal.close}
        />
        <AppShell.Footer pos={"static"} bg={"transparent"} withBorder={false}>
          <Footer />
        </AppShell.Footer>
      </LandingPageShell>
    </ReactChannelIO>
  );
}
