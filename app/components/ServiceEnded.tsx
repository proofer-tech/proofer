import React from "react";
import { generateMetadataFromTitle } from "@/src/manifest";

interface EndedService {
  name: string;
  subDomain: string;
  intro: string;
}

export function generateEndedMetadata({
  name,
  subDomain,
  intro,
}: EndedService) {
  return generateMetadataFromTitle(
    {
      title: `${name} 서비스 종료 안내`,
      fullTitle: `${name} 서비스 종료 안내`,
      description: `${name}는 2025년 4월에 종료된 서비스입니다. ${intro}`,
    },
    {
      alternates: { canonical: `https://${subDomain}.proofer.tech` },
      metadataBase: new URL(`https://${subDomain}.proofer.tech`),
      openGraph: {
        locale: "ko",
        type: "website",
        url: `https://${subDomain}.proofer.tech`,
        images: [`/assets/images/${subDomain}/og-image.webp`],
      },
    },
  );
}

export default function ServiceEnded({ name, intro }: EndedService) {
  return (
    <div className="mx-auto flex h-screen w-full max-w-[1184px] items-center px-4">
      <div className="flex w-full flex-col items-center gap-4">
        <p className="text-gray-700">종료된 서비스</p>
        <h1 className="text-center text-4xl font-bold">{name}</h1>
        <p className="max-w-[36em] text-center">{intro}</p>
        <p className="text-center text-gray-700">
          이 서비스는 2025년 4월에 종료되었습니다.
        </p>
        <a
          href="https://proofer.tech"
          className="text-blue-600 hover:underline"
        >
          proofer.tech 로 이동하기
        </a>
      </div>
    </div>
  );
}
