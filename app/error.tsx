"use client";

import LandingPageShellLayout from "@/app/components/LandingPageShellLayout";
import NotFoundPage from "@/app/components/errors/NotFoundPage";
import { Forbidden, NotFound } from "http-errors";
import { cond, constant, matches, stubTrue } from "lodash";
import React from "react";
import CommonErrorPage from "@/app/components/errors/CommonErrorPage";

export default function FallbackPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <LandingPageShellLayout portals={[]}>
      {cond([
        [
          matches(NotFound.name),
          constant(<NotFoundPage error={error} reset={reset} />),
        ],
        [
          matches(Forbidden.name),
          constant(
            <CommonErrorPage
              error={error}
              reset={reset}
              title={
                error.message === "Forbidden" ? "접근 권한이 없습니다." : ""
              }
            />,
          ),
        ],
        [stubTrue, constant(<CommonErrorPage error={error} reset={reset} />)],
      ])(error.stack?.split(":")[0])}
    </LandingPageShellLayout>
  );
}
