"use client";

import React from "react";
import FallbackPage from "@/app/error";
import { NotFound } from "http-errors";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return <FallbackPage error={NotFound()} reset={() => router.refresh()} />;
}
