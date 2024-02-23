"use client";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import LandingPageShell from "@/app/components/LandingPageShell";

import { useRouter } from "next/navigation";
import useTallyInquireForm from "@/hooks/tally";
import { InquireCompletedModal } from "@/app/components/Modal";
import React from "react";
import { useDisclosure } from "@mantine/hooks";

export default function IntroductionOfProofer() {
  const router = useRouter();
  const [isInquireCompletedModalOpened, inquireCompletedModal] =
    useDisclosure(false);
  const { openTallyPopup } = useTallyInquireForm({
    onSubmit: () => inquireCompletedModal.open(),
  });
  return (
    <LandingPageShell
      onMenuClick={() => router.replace("/")}
      onLoginClick={() => router.replace("/")}
      onInquireClick={() => openTallyPopup()}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl="/docs/introduction-of-proofer.pdf" />
      </Worker>
      <InquireCompletedModal
        isOpened={isInquireCompletedModalOpened}
        onCloseClick={inquireCompletedModal.close}
      />
    </LandingPageShell>
  );
}
