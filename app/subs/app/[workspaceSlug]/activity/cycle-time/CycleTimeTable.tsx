"use client";
import { Paper, Table } from "@mantine/core";
import React from "react";
import { InferSelectModel } from "drizzle-orm";
import { ProcessedGitHubPullRequest } from "@/database/schemas/github/processed";
import { formatDuration } from "@/src/utils/dayjs";

interface CycleTimeTableProps {
  pullRequests: InferSelectModel<typeof ProcessedGitHubPullRequest>[];
}
export default function CycleTimeTable({ pullRequests }: CycleTimeTableProps) {
  return (
    <Paper shadow="xs" p="sm">
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>PR Title</Table.Th>
            <Table.Th ta={"center"}>Coding Time</Table.Th>
            <Table.Th ta={"center"}>Time to Pick Up Review</Table.Th>
            <Table.Th ta={"center"}>Review Time</Table.Th>
            <Table.Th ta={"center"}>Deployment Time</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {pullRequests.map((pr) => (
            <Table.Tr key={pr.id}>
              <Table.Td>{pr.title}</Table.Td>
              <Table.Td ta={"center"}>
                {formatDuration(pr.coding_time || 0)}
              </Table.Td>
              <Table.Td ta={"center"}>
                {formatDuration(pr.pickup_time || 0)}
              </Table.Td>
              <Table.Td ta={"center"}>
                {formatDuration(pr.review_time || 0)}
              </Table.Td>
              <Table.Td ta={"center"}>
                {formatDuration(pr.deploy_time || 0)}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
