"use client";
import "@react-pdf-viewer/core/lib/styles/index.css";
import LandingPageShell from "@/app/components/LandingPageShell";

import { useRouter } from "next/navigation";
import useTallyInquireForm from "@/hooks/tally";
import { InquireCompletedModal } from "@/app/components/Modal";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import Footer from "@/app/components/Footer";

export default function DocsLayout({ children }: any) {
  const router = useRouter();
  const [isInquireCompletedModalOpened, inquireCompletedModal] =
    useDisclosure(false);
  const { openTallyPopup } = useTallyInquireForm({
    onSubmit: () => inquireCompletedModal.open(),
  });

  return (
    <LandingPageShell
      onLoginClick={() => router.replace("/")}
      onInquireClick={() => openTallyPopup()}
    >
      <AppShell.Main>{children}</AppShell.Main>
      <InquireCompletedModal
        isOpened={isInquireCompletedModalOpened}
        onCloseClick={inquireCompletedModal.close}
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
