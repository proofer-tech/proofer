import { Button } from "@/components/ui/button";
import React from "react";

interface CommonErrorPageProps {
  error: Error;
  reset: () => void;
  title?: string;
  message?: string;
}
export default function CommonErrorPage({
  error,
  reset,
  title,
  message,
}: CommonErrorPageProps) {
  return (
    <div className="mx-auto w-full max-w-[1184px] px-4">
      <div className="flex h-[calc(90vh-var(--app-shell-header-height,0px))] items-center justify-center py-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold">
            {title || "오류가 발생했습니다."}
          </h1>
          <code className="rounded bg-gray-100 px-2 py-1 text-sm">
            {message || error.message}
          </code>
          <Button onClick={() => reset()} variant="outline">
            새로고침하여 다시 시도해보기
          </Button>
        </div>
      </div>
    </div>
  );
}
