"use client";

import React from "react";
import FallbackPage from "@/app/error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <FallbackPage error={error} reset={reset} />;
}
