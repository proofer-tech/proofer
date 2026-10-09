"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import {
  IconAlertCircleFilled,
  IconCircleCheckFilled,
  IconInfoCircleFilled,
} from "@tabler/icons-react";
import useSWR from "swr";
import { apiFetcher } from "@/src/swr";
import { Health, HealthState } from "@/src/types/health";
import { useSearchParams } from "next/navigation";
import { cond, constant, matches, stubTrue } from "lodash";

const HealthStateLabel = {
  [HealthState.UP]: "운영중",
  [HealthState.DOWN]: "확인필요",
  [HealthState.MAINTENANCE]: "작업중",
};

const HealthStateColor = {
  [HealthState.UP]: "var(--color-green)",
  [HealthState.DOWN]: "var(--color-red)",
  [HealthState.MAINTENANCE]: "var(--color-primary)",
};

export default function HealthPage() {
  const searchParams = useSearchParams();

  const { data, error, isLoading } = useSWR<{ [key: string]: Health }>(
    "/api/health",
    apiFetcher,
  );

  const serviceHealth = (data?: { [key: string]: Health }) =>
    data?.[searchParams.get("service") || ""];

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4">
      <div className="flex justify-center pt-[5vh]">
        {isLoading ? (
          <div className="size-36 animate-spin rounded-full border-[12px] border-black/10 border-t-transparent" />
        ) : (
          error ||
          cond([
            [
              matches(HealthState.DOWN),
              constant(
                <IconAlertCircleFilled
                  size={"10em"}
                  style={{ color: "var(--color-red)" }}
                />,
              ),
            ],
            [
              matches(HealthState.MAINTENANCE),
              constant(
                <IconInfoCircleFilled
                  size={"10em"}
                  style={{ color: "var(--color-primary)" }}
                />,
              ),
            ],
            [
              stubTrue,
              constant(
                <IconCircleCheckFilled
                  size={"10em"}
                  style={{ color: "var(--color-green)" }}
                />,
              ),
            ],
          ])(serviceHealth(data)?.state)
        )}
      </div>
      <div className="flex flex-col items-center gap-4 py-12">
        {isLoading ? (
          <Skeleton className="h-8 w-4/5 rounded-full" />
        ) : (
          error ||
          cond([
            [
              matches(HealthState.DOWN),
              constant(
                <h1 className="text-center text-4xl font-bold">
                  {serviceHealth(data)?.name} 서비스에 문제를 발견하여
                  확인중입니다.
                </h1>,
              ),
            ],
            [
              matches(HealthState.MAINTENANCE),
              constant(
                <h1 className="text-center text-4xl font-bold">
                  {serviceHealth(data)?.name} 서비스가 점검중입니다.
                </h1>,
              ),
            ],
            [
              stubTrue,
              constant(
                <h1 className="text-center text-4xl font-bold">
                  {serviceHealth(data)?.name} 서비스가 정상동작중입니다.
                </h1>,
              ),
            ],
          ])(serviceHealth(data)?.state)
        )}
        {isLoading ? (
          <Skeleton className="h-4 w-[90%] rounded-full" />
        ) : (
          cond([
            [
              matches(HealthState.DOWN),
              constant(
                <p className="text-center">
                  최대한 빠르게 복구하겠습니다. 양해해주셔서 감사합니다!
                </p>,
              ),
            ],
            [
              matches(HealthState.MAINTENANCE),
              constant(
                <p className="text-center">
                  궁금하신 사항은 아래 채널톡을 통해 문의해주시면 최대한 빠르게
                  답변드리겠습니다.
                </p>,
              ),
            ],
            [
              stubTrue,
              constant(
                <p className="text-center">
                  혹시 문제를 겪고 계시나요? 문제상황을 채널톡으로 전달해주시면
                  빠르게 확인 후 답변해드리겠습니다!
                </p>,
              ),
            ],
          ])(serviceHealth(data)?.state)
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4 py-8">
        {isLoading
          ? Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-8 w-40 rounded-full" />
            ))
          : data &&
            Object.entries(data).map(([k, h]) => (
              <span
                key={k}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-base font-medium"
              >
                <span
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor:
                      HealthStateColor[h.state] ?? "var(--color-darkgray-2)",
                  }}
                />
                {h.name}
              </span>
            ))}
      </div>
      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      ) : (
        data &&
        Object.values(data).some((h) => h.description.length > 0) && (
          <table className="w-full text-left">
            <tbody>
              {Object.entries(data)
                .filter(([_, h]) => h.description.length > 0)
                .map(([k, h]) => (
                  <tr key={k} className="border-b">
                    <td className="p-2">
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          color: HealthStateColor[h.state],
                          backgroundColor: `color-mix(in srgb, ${HealthStateColor[h.state]} 12%, transparent)`,
                        }}
                      >
                        {HealthStateLabel[h.state]}
                      </span>
                    </td>
                    <td className="p-2">{h.name}</td>
                    <td className="p-2">{h.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}
