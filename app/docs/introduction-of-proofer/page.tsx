"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { getFilePlugin, RenderDownloadProps } from "@react-pdf-viewer/get-file";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React, { useEffect, useState } from "react";
import { useWindowScroll } from "@mantine/hooks";
import { Affix, Box, Button, Center, Loader, Transition } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useChannelIOEvent } from "react-channel-plugin";
import { nprogress } from "@mantine/nprogress";

export default function IntroductionOfProofer() {
  const [scroll, _] = useWindowScroll();
  const getFilePluginInstance = getFilePlugin({
    fileNameGenerator: () => "프루퍼 서비스 소개서.pdf",
  });

  const [loadingPercent, setLoadingPercent] = useState<number>(0);

  const [isChannelIOLoaded, setIsChannelIOLoaded] = useState<boolean>(false);
  useChannelIOEvent("onBoot", () => setIsChannelIOLoaded(true));

  useEffect(() => {
    if (loadingPercent === 100) nprogress.complete();
    else nprogress.set(loadingPercent);
  }, [loadingPercent]);

  return (
    <>
      <Worker workerUrl="/assets/scripts/pdf.worker.min.js">
        {loadingPercent < 100 && (
          <Center py={"calc(50vh - 4.45em)"}>
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
      </Worker>
      <Affix position={{ bottom: 16, right: isChannelIOLoaded ? 80 : 16 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(styles) => (
            <Button style={styles} size={"lg"}>
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
    </>
  );
}
