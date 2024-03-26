"use client";
import { Paper, Table } from "@mantine/core";
import React from "react";

export function ActivityTable() {
  const activityData = [...Array(8)]
    .map((_, i) => ({
      category: ["Commit", "Pull Request", "Code Review"][
        Math.floor(Math.random() * 3)
      ],
      id: Math.floor(Math.random() * 1000),
      description: "커밋 메시지 혹은 Pull Request 제목 등",
      time: new Date(new Date().valueOf() - Math.random() * 1e10),
    }))
    .sort((a, b) => b.time.valueOf() - a.time.valueOf());
  return (
    <Paper shadow="xs" p="sm">
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>활동</Table.Th>
            <Table.Th ta={"center"}>식별자</Table.Th>
            <Table.Th ta={"center"}>설명</Table.Th>
            <Table.Th ta={"right"}>시간</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {activityData.map((activity) => (
            <Table.Tr key={activity.id}>
              <Table.Td>{activity.category}</Table.Td>
              <Table.Td ta={"center"}>{activity.id}</Table.Td>
              <Table.Td>{activity.description}</Table.Td>
              <Table.Td ta={"right"}>{activity.time.toISOString()}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
