"use client";
import { Paper, Table } from "@mantine/core";
import React from "react";
import { InferSelectModel } from "drizzle-orm";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";

interface TimeSeriesTableProps {
  timeSeries: InferSelectModel<typeof ProcessedGitHubTimeSeries>[];
}
export function TimeSeriesTable({ timeSeries }: TimeSeriesTableProps) {
  return (
    <Paper shadow="xs" p="sm" style={{ overflowX: "scroll" }}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th ta={"right"}>@</Table.Th>
            <Table.Th>Event type</Table.Th>
            <Table.Th ta={"center"}>Reference ID</Table.Th>
            <Table.Th ta={"center"}>User ID</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {timeSeries.map((row) => (
            <Table.Tr key={row.id}>
              <Table.Td ta={"right"} style={{ whiteSpace: "nowrap" }}>
                {row.timestamp.toLocaleString("en-US")}
              </Table.Td>
              <Table.Td>{row.event}</Table.Td>
              <Table.Td>{row.reference_id}</Table.Td>
              <Table.Td>{row.user_id}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
