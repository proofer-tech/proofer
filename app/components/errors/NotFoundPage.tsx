"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const magnifierComponents = [
  <Image
    key={1}
    src={"/assets/images/magnifier-1.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
  <Image
    key={2}
    src={"/assets/images/magnifier-2.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
  <Image
    key={3}
    src={"/assets/images/magnifier-3.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
  <Image
    key={4}
    src={"/assets/images/magnifier-4.png"}
    alt={"페이지를 찾는 사람"}
    width={240}
    height={240}
  />,
];
interface NotFoundPageProps {
  error: Error | string;
  reset?: () => void;
}
export default function NotFoundPage({ error, reset }: NotFoundPageProps) {
  const [magnifierComponent, setMagnifierComponent] = useState<React.ReactNode>(
    magnifierComponents[0],
  );

  useEffect(() => {
    // Removed initial synchronous setState in effect to avoid cascading renders (see react.dev/learn/you-might-not-need-an-effect)
    const interval = setInterval(
      () =>
        setMagnifierComponent(
          magnifierComponents[Math.floor(Math.random() * 4)],
        ),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1184px] px-4">
      <div className="flex flex-col items-center gap-4 pt-12">
        <div className="flex justify-center">{magnifierComponent}</div>
        <h1 className="text-4xl font-bold text-gray-800">
          페이지를 찾을 수 없습니다.
        </h1>
        <p className="text-center text-gray-500">
          혹시 찾고 계시는 페이지의 URL이 잘못 입력된건 아닌지 한번 더
          확인해보세요
        </p>
        <div className="flex flex-col gap-4">
          <code className="rounded bg-gray-100 px-8 py-4 text-sm">
            {error instanceof Error ? error.message : error}
          </code>
          {reset !== undefined && (
            <Button onClick={() => reset()} variant="outline" size="sm">
              새로고침하여 다시 시도해보기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
