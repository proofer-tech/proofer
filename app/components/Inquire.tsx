"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import TallyContext from "@/src/contexts/TallyContext";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";
import { useIsChannelIOLoaded } from "@/src/hooks/channel";

// 창 세로 스크롤 위치를 추적한다.
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

interface InquireFormProps {
  btnText: string;
  withEmail?: boolean;
  btnColor?: string;
}
export function InquireForm({
  withEmail = false,
  btnColor = "var(--color-primary)",
  btnText,
}: InquireFormProps) {
  const isMobileMedia = useIsMobileMedia();
  const [isPopoverOpened, setPopoverOpened] = useState<boolean>(false);
  const [inquireEmail, setInquireEmail] = useState<string>("");

  const { tallyOptions, setTallyOptions, openTallyPopup } =
    useContext(TallyContext);
  useEffect(() => {
    const newOptions = Object.assign(tallyOptions, {
      hiddenFields: { email: inquireEmail },
    });
    setTallyOptions(newOptions);
  }, [tallyOptions, setTallyOptions, inquireEmail]);

  return (
    <>
      {withEmail ? (
        <Popover open={isPopoverOpened}>
          <PopoverAnchor asChild>
            <div suppressHydrationWarning>
              <Input
                placeholder="이메일 입력 ..."
                type="email"
                value={inquireEmail}
                onChange={(e) => setInquireEmail(e.target.value)}
                onFocus={() => setPopoverOpened(true)}
                onBlur={() => setPopoverOpened(false)}
                className={cn("h-10 rounded-md", isMobileMedia && "w-full")}
              />
            </div>
          </PopoverAnchor>
          <PopoverContent
            className="w-[200px] text-xs"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            이메일을 입력하고, {btnText} 버튼을 눌러주세요.
          </PopoverContent>
        </Popover>
      ) : (
        <></>
      )}
      <Button
        className={cn(
          "h-10 text-white hover:opacity-90",
          isMobileMedia && "w-full",
        )}
        style={{ backgroundColor: btnColor }}
        onClick={() => openTallyPopup()}
      >
        {btnText}
      </Button>
    </>
  );
}

export function InquireWidget({
  btnText,
  children,
}: {
  btnText: string;
  children: React.ReactNode;
}) {
  const isMobileMedia = useIsMobileMedia();

  const scrollY = useScrollY();
  const offsetPinRef = useRef<HTMLDivElement>(null);

  const [isWidget, setIsWidget] = useState<boolean>(false);

  const isChannelIOLoaded = useIsChannelIOLoaded();

  useEffect(() => {
    if (offsetPinRef.current === null) return;
    const rect = offsetPinRef.current.getBoundingClientRect();
     
    setIsWidget(
      !(
        scrollY >= offsetPinRef.current.offsetTop ||
        (rect.top >= 0 &&
          rect.bottom <=
            (typeof window !== "undefined" ? window.innerHeight : 0))
      ),
    );
  }, [offsetPinRef, scrollY]);

  return (
    <>
      <div ref={offsetPinRef} />
      {!isChannelIOLoaded ? <Skeleton className="h-[9em] rounded-md" /> : <></>}
      {isChannelIOLoaded && (
        <div
          className={cn(
            "animate-in fade-in",
            isWidget
              ? "fixed bottom-[0.5em] left-[0.5em] w-[calc(100%-1em-72px)]"
              : "w-full",
          )}
        >
          <div
            className="rounded-md bg-cover bg-center"
            style={{
              backgroundImage: "url(/assets/images/background-inquire.png)",
            }}
          >
            <div
              className={cn(
                "flex gap-[1.3em]",
                isMobileMedia ? "flex-col" : "flex-row",
                isWidget ? "px-[1.6em] py-[0.8em]" : "px-[5em] py-[3em]",
                isWidget && isMobileMedia
                  ? "justify-center"
                  : "justify-between",
                isWidget ? "items-center" : "items-stretch",
              )}
            >
              <div className={cn("flex flex-col", isMobileMedia && "w-full")}>
                {children}
              </div>
              <div
                className={cn(
                  "flex gap-2",
                  isMobileMedia
                    ? "w-full flex-col"
                    : "justify-center items-start",
                )}
              >
                <InquireForm
                  btnText={btnText}
                  withEmail={true}
                  btnColor="var(--color-secondary)"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
