"use client";
import { Paper, Table } from "@mantine/core";
import React from "react";

export default function CycleTimeTable() {
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
          <Table.Tr>
            <Table.Td>PR 제목 예시</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
            <Table.Td ta={"center"}>10시간 4분</Table.Td>
            <Table.Td ta={"center"}>7시간 48분</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>PR 제목 예시</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
            <Table.Td ta={"center"}>10시간 4분</Table.Td>
            <Table.Td ta={"center"}>7시간 48분</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>PR 제목 예시</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
            <Table.Td ta={"center"}>10시간 4분</Table.Td>
            <Table.Td ta={"center"}>7시간 48분</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>PR 제목 예시</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
            <Table.Td ta={"center"}>10시간 4분</Table.Td>
            <Table.Td ta={"center"}>7시간 48분</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>PR 제목 예시</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
            <Table.Td ta={"center"}>10시간 4분</Table.Td>
            <Table.Td ta={"center"}>7시간 48분</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>PR 제목 예시</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
            <Table.Td ta={"center"}>10시간 4분</Table.Td>
            <Table.Td ta={"center"}>7시간 48분</Table.Td>
            <Table.Td ta={"center"}>2일 10시간</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
