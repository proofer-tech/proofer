"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { getFilePlugin, RenderDownloadProps } from "@react-pdf-viewer/get-file";
import "@react-pdf-viewer/core/lib/styles/index.css";
import LandingPageShell from "@/app/components/LandingPageShell";

import { useRouter } from "next/navigation";
import useTallyInquireForm from "@/hooks/tally";
import { InquireCompletedModal } from "@/app/components/Modal";
import React, { useState } from "react";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import {
  Affix,
  AppShell,
  Button,
  Space,
  Transition,
  Progress,
  Box,
  Loader,
  Center,
} from "@mantine/core";
import Footer from "@/app/components/Footer";
import { IconDownload } from "@tabler/icons-react";

export default function IntroductionOfProofer() {
  const router = useRouter();
  const [scroll, _] = useWindowScroll();
  const [isInquireCompletedModalOpened, inquireCompletedModal] =
    useDisclosure(false);
  const { openTallyPopup } = useTallyInquireForm({
    onSubmit: () => inquireCompletedModal.open(),
  });
  const getFilePluginInstance = getFilePlugin({
    fileNameGenerator: () => "프루퍼 서비스 소개서.pdf",
  });

  const [loadingPercent, setLoadingPercent] = useState<number>(0);

  return (
    <LandingPageShell
      onMenuClick={() => router.replace("/")}
      onLoginClick={() => router.replace("/")}
      onInquireClick={() => openTallyPopup()}
    >
      <Space h={"3.8em"} />
      <Progress
        radius="xs"
        size="xs"
        value={loadingPercent}
        opacity={1 - 0.0095 * loadingPercent}
      />
      <Worker workerUrl="/scripts/pdf.worker.min.js" />
      <Box py={"3em"}>
        {loadingPercent < 100 && (
          <Center>
            <Loader color="blue" size="xl" />
          </Center>
        )}
        <React.Suspense fallback={<Box h={"100vh"} />}>
          <Viewer
            fileUrl="https://asgkzse2rqmcnxxg.public.blob.vercel-storage.com/assets/introduction-of-proofer.pdf"
            plugins={[getFilePluginInstance]}
            renderLoader={(percent) => {
              setLoadingPercent(Math.round(percent));
              return <div />;
            }}
            onDocumentLoad={() => setLoadingPercent(100)}
          />
        </React.Suspense>
      </Box>
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
