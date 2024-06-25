"use client";
import Image from "next/image";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";

export default function ResponsiveLogoImage() {
  const isMobileMedia = useIsMobileMedia();

  return (
    <Image
      src={"/assets/images/with-cto/logo.svg"}
      width={440}
      height={440}
      alt={"with CTO: 로고"}
      style={{ width: isMobileMedia ? "24em" : "20em", height: "auto" }}
    />
  );
}
