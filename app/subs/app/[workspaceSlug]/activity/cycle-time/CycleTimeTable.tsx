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
            <Table.Th>PR 제목</Table.Th>
            <Table.Th ta={"center"}>코딩에 걸리는 시간</Table.Th>
            <Table.Th ta={"center"}>리뷰를 픽업하는 시간</Table.Th>
            <Table.Th ta={"center"}>리뷰에 걸리는 시간</Table.Th>
            <Table.Th ta={"center"}>배포에 걸리는 시간</Table.Th>
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
