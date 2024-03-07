import React, { Suspense } from "react";
import { Loader } from "@mantine/core";

export default function HealthLayout({ children }: { children: any }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
