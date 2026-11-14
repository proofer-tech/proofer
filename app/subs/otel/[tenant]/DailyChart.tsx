"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyRow } from "@/app/subs/otel/lib/queries";

const BLUE = "var(--proofer-blue)";

export default function DailyChart({
  data,
  metric,
  label,
  format,
}: {
  data: DailyRow[];
  metric: "cost_usd" | "prompts" | "requests" | "users";
  label: string;
  format?: "usd";
}) {
  const fmt = (v: number) =>
    format === "usd" ? `$${v.toFixed(2)}` : v.toLocaleString("ko-KR");
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--proofer-line)" />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            minTickGap={16}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={11}
            width={48}
            tickFormatter={fmt}
          />
          <Tooltip
            cursor={{ fill: "var(--proofer-blue-soft)" }}
            formatter={(v: number) => [fmt(v), label]}
          />
          <Bar dataKey={metric} fill={BLUE} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
