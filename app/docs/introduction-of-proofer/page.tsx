"use client";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { getFilePlugin, RenderDownloadProps } from "@react-pdf-viewer/get-file";
import "@react-pdf-viewer/core/lib/styles/index.css";
import LandingPageShell from "@/app/components/LandingPageShell";

import { useRouter } from "next/navigation";
import useTallyInquireForm from "@/hooks/tally";
import { InquireCompletedModal } from "@/app/components/Modal";
import React from "react";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import {
  Affix,
  AppShell,
  Button,
  Space,
  Text,
  Transition,
} from "@mantine/core";
import Footer from "@/app/components/Footer";
import { IconDownload } from "@tabler/icons-react";

export default function IntroductionOfProofer() {
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();
  const [isInquireCompletedModalOpened, inquireCompletedModal] =
    useDisclosure(false);
  const { openTallyPopup } = useTallyInquireForm({
    onSubmit: () => inquireCompletedModal.open(),
  });
  const getFilePluginInstance = getFilePlugin({
    fileNameGenerator: (file) => "프루퍼 서비스 소개서.pdf",
  });
  return (
    <LandingPageShell
      onMenuClick={() => router.replace("/")}
      onLoginClick={() => router.replace("/")}
      onInquireClick={() => openTallyPopup()}
    >
      <Space h={"3.6em"} />
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl="/docs/introduction-of-proofer.pdf"
          plugins={[getFilePluginInstance]}
        />
      </Worker>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(styles) => (
            <Button style={styles} size="xl">
              <getFilePluginInstance.Download>
                {(props: RenderDownloadProps) => (
                  <Button
                    style={styles}
                    onClick={props.onClick}
                    rightSection={<IconDownload size={14} />}
                  >
                    PDF 로 다운로드
                  </Button>
                )}
              </getFilePluginInstance.Download>
            </Button>
          )}
        </Transition>
      </Affix>
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
