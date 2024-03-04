"use client";
import "@react-pdf-viewer/core/lib/styles/index.css";
import LandingPageShell from "@/app/components/LandingPageShell";

import { useRouter } from "next/navigation";
import useTallyInquireForm from "@/hooks/tally";
import {
  InquireCompletedModal,
  NotReadyYetModal,
} from "@/app/components/Modal";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function DocsLayout({ children }: any) {
  const navbarDisclosure = useDisclosure(false);

  const [isInquireCompletedModalOpened, inquireCompletedModal] =
    useDisclosure(false);
  const [notReadyYetModalOpened, notReadyYetModal] = useDisclosure(false);

  const { openTallyPopup } = useTallyInquireForm({
    onSubmit: () => inquireCompletedModal.open(),
  });

  return (
    <LandingPageShell isNavbarOpened={navbarDisclosure[0]}>
      <Header
        isNavbarOpened={navbarDisclosure[0]}
        portals={[
          { title: "가격", href: "/#price" },
          { title: "서비스소개", href: "/docs/introduction-of-proofer" },
        ]}
        onBurgerClick={navbarDisclosure[1].toggle}
        onLoginClick={() => notReadyYetModal.open()}
        onInquireClick={() => openTallyPopup()}
      />
      <AppShell.Main>{children}</AppShell.Main>
      <InquireCompletedModal
        isOpened={isInquireCompletedModalOpened}
        onCloseClick={inquireCompletedModal.close}
      />
      <NotReadyYetModal
        isOpened={notReadyYetModalOpened}
        onCloseClick={notReadyYetModal.close}
      />
      <AppShell.Footer
        pos={"static"}
        bg={"transparent"}
        style={{ border: "none" }}
      >
        <Footer />
      </AppShell.Footer>
    </LandingPageShell>
  );
}
